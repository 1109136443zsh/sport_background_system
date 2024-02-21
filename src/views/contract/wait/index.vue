<script setup lang="ts">
import {useWaitContract} from "@/views/contract/wait/utils/hook";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import Delete from "@iconify-icons/ep/delete";

const {
  form,
  loading,
  pagination,
  columns,
  dataList,
  onSearch,
  resetForm
} = useWaitContract()
</script>

<template>
  <div>
    <PureTableBar
      title="待签署合同"
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
          :loading="loading"
          :size="size"
          :columns="dynamicColumns"
          :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
        >
          <template #operation="{row}">
            <el-popconfirm
              :title="`是否确认合同编号为${row.contract_id}的这条合同`"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                >
                  同意
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
