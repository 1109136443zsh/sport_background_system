<script setup lang="ts">

import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import {ref} from "vue";
import Refresh from "@iconify-icons/ep/refresh";
import {useBill} from "@/views/bill/self/utils/hook";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import EditPen from "@iconify-icons/ep/edit-pen";
import AddFill from "@iconify-icons/ri/add-circle-line";

const tableRef = ref()
const formRef = ref()
const {
  form,
  loading,
  pagination,
  onSearch,
  dataList,
  columns,
  resetForm,
  openDialog
} = useBill()
</script>

<template>
  <div>
    <PureTableBar
      title="发票管理"
      :columns="columns"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog"
        >
          上传发票
        </el-button>
      </template>
      <template v-slot="{size, dynamicColumns}">
        <pure-table
          ref="tableRef"
          adaptive
          align-whole="center"
          table-layout="auto"
          :data="dataList"
          :pagination="pagination"
          :size="size"
          :columns="dynamicColumns"
          :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
        >

        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">

</style>
