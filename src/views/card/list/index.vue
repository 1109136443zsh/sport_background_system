<script setup lang="ts">

import {card} from "@/views/card/list/utils/hook";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-circle-line";
import Delete from "@iconify-icons/ep/delete";

const {
  loading,
  pagination,
  columns,
  dataList,
  onSearch,
  handleDelete,
  openDialog
} = card()
</script>

<template>
  <div>
    <PureTableBar
      title="会员卡列表"
      :columns="columns"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog"
        >
          添加会员卡
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
          @page-current-change="onSearch"
          :size="size"
          :columns="dynamicColumns"
          :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
        >
          <template #operation="{row}">
            <el-popconfirm
              :title="`是否确认删除编号为${row.card_id}的这条数据`"
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
