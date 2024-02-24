import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/card/typeList/form/index.vue"
import {h, onMounted, reactive, ref} from "vue";
import {addCardType, cardRemove, getCardTypeList, removeCardType} from "@/api/card";
import {message} from "@/utils/message";
import type {PaginationProps} from "@pureadmin/table";

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
      prop: "is_bind_coach",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.is_bind_coach === false ? "danger" : ""}
          effect="plain"
        >
          {row.is_bind_coach === true ? "是" : "否"}
        </el-tag>
      )
    },
    {
      label: "是否需绑定课程",
      prop: "is_bind_course",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.is_bind_course === false ? "danger" : ""}
          effect="plain"
        >
          {row.is_bind_course === true ? "是" : "否"}
        </el-tag>
      )
    },
    {
      label: "是否需绑定场馆",
      prop: "is_bind_gym",
      minWidth: 90,
      cellRenderer: ({ row, props }) => (
        <el-tag
          size={props.size}
          type={row.is_bind_gym === false ? "danger" : ""}
          effect="plain"
        >
          {row.is_bind_gym === true ? "是" : "否"}
        </el-tag>
      )
    },
    {
      label: "次数限制",
      prop: "daily_limit"
    },
    {
      label: "价格",
      prop: "price"
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
          is_bind_coach: "",
          is_bind_course: "",
          is_bind_gym: "",
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
              is_bind_coach: curData.is_bind_coach,
              is_bind_course: curData.is_bind_course,
              is_bind_gym: curData.is_bind_gym,
              daily_limit: curData.daily_limit,
              price: curData.price
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
    }).then(() => {
      message(`您删除了编号为${row.card_type_id}的数据`,
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
    await getCardTypeList(
      1
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
