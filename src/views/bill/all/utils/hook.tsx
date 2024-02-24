import {h, onMounted, reactive, ref, toRaw} from "vue";
import {addBill, getBillList, uploadBill} from "@/api/bill";
import type {PaginationProps} from "@pureadmin/table";
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/bill/uploadForm/index.vue";
import {message} from "@/utils/message";
import addForm from "@/views/bill/addForm/index.vue"
export function useBill() {
  const form = reactive({
    user_id: 0
  });
  const dataList = ref();
  const formRef = ref()
  const loading = ref(false)
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "发票ID",
      prop: "bill_id"
    },
    {
      label: "金额",
      prop: "amount"
    },
    {
      label: "抬头类型",
      prop: "title_type"
    },
    {
      label: "税号",
      prop: "tax_id"
    },
    {
      label: "注册地址",
      prop: "address"
    },
    {
      label: "开户行",
      prop: "bank"
    },
    {
      label: "卡号",
      prop: "bank_account"
    },
    {
      label: "申请人id",
      prop: "user_id"
    },
    {
      label: "发票链接",
      prop: "bill_url"
    },
    {
      label: "申请发票状态",
      prop: "status"
    }
  ]

  async function onSearch() {
    loading.value = true;
    await getBillList({
      page: pagination.currentPage,
      user_id: toRaw(form).user_id
    }).then(response => {
      if (response.code === 200){
        dataList.value = response.data
      }else {
        message("出错了，请重试", {
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

  function openDialog() {
    addDialog({
      title: "上传电子发票",
      props: {
        formInline: {
          bill_id: "",
          bill_file: [],
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: async (done, {options,}) => {
        const FormRef = formRef.value.getRef()
        const curData = options.props.formInline
        FormRef.validate(valid => {
          if (valid) {
            const data = new FormData()
            data.append("bill_id",curData.bill_id)
            data.append("bill_file",curData.bill_file)
            uploadBill(data).then((response) => {
              console.log(response)
              if (response.code === 200){
                message("成功上传发票", {
                  type: "success"
                });
                done();
                onSearch();
              }else {
                message("出错了，请检查", {
                  type: "error"
                });
              }
            }).catch((error) => {
              console.log(error)
              message("上传发票异常", {
                type: "error"
              });
            })
          }
        })
      }
    })
  }
  function openAddDialog() {
    addDialog({
      title: "申请发票",
      props: {
        formInline: {
          amount: "",
          tax_id: "",
          address: "",
          title: "",
          title_type: "",
          phone: "",
          bank: "",
          bank_account: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(addForm, {ref: formRef}),
      beforeSure: (done, { options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            addBill({
              amount: curData.amount,
              title_type: curData.title_type,
              title: curData.title,
              tax_id: curData.tax_id,
              address: curData.address,
              phone: curData.phone,
              bank: curData.bank,
              bank_account: curData.bank_account
            }).then(res => {
              if (res.code === 200) {
                message(`申请发票成功`, {
                  type: "success"
                });
                done();
                onSearch();
              }else {
                message(`出错了`, {
                  type: "error"
                });
              }
            }).catch(() => {
              message(`提交失败`, {
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
    formEl.resetFields();
    onSearch()
  }
  onMounted(async () => {
    onSearch();
  });
  return {
    form,
    loading,
    dataList,
    columns,
    resetForm,
    pagination,
    onSearch,
    openDialog,
    openAddDialog
  }
}
