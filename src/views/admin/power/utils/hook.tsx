import {h, onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {message} from "@/utils/message";
import {grantPermission, revokePermission} from "@/api/admin/power"
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/admin/power/form/index.vue"
import {getPowerList} from "@/api/admin/power";

export function usePower() {

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
      label: "权限id",
      prop: "permission_id"
    },
    {
      label: "权限名",
      prop: "name"
    },
    {
      label: "分组名称",
      prop: "group_name"
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
    await getPowerList().then(response => {
      dataList.value = response.data
      pagination.total = response.pages
    }).catch(() => {
      message(`获取列表失败`,
        {
          type: "error"
        });
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  function openDialog(title, row) {
    addDialog({
      title: `${title}权限`,
      props: {
        formInline: {
          title,
          role_id: "",
          permission_id: row.permission_id ?? "",
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: (done, {options}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline

        FormRef.validate(valid => {
          if (valid) {
            if (title == "授予") {
              grantPermission({
                role_id: curData.role_id,
                permission_id: curData.permission_id
              }).then((response) => {
                console.log(response)
                message(`授予用户权限场馆`,
                  {
                    type: "success"
                  });
              }).catch((error) => {
                console.log(error)
                message(`操作失败`,
                  {
                    type: "error"
                  });
              })
            } else {
              revokePermission({
                role_id: curData.role_id,
                permission_id: curData.permission_id
              }).then(() => {
                message(`撤销用户权限成功`,
                  {
                    type: "success"
                  });
              }).catch(() => {
                message(`操作失败`,
                  {
                    type: "error"
                  });
              })
            }
          }
        })
      }
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
    openDialog,
    pagination
  }
}
