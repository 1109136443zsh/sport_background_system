<script setup lang="ts">
import {FormProps} from "@/views/card/typeList/courseList/form/types";
import {ref} from "vue";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    card_type_id: 0,
    course_id: 0,
  })
});

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
      label="会员卡类型ID" prop="card_type_id"
      :rules="[{required: true, message: ''}]">
      <el-input
        disabled
        v-model="newFormInline.card_type_id"/>
    </el-form-item>
    <el-form-item
      label="课程ID" prop="course_id"
      :rules="[{required: true, message: '课程ID不能为空'}]">
      <el-input
        v-model="newFormInline.course_id"/>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
