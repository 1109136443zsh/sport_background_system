<script setup lang="ts">
import {FormProps} from "@/views/region/utils/types";
import {ref} from "vue";
import {formRules} from "@/views/region/utils/rule";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: ""
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
  <el-form
    :rules="formRules"
    ref="ruleFormRef"
    :model="newFormInline"
  >
    <el-form-item label="区域名称：" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable placeholder="请输入区域名称"/>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
