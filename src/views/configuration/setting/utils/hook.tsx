import {h, onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {message} from "@/utils/message";
import {getConfigList, updateConfigList} from "@/api/config";
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/configuration/setting/form/index.vue"

export function setting() {
  const formRef = ref()
  const dataList = ref()
  const loading = ref(true)
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns:TableColumnList = [
    {
      label: "配置项",
      prop: "key"
    },
    {
      label: "配置值",
      prop: "value"
    },
    {
      label: "操作",
      slot: "operation",
      fixed: "right",
      width: 180
    }
  ]

  async function onSearch() {
    loading.value = true;
    await getConfigList(
      pagination.currentPage
    ).then(response => {
      console.log(response)
      if (response.code === 200) {
        dataList.value = response.data
        pagination.total = response.total
      }else {
        message(`出错了`,
          {
            type: "error"
          });
      }
    }).catch((error) => {
      console.log(error)
      message(`获取列表信息失败`,
        {
          type: "error"
        });
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  function openDialog(row) {

    addDialog({
      title: "更新系统设置",
      props: {
        formInline: {
          key: row?.key ?? "",
          value: row?.value ?? ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure:(done, { options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            updateConfigList({
              key: curData.key,
              value: curData.value
            }).then(response => {
              console.log(response)
              if (response.code === 200) {
                message(`更新系统配置成功`,
                  {
                    type: "success"
                  });
                done()
                onSearch()
              }else {
                message(`出错了`,
                  {
                    type: "error"
                  });
              }
            }).catch((error) => {
              message(`更新失败`,
                {
                  type: "error"
                });
            })
          }
        })
      },
    })
  }

  onMounted(async () => {
    onSearch()
  })
  return {
    loading,
    pagination,
    columns,
    dataList,
    onSearch,
    openDialog
  }
}
