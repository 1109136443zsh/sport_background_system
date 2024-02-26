import {onMounted, reactive, ref, toRaw} from "vue";
import {getPaymentList} from "@/api/wallet";
import type {PaginationProps} from "@pureadmin/table";
import {message} from "@/utils/message";

export function useWallet() {
  const form = {
    user_id: null
  }
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
      prop: "variation",
      cellRenderer: ({row}) => {
        const amountInYuan = (row.variation / 100).toFixed(2); // 将分转换为元，并保留两位小数
        return <span>{amountInYuan} 元</span>; // 在模板中显示转换后的金额
      },
    },
    {
      label: "原因",
      prop: "event"
    },
    {
      label: "时间",
      prop: "change_time"
    }
  ]

  async function onSearch() {
    loading.value = true;
    await getPaymentList({
      page: pagination.currentPage,
      user_id: toRaw(form).user_id
    }).then(response => {
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
