import {h, onMounted, reactive, ref, toRaw} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {addCourse, getCourseDetail, getCourseList, removeCourse, updateCourse} from "@/api/course";
import {message} from "@/utils/message";
import editForm from "@/views/course/form/index.vue";
import {FormItemProps} from "@/views/course/form/types";
import {addDialog} from "@/components/ReDialog/index";
import detailTable from "@/views/course/detail/index.vue"
import {any} from "vue-types";

export function courseList() {
  const form = reactive({
    course_type: 1
  })

  const formRef = ref();
  const dataList = ref();
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "课程ID",
      prop: "course_id",
    },
    {
      label: "课程名称",
      prop: "name"
    },
    {
      label: "课程类别",
      prop: "type",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag size={props.size} effect="plain"
        >
          {row.type === 1 && "私教课"}
          {row.type === 2 && "特色课"}
          {row.type === 3 && "训练营"}
          {row.type === 4 && "团操"}
        </el-tag>
      )
    },
    {
      label: "价格",
      prop: "price"
    },
    {
      label: "价格介绍",
      prop: "price_info"
    },
    {
      label: "小标题",
      prop: "subtitle"
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
    }
  ]

  function openDialog(title = "新增", row?: FormItemProps) {
    addDialog({
      title: `${title}课程`,
      props: {
        formInline: {
          title,
          course_id: row?.course_id ?? "",
          name: row?.name ?? "",
          price: row?.price ?? "",
          price_info: row?.price_info ?? "",
          course_type: row?.course_type ?? "",
          subtitle: row?.subtitle ?? ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: async (done, {options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            if (title === "新增") {
              addCourse({
                name: curData.name,
                price: curData.price,
                price_info: curData.price_info,
                subtitle: curData.subtitle,
                type: curData.course_type
              }).then((res) => {
                console.log(res)
                console.log(curData.course_type)
                message(`您成功${title}了名称为${curData.name}的这条数据`,
                  {
                    type: "success"
                  });
                done(); // 关闭弹框
                onSearch(); // 刷新表格数据
              }).catch(() => {
                message(`${title}失败`,
                  {
                    type: "error"
                  });
              })
            } else {
              updateCourse({
                name: curData.name,
                subtitle: curData.subtitle,
                price: curData.price,
                price_info: curData.price_info,
                type: curData.course_type,
                course_id: curData.course_id
              }).then((res) => {
                console.log(curData.course_type)
                message(`您成功${title}了名称为${curData.name}的这条数据`,
                  {
                    type: "success"
                  });
                done(); // 关闭弹框
                onSearch(); // 刷新表格数据
              }).catch(() => {
                message(`${title}失败`,
                  {
                    type: "error"
                  });
              })
            }
          }
        })
      },
    })
  }

  async function openDetail(row) {
    let ids = null;
    await getCourseDetail({
      course_id: row.course_id
    }).then(response => {
      ids = response.data
      addDialog({
        title: "课程详情",
        props: {
          formInline: {
            ids
          }
        },
        width: "75%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => detailTable
      })
    }).catch(() => {
      message(`获取课程信息失败`,
        {
          type: "error"
        });
    })
  }

  async function onSearch() {
    loading.value = true;
    await getCourseList({
      page: 1,
      course_type: toRaw(form).course_type
    }).then(response => {
      dataList.value = response.data
      console.log(response)
      pagination.total = response.pages
    }).catch((error) => {
      message(`获取课程列表失败`,
        {type: "error"});
    });

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  async function handleDelete(row) {
    await removeCourse({
      course_id: row.course_id
    }).then(() => {
      message(`您删除了用户编号为${row.course_id}的这条数据`,
        {type: "success"});
      onSearch();
    }).catch(() => {
      message(`删除失败`,
        {type: "error"});
    })

  }

  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    loading,
    columns,
    dataList,
    pagination,
    onSearch,
    resetForm,
    handleDelete,
    openDialog,
    openDetail
  }
}
