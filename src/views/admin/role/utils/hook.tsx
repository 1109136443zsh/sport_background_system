import {h, onMounted, reactive, ref} from "vue";
import {usePublicHooks} from "@/views/system/hooks";
import {ElMessageBox} from "element-plus";
import {message} from "@/utils/message";
import {grantPermission, revokePermission} from "@/api/admin/power"
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/admin/role/form/index.vue"
import {getPowerList} from "@/api/admin/power";
import {addRole, deleteRole, getRoleList, grantRole} from "@/api/admin/role";
import type {PaginationProps} from "@pureadmin/table";

export function useRole() {

  const formRef = ref();
  const dataList = ref([]);
  const loading = ref(true);
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "角色id",
      prop: "role_id"
    },
    {
      label: "角色名",
      prop: "role_name"
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
    }
  ]

  async function handleDelete(row) {
    await deleteRole({
      role_id: row.role_id
    }).then(() => {
      message(`您删除了编号为${row.role_id}的这条数据`, {type: "success"});
      onSearch();
    }).catch(() => {
      message(`删除失败`,
        {type: "error"});
    })
  }

  async function onSearch() {
    loading.value = true;
    await getRoleList().then(response => {
      dataList.value = response.data
      pagination.total = response.pages
    }).catch(() => {
      message(`获取列表失败`,
        {type: "error"});
    })

    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog(title) {
    addDialog({
      title: `${title}角色`,
      props: {
        formInline: {
          title,
          role_name: "",
          role_id: "",
          inline_id: "",
          user_id: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: (done, {options, index}) => {
        const curData = options.props.formInline
        const FormRef = formRef.value.getRef();
        FormRef.validate(valid => {
          if (valid){
            if (title === "新增") {
              addRole({
                role_name: curData.role_name
              }).then(() => {
                message(`新增角色成功`, {
                  type: "success"
                });
                done(); // 关闭弹框
                onSearch(); // 刷新表格数据
              }).catch(() => {
                message(`操作失败`, {
                  type: "error"
                });
              })
            } else {
              grantRole({
                user_id: curData.user_id,
                role_id: curData.role_id,
                inline_id: curData.inline_id
              }).then(() => {
                message(`授予用户角色成功`, {
                  type: "success"
                });
                done(); // 关闭弹框
                onSearch(); // 刷新表格数据
              }).catch(() => {
                message(`操作失败`, {
                  type: "error"
                });
              })
            }
          }
        })

      },
    })
  }

  onMounted(async () => {
    onSearch();
  });
  return {
    columns,
    loading,
    dataList,
    onSearch,
    handleDelete,
    openDialog,
    pagination
  }
}
