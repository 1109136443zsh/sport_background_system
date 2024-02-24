<script setup lang="ts">
import {customs} from "@/views/total/customs/utils/hook";
import {ref} from "vue";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import PureTableBar from "@/components/RePureTableBar/src/bar";

const formRef = ref();
const tableRef = ref();
const {
  form,
  columns,
  loading,
  dataList,
  onSearch,
  resetForm
} = customs()
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="查看天数：" prop="day">
        <el-input
          v-model="form.day" placeholder="请输入查看天数" class="!w-[180px]"/>
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
      title="新用户数量列表"
      :columns="columns"
      @refresh="onSearch"
    >
      <template v-slot="{size, dynamicColumns}">
        <pure-table
          ref="tableRef"
          align-whole="center"
          table-layout="auto"
          adaptive
          :size="size"
          :columns="dynamicColumns"
          :data="dataList"
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
