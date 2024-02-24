<script setup lang="ts">
import {FormProps} from "@/views/configuration/setting/form/types";
import {ref} from "vue";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    key: "",
    value: ""
  })
})

const ruleFormRef = ref()
const newFormInline = ref(props.formInline)

function getRef() {
  return ruleFormRef.value;
}

defineExpose({getRef})
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
  >
    <el-form-item
      :rules="[{required: true, message: '配置项不能为空'}]"
      label="配置项" prop="key">
      <el-input
        v-model="newFormInline.key"
        placeholder="请输入配置项"
        clearable/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '配置值不能为空'}]"
      label="配置值" prop="value">
      <el-input
        v-model="newFormInline.value"
        placeholder="请输入配置值"
        clearable/>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
