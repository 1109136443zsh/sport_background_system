<script setup lang="ts">

import {useWallet} from "@/views/wallet/order/utils/hook";
import {ref} from "vue";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import {PureTableBar} from "@/components/RePureTableBar";

const formRef = ref()
const {
  form,
  loading,
  columns,
  dataList,
  pagination,
  onSearch,
  resetForm
}=useWallet()
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="用户名称：" prop="user_id">
        <el-input
          v-model="form.user_id"
          placeholder="请输入用户名称"
          clearable
          class="!w-[180px]"/>
      </el-form-item>
      <el-form-item label="用户角色：" prop="user_role">
        <el-input
          v-model="form.user_role"
          placeholder="请输入用户角色"
          clearable
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
        <el-button :icon="useRenderIcon(Refresh)" @click="resetForm(formRef)">
          重置
        </el-button>
      </el-form-item>
    </el-form>
    <PureTableBar
      title="所有提现订单列表"
      :columns="columns"
      @refresh="onSearch"
    >
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
