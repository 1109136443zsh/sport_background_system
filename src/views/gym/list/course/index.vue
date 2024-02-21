<script setup lang="ts">

import {FormProps} from "@/views/gym/list/course/types";
import {h, onMounted, ref} from "vue";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {message} from "@/utils/message";
import {getRateCourseList, rateCourseAdd, rateCourseRemove} from "@/api/gym";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import Delete from "@iconify-icons/ri/delete-bin-7-line";
import AddFill from "@iconify-icons/ri/add-circle-line";
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/gym/list/course/form/index.vue"

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    gym_id: "",
    course_id: 0,
    course_name: ""
  })
})
const ruleFormRef = ref()
const formRef = ref()
const tableRef = ref()
const newFormInline = ref(props.formInline)
const dataList = ref()
const loading = ref(true)

async function onSearch() {
  loading.value = true
  await getRateCourseList({
    rate_id: newFormInline.value.rate_id,
    page: 1
  }).then(response => {
    dataList.value = response.data.page_data
  })
  setTimeout(() => {
    loading.value = false;
  }, 500);
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

async function handDelete(row) {
  await rateCourseRemove({
    gym_id: row.gym_id,
    course_id: row.course_id
  }).then(() => {
    message(`您删除了课程名称为${row.course_name}的这条数据`,
      {type: "success"});
    onSearch()
  }).catch(() => {
    message(`删除失败`,
      {type: "error"});
  })
}

function openDialog() {
  addDialog({
    props: {
      formInline: {
        gym_id: newFormInline.value.gym_id,
        course_id: ""
      }
    },
    width: "46%",
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(editForm, {ref: formRef}),
    beforeSure: (done, { options}) => {
      const FormRef = formRef.value.getRef()
      const curData = options.props.formInline;
      FormRef.validate(valid => {
        if (valid){
          rateCourseAdd({
            gym_id: curData.gym_id,
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
function getRef() {
  return ruleFormRef.value;
}

onMounted(async () => {
  onSearch();
});
defineExpose({getRef})
</script>

<template>
  <div>
    <PureTableBar
      title="课程列表"
      :columns="columns"
      @refresh="onSearch"
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
