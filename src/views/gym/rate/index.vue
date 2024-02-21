<script setup lang="ts">
import {gymRate} from "@/views/gym/rate/utils/hook";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {ref} from "vue";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-circle-line";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ri/delete-bin-7-line";

const formRef = ref()
const {
  loading,
  dataList,
  openDialog,
  columns,
  onSearch,
  handleDelete
} = gymRate()
</script>

<template>
  <div>
    <PureTableBar
      title="场馆星级"
      :columns="columns"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog('添加')"
        >
          添加课程
        </el-button>
      </template>
      <template v-slot="{size, dynamicColumns}">
        <pure-table
          ref="tableRef"
          row-key="id"
          adaptive
          align-whole="center"
          table-layout="auto"
          :loading="loading"
          :size="size"
          :data="dataList"
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
              :icon="useRenderIcon(EditPen)"
              @click="openDialog('更新',row)"
            >
              修改
            </el-button>
            <el-popconfirm
              :title="`是否删除星级ID为${row.rate_id}的这条数据`"
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
