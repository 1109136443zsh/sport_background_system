import {onMounted, reactive, ref, toRaw} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import dayjs from "dayjs";
import {coachAccept, coachReject, getCoachDetail, getCoachList} from "@/api/settle/coach";
import {message} from "@/utils/message";
import detailTable from "@/views/settle/coach/detail/index.vue"
import {addDialog} from "@/components/ReDialog/index";
import {urlApi} from "@/api/utils";

export function useSettle() {
  const form = reactive({
    phone: "",
    name: ""
  })
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
          src={urlApi + row.avatar}
          preview-src-list={Array.of(urlApi + row.avatar)}
          class="w-[48px] h-[48px] rounded-full align-middle"
        />
      ),
      width: 90
    },
    {
      label: "申请ID",
      prop: "apply_id"
    },
    {
      label: "openid",
      prop: "openid"
    },
    {
      label: "申请状态",
      prop: "apply_status",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.apply_status === 0 ? "danger" : ""}
          effect="plain"
        >
          {row.apply_status === 0 && "未审核"}
          {row.apply_status === 1 && "已通过"}
          {row.apply_status === 2 && "已拒绝"}
        </el-tag>
      )
    },
    {
      label: "申请ID",
      prop: "apply_id"
    },
    {
      label: "申请时间",
      prop: "apply_time",
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
    await getCoachList({
      page: pagination.currentPage,
      phone: toRaw(form).phone
    }).then(res => {
      if (res.code === 200) {
        dataList.value = res.data
        pagination.total = res.total
      }else {
        message(`出错了`, {type: "error"});
      }
    }).catch(() => {
      message(`获取列表信息失败`, {type: "error"});
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function openDetailDialog(row) {
    let ids = null
    getCoachDetail({
      apply_id: row.apply_id
    }).then(response => {
      if (response.code === 200) {
        ids = response.data
        addDialog({
          title: "查看教练入驻信息",
          props: {
            formInline: {
              ids,
              apply_id: ids.apply_id,
              apply_status: ids.apply_status,
              apply_time: ids.apply_time,
              info: ids.info,
              name: ids.name,
              openid: ids.openid,
              phone: ids.phone,
              avatar: ids.avatar,
              cover_image: ids.cover_image,
              skill: ids.skill
            }
          },
          width: "46%",
          draggable: true,
          fullscreenIcon: true,
          closeOnClickModal: false,
          contentRenderer: () => detailTable
        })
      }else {
        message(`出错了`, {type: "error"});
      }
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
