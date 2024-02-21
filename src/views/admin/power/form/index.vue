<script setup lang="ts">
import {FormProps} from "@/views/admin/power/utils/types";
import {permission} from "@/router/enums";
import {ref} from "vue";
import {usePublicHooks} from "@/views/system/hooks";
import ReCol from "@/components/ReCol";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    permission_id: "",
    user_id: ""
  })
});

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
  >
    <el-row :gutter="30">
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '权限ID不能为空'}]"
          label="权限id" prop="permission_id">
          <el-input
            v-model="newFormInline.permission_id"
            disabled/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '用户ID不能为空'}]"
          label="用户id" prop="user_id">
          <el-input
            v-model="newFormInline.user_id"
            clearable
            placeholder="请输入用户id"/>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>
