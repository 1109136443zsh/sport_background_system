import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/card/typeList/form/index.vue"
import {h, onMounted, reactive, ref} from "vue";
import {addCardType, cardRemove, getCardTypeList, removeCardType} from "@/api/card";
import {message} from "@/utils/message";
import type {PaginationProps} from "@pureadmin/table";
import courseListTable from "@/views/card/typeList/courseList/index.vue"

export function cardList() {
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
      label: "卡类型ID",
      prop: "card_type_id"
    },
    {
      label: "卡名称",
      prop: "name"
    },
    {
      label: "remain",
      prop: "权益次数"
    },
    {
      label: "period",
      prop: "有效期"
    },
    {
      label: "是否需绑定教练",
      prop: "bind_coach",
      minWidth: 90,
      cellRenderer: ({row, props}) => (
        <el-tag
          size={props.size}
          type={row.bind_coach === false ? "danger" : ""}
          effect="plain"
        >
          {row.bind_coach === true ? "是" : "否"}
        </el-tag>
      )
    },
    {
      label: "是否需绑定课程",
      prop: "bind_course",
      minWidth: 90,
      cellRenderer: ({row, props}) => (
        <el-tag
          size={props.size}
          type={row.bind_course === false ? "danger" : ""}
          effect="plain"
        >
          {row.bind_course === true ? "是" : "否"}
        </el-tag>
      )
    },
    {
      label: "是否需绑定场馆",
      prop: "bind_gym",
      minWidth: 90,
      cellRenderer: ({row, props}) => (
        <el-tag
          size={props.size}
          type={row.bind_gym === false ? "danger" : ""}
          effect="plain"
        >
          {row.bind_gym === true ? "是" : "否"}
        </el-tag>
      )
    },
    {
      label: "次数限制",
      prop: "daily_limit"
    },
    {
      label: "价格",
      prop: "price",
      cellRenderer: ({row}) => {
        const amountInYuan = (row.price / 100).toFixed(2); // 将分转换为元，并保留两位小数
        return <span>{amountInYuan} 元</span>; // 在模板中显示转换后的金额
      }
    },
    {
      label: "操作",
      slot: "operation",
      fixed: "right",
      width: 180
    }
  ]

  function openDialog() {
    addDialog({
      title: "新增会员卡类型",
      props: {
        formInline: {
          name: "",
          remain: "",
          period: "",
          bind_coach: "",
          bind_course: "",
          bind_gym: "",
          daily_limit: "",
          price: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            addCardType({
              name: curData.name,
              remain: curData.remain,
              period: curData.period,
              is_bind_coach: curData.bind_coach,
              is_bind_course: curData.bind_course,
              is_bind_gym: curData.bind_gym,
              daily_limit: curData.daily_limit,
              price: curData.price * 100
            }).then(res => {
              console.log(res)
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
    await removeCardType({
      card_type_id: row.card_type_id
    }).then(response => {
      if (response.code === 200) {
        message(`您删除了编号为${row.card_type_id}的数据`,
          {
            type: "success"
          });
        onSearch();
      } else {
        message(`出错了，请重试`,
          {
            type: "error"
          });
      }
    }).catch(() => {
      message(`操作失败，请重试`,
        {
          type: "error"
        });
    })
  }

  async function onSearch() {
    loading.value = true;
    await getCardTypeList(
      pagination.currentPage
    ).then(response => {
      if (response.code === 200) {
        dataList.value = response.data
        pagination.total = response.total
      }
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
  function openCourseDialog(row) {
    addDialog({
      title: "",
      props: {
        formInline: {
          card_type_id: row.card_type_id
        }
      },
      width: "75%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => courseListTable
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
    openDialog,
    openCourseDialog
  }
}
