import {onMounted, reactive, ref, toRaw} from "vue";
import {getUserList} from "@/api/admin/user";
import {message} from "@/utils/message";
import {getNewCustomsList} from "@/api/total";

export function customs() {
  const form = reactive({
    day: 1
  })
  const formRef = ref()
  const dataList = ref();
  const loading = ref(true);
  const columns: TableColumnList = [
    {
      label: "总数",
      prop: "count"
    },
    {
      label: "日期",
      prop: "detail[0].date"
    },
    {
      label: "获客数量",
      prop: "detail[0].count"
    }
  ]
  async function onSearch() {
    loading.value = true;
    await getNewCustomsList(
      {day: toRaw(form).day}
    ).then(response => {
      dataList.value = response.data
      console.log(dataList.value)
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
