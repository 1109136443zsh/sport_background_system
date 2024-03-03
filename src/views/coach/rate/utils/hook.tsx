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
      prop: "id"
    },
    {
      label: "星级名称",
      prop: "name"
    },
    {
      label: "学员额外付费",
      prop: "charge",
      cellRenderer: ({row}) => {
        const amountInYuan = (row.charge / 100).toFixed(2); // 将分转换为元，并保留两位小数
        return <span>{amountInYuan} 元</span>; // 在模板中显示转换后的金额
      },
    },
    {
      label: "教练额外分成费用",
      prop: "bonus",
      cellRenderer: ({row}) => {
        const amountInYuan = (row.bonus / 100).toFixed(2); // 将分转换为元，并保留两位小数
        return <span>{amountInYuan} 元</span>; // 在模板中显示转换后的金额
      },
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
      if (response.code === 200) {
        dataList.value = response.data
      } else {
        message("出错了，请检查", {
          type: "error"
        })
      }
    }).catch((error) => {
      console.log(error)
      message("获取数据失败，请重试", {
        type: "error"
      })
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog(title = "更新", row?: FormItemProps) {
    console.log(row)
    addDialog({
      title: `${title}星级`,
      props: {
        formInline: {
          title,
          name: row?.name ?? "",
          charge: (row?.charge / 100).toFixed(2) ?? "",
          bonus: (row?.bonus / 100).toFixed(2) ?? "",
          rate_id: row?.id ?? ""
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
                bonus: curData.bonus * 100,
                charge: curData.charge * 100
              }).then((response) => {
                if (response.code === 200) {
                  message(`成功更新教练星级`, {
                    type: "success"
                  });
                  done();
                  onSearch();
                } else if (response.msg === "id不存在"){
                  message(`id不存在，请检查`, {
                    type: "error"
                  });
                }else {
                  message(`出错了，请检查`, {
                    type: "error"
                  });
                }
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
              }).then((response) => {
                if (response.code === 200) {
                  message(`成功添加教练星级`, {
                    type: "success"
                  });
                  done();
                  onSearch();
                } else {
                  message(`出错了，请检查`, {
                    type: "error"
                  });
                }
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
      rate_id: row.id,
      page: 1
    }).then(response => {
      if (response.code === 200) {
        ids = response.data
        addDialog({
          title: "查看该星级可上课课程",
          props: {
            formInline: {
              rate_id: row.id,
              course_id: ids.course_id,
              course_name: ids.course_name,
              ids
            }
          },
          width: "46%",
          draggable: true,
          fullscreenIcon: true,
          closeOnClickModal: false,
          contentRenderer: () => h(rateCourseTable, {ref: formRef})
        })
      } else {
        message(`出错了，请检查`, {
          type: "error"
        });
      }
    }).catch(() => {
      message(`查看可上课课程失败`, {
        type: "error"
      });
    })
  }

  async function handleDelete(row) {
    await rateRemove({
      rate_id: row.id,
    }).then((response) => {
      if (response.code === 200) {
        message(`您删除了星级编号为${row.rate_id}的这条数据`,
          {
            type: "success"
          });
        onSearch();
      } else {
        message(`出错了，请检查`,
          {
            type: "error"
          });
      }
    }).catch(() => {
      message(`删除失败`,
        {
          type: "error"
        });
    })
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
