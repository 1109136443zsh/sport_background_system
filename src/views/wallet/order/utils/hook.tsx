import {onMounted, reactive, ref, toRaw} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {getOrderList} from "@/api/wallet";
import {message} from "@/utils/message";

export function useWallet() {
  const form = {
    user_id: null,
    user_role: ""
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
      prop: "money",
      cellRenderer: ({row}) => {
        const amountInYuan = (row.money / 100).toFixed(2); // 将分转换为元，并保留两位小数
        return <span>{amountInYuan} 元</span>; // 在模板中显示转换后的金额
      },
    },
    {
      label: "提现方式",
      prop: "method"
    },
    {
      label: "提现状态",
      prop: "status_pay",
      cellRenderer: ({row, props}) => (
        <el-tag size={props.size} effect="plain">
          {row.status_pay === 0 && "待处理"}
          {row.status_pay === 1 && "处理中"}
          {row.status_pay === 2 && "成功"}
          {row.status_pay === 3 && "失败"}
        </el-tag>
      )
    },
    {
      label: "提现时间",
      prop: "create_time"
    }
  ]
  async function onSearch() {
    loading.value = true;
    await getOrderList({
      page: pagination.currentPage,
      user_id: toRaw(form).user_id,
      user_role: toRaw(form).user_role
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
