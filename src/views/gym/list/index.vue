<script setup lang="ts">
import {gymList} from "@/views/gym/list/utils/hook";
import {ref} from "vue";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import EditPen from "@iconify-icons/ep/edit-pen";
import Menu from "@iconify-icons/ep/menu";
import Refresh from "@iconify-icons/ep/refresh";

const formRef = ref();
const tableRef = ref();
const {
  form,
  loading,
  dataList,
  pagination,
  columns,
  onSearch,
  openDetail,
  openDialog,
  openCourseList,
  resetForm,
} = gymList()
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="场馆名称" prop="name">
        <el-input
          v-model="form.name"
          placeholder="请输入场馆名称"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="星级ID" prop="rate_id">
        <el-input
          v-model="form.rate_id"
          placeholder="请输入星级ID"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item label="区域ID" prop="region_id">
        <el-input
          v-model="form.region_id"
          placeholder="请输入区域ID"
          clearable
          class="!w-[180px]"
        />
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
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <PureTableBar
      title="场馆列表"
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
          @current-change="onSearch"

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
              查看场馆详情
            </el-button>
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              :icon="useRenderIcon(Menu)"
              @click="openCourseList(row)"
            >
              可上课程
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">

</style>
