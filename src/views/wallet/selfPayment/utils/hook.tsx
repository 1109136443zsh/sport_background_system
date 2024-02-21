import {onMounted, reactive, ref} from "vue";
import dayjs from "dayjs";
import {getSelfPaymentList} from "@/api/wallet";
import type {PaginationProps} from "@pureadmin/table";
import {message} from "@/utils/message";

export function useWallet() {
  const loading = ref(true)
  const dataList = ref()
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "收支金额",
      prop: "variation"
    },
    {
      label: "原因",
      prop: "event"
    },
    {
      label: "时间",
      prop: "change_time",
      formatter: ({createTime}) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    }
  ]
  const balance = ref(0);

  async function onSearch() {
    loading.value = true;
    await getSelfPaymentList({
      page: pagination.currentPage
    }).then(response => {
      dataList.value = response.data.page_data
    }).catch(() => {
      message(`获取数据失败，请重试`,
        {
          type: "error"
        });
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }


  onMounted(async () => {

    onSearch();
  });

  return {
    loading,
    columns,
    balance,
    dataList,
    pagination,
    onSearch,
  };
}
