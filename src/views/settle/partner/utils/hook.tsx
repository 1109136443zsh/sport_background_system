import {h, onMounted, reactive, ref, toRaw} from "vue";
import {PaginationProps} from "@pureadmin/table/dist/types";
import dayjs from "dayjs";
import {message} from "@/utils/message";
import {getPartnerDetail, getPartnerList, partnerAccept, partnerReject} from "@/api/settle/partner";
import {addDialog} from "@/components/ReDialog/index";
import detailTable from "@/views/settle/partner/detail/index.vue";
import editForm from "@/views/settle/partner/form/index.vue"

export function partner() {
  const form = reactive({
    phone: ""
  });
  const formRef = ref();
  const loading = ref(true)
  const dataList = ref();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
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
      label: "申请时间",
      prop: "apply_time",
    },
    {
      label: "操作",
      slot: "operation",
      fixed: "right",
      width: 180
    }
  ]
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch()
  }

  async function onSearch() {
    loading.value = true;
    await getPartnerList({
      page: pagination.currentPage,
      phone: toRaw(form).phone
    }).then(response => {
      if (response.code === 200) {
        dataList.value = response.data
        pagination.total = response.total
      } else {
        message("出错了，请重试", {
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

  function openDialog(title) {
    addDialog({
      title: `${title}入驻`,
      props: {
        formInline: {
          title: title,
          apply_id: "",
          region_id: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef()
        const curData = options.props.formInline
        FormRef.validate(valid => {
          if (valid) {
            if (title === "同意") {
              partnerAccept({
                apply_id: curData.apply_id,
                region_id: curData.region_id
              }).then((res) => {
                console.log(res)
                message(`操作成功`,
                  {type: "success"});
                onSearch();
              }).catch((error) => {
                console.log(error)
                message(`操作失败`,
                  {type: "error"});
              })
            } else {
              partnerReject({
                apply_id: curData.apply_id
              }).then(() => {
                message(`操作成功`,
                  {type: "success"});
                onSearch();
              }).catch((error) => {
                console.log(error)
                message(`操作失败`, {type: "error"});
              })
            }
          }
        })
      },
    })
  }

  async function openDetailDialog(row) {
    let ids = null
    getPartnerDetail({
      apply_id: row.apply_id
    }).then(response => {
      console.log(response)
      if (response.code === 200) {
        ids = response.data
        addDialog({
          title: "查看合伙人入驻信息",
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
            }
          },
          width: "46%",
          draggable: true,
          fullscreenIcon: true,
          closeOnClickModal: false,
          contentRenderer: () => detailTable
        })
      } else {
        message(`出错了`, {type: "error"});
      }
    }).catch(() => {
      message(`获取教练入驻信息失败`, {type: "error"});
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
    openDialog
  }
}
