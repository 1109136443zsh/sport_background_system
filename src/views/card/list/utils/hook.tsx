import {message} from "@/utils/message";
import {cardAdd, cardRemove, getCardList} from "@/api/card";
import {h, onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import dayjs from "dayjs";
import {addDialog} from "@/components/ReDialog/index";
import addForm from "@/views/card/list/form/index.vue"

export function card() {
  const formRef = ref()
  const dataList = ref()
  const loading = ref(true)
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "用户ID",
      prop: "user_id"
    },
    {
      label: "卡类型ID",
      prop: "card_type_id"
    },
    {
      label: "权益剩余次数",
      prop: "remain"
    },
    {
      label: "绑定的教练ID",
      prop: "coach_id"
    },
    {
      label: "绑定的场馆ID",
      prop: "gym_id"
    },
    {
      label: "绑定的课程ID",
      prop: "course_id"
    },
    {
      label: "激活时间",
      prop: "activate_time",
      formatter: ({ createTime }) =>
        dayjs(createTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "过期时间",
      prop: "expire_time"
    },
    {
      label: "用户财务订单关联订单ID",
      prop: "wallet_order_id"
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation"
    }
  ]
  function openDialog() {
    addDialog({
      title: "新增会员卡",
      props: {
        formInline: {
          card_type_id: "",
          user_id: "",
          gym_id: "",
          coach_id: "",
          course_id: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(addForm, {ref: formRef}),
      beforeSure: (done, { options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            cardAdd({
              card_type_id: curData.card_type_id,
              user_id: curData.user_id,
              gym_id: curData.gym_id,
              coach_id: curData.coach_id,
              course_id: curData.course_id
            }).then(response => {
              console.log(response)
              message(`添加会员卡成功`,
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
    await cardRemove({
      card_id: row.card_id
    }).then(() => {
      message(`您删除了编号为${row.card_id}的数据`,
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
  async function onSearch() {
    loading.value = true;
    await getCardList(
      1
    ).then(response => {
      dataList.value = response.data
      pagination.total = response.pages
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
    openDialog
  }
}
