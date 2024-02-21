import {h, onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {
  getRateCourseList,
  getRateList,
  rateAdd,
  rateRemove,
  rateUpdate
} from "@/api/coach/rate";
import {addDialog} from "@/components/ReDialog/index";
import {message} from "@/utils/message";
import editForm from "@/views/coach/rate/form/index.vue"
import type {FormItemProps} from "@/views/coach/rate/form/types";
import rateCourseTable from "@/views/coach/rate/rateCourse/index.vue"
import type {RoleFormItemProps} from "@/views/system/user/utils/types";

export function coachRate() {
  const formRef = ref()
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const dataList = ref()
  const loading = ref(true)
  const columns: TableColumnList = [
    {
      label: "星级ID",
      prop: "rate_id"
    },
    {
      label: "星级名称",
      prop: "name"
    },
    {
      label: "学员额外付费",
      prop: "charge"
    },
    {
      label: "教练额外分成费用",
      prop: "bonus"
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
    }
  ]

  async function onSearch() {
    loading.value = true;
    await getRateList().then(response => {
      dataList.value = response.data
    }).catch(() => {
      message("获取数据失败，请重试", {
        type: "error"
      })
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog(title = "更新", row?: FormItemProps) {
    addDialog({
      title: `${title}星级`,
      props: {
        formInline: {
          title,
          name: row?.name ?? "",
          charge: row?.charge ?? "",
          bonus: row?.bonus ?? "",
          rate_id: row?.rate_id ?? ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            if (title === "更新") {
              rateUpdate({
                rate_id: curData.rate_id,
                name: curData.name,
                bonus: curData.bonus,
                charge: curData.charge
              }).then(() => {
                message(`成功更新教练星级`, {
                  type: "success"
                });
                done();
                onSearch();
              }).catch(() => {
                message(`更新教练星级失败`, {
                  type: "error"
                });
              })
            } else {
              rateAdd({
                name: curData.name,
                bonus: curData.bonus,
                charge: curData.charge
              }).then(() => {
                message(`成功添加教练星级`, {
                  type: "success"
                });
                done();
                onSearch();
              }).catch(() => {
                message(`新增教练星级失败`, {
                  type: "error"
                });
              })
            }
          }
        })
      },
    })
  }

  async function openCourseList(row) {
    let ids = null
    await getRateCourseList({
      rate_id: row.rate_id,
      page: pagination.currentPage
    }).then(response => {
      ids = response.data.page_data
      addDialog({
        title: "查看该星级可上课课程",
        props: {
          formInline: {
            rate_id: row.rate_id,
            ids
          }
        },
        width: "46%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => rateCourseTable
      })
    })

  }

  async function handleDelete(row) {
    await rateRemove({
      rate_id: row.rate_id,
    }).then(() => {
      message(`您删除了星级编号为${row.rate_id}的这条数据`,
        {type: "success"});
    }).catch(() => {
      message(`删除失败`, {type: "error"});
    })
    onSearch();
  }

  onMounted(async () => {
    onSearch();
  });

  return {
    pagination,
    dataList,
    loading,
    columns,
    onSearch,
    handleDelete,
    openDialog,
    openCourseList
  }
}
