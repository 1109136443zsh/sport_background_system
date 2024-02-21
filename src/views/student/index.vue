<script setup lang='ts'>
import {ref} from "vue";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {stuUser} from "@/views/student/utils/hook";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import EditPen from "@iconify-icons/ep/edit-pen";

const formRef = ref();
const tableRef = ref();
const {
  form,
  columns,
  loading,
  onSearch,
  dataList,
  pagination,
  selectNum,
  resetForm,
  openModify,
  openDetail
} = stuUser()
defineOptions({
  name: ''
})
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :inline="true"
      :model="form"
      class="search-form bg-bg_color w-[99/100] pl-8 pt-[12px]"
    >
      <el-form-item label="用户id：" prop="user_id">
        <el-input
          v-model="form.user_id" placeholder="请输入用户id" class="!w-[180px]"/>
      </el-form-item>
      <el-form-item label="手机号码：" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号码" class="!w-[180px]"/>
      </el-form-item>
      <el-form-item label="用户昵称：" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入用户昵称" class="!w-[180px]"/>
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
    <PureTableBar title="用户管理" :columns="columns" @refresh="onSearch">
      <template v-slot="{size, dynamicColumns}">
        <pure-table
          ref="tableRef"
          align-whole="center"
          table-layout="auto"
          adaptive
          :size="size"
          :columns="dynamicColumns"
          :pagination="pagination"
          :data="dataList"
          :header-cell-style="{
           background: 'var(--el-fill-color-light)',
           color: 'var(--el-text-color-primary)'
        }"
        >
          <template #operation="{row}">
            <el-button
              type="primary"
              link
              class="reset-margin"
              :size="size"
              :icon="useRenderIcon(EditPen)"
              @click="openModify(row)"
            >
              修改
            </el-button>
            <el-button
              type="primary"
              link
              class="reset-margin"
              :size="size"
              @click="openDetail(row)"
            >
              查看
            </el-button>
          </template>

        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style lang='scss' scoped>
.demo-form-inline .el-input {
  --el-input-width: 220px;
}

.demo-form-inline .el-select {
  --el-select-width: 220px;
}
</style>
