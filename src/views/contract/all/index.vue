<script setup lang="ts">
import {useContract} from "@/views/contract/all/utils/hook";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import AddFill from "@iconify-icons/ri/add-circle-line";


const {
  loading,
  pagination,
  columns,
  dataList,
  onSearch,
  openDialog
} = useContract()
</script>

<template>
  <div>
    <PureTableBar
      title="合同管理"
      :columns="columns"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog"
        >
          合同补录
        </el-button>
      </template>
      <template v-slot="{size,dynamicColumns}">
        <pure-table
          row_key="id"
          adaptive
          align-whole="center"
          table-layout="auto"
          :data="dataList"
          :loading="loading"
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
