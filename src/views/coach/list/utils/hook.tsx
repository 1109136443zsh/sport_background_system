import {PaginationProps} from "@pureadmin/table/dist/types";
import {h, onMounted, reactive, ref, toRaw,} from "vue";
import {getCoachDetail, getCoachList, getGymEnableList, updateCoach} from "@/api/coach/coach";
import gymEnableTable from "@/views/coach/list/gymEnable/index.vue"
import {addDialog} from "@/components/ReDialog/index";
import detailTable from "@/views/coach/list/detail/index.vue";
import editForm from "@/views/coach/list/form/index.vue"
import {message} from "@/utils/message";


export function useCoach() {
  const form = reactive({
    name: "",
    page: "",
    rate_id: 0,
    region_id: 0
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
      label: "姓名",
      prop: "name",
    },
    {
      label: "教练id",
      prop: "coach_id",
    },
    {
      label: "封面图",
      prop: "cover_image",
      cellRenderer: ({row}) => (
        <el-image
          fit="cover"
          preview-teleported={true}
          src={row.avatar}
          preview-src-list={Array.of(row.avatar)}
          class="w-[24px] h-[24px] rounded-full align-middle"
        />
      ),
      width: 90
    },
    {
      label: "擅长技能",
      prop: "skill",
    },
    {
      label: "评分",
      prop: "score"
    },
    {
      label: "课时费",
      prop: "price"
    },
    {
      label: "所属区域",
      prop: "region_id",
    },
    {
      label: "星级",
      prop: "rate"
    },
    {
      label: "限定接单用户性别",
      prop: "gender_limit",
    },
    {
      label: "操作",
      fixed: "right",
      slot: "operation",
      width: 180
    },
  ];
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };

  async function onSearch() {
    loading.value = true;
    await getCoachList({
      page: pagination.currentPage,
      rate_id: toRaw(form).rate_id,
      name: toRaw(form).name,
      region_id: toRaw(form).region_id
    }).then(response => {
      dataList.value = response.data
      pagination.total = response.pages
    }).catch((error) => {
      console.log(error)
      message("获取数据失败，请重试", {
        type: "error"
      })
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }

  async function openDetail(row) {
    let ids = null
    await getCoachDetail(
      {
        coach_id: row.coach_id
      }
    ).then(response => {
      if (response.code === 200) {
        ids = response.data
        addDialog({
          title: "查看教练信息",
          props: {
            formInline: {
              banner: ids.banner,
              case: ids.case,
              coach_id: ids.coach_id,
              course: ids.course,
              cover_image: ids.cover_image,
              gender_limit: ids.gender_limit,
              info: ids.info,
              name: ids.name,
              price: ids.price,
              rate: ids.rate,
              region_id: ids.region_id,
              score: ids.score,
              segment: ids.segment,
              skill: ids.skill,
            }
          },
          width: "46%",
          draggable: true,
          fullscreenIcon: true,
          closeOnClickModal: false,
          contentRenderer: () => h(detailTable, {ref: formRef})
        });
      } else {
        console.log(response)
        message("出错了，请重试", {
          type: "error"
        })
      }
    }).catch((error) => {
      console.log(error)
      message("获取数据失败，请重试", {
        type: "error"
      })
    })
  }

  async function openDialog(row) {
    addDialog({
      title: "修改教练信息",
      props: {
        formInline: {
          name: row?.name ?? "",
          coach_id: row?.coach_id ?? "",
          skill: "",
          gender_limit: row?.gender_limit ?? "",
          rate_id: row?.rate_id ?? "",
          info: row?.info ?? "",
          banner: "",
          coachCase: "",
          url: ""
        }
      },
      width: "46%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => h(editForm, {ref: formRef}),
      beforeSure: (done, {options, index}) => {
        const FormRef = formRef.value.getRef();
        const curData = options.props.formInline;
        FormRef.validate(valid => {
          if (valid) {
            console.log(curData.url)
            updateCoach({
              coach_id: curData.coach_id,
              name: curData.name,
              rate_id: curData.rate_id,
              skill: curData.skill,
              info: curData.info,
              banner: curData.url,
              coachCase: curData.coachCase,
              gender_limit: curData.gender_limit
            }).then((res) => {
              console.log(res)
              if (res.code === 200) {
                message(`成功更新教练信息`, {
                  type: "success"
                });
                done();
                onSearch();
              } else {
                message(`更新教练信息失败`, {
                  type: "error"
                });
              }
            }).catch(() => {
              message(`更新教练信息失败`, {
                type: "error"
              });
            })
          }
        })
      },
    });
  }

  async function openGymEnableTable(row) {
    let ids = null
    await getGymEnableList({
      coach_id: row.coach_id,
      page: 1
    }).then(response => {
      if (response.code === 200) {
        ids = response.data
        addDialog({
          title: "教练可去场馆",
          props: {
            formInline: {
              coach_id: row.coach_id,
              ids
            }
          },
          width: "46%",
          draggable: true,
          fullscreenIcon: true,
          closeOnClickModal: false,
          contentRenderer: () => gymEnableTable
        })
      } else {
        message("出错了，请重试", {
          type: "error"
        })
      }
    }).catch(() => {
      message("获取数据失败，请重试", {
        type: "error"
      })
    })

  }
  function openEditForm() {
    addDialog({
      title: "教练设置可上课时间",
      props: {
        formInline: {

        }
      }
    })
  }
  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    loading,
    dataList,
    pagination,
    columns,
    resetForm,
    onSearch,
    openDialog,
    openDetail,
    openGymEnableTable
  }
}
