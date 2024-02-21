<script setup lang="ts">

import {ref} from "vue";
import {useUser} from "@/views/admin/user/utils/hook";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Delete from "@iconify-icons/ep/delete";
import EditPen from "@iconify-icons/ep/edit-pen";

const formRef = ref();
const tableRef = ref();
const {
  form,
  columns,
  loading,
  dataList,
  pagination,
  onSearch,
  handleDelete,
  openUpdateDialog,
  openAddDialog
}=useUser()
</script>

<template>
  <div>
    <PureTableBar
      title="用户管理"
      :columns="columns"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openAddDialog"
        >
          新增用户
        </el-button>
      </template>
      <template v-slot="{size,dynamicColumns}">
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
          :pagination="pagination"
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
              @click="openUpdateDialog(row)"
            >
              更新
            </el-button>
            <el-popconfirm
              :title="`是否确认删除用户编号为${row.user_id}的这条数据`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
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
