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
  handleDelete,
  openDetailDialog
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
          <template #operation="{row}">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openDetailDialog(row)"
            >
              查看
            </el-button>
            <el-popconfirm
              :title="`是否确认删除编号为${row.contract_id}的这条数据`"
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
