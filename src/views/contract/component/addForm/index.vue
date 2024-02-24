<script setup lang="ts">
import {FormProps} from "@/views/contract/component/addForm/types";
import {ref} from "vue";
import {formRules} from "@/views/system/user/utils/rule";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    sign_role: "",
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
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules">
    <el-form-item
      :rules="[{ required: true, message: '合同名称不能为空'}]"
      label="合同名称" prop="name">
      <el-input
        v-model="newFormInline.name"
        clearable
        placeholder="请输入合同名称"
        />
    </el-form-item>
    <el-form-item
      :rules="[{ required: true, message: '签署对象不能为空'}]"
      label="签署对象" prop="sign_role">
      <el-input
        v-model="newFormInline.sign_role"
        clearable
        placeholder="请输入签署对象"
      />
    </el-form-item>
    <el-form-item
      :rules="[{ required: true, message: '合同内容不能为空'}]"
      label="合同内容" prop="text">
      <el-input
        v-model="newFormInline.text"
        clearable
        placeholder="请输入合同内容"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
