import {PaginationProps} from "@pureadmin/table/dist";
import {h, onMounted, reactive, ref, toRaw} from "vue";
import {addComplain, cancelOrder, getCheckinDetail, getOrderDetail, getOrderList, getUserDetail} from "@/api/order";
import detailTable from "@/views/order/list/orderDetail/index.vue"
import dayjs from "dayjs";
import {addDialog} from "@/components/ReDialog/index";
import {message} from "@/utils/message";
import cancelForm from "@/views/order/list/cancelOrder/index.vue"
import userDetailTable from "@/views/order/list/userDetail/index.vue"
import checkinDetail from "@/views/order/list/checkin/checkinDetail/index.vue"
import complainForm from "@/views/order/list/complainOrder/index.vue";
import type {FormItemProps} from "@/views/system/user/utils/types";

export function orderList() {
  const form = reactive({
    comment: 0,
    complain: 0,
    gym_id: 0,
    order_status: 0,
    user_id: 0
  });
  const formRef = ref()
  const loading = ref(true)
  const dataList = ref()
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });

  const columns: TableColumnList = [
    {
      label: "订单ID",
      prop: "order_id"
    },
    {
      label: "课程名称",
      prop: "course_name"
    },
    {
      label: "教练名称",
      prop: "coach_name"
    },
    {
      label: "封面图",
      prop: "coach_image",
      cellRenderer: ({row}) => (
        <el-image
          fit="cover"
          preview-teleported={true}
          src={row.coach_image}
          preview-src-list={Array.of(row.coach_image)}
          class="w-[48px] h-[48px] rounded-full align-middle"
        />
      ),
      width: 90
    },
    {
      label: "场馆名称",
      prop: "gym_name"
    },
    {
      label: "最终支付价格",
      prop: "price"
    },
    {
      label: "支付状态",
      prop: "status_pay",
      cellRenderer: ({row, props}) => (
        <el-tag size={props.size} effect="plain">
          {row.status_pay === 0 && "未支付"}
          {row.status_pay === 1 && "支付中"}
          {row.status_pay === 2 && "支付成功"}
          {row.status_pay === 3 && "退款中"}
          {row.status_pay === 4 && "已退款"}
        </el-tag>
      )
    },
    {
      label: "订单状态",
      prop: "status_order",
      cellRenderer: ({row, props}) => (
        <el-tag size={props.size} effect="plain">
          {row.status_order === 0 && "未完成"}
          {row.status_order === 2 && "待核销"}
          {row.status_order === 3 && "已完成"}
          {row.status_order === 4 && "已取消"}
        </el-tag>
      )
    },
    {
      label: "预定时间节点ID",
      prop: "segment_id"
    },
    {
      label: "预定日期时间戳",
      prop: "schedule_date",
      formatter: ({createTime}) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
    }
  ];

  async function onSearch() {
    loading.value = true;
    await getOrderList({
      page: 1,
      order_status: toRaw(form).order_status,
      user_id: toRaw(form).user_id,
      gym_id: toRaw(form).gym_id,
      complain: toRaw(form).complain,
      comment: toRaw(form).comment
    }).then(response => {
      dataList.value = response.data
      console.log(response)
    }).catch(() => {
      message("获取数据失败，请重试", {
        type: "error"
      })
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function openDetail(row) {
    let ids = null;
    await getOrderDetail({
      order_id: row.order_id
    }).then(response => {
      ids = response.data
      addDialog({
        title: "查看订单详情",
        props: {
          formInline: {
            ids
          }
        },
        width: "75%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => detailTable
      })
    }).catch(() => {
      message("获取数据失败，请重试", {
        type: "error"
      })
    })
  }

  function openCancelDialog(row) {
    addDialog({
      title: "取消订单",
      props: {
        formInline: {
          order_id: row.order_id ?? "",
          reason: "",
          reason_type: 0
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(cancelForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            cancelOrder({
              order_id: curData.order_id,
              reason: curData.reason,
              reason_type: curData.reason_type
            }).then(() => {
              message(`成功取消订单`, {
                type: "success"
              });
              done();
              onSearch();
            }).catch(() => {
              message(`取消订单失败`, {
                type: "error"
              });
            })
          }
        })
      },
    })
  }

  function openComplainForm() {
    addDialog({
      title: "投诉订单",
      props: {
        formInline: {
          order_id: "",
          claim: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(complainForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            addComplain({
              order_id: curData.order_id,
              claim: curData.claim
            }).then(() => {
              message(`您投诉了订单ID为${curData.order_id}的订单成功`,
                {
                  type: "success"
                });
              done()
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

  async function openUserDetail(row) {
    let ids = null
    await getUserDetail({
      order_id: row.order_id
    }).then(response => {
      ids = response.data
      addDialog({
        title: "",
        props: {
          formInline: {
            ids
          }
        },
        width: "46%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => userDetailTable
      })
    }).catch(() => {
      message("获取数据失败，请重试", {
        type: "error"
      })
    })
  }

  async function openCheckinDetail(row) {
    let ids = null
    await getCheckinDetail({
      order_id: row.order_id
    }).then(response => {
      ids = response.data;
      addDialog({
        title: "订单核销信息",
        props: {
          formInline: {
            ids
          }
        },
        width: "46%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => checkinDetail
      })
    })
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
    dataList,
    pagination,
    columns,
    resetForm,
    onSearch,
    openDetail,
    openCancelDialog,
    openUserDetail,
    openCheckinDetail,
    openComplainForm
  }
}
