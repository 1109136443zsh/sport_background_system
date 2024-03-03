import {onMounted, reactive, ref, toRaw} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {getVenueDetail, getVenueList} from "@/api/settle/venue";
import {coachAccept, coachReject} from "@/api/settle/coach";
import dayjs from "dayjs";
import {message} from "@/utils/message";
import {addDialog} from "@/components/ReDialog/index";
import detailTable from "@/views/settle/venue/detail/index.vue";

export function useSettle() {
  const form = reactive({
    phone: "",
    name: ""
  })
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const dataList = ref()
  const loading = ref(true)
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
      label: "申请时间",
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
      formatter: ({createTime}) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "详细地址",
      prop: "location"
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
    await getVenueList({
      page: pagination.currentPage.toString(),
      phone: toRaw(form).phone
    }).then(response => {
      if (response.code === 200) {
        dataList.value = response.data
        pagination.total = response.total
      }else {
        message("出错了，请检查", {
          type: "error"
        });
      }
    }).catch((error) => {
      console.log(error)
      message("获取数据失败，请重试", {
        type: "error"
      });
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDetailDialog(row) {
    let ids = null
    getVenueDetail({
      apply_id: row.apply_id
    }).then(response => {
      if (response.code === 200) {
        ids = response.data
        addDialog({
          title: "查看场馆入驻信息",
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
              gym_image: ids.gym_image,
              skill: ids.skill,
              job: ids.job,
              location: ids.location
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
      message(`操作失败`, {type: "error"});
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
    form,
    pagination,
    dataList,
    columns,
    resetForm,
    onSearch,
    handleReject,
    handleAccept,
    openDetailDialog
  }
}
