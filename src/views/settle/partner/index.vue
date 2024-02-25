<script setup lang="ts">
import { partner } from "@/views/settle/partner/utils/hook";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import { ref } from "vue";

const formRef = ref();
const tableRef = ref();
const {
  form,
  dataList,
  columns,
  pagination,
  loading,
  resetForm,
  onSearch,
  openDetailDialog,
  openDialog
} = partner();
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="手机号码：" prop="phone">
        <el-input
          v-model="form.phone"
          placeholder="请输入手机号码"
          clearable
          class="!w-[180px]"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          :icon="useRenderIcon('search')"
          @click="onSearch"
        >
          搜索
        </el-button>
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <PureTableBar title="合伙人列表" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-button
          class="reset-margin"
          type="primary"
          @click="openDialog('同意')"
        >
          同意入驻
        </el-button>
        <el-button
          class="reset-margin"
          type="primary"
          @click="openDialog('拒绝')"
        >
          拒绝入驻
        </el-button>
      </template>
      <template v-slot="{ size, dynamicColumns }">
        <pure-table
          ref="tableRef"
          row-key="id"
          align-whole="center"
          table-layout="auto"
          :size="size"
          :columns="dynamicColumns"
          :data="dataList"
          :pagination="pagination"
          :header-cell-style="{
            background: 'var(--el-fill-color-light)',
            color: 'var(--el-text-color-primary)'
          }"
        >
          <template #operation="{ row }">
            <el-button
              class="reset-margin"
              link
              type="primary"
              :size="size"
              @click="openDetailDialog(row)"
            >
              查看
            </el-button>
          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss"></style>
