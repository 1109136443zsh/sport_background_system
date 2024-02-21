<script setup lang="ts">

import {PureTableBar} from "@/components/RePureTableBar";
import {useWallet} from "@/views/wallet/selfOrder/utils/hook";

const {
  loading,
  columns,
  dataList,
  pagination,
  onSearch,
} = useWallet()
</script>

<template>
  <div>
    <PureTableBar
      title="自己所有提现订单列表"
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
          :pagination="pagination"
          :paginationSmall="size === 'small' ? true : false"
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
