import {h, onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {addContract, contractDetail, contractRemove, contractSign, getWaitContractList} from '@/api/contract';
import {message} from "@/utils/message";
import {addDialog} from "@/components/ReDialog/index";
import detailTable from "@/views/contract/component/detail/index.vue"
import addForm from "@/views/contract/component/addForm/index.vue";

export function useWaitContract() {

  const formRef = ref()
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
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
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
    await getWaitContractList(
      pagination.currentPage
    ).then(response => {
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

  async function handleSign(row) {
    await contractSign({
      contract_id: row.contract_id
    }).then(() => {
      message(`您同意了编号为${row.contract_id}的合同`,
        {
          type: "success"
        });
      onSearch();
    }).catch(() => {
      message(`操作失败，请重试`,
        {
          type: "error"
        });
    })
  }
  function openAddDialog() {
    addDialog({
      title: "添加合同",
      props: {
        formInline: {
          sign_role: "",
          name: "",
          text: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(addForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            addContract({
              sign_role: curData.sign_role,
              name: curData.name,
              text: curData.text
            }).then(response => {
              message(`添加合同成功`,
                {
                  type: "success"
                });
              done()
              onSearch()
            }).catch(() => {
              message(`提交失败`,
                {
                  type: "error"
                });
            })
          }
        })
      },
    })
  }
  async function handleDelete(row) {
    await contractRemove({
      contract_id: row.contract_id
    }).then(() => {
      message(`您删除了编号为${row.contract_id}的合同`,
        {
          type: "success"
        });
      onSearch();
    }).catch(() => {
      message(`操作失败，请重试`,
        {
          type: "error"
        });
    })
  }

  async function openDetailDialog(row) {
    let ids = null
    await contractDetail({
      contract_id: row.contract_id
    }).then(response => {
      ids = response.data
      addDialog({
        title: "查看合同详情",
        props: {
          formInline: {
            contract_id: "",
            sign_role: 0,
            name: "",
            text: ""
          }
        },
        width: "46%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => detailTable
      })
    })
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
    handleDelete,
    handleSign,
    openAddDialog,
    openDetailDialog
  }
}
