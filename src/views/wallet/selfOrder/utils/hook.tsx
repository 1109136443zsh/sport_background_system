import {onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {getOrderList, getSelfOrderList} from "@/api/wallet";
import dayjs from "dayjs";
import {message} from "@/utils/message";

export function useWallet() {
  const form = {
    user_id: ""
  }
  const dataList = ref()
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const loading = ref(true)
  const columns: TableColumnList = [
    {
      label: "用户id",
      prop: "user_id"
    },
    {
      label: "角色id",
      prop: "user_role"
    },
    {
      label: "提现钱款",
      prop: "money"
    },
    {
      label: "提现方式",
      prop: "method"
    },
    {
      label: "提现状态",
      prop: "status_pay",

    },
    {
      label: "提现时间",
      prop: "create_time",
      formatter: ({createTime}) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    }
  ]

  async function onSearch() {
    loading.value = true;
    await getSelfOrderList(
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

  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };
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
    resetForm
  };
}
