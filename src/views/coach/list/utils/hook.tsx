import {PaginationProps} from "@pureadmin/table/dist/types";
import {h, onMounted, reactive, ref, toRaw,} from "vue";
import {getCoachList, updateCoach} from "@/api/coach/coach";
import gymEnableTable from "@/views/coach/list/gymEnable/index.vue"
import {addDialog} from "@/components/ReDialog/index";
import detailTable from "@/views/coach/list/detail/index.vue";
import editForm from "@/views/coach/list/form/index.vue"
import {getCoachDetail} from "@/api/coach/detail";
import {message} from "@/utils/message";
import {getGymEnableList} from "@/api/coach/gymEnable";


export function useCoach() {
  const form = reactive({
    name: "",
    page: "",
    rate_id: "",
    region_id: ""
  });
  const formRef = ref();
  const loading = ref(true)
  const dataList = ref([]);
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
      dataList.value = response.data.page_data
    }).catch(() => {
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
    await getCoachDetail({
      coach_id: row.coach_id
    }).then(response => {
      ids = response.data
      addDialog({
        title: "查看教练信息",
        props: {
          formInline: {
            ids
          }
        },
        width: "46%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => h(detailTable)
      });
    }).catch(() => {
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
          skill: [],
          gender_limit: row?.gender_limit ?? "",
          rate_id: "",
          info: "",
          banner: [],
          case: [],
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
            updateCoach({
              coach_id: curData.coach_id,
              name: curData.name,
              rate_id: curData.rate_id,
              skill: curData.skill,
              info: curData.info,
              banner: curData.banner,
              case: curData.case,
              gender_limit: curData.gender_limit
            }).then(() => {
              message(`成功更新教练信息`, {
                type: "success"
              });
              done();
              onSearch();
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
      page: pagination.currentPage
    }).then(response => {
      ids = response.data.page_data
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
    }).catch(() => {
      message("获取数据失败，请重试", {
        type: "error"
      })
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
