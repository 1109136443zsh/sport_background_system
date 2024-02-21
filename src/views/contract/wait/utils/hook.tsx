import {onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {contractSign, getWaitContractList} from '@/api/contract';
import {message} from "@/utils/message";


export function useWaitContract() {
  const form = reactive({
    status: 0
  });

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
      width: 180,
      slot: "operation"
    }
  ];
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
    await getWaitContractList({
      page: pagination.currentPage
    }).then(response => {
      dataList.value = response.data
      console.log(response)
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

  async function handleSign(row) {
    await contractSign({
      contract_id: row.contract_id
    }).then(() => {
      message(`您同意了编号为${row.contract_id}的合同`,
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
    form,
    loading,
    pagination,
    columns,
    dataList,
    onSearch,
    resetForm
  }
}
