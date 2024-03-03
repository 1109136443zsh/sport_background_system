import {h, onMounted, reactive, ref} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import editForm from "../form/index.vue";
import {FormItemProps} from "@/views/student/utils/types";
import {addDialog} from "@/components/ReDialog/index";
import detailForm from "@/views/student/detail/index.vue"
import {getStudentDetail, getStudentList, updateStudentList} from "@/api/student";
import {message} from "@/utils/message";
import {urlApi} from "@/api/utils";

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
          src={urlApi + row.avatar}
          preview-src-list={Array.of(urlApi + row.avatar)}
          class="w-[30px] h-[30px] rounded-full align-middle"
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
    formEl.resetFields();
    onSearch()
  }

  async function onSearch() {
    loading.value = true;
    await getStudentList(
      pagination.currentPage
    ).then(response => {
      pagination.total = response.total
      dataList.value = response.data
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
    getStudentDetail(
      row.user_id
    ).then(response => {
      ids = response.data
      addDialog({
        title: "查看用户信息",
        props: {
          formInline: {
            user_id: ids.user_id ?? "",
            nickname: ids.nickname ?? "",
            avatar: ids.avatar ?? "",
            openid: ids.openid ?? "",
            phone: ids.phone ?? "",
            unionid: ids.unionid ?? "",
            age: ids.age,
            bmi: ids.bmi,
            fat: ids.bmi,
            gender: ids.gender,
            height: ids.height,
            metabolism: ids.metabolism,
            muscle: ids.muscle,
            weight: ids.weight,
            ids
          }
        },
        width: "46%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => h(detailForm)
      })
    }).catch((error) => {
      console.log(error)
      message(`获取用户详情失败`, {
        type: "error"
      });
    })
  }

  function openModify(row?: FormItemProps) {
    let data = null
    getStudentDetail(row.user_id).then(response => {
      if (response.code === 200) {
        data = response.data
        addDialog({
          title: "修改用户信息",
          props: {
            formInline: {
              user_id: data.user_id ?? "",
              nickname: data.nickname ?? "",
              gender: data.gender ?? "",
              height: data.height ?? "",
              weight: data.weight ?? "",
              age: data.age ?? "",
              avatar: data.avatar ?? "",
              muscle: data.muscle ?? "",
              metabolism: data.metabolism ?? "",
              fat: data.fat ?? "",
              bmi: data.bmi ?? "",
              url: ""
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
                  nickname: curData.nickname,
                  gender: curData.gender,
                  height: curData.height,
                  weight: curData.weight,
                  muscle: curData.muscle,
                  fat: curData.fat,
                  age: curData.age,
                  metabolism: curData.metabolism,
                  avatar: curData.url,
                  bmi: curData.bmi
                }).then((response) => {
                  console.log(response)
                  message(`更新用户资料成功`, {
                    type: "success"
                  });
                  done();
                  onSearch();
                }).catch((error) => {
                  console.log(error)
                  message(`更新用户资料失败`, {
                    type: "error"
                  });
                })
              }
            })
          },
        });
      }
    })
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
