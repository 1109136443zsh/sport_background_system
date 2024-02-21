<script setup lang="ts">
import {FormProps} from "@/views/order/list/cancelOrder/types";
import {ref} from "vue";
import {usePublicHooks} from "@/views/system/hooks";
import {formRules} from "@/views/system/user/utils/rule";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    order_id: 0,
    reason: "",
    reason_type: 0
  })
});
const typeOptions = [
  {
    value: 1,
    label: "教练取消"
  },
  {
    value: 0,
    label: "系统取消"
  }
]
const ruleFormRef = ref();

const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
  >
    <el-form-item label="订单ID" prop="order_id">
      <el-input
        disabled
        v-model="newFormInline.order_id" placeholder="请输入订单ID"/>
    </el-form-item>
    <el-form-item label="取消原因" prop="reason">
      <el-input
        v-model="newFormInline.reason" placeholder="请输入订单取消原因"/>
    </el-form-item>
    <el-form-item label="用户性别">
      <el-select
        v-model="newFormInline.reason_type"
        placeholder="请选择取消原因类型"
        class="w-full"
        clearable
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
