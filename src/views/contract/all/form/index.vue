<script setup lang="ts">
import {FormProps} from "@/views/contract/all/form/types";
import {ref} from "vue";
import {usePublicHooks} from "@/views/system/hooks";
import {formRules} from "@/views/system/user/utils/rule";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    image: "",
    sign_time: "",
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
    :rules="formRules"
  >
    <el-form-item label="用户ID" prop="user_id">
      <el-input
        v-model="newFormInline.user_id"
        clearable
        placeholder="请输入用户ID"
      />
    </el-form-item>
    <el-form-item label="签署时间" prop="sign_time">
      <el-input
        v-model="newFormInline.sign_time"
        clearable
        placeholder="请输入签署时间"
      />
    </el-form-item>
    <el-form-item label="图片地址" prop="image">
      <el-input
        v-model="newFormInline.image"
        clearable
        placeholder="请输入图片地址"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
