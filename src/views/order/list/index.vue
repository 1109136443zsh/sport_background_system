<script setup lang="ts">
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {orderList} from "@/views/order/list/utils/hook";
import {ref} from "vue";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import AddFill from "@iconify-icons/ri/add-circle-line";
import {getAuths} from "../../../router/utils";

const tableRef = ref()
const formRef = ref()
const {
  form,
  loading,
  dataList,
  columns,
  resetForm,
  onSearch,
  openDetail,
  openCancelDialog,
  openUserDetail,
  openCheckinDetail,
  openComplainForm,
  openCheckinDialog,
  pagination
} = orderList()
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :model="form"
      :inline="true"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="用户ID" prop="user_id">
        <el-input
          v-model="form.user_id"
          placeholder="请输入用户ID"
          clearable
          class="!w-[180px]"/>
      </el-form-item>
      <el-form-item label="订单状态" prop="order_status">
        <el-select
          v-model="form.order_status"
          placeholder="请选择"
          clearable
          class="!w-[180px]"
        >
          <el-option label="未完成" value="0"/>
          <el-option label="待核销" value="2"/>
          <el-option label="已完成" value="3"/>
          <el-option label="已取消" value="4"/>
        </el-select>
      </el-form-item>
      <el-form-item label="是否仅查看投诉单" prop="complain">
        <el-select
          v-model="form.complain"
          placeholder="请选择"
          clearable
          class="!w-[180px]"
        >
          <el-option label="是" value="0"/>
          <el-option label="否" value="1"/>
        </el-select>
      </el-form-item>
      <el-form-item label="是否查看已评论" prop="comment">
        <el-select
          v-model="form.comment"
          placeholder="请选择"
          clearable
          class="!w-[180px]"
        >
          <el-option label="是" value="0"/>
          <el-option label="否" value="1"/>
        </el-select>
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
      title="订单列表"
      :columns="columns"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openCheckinDialog"
        >
          订单核销
        </el-button>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openComplainForm"
        >
          投诉订单
        </el-button>
      </template>
      <template v-slot="{size, dynamicColumns}">
        <pure-table
          ref="tableRef"
          adaptive
          :data="dataList"
          :size="size"
          :loading="loading"
          :pagination="pagination"
          :columns="dynamicColumns"
          align-whole="center"
          table-layout="auto"
          :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
        >
          <template #operation="{row}">
            <Auth value="管理员">
              <el-button
                type="primary"
                link
                class="reset-margin"
                @click="openCheckinDetail(row)"
              >
                核销信息
              </el-button>
            </Auth>
            <el-button
              type="primary"
              link
              class="reset-margin"
              @click="openDetail(row)"
            >
              订单详情
            </el-button>
              <el-button
                type="primary"
                link
                class="reset-margin"
                @click="openUserDetail(row)"
              >
                学员详情
              </el-button>
            <Auth value="管理员">
              <el-button
                type="primary"
                link
                class="reset-margin"
                @click="openCancelDialog(row)"
              >
                取消订单
              </el-button>
            </Auth>

          </template>
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">

</style>
