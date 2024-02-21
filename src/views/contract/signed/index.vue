<script setup lang="ts">

import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import Delete from "@iconify-icons/ep/delete";
import {useSignedContract} from "@/views/contract/signed/utils/hook";

const {
  loading,
  pagination,
  columns,
  dataList,
  onSearch,
} = useSignedContract()
</script>

<template>
  <div>
    <PureTableBar
      title="已签署合同"
      :columns="columns"
      @refresh="onSearch"
    >
      <template v-slot="{size,dynamicColumns}">
        <pure-table
          row_key="id"
          adaptive
          align-whole="center"
          table-layout="auto"
          :data="dataList"
          :pagination="pagination"
          :loading="loading"
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
