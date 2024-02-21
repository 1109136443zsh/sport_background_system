import {h, onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import editForm from "../form/index.vue";
import {FormItemProps} from "@/views/student/utils/types";
import {addDialog} from "@/components/ReDialog/index";
import detailForm from "@/views/student/detail/index.vue"
import {getStudentDetail, getStudentList, updateStudentList} from "@/api/student";
import {UserDetailProps} from "@/views/student/detail/types";
import {message} from "@/utils/message";

export function stuUser() {
  const form = reactive({
    user_id: "",
    nickname: "",
    phone: ""
  });
  const dataList = ref();
  const loading = ref(true);
  const formRef = ref();
  const selectNum = ref(0);

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
      label: "openid",
      prop: "openid"
    },
    {
      label: "手机号",
      prop: "phone"
    },
    {
      label: "unionid",
      prop: "unionid"
    },
    {
      label: "昵称",
      prop: "nickname"
    },
    {
      label: "头像",
      prop: "avatar",
      cellRenderer: ({row}) => (
        <el-image
          fit="cover"
          preview-teleported={true}
          src={row.avatar}
          preview-src-list={Array.of(row.avatar)}
          class="w-[24px] h-[24px] rounded-full align-middle"
        />
      ),
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
    }
  ];
  const resetForm = formEl => {
    if (!formEl) return;
    console.log(formEl)
    formEl.resetFields();
    onSearch()
  }

  async function onSearch() {
    loading.value = true;
    await getStudentList({
      page: pagination.currentPage
    }).then(response => {
      dataList.value = response.data.page_data
    }).catch(() => {
      message(`获取用户列表失败，请重试`, {
        type: "error"
      });
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function openDetail(row) {
    let ids = null
    getStudentDetail({
      user_id: row.user_id
    }).then(response => {
      ids = response.data
      addDialog({
        title: "查看用户信息",
        props: {
          formInline: {
            user_id: row?.user_id ?? "",
            nickname: row.nickname ?? "",
            avatar: row.avatar ?? "",
            openid: row.openid ?? "",
            phone: row.phone ?? "",
            unionid: row.unionid ?? "",
            ids
          }
        },
        width: "46%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => h(detailForm)
      })
    }).catch(() => {
      message(`获取用户详情失败`, {
        type: "error"
      });
    })
  }

  function openModify(row?: FormItemProps) {
    addDialog({
      title: "修改用户信息",
      props: {
        formInline: {
          user_id: row?.user_id ?? "",
          nickname: row.nickname ?? "",
          gender: row.gender ?? "",
          height: row.height ?? "",
          weight: row.weight ?? "",
          exercise_purpose: row.exercise_purpose ?? [],
          history_sport: row.history_sport ?? "",
          history_injury: row.history_injury ?? "",
          age: row.age ?? "",
          avatar: row.avatar ?? ""
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
            updateStudentList({
              user_id: curData.user_id,
              nickname: curData.name,
              gender: curData.gender,
              height: curData.height,
              weight: curData.weight,
              exercise_purpose: curData.exercise_purpose,
              history_sport: curData.history_sport,
              history_injury: curData.history_injury,
              age: curData.age,
              avatar: curData.avatar
            }).then(() => {
              message(`更新用户资料成功`, {
                type: "success"
              });
              done();
              onSearch();
            }).catch(() => {
              message(`更新用户资料失败`, {
                type: "error"
              });
            })
          }
        })
      },
    });
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
    openModify,
    selectNum,
    resetForm,
    onSearch,
    openDetail
  }
}
