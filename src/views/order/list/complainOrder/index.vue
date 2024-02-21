<script setup lang="ts">
import {FormProps} from "@/views/order/list/complainOrder/types";
import {ref} from "vue";
import {formRules} from "@/views/system/user/utils/rule";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    order_id: 0,
    claim: ""
  })
})

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
    <el-form-item
      :rules="[{required: true, message: '订单ID不能为空'}]"
      label="订单ID" prop="order_id">
      <el-input
        v-model="newFormInline.order_id"
        clearable
        placeholder="请输入订单ID"/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '投诉内容不能为空'}]"
      label="投诉内容" prop="claim">
      <el-input
        v-model="newFormInline.claim"
        clearable
        placeholder="请输入投诉内容"/>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
