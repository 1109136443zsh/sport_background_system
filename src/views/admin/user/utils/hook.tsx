import {h, onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {usePublicHooks} from "@/views/system/hooks";
import {ElMessageBox} from "element-plus";
import {message} from "@/utils/message";
import dayjs from "dayjs";
import {addUser, deleteUser, getUserList, updateUser, updateUserAble} from "@/api/admin/user";
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/admin/user/updateForm/index.vue"
import addForm from "@/views/admin/user/addForm/index.vue"

export function useUser() {
  const form = reactive({
    user_id: "",
    username: "",
    enable: ""
  });
  const formRef = ref()
  const dataList = ref();
  const loading = ref(true);
  const switchLoadMap = ref({});
  const {switchStyle} = usePublicHooks();
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const columns: TableColumnList = [
    {
      label: "用户id",
      prop: "user_id"
    },
    {
      label: "用户名称",
      prop: "username"
    },
    {
      label: "角色ID",
      prop: "role_id"
    },
    {
      label: "是否启用",
      prop: "enable",
      cellRenderer: scope => (
        <el-switch
          size={scope.props.size === "small" ? "small" : "default"}
          loading={switchLoadMap.value[scope.index]?.loading}
          v-model={scope.row.enable}
          active-value={true}
          inactive-value={false}
          active-text="已启用"
          inactive-text="已停用"
          inline-prompt
          style={switchStyle.value}
          onChange={() => onChange(scope as any)}
        />
      )
    },
    {
      label: "角色内部id",
      prop: "inline_id"
    },
    {
      label: "上次登录时间",
      prop: "last_login",
      formatter: ({LoginTime}) =>
        dayjs(LoginTime).format("YYYY-MM-DD HH:mm:ss")
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
    }
  ]

  async function onChange({row, index}) {
    ElMessageBox.confirm(
      `确认要<strong>${
        row.enable === false ? "停用" : "启用"
      }</strong><strong style='color:var(--el-color-primary)'>${
        row.username
      }</strong>用户吗?`,
      "系统提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        dangerouslyUseHTMLString: true,
        draggable: true
      }
    )
      .then(() => {
        switchLoadMap.value[index] = Object.assign(
          {},
          switchLoadMap.value[index],
          {
            loading: true
          }
        );
        updateUserAble({
          enable: row.enable ? 1 : 0,
          user_id: row.user_id
        }).then(res => {
          console.log(res)
          if (res) {
            setTimeout(() => {
              switchLoadMap.value[index] = Object.assign(
                {},
                switchLoadMap.value[index],
                {
                  loading: false
                }
              );
              message("已成功修改用户状态", {
                type: "success"
              });
            }, 300);
          }
        }).catch((error) => {
          console.log(error)
          message("修改用户状态失败", {
            type: "error"
          });
        })
      })
      .catch(() => {
        row.enable === false ? (row.enable = true) : (row.enable = false);
      });
  }

  function openUpdateDialog(row) {
    addDialog({
      title: "修改用户信息",
      props: {
        formInline: {
          user_id: row?.user_id ?? "",
          username: row?.username ?? "",
          password: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef()
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            updateUser({
              user_id: curData.user_id,
              username: curData.username,
              password: curData.password
            }).then((res) => {
              console.log(res)
              message(`您更新了用户名称为${curData.username}的这条数据`,
                {
                  type: "success"
                });
              done(); // 关闭弹框
              onSearch(); // 刷新表格数据
            }).catch(() => {
              message(`更新数据失败`, {
                type: "error"
              });
            })
          }
        })
      },
    })
  }

  function openAddDialog() {
    addDialog({
      title: "",
      props: {
        formInline: {
          username: "",
          password: "",
          account: "",
          openid: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(addForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline
        FormRef.validate(valid => {
          if (valid) {
            addUser({
              username: curData.username,
              password: curData.password,
              account: curData.account,
              openid: curData.opoenid
            }).then((response) => {
              console.log(response)
              message(`您新增用户名称为${curData.username}的这条数据`,
                {
                  type: "success"
                });
              done(); // 关闭弹框
              onSearch(); // 刷新表格数据
            }).catch(() => {
              message(`新增用户失败`,
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
    await deleteUser({user_id: row.user_id}).then(() => {
      message(`您删除了用户编号为${row.user_id}的这条数据`,
        {
          type: "success"
        });
      onSearch();
    }).catch(() => {
      message(`操作失败`,
        {
          type: "error"
        });
    })
  }

  async function onSearch() {
    loading.value = true;
    await getUserList(
      pagination.currentPage
    ).then(response => {
      dataList.value = response.data
    }).catch((error) => {
      console.log(error)
      message(`获取用户列表失败，请刷新`,
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
    form,
    columns,
    loading,
    dataList,
    pagination,
    onSearch,
    handleDelete,
    openUpdateDialog,
    openAddDialog
  }
}
