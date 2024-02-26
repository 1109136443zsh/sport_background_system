<script setup lang="ts">

import {useWallet} from "@/views/wallet/selfPayment/utils/hook";
import {ref} from "vue";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import {PureTableBar} from "@/components/RePureTableBar";
import AddFill from "@iconify-icons/ri/add-circle-line";
import ReCol from "@/components/ReCol";

const {
  loading,
  columns,
  dataList,
  pagination,
  onSearch,
  getBalance,
  balance,
  withdrawal
}=useWallet()
</script>

<template>
  <div>
    <PureTableBar
      title="个人 提现订单列表"
      :columns="columns"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-text class="m-1">余额：{{balance}}元</el-text>
        <el-button
          type="primary"
          style="margin-left: 18px"
          @click="getBalance"
        >
          查询余额
        </el-button>
        <el-button
          type="primary"
          @click="withdrawal(balance)"
        >
          提现
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
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

        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">

</style>
