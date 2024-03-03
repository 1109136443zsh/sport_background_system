<script setup lang="ts">
import {ref} from "vue";
import {useRegion} from "@/views/region/utils/hook";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import Refresh from "@iconify-icons/ep/refresh";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import EditPen from "@iconify-icons/ep/edit-pen";
import Delete from "@iconify-icons/ri/delete-bin-7-line";
import AddFill from "@iconify-icons/ri/add-circle-line";

const formRef = ref();
const tableRef = ref();
const {
  form,
  loading,
  columns,
  dataList,
  resetFrom,
  pagination,
  onSearch,
  handleDelete,
  openDialog
} = useRegion();
defineOptions({
  name: "regionManage"
})
</script>

<template>
  <div>
    <PureTableBar title="区域管理" :columns="columns" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog"
        >
          新增区域
        </el-button>
      </template>
      <template v-slot="{size,dynamicColumns}">
        <pure-table
          ref="tableRef"
          row-key="id"
          align-whole="center"
          table-layout="auto"
          adaptive
          :data="dataList"
          :pagination="pagination"
          :size="size"
          @page-current-change="onSearch"
          :columns="dynamicColumns"
          :header-cell-style="{
           background: 'var(--el-fill-color-light)',
           color: 'var(--el-text-color-primary)'
        }">
          <template #operation="{row}">
            <el-popconfirm
              :title="`是否删除区域id为${row.region_id}的这条数据`"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  link
                  class="reset-margin"
                  :size="size"
                  :icon="useRenderIcon(Delete)"
                >
                  删除
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
