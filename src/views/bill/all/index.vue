<script setup lang="ts">

import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import {ref} from "vue";
import Refresh from "@iconify-icons/ep/refresh";
import {useBill} from "@/views/bill/all/utils/hook";
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
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="用户id" prop="user_id">
        <el-input
          v-model="form.user_id"
          placeholder="请输入用户id："
          class="!w-[180px]"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('search')"
          :loading="loading"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button
          :icon="useRenderIcon(Refresh)"
          @click="resetForm(formRef)"
        >
          重置
        </el-button>
      </el-form-item>
    </el-form>
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
