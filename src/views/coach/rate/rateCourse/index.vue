<script setup lang="ts">
import {FormProps} from "@/views/coach/rate/rateCourse/types";
import {computed, h, onMounted, ref} from "vue";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Delete from "@iconify-icons/ri/delete-bin-7-line";
import {getRateCourseList, rateCourseAdd, rateCourseRemove} from "@/api/coach/rate";
import {message} from "@/utils/message";
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/coach/rate/rateCourse/form/index.vue";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    rate_id: 0,
    course_id: 0,
    course_name: "",
  })
});
const tableRef = ref()
const formRef = ref()
const loading = ref(true)
const newFormInline = ref(props.formInline);
onMounted(async () => {
  onSearch();
});

const dataList = ref()
dataList.value = newFormInline.value.ids

async function handDelete(row) {
  await rateCourseRemove({
    rate_id: newFormInline.value.rate_id,
    course_id: row.course_id
  }).then((res) => {
    console.log(res)
    message(`您删除了课程名称为${row.course_name}的这条数据`,
      {type: "success"});
    onSearch()
  }).catch(() => {
    message(`删除失败`,
      {type: "error"});
  })
}

async function onSearch() {
  loading.value = true
  await getRateCourseList({
    rate_id: newFormInline.value.rate_id,
    page: 1
  }).then(response => {
    dataList.value = response.data
    console.log(response)
  })
  setTimeout(() => {
    loading.value = false;
  }, 500);
}

function openDialog() {
  addDialog({
    props: {
      formInline: {
        rate_id: newFormInline.value.rate_id,
        course_id: ""
      }
    },
    width: "46%",
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(editForm, {ref: formRef}),
    beforeSure: async (done, {options, index}) => {
      const FormRef = formRef.value.getRef()
      const curData = options.props.formInline;
      FormRef.validate(valid => {
        if (valid) {
          rateCourseAdd({
            rate_id: curData.rate_id,
            course_id: curData.course_id
          }).then(() => {
            message(`成功添加`, {
              type: "success"
            });
            done();
            onSearch()
          }).catch(() => {
            message(`添加可上课程失败`, {
              type: "error"
            });
            done();
          })
        }
      })
    },
  })
}

const columns: TableColumnList = [
  {
    label: "课程ID",
    prop: "course_id"
  },
  {
    label: "课程名称",
    prop: "course_name"
  },
  {
    label: "操作",
    slot: "operation",
    fixed: "right"
  }
]

</script>

<template>
  <div>
    <PureTableBar
      title="课程列表"
      @refresh="onSearch"
      :columns="columns"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog"
        >
          添加课程
        </el-button>
      </template>
      <template v-slot="{size, dynamicColumns}">
        <pure-table
          ref="tableRef"
          adaptive
          :data="dataList"
          :size="size"
          :loading="loading"
          :columns="dynamicColumns"
          align-whole="center"
          table-layout="auto"
          :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
        >
          <template #operation="{ row }">
            <el-popconfirm
              :title="`是否删除课程id为${row.course_id}的这条数据`"
              @confirm="handDelete(row)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  link
                  class="reset-margin"
                  :icon="useRenderIcon(Delete)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </pure-table>
      </template>

    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">

</style>
