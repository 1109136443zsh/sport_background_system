import {onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";

import dayjs from "dayjs";
import {message} from "@/utils/message";
import {getSignedContractList} from "@/api/contract";


export function useSignedContract() {

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
      label: "签署人id",
      prop: "user_id"
    },
    {
      label: "签署人姓名",
      prop: "user_name"
    },
    {
      label: "签署时间",
      prop: "sign_time",
      formatter: ({SignedTime}) =>
        dayjs(SignedTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "合同图片",
      prop: "image",
      cellRenderer: ({row}) => (
        <el-image
          fit="cover"
          preview-teleported={true}
          src={row.avatar}
          preview-src-list={Array.of(row.avatar)}
          class="w-[24px] h-[24px] rounded-full align-middle"
        />
      )
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
    await getSignedContractList({
      page: pagination.currentPage
    }).then(response => {
      dataList.value = response.data
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
    resetForm
  }
}
