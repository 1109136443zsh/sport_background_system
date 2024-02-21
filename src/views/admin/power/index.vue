<script setup lang="ts">
import {ref} from "vue";
import {usePower} from "@/views/admin/power/utils/hook";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ep/delete";

const formRef = ref();
const tableRef = ref();
const {
  columns,
  loading,
  dataList,
  onSearch,
  handleDelete,
  openDialog
}=usePower()
</script>

<template>
  <div>
    <PureTableBar
      title="权限管理"
      :columns="columns"
      @refresh="onSearch"
    >
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
              @click="openDialog('授予',row)"
            >
              授予
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(Delete)"
              @click="openDialog('撤销',row)"
            >
              撤销
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">

</style>
