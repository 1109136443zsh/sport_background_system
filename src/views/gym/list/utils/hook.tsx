import {h, onMounted, reactive, ref, toRaw} from "vue";
import type {PaginationProps} from "@pureadmin/table";
import {getGymDetail, getGymList, getRateCourseList, updateGym} from "@/api/gym";
import detailTable from "@/views/gym/list/detail/index.vue"
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/gym/list/form/index.vue";
import {message} from "@/utils/message";
import courseTable from "@/views/gym/list/course/index.vue"

export function gymList() {
  const formRef = ref()
  const form = reactive({
    rate_id: 0,
    name: "",
    region_id: 0
  })
  const pagination = reactive<PaginationProps>({
    total: 0,
    pageSize: 10,
    currentPage: 1,
    background: true
  });
  const dataList = ref()
  const loading = ref(true)
  const columns: TableColumnList = [
    {
      label: "场馆id",
      prop: "gym_id"
    },
    {
      label: "场馆名",
      prop: "name"
    },
    {
      label: "封面图",
      prop: "cover_image",
      cellRenderer: ({row}) => (
        <el-image
          fit="cover"
          preview-teleported={true}
          src={row.cover_image}
          preview-src-list={Array.of(row.cover_image)}
          class="w-[40px] h-[40px] rounded-full align-middle"
        />
      )
    },
    {
      label: "地址名",
      prop: "location"
    },
    {
      label: "经度",
      prop: "longitude"
    },
    {
      label: "纬度",
      prop: "latitude"
    },
    {
      label: "场馆等级",
      prop: "rate"
    },
    {
      label: "场馆等级id",
      prop: "rate_id"
    },
    {
      label: "场馆所属区域id",
      prop: "region_id"
    },
    {
      label: "评分",
      prop: "score"
    },
    {
      label: "标签",
      prop: "tags"
    },
    {
      label: "操作",
      slot: "operation",
      fixed: "right",
      width: 180
    }
  ]

  async function onSearch() {
    loading.value = true;
    await getGymList({
      page: pagination.currentPage,
      name: toRaw(form).name,
      rate_id: toRaw(form).rate_id,
      region_id: toRaw(form).region_id
    }).then(response => {
      dataList.value = response.data
      pagination.total = response.pages
    }).catch(() => {
      message("获取数据失败，请重试", {
        type: "error"
      })
    })
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
  const resetForm = formEl => {
    if (!formEl) return;
    formEl.resetFields();
    onSearch();
  };
  async function openDetail(row) {
    let ids = null
    await getGymDetail({
      gym_id: row.gym_id
    }).then(response => {
      ids = response.data
    })
    console.log(ids)
    addDialog({
      title: "查看场馆信息",
      props: {
        formInline: {
          ids,
          gym_id: ids.gym_id,
          name: ids.name,
          cover_image: ids.cover_image,
          location: ids.location,
          longitude: ids.longitude,
          latitude: ids.latitude,
          rate: ids.rate,
          rate_id: ids.rate_id,
          region_id: ids.region_id,
          score: ids.score,
          tags: ids.tags,
          info: ids.info,
          begin_time: ids.begin_time,
          end_time: ids.end_time,
          banner: ids.banner
        }
      },
      width: "75%",
      draggable: true,
      fullscreenIcon: true,
      closeOnClickModal: false,
      contentRenderer: () => detailTable
    })
  }

  function openDialog(row) {
    addDialog({
      title: "",
      props: {
        formInline: {
          gym_id: row.gym_id ?? "",
          name: row?.name ?? "",
          rate_id: row?.rate_id ?? "",
          info: row?.info ?? "",
          banner: [],
          begin_time: row?.begin_time ?? "",
          end_time: row?.end_time ?? "",
          location: row?.location ?? "",
          longitude: row?.longitude ?? "",
          latitude: row?.latitude ?? ""
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
            updateGym(
              {
                gym_id: curData.gym_id,
                name: curData.name,
                rate_id: curData.rate_id,
                info: curData.info,
                banner: curData.banner,
                begin_time: curData.begin_time,
                end_time: curData.end_time,
                location: curData.location,
                longitude: curData.longitude,
                latitude: curData.latitude
              }
            ).then(() => {
              message(`成功更新场馆信息`, {
                type: "success"
              });
              done();
              onSearch();
            }).catch(() => {
              message(`更新场馆信息失败`, {
                type: "error"
              });
            })
          }
        })
      },
    })
  }

  async function openCourseList(row) {
    let ids = null
    await getRateCourseList({
      gym_id: row.gym_id,
      page: pagination.currentPage
    }).then(res => {
      ids = res.data
      addDialog({
        title: "查看该星级的可上课课程",
        props: {
          formInline: {
            ids,
            gym_id: row.gym_id
          }
        },
        width: "46%",
        draggable: true,
        fullscreenIcon: true,
        closeOnClickModal: false,
        contentRenderer: () => courseTable
      })
    })
  }

  onMounted(async () => {
    onSearch();
  });

  return {
    form,
    pagination,
    dataList,
    loading,
    columns,
    onSearch,
    openDetail,
    openDialog,
    openCourseList,
    resetForm
  }
}
