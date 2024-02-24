import {h, onMounted, reactive, ref, toRaw} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {addRegion, deleteRegion, getRegionList} from "@/api/region";
import {message} from "@/utils/message";
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/region/form/index.vue"

export function useRegion() {
  const form = reactive({
    region_id: "",
    name: ""
  });
  const formRef = ref();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const dataList = ref();
  const loading = ref(true);
  const columns: TableColumnList = [
    {
      label: "区域ID",
      prop: "region_id"
    },
    {
      label: "区域名称",
      prop: "name"
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
    }
  ]

  async function onSearch() {
    loading.value = true;
    await getRegionList({
      page: 1
    }).then(response => {
      console.log(response)
      dataList.value = response.data
      pagination.total = response.pages
    }).catch((error) => {
      console.log(error)
      message("获取数据失败，请重试", {
        type: "error"
      })
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog() {
    addDialog({
      title: "添加区域",
      props: {
        formInline: {
          name: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: async (done, {options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline
        FormRef.validate(valid => {
          if (valid) {
            addRegion({
              name: curData.name
            }).then((res) => {
              console.log(res)
              message(`成功新增区域 ${curData.name}`, {
                type: "success"
              });
              done();
              onSearch();
            }).catch(error => {
              console.error(error);
              // 处理删除失败时的错误情况
              message(`新增区域 ${curData.name} 失败`, {
                type: "error"
              });
            })
          }
        })
      },
    })
  }

  async function handleDelete(row) {
    await deleteRegion({
      region_id: row.region_id
    }).then(() => {
      message(`您删除了区域编号为${row.region_id}的这条数据`,
        {type: "success"});
      onSearch();
    }).catch(() => {
      message(`删除失败`,
        {type: "error"});
    })
  }

  const resetFrom = formEl => {
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
    pagination,
    formRef,
    columns,
    dataList,
    resetFrom,
    onSearch,
    handleDelete,
    openDialog
  }
}
