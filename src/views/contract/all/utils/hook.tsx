import {h, onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {addContract, contractApply, contractDetail, contractRemove, getContractList} from "@/api/contract";
import {message} from "@/utils/message";
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/contract/all/form/index.vue"
import detailTable from "@/views/contract/component/detail/index.vue";
import addForm from "@/views/contract/component/addForm/index.vue"

export function useContract() {

  const formRef = ref()
  const columns: TableColumnList = [
    {
      label: "合同id",
      prop: "contract_id"
    },
    {
      label: "合同名",
      prop: "name"
    },
    {
      label: "签署对象",
      prop: "sign_role"
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
    }
  ]
  const dataList = ref()
  const loading = ref(true)
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  async function onSearch() {
    loading.value = true;
    await getContractList(
      1
    ).then(response => {
      if (response.code === 200) {
        dataList.value = response.data
        pagination.total = response.total
      }
    }).catch(() => {
      message(`获取列表信息失败`,
        {
          type: "error"
        });
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function openDetailDialog(row) {
    let ids = null
    await contractDetail({
      contract_id: row.contract_id
    }).then(response => {
      ids = response.data
      addDialog({
        title: "查看合同详情",
        props: {
          formInline: {
            ids,
            name: ids.name ?? "",
            sign_role: ids.sign_role ?? "",
            contract_id: ids.contract_id ?? "",
            text: ids.text ?? ""
          }
        },
        width: "46%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => detailTable
      })
    })
  }

  function openDialog() {
    addDialog({
      title: "合同补录",
      props: {
        formInline: {
          user_id: "",
          image: "",
          sign_time: "",
          url: ""
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
            contractApply({
              user_id: curData.user_id,
              image: curData.url,
              sign_time: curData.sign_time
            }).then((response) => {
              console.log(response)
              if (response.code === 200) {
                message(`合同补录成功`,
                  {
                    type: "success"
                  });
                done()
                onSearch()
              } else {
                message(`提交失败`,
                  {
                    type: "error"
                  });
              }
            }).catch(() => {
              message(`提交失败`,
                {
                  type: "error"
                });
            })
          }
        })
      },
    })
  }

  function openAddDialog() {
    addDialog({
      title: "添加合同",
      props: {
        formInline: {
          sign_role: "",
          name: "",
          text: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(addForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            addContract({
              sign_role: curData.sign_role,
              name: curData.name,
              text: curData.text
            }).then(() => {
              message(`添加合同成功`,
                {
                  type: "success"
                });
              done()
              onSearch()
            }).catch(() => {
              message(`提交失败`,
                {
                  type: "error"
                });
            })
          }
        })
      },
    })
  }

  async function handleDelete(row) {
    await contractRemove({
      contract_id: row.contract_id
    }).then(() => {
      message(`您删除了编号为${row.contract_id}的合同`,
        {
          type: "success"
        });
      onSearch();
    }).catch(() => {
      message(`操作失败，请重试`,
        {
          type: "error"
        });
    })
  }

  const resetForm = formEl => {
    if (!formEl) return;
    console.log(formEl)
    formEl.resetFields();
    onSearch()
  }

  onMounted(async () => {
    onSearch();
  });

  return {
    loading,
    pagination,
    columns,
    dataList,
    onSearch,
    resetForm,
    openDialog,
    openDetailDialog,
    handleDelete,
    openAddDialog
  }
}
