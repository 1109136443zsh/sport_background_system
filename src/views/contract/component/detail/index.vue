<script setup lang="ts">
import {FormProps} from "@/views/contract/component/detail/types";
import {ref} from "vue";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    contract_id: 0,
    sign_role: 0,
    name: "",
    text: ""
  })
});
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({getRef});
</script>

<template>
  <el-descriptions
    class="margin-top"
    title="合同信息"
    :column="2"
    :border="true"
  >
    <el-descriptions-item label="合同ID">{{newFormInline.contract_id}}</el-descriptions-item>
    <el-descriptions-item label="签署对象">{{newFormInline.sign_role}}</el-descriptions-item>
    <el-descriptions-item label="合同名">{{newFormInline.name}}</el-descriptions-item>
    <el-descriptions-item label="合同内容">{{newFormInline.text}}</el-descriptions-item>
  </el-descriptions>
</template>

<style scoped lang="scss">

</style>
