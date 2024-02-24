import {onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";

import dayjs from "dayjs";
import {message} from "@/utils/message";
import {contractDetail, contractRemove, getSignedContractList} from "@/api/contract";
import {addDialog} from "@/components/ReDialog/index";
import detailTable from "@/views/contract/component/detail/index.vue";


export function useSignedContract() {

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
    /*,
    {
      label: "签署人id",
      prop: "user_id"
    },
    {
      label: "签署人姓名",
      prop: "user_name"
    },
    {
      label: "签署时间",
      prop: "sign_time",
      formatter: ({SignedTime}) =>
        dayjs(SignedTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "合同图片",
      prop: "image",
      cellRenderer: ({row}) => (
        <el-image
          fit="cover"
          preview-teleported={true}
          src={row.avatar}
          preview-src-list={Array.of(row.avatar)}
          class="w-[24px] h-[24px] rounded-full align-middle"
        />
      )
    },*/
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
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
    await getSignedContractList(
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
  const resetForm = formEl => {
    if (!formEl) return;
    console.log(formEl)
    formEl.resetFields();
    onSearch()
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
    resetForm,
    handleDelete,
    openDetailDialog
  }
}
