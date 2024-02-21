import {h, onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {contractApply, getContractList} from "@/api/contract";
import {message} from "@/utils/message";
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/contract/all/form/index.vue"

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
    await getContractList({
      page: pagination.currentPage
    }).then(response => {
      dataList.value = response.data.page_data
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

  function openDialog() {
    addDialog({
      title: "合同补录",
      props: {
        formInline: {
          user_id: "",
          image: "",
          sign_time: ""
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
              image: curData.image,
              sign_time: curData.sign_time
            }).then(() => {
              message(`合同补录成功`,
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
    openDialog
  }
}
