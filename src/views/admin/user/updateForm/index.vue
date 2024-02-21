<script setup lang="ts">
import {FormProps} from "@/views/admin/user/updateForm/types";
import {ref} from "vue";
import {usePublicHooks} from "@/views/system/hooks";
import ReCol from "@/components/ReCol";
import {formRules} from "@/views/admin/user/updateForm/rule";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    account: "",
    user_id: "",
    password: ""
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
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          label="用户id：" prop="user_id">
          <el-input
            disabled
            v-model="newFormInline.user_id"
            clearable placeholder="请输入用户id"/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="用户名称：" prop="username">
          <el-input
            v-model="newFormInline.username"
            clearable placeholder="请输入用户名称"/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="用户密码：" prop="password">
          <el-input
            v-model="newFormInline.password"
            clearable placeholder="请输入角色密码"/>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>
