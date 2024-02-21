<script setup lang="ts">
import {FormProps} from "@/views/order/list/orderDetail/form/types";
import {ref} from "vue";
import {formRules} from "@/views/system/user/utils/rule";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    complain_id: 0,
    complain_status: 0
  })
});
const typeOptions = [
  {
    value: 0,
    label: "未处理"
  },
  {
    value: 1,
    label: "处理中"
  },
  {
    value: 2,
    label: "已处理"
  }
]
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({getRef});
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
  >
    <el-form-item label="投诉工单ID" prop="complain_id">
      <el-input
        v-model="newFormInline.complain_id"
        clearable
        placeholder="请输入投诉工单ID"/>
    </el-form-item>
    <el-form-item label="投诉工单ID" prop="complain_id">
      <el-select
        v-model="newFormInline.complain_status"
        placeholder="请选择投诉订单的状态"
        clearable
        class="w-full"
      >
        <el-option
          v-for="(item, index) in typeOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
