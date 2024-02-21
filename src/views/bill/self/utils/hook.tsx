import {h, onMounted, reactive, ref} from "vue";
import {getCoachList} from "@/api/settle/coach";
import {getBillList, getBillSelfList, uploadBill} from "@/api/bill";
import type {PaginationProps} from "@pureadmin/table";
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/bill/form/index.vue"
import {message} from "@/utils/message";

export function useBill() {
  const form = reactive({
    user_id: ""
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
    const {data} = await getBillSelfList({
      page: pagination.currentPage
    })
    dataList.value = data.page_data;

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog() {
    addDialog({
      title: "",
      props: {
        formInline: {
          bill_id: "",
          bill_file: []
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
            uploadBill({
              bill_id: curData.bill_id,
              bill_file: curData.bill_file
            }).then(() => {
              message("成功上传发票", {
                type: "success"
              });
              done();
              onSearch();

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
    openDialog
  }
}
