<script setup lang="ts">
import {ref} from "vue";
import {coachRate} from "@/views/coach/rate/utils/hook";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Delete from "@iconify-icons/ri/delete-bin-7-line";
import EditPen from "@iconify-icons/ep/edit-pen";

const tableRef = ref()
const formRef = ref()
const {
  loading,
  pagination,
  onSearch,
  dataList,
  columns,
  handleDelete,
  openDialog,
  openCourseList
} = coachRate()
</script>

<template>
  <div>
    <PureTableBar
      title="教练星级可上课程列表"
      :columns="columns"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog('添加')"
        >
          添加星级
        </el-button>
      </template>
      <template v-slot="{size,dynamicColumns}">
        <pure-table
          ref="tableRef"
          adaptive
          align-whole="center"
          table-layout="auto"
          :data="dataList"
          :size="size"
          :columns="dynamicColumns"
          :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
        >
          <template #operation="{row}">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openCourseList(row)"
            >
              查看可上课课程
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="openDialog('更新',row)"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`是否删除星级ID为${row.id}的这条数据`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  link
                  class="reset-margin"
                  :size="size"
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
