<script setup lang="ts">
import {FormProps} from "@/views/admin/role/form/types";
import {ref} from "vue";
import ReCol from "@/components/ReCol";
import {formRules} from "@/views/admin/role/utils/rule";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    user_id: "",
    role_id: 0,
    inline_id: "",
    role_name: ""
  })
})

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
    :rules="formRules"
    :model="newFormInline"
  >
    <el-row :gutter="30">
      <re-col
        v-if="newFormInline.title === '新增'"
        :value="12" :xs="24" :sm="24">
        <el-form-item label="角色名称" prop="role_name">
          <el-input
            clearable
            v-model="newFormInline.role_name"
            placeholder="请输入角色名称"
          />
        </el-form-item>
      </re-col>
      <re-col
        v-if="newFormInline.title !== '新增'"
        :value="12" :xs="24" :sm="24">
        <el-form-item label="用户id" prop="user_id">
          <el-input
            v-model="newFormInline.user_id"
            clearable
            placeholder="请输入用户id"
          />
        </el-form-item>
      </re-col>
      <re-col
        v-if="newFormInline.title !== '新增'"
        :value="12" :xs="24" :sm="24">
        <el-form-item label="角色id" prop="role_id">
          <el-input
            v-model="newFormInline.role_id"
            clearable
            placeholder="请输入角色id"
          />
        </el-form-item>
      </re-col>
      <re-col
        v-if="newFormInline.title !== '新增'"
        :value="12" :xs="24" :sm="24">
        <el-form-item label="内部id" prop="inline_id">
          <el-input
            v-model="newFormInline.inline_id"
            clearable
            placeholder="请输入内部id(教练id/场馆id)"
          />
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>
