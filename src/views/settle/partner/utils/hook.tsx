import {h, onMounted, reactive, ref, toRaw} from "vue";
import {PaginationProps} from "@pureadmin/table/dist/types";
import dayjs from "dayjs";
import {message} from "@/utils/message";
import {getPartnerDetail, getPartnerList, partnerAccept, partnerReject} from "@/api/settle/partner";
import {addDialog} from "@/components/ReDialog/index";
import detailTable from "@/views/settle/partner/detail/index.vue";
import editForm from "@/views/settle/partner/form/index.vue"

export function partner() {
  const form = reactive({
    phone: ""
  });
  const formRef = ref();
  const loading = ref(true)
  const dataList = ref();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "真实姓名",
      prop: "name"
    },
    {
      label: "手机号",
      prop: "phone"
    },
    {
      label: "申请ID",
      prop: "apply_id"
    },
    {
      label: "openid",
      prop: "openid"
    },
    {
      label: "申请状态",
      prop: "apply_status",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.apply_status === 0 ? "danger" : ""}
          effect="plain"
        >
          {row.apply_status === 1 ? "通过" : "待审核"}
        </el-tag>
      )
    },
    {
      label: "",
      prop: "apply_time",
      formatter: ({createTime}) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      slot: "operation",
      fixed: "right",
      width: 180
    }
  ]
  const resetForm = formEl => {
    if (!formEl) return;
    console.log(formEl)
    formEl.resetFields();
    onSearch()
  }

  async function onSearch() {
    loading.value = true;
    await getPartnerList({
      page: pagination.currentPage,
      phone: toRaw(form).phone
    }).then(response => {
      if (response.code === 200) {
        dataList.value = response.data
        pagination.total = response.pages
      } else {
        message("出错了，请重试", {
          type: "error"
        });
      }
    }).catch((error) => {
      console.log(error)
      message("获取数据失败，请重试", {
        type: "error"
      });
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog(title) {
    addDialog({
      title: `${title}入驻`,
      props: {
        formInline: {
          title: title,
          apply_id: "",
          region_id: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef()
        const curData = options.props.formInline
        FormRef.validate(valid => {
          if (valid) {
            if (title === "同意") {
              partnerAccept({
                apply_id: curData.apply_id,
                region_id: curData.region_id
              }).then((res) => {
                console.log(res)
                message(`操作成功`,
                  {type: "success"});
                onSearch();
              }).catch((error) => {
                console.log(error)
                message(`操作失败`,
                  {type: "error"});
              })
            } else {
              partnerReject({
                apply_id: curData.apply_id
              }).then((res) => {
                message(`操作成功`,
                  {type: "success"});
                onSearch();
              }).catch((error) => {
                console.log(error)
                message(`操作失败`, {type: "error"});
              })
            }
          }
        })
      },
    })
  }

  async function openDetailDialog(row) {
    let ids = null
    getPartnerDetail({
      apply_id: row.apply_id
    }).then(response => {
      console.log(response)
      if (response.code === 200) {
        ids = response.data
        addDialog({
          title: "查看合伙人入驻信息",
          props: {
            formInline: {
              ids
            }
          },
          width: "46%",
          draggable: true,
          fullscreenIcon: true,
          closeOnClickModal: false,
          contentRenderer: () => detailTable
        })
      } else {
        message(`出错了`, {type: "error"});
      }
    }).catch(() => {
      message(`获取教练入驻信息失败`, {type: "error"});
    })
  }

  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    dataList,
    columns,
    pagination,
    loading,
    resetForm,
    onSearch,
    openDetailDialog,
    openDialog
  }
}
