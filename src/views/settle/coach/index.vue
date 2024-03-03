<script setup lang="ts">
import {ref} from "vue";
import {useSettle} from "@/views/settle/coach/utils/hook";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import Refresh from "@iconify-icons/ep/refresh";

const formRef = ref()
const tableRef = ref()
const {
  form,
  dataList,
  loading,
  columns,
  resetForm,
  pagination,
  onSearch,
  handleAccept,
  handleReject,
  openDetailDialog
} = useSettle()
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]">
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
          @click="onSearch"
          :loading="loading"
          :icon="useRenderIcon('search')"
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
      title="教练入驻管理"
      :columns="columns"
      @refresh="onSearch"
    >
      <template v-slot="{size,dynamicColumns}">
        <pure-table
          ref="tableRef"
          row-key="id"
          align-whole="center"
          table-layout="auto"
          :size="size"
          :columns="dynamicColumns"
          :data="dataList"
          :pagination="pagination"
          @current-change="onSearch"
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
              :title="`是否确认同意${row.name}的入驻申请`"
              @confirm="handleAccept(row)"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                >
                  同意
                </el-button>
              </template>
            </el-popconfirm>
            <el-popconfirm
              :title="`是否确认拒绝${row.name}的入驻申请`"
              @confirm="handleReject(row)"
            >
              <template #reference>
                <el-button
                  class="reset-margin"
                  link
                  type="primary"
                  :size="size"
                >
                  拒绝
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
