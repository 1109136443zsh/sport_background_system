import {onMounted, reactive, ref, toRaw} from "vue";
import {message} from "@/utils/message";
import {getOrderNum} from "@/api/total";

export function orderNum() {
  const form = reactive({
    day: 1
  })
  const formRef = ref()
  const dataList = ref();
  const loading = ref(true);
  const columns: TableColumnList = [
    {
      label: "日期",
      prop: "date"
    },
    {
      label: "订单数量",
      prop: "count"
    }
  ]
  async function onSearch() {
    loading.value = true;
    await getOrderNum(
      {day: toRaw(form).day}
    ).then(response => {
      dataList.value = response.data.detail
    }).catch((error) => {
      console.log(error)
      message(`获取列表数据失败，请刷新`,
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
    onSearch()
  }

  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    columns,
    loading,
    dataList,
    onSearch,
    resetForm
  }
}
