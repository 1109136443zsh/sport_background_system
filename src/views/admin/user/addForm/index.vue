<script setup lang="ts">
import {FormProps} from "@/views/admin/user/addForm/types";
import {ref} from "vue";
import ReCol from "@/components/ReCol";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    username: "",
    account: "",
    password: "",
    openid: ""
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
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '用户名称不能为空'}]"
          label="名称：" prop="username">
          <el-input
            v-model="newFormInline.username"
            clearable placeholder="请输入用户名称"/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '用户密码不能为空'}]"
          label="用户密码：" prop="password">
          <el-input
            v-model="newFormInline.password"
            clearable placeholder="请输入角色密码"/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          label="登录账号：" prop="account">
          <el-input
            v-model="newFormInline.account"
            clearable placeholder="请输入登录账号"/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="openid：" prop="openid">
          <el-input
            v-model="newFormInline.openid"
            clearable placeholder="请输入openid"/>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>
