import {h, onMounted, reactive, ref} from "vue";
import {PaginationProps} from "@pureadmin/table/dist/types";
import {getRateList, rateAdd, rateUpdate} from "@/api/gym";
import type {FormItemProps} from "@/views/gym/rate/form/types"
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/gym/rate/form/index.vue"
import {rateRemove} from "@/api/gym";
import {message} from "@/utils/message";

export function gymRate() {
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
      label: "星级ID",
      prop: "id",
    },
    {
      label: "星级名称",
      prop: "name",
    },
    {
      label: "场馆额外付费",
      prop: "charge",
      cellRenderer: ({row}) => {
        const amountInYuan = (row.charge / 100).toFixed(2); // 将分转换为元，并保留两位小数
        return <span>{amountInYuan} 元</span>; // 在模板中显示转换后的金额
      },
    },
    {
      label: "场馆额外分成费用",
      prop: "bonus",
      cellRenderer: ({row}) => {
        const amountInYuan = (row.bonus / 100).toFixed(2); // 将分转换为元，并保留两位小数
        return <span>{amountInYuan} 元</span>; // 在模板中显示转换后的金额
      },
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
    },
  ];

  async function onSearch() {
    loading.value = true;
    await getRateList().then(res => {
      if (res.code === 200) {
        dataList.value = res.data
      }
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog(title = "更新", row?: FormItemProps) {
    addDialog({
      title: `${title}星级`,
      props: {
        formInline: {
          title,
          name: row?.name ?? "",
          charge: (row?.charge / 100).toFixed(2) ?? "",
          bonus: (row?.bonus / 100).toFixed(2) ?? "",
          rate_id: row?.id ?? ""
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
            if (title === "更新") {
              rateUpdate({
                rate_id: curData.rate_id,
                name: curData.name,
                bonus: curData.bonus * 100,
                charge: curData.charge * 100
              }).then(() => {
                message(`成功更新场馆星级`, {
                  type: "success"
                });
                done();
                onSearch();
              }).catch(() => {
                message(`更新场馆星级失败`, {
                  type: "error"
                });
              })
            } else {
              rateAdd({
                name: curData.name,
                bonus: curData.bonus,
                charge: curData.charge
              }).then(() => {
                message(`成功添加教练星级`, {
                  type: "success"
                });
                done();
                onSearch();
              }).catch(() => {
                message(`新增教练星级失败`, {
                  type: "error"
                });
              })
            }
          }
        })
      },
    })
  }

  async function handleDelete(row) {
    await rateRemove({
      rate_id: row.id,
    }).then(() => {
      message(`您删除了星级编号为${row.rate_id}的这条数据`,
        {type: "success"});
    }).catch(() => {
      message(`删除失败`, {type: "error"});
    })
    onSearch();
  }

  onMounted(async () => {
    onSearch();
  });

  return {
    loading,
    dataList,
    pagination,
    columns,
    onSearch,
    handleDelete,
    openDialog
  }
}
