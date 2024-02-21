<script setup lang="ts">

import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {useCoach} from "@/views/coach/list/utils/hook";
import {ref} from "vue";
import EditPen from "@iconify-icons/ep/edit-pen";


const formRef = ref();
const tableRef = ref();
const {
  form,
  loading,
  openDialog,
  openDetail,
  dataList,
  pagination,
  columns,
  onSearch,
  resetForm,
  openGymEnableTable
} = useCoach()
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :model="form"
      :inline="true"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="教练名字" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入教练名字"
          clearable
          class="!w-[180px]"/>
      </el-form-item>
      <el-form-item label="星级ID" prop="rate_id">
        <el-input
          v-model="form.rate_id"
          placeholder="请输入星级ID"
          clearable
          class="!w-[180px]"/>
      </el-form-item>
      <el-form-item label="所属区域ID" prop="region_id">
        <el-input
          v-model="form.region_id"
          placeholder="请输入所属区域ID"
          clearable
          class="!w-[180px]"/>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :icon="useRenderIcon('search')"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <PureTableBar
      title="教练列表"
      :columns="columns"
      @refresh="onSearch"
    >
      <template v-slot="{size, dynamicColumns}">
        <pure-table
          ref="tableRef"
          row-key="id"
          adaptive
          align-whole="center"
          table-layout="auto"
          :loading="loading"
          :pagination="pagination"
          :size="size"
          :data="dataList"
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
              :icon="useRenderIcon(EditPen)"
              @click="openDialog(row)"
            >
              修改
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openDetail(row)"
            >
              查看详情
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openGymEnableTable(row)"
            >
              查看可去场馆
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">

</style>
