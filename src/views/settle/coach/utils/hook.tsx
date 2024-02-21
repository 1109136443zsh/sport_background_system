import {onMounted, reactive, ref, toRaw} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import dayjs from "dayjs";
import {coachAccept, coachReject, getCoachDetail, getCoachList} from "@/api/settle/coach";
import {message} from "@/utils/message";
import detailTable from "@/views/settle/coach/detail/index.vue"
import {addDialog} from "@/components/ReDialog/index";
import {any} from "vue-types";

export function useSettle() {
  const form = reactive({
    phone: "",
    name: ""
  })
  const formRef = ref()
  const loading = ref(true)
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const dataList = ref()

  const columns: TableColumnList = [
    {
      label: "真实姓名",
      prop: "name"
    },
    {
      label: "手机号",
      prop: "phone"
    },
    {
      label: "头像",
      prop: "avatar",
      cellRenderer: ({row}) => (
        <el-image
          fit="cover"
          preview-teleported={true}
          src={row.avatar}
          preview-src-list={Array.of(row.avatar)}
          class="w-[24px] h-[24px] rounded-full align-middle"
        />
      ),
      width: 90
    },
    {
      label: "申请时间",
      prop: "apply_id"
    },
    {
      label: "openid",
      prop: "openid"
    },
    {
      label: "申请状态",
      prop: "apply_status"
    },
    {
      label: "申请ID",
      prop: "apply_id"
    },
    {
      label: "申请时间",
      prop: "apply_time",
      formatter: ({createTime}) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
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
    const {data} = await getCoachList({
      page: pagination.currentPage,
      phone: toRaw(form)
    });
    dataList.value = data.page_data;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function openDetailDialog(row) {
    let ids = null
    getCoachDetail({
      apply_id: row.apply_id
    }).then(response => {
      ids = response.data
      addDialog({
        title: "查看教练入驻信息",
        props: {
          formInline: {
            ids
          }
        },
        width: "46%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => detailTable
      })
    }).catch(() => {
      message(`获取教练入驻信息失败`, {type: "error"});
    })

  }

  const resetForm = formEl => {
    if (!formEl) return;
    console.log(formEl)
    formEl.resetFields();
    onSearch()
  }

  async function handleReject(row) {
    await coachReject({
      apply_id: row.apply_id
    }).then(() => {
      message(`操作成功`,
        {type: "success"});
      onSearch();
    }).catch(() => {
      message(`操作失败`, {type: "error"});
    })
  }

  async function handleAccept(row) {
    await coachAccept({
      apply_id: row.apply_id
    }).then(() => {
      message(`操作成功`,
        {type: "success"});
      onSearch();
    }).catch(() => {
      message(`操作失败`,
        {type: "error"});
    })
  }

  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    dataList,
    columns,
    pagination,
    loading,
    resetForm,
    onSearch,
    openDetailDialog,
    handleAccept,
    handleReject
  }
}
