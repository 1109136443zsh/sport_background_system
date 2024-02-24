import {onMounted, reactive, ref} from "vue";
import dayjs from "dayjs";
import {getSelfBalance, getSelfPaymentList, withdraw} from "@/api/wallet";
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
    await getSelfPaymentList(
      1
    ).then(response => {
      if (response.code === 200){
        dataList.value = response.data
        pagination.total = response.pages
      }else {
        message(`出错了，请检查`,
          {
            type: "error"
          });
      }
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
  async function withdrawal(data) {
    await withdraw({
      data
    }).then(res => {
      if (res.code === 200){
        getBalance()
        onSearch()
      }else {
        message(`出错了，请检查`,
          {
            type: "error"
          });
      }
    }).catch(() => {
      message(`提现失败，请重试`,
        {
          type: "error"
        });
    })
  }
  async function getBalance() {
    await getSelfBalance().then(res => {
      console.log(res)
      if (res.code === 200){
        balance.value = res.data.balance
      }else {
        message(`出错了，请检查`,
          {
            type: "error"
          });
      }
    }).catch(() => {
      message(`获取数据失败，请重试`,
        {
          type: "error"
        });
    })
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
    getBalance,
    withdrawal
  };
}
