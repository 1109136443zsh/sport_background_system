<script setup lang="ts">
import {FormProps} from "@/views/settle/partner/form/types";
import {ref} from "vue";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "",
    apply_id: 0,
    region_id: 0
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
    <el-form-item
      :rules="[{required: true, message: '申请ID不能为空'}]"
      label="申请ID" prop="apply_id">
      <el-input
        v-model="newFormInline.apply_id"
        placeholder="请输入申请ID"
        clearable/>
    </el-form-item>
    <el-form-item
      v-if="newFormInline.title === '同意'"
      :rules="[{required: true, message: '区域ID不能为空'}]"
      label="区域ID" prop="region_id">
      <el-input
        v-model="newFormInline.region_id"
        placeholder="请输入区域ID"
        clearable/>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
