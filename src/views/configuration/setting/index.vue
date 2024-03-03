<script setup lang="ts">

import {setting} from "@/views/configuration/setting/utils/hook";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import Delete from "@iconify-icons/ep/delete";

const {
  loading,
  pagination,
  columns,
  dataList,
  onSearch,
  openDialog
} = setting()
</script>

<template>
  <div>
    <PureTableBar
      title="系统配置"
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
          :pagination="pagination"
          :size="size"
          :columns="dynamicColumns"
          @page-current-change="onSearch"
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
              @click="openDialog(row)"
            >
              编辑
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">

</style>
