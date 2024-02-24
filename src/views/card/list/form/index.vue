<script setup lang="ts">
import {FormProps} from "@/views/card/list/form/types";
import {ref} from "vue";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    card_type_id: 0,
    user_id: 0,
    gym_id: 0,
    course_id: 0,
    coach_id: 0
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
      :rules="[{required: true, message: '用户ID不能为空'}]"
      label="用户ID" prop="user_id"
    >
      <el-input
        v-model="newFormInline.user_id"
        placeholder="请输入用户ID"
        clearable/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '课程ID不能为空'}]"
      label="课程ID" prop="course_id">
      <el-input
        v-model="newFormInline.course_id"
        placeholder="请输入课程ID"
        clearable/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '会员卡类型不能为空'}]"
      label="会员卡类型ID" prop="card_type_id">
      <el-input
        v-model="newFormInline.card_type_id"
        placeholder="请输入会员卡类型ID"
        clearable/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '场馆ID不能为空'}]"
      label="场馆ID" prop="gym_id">
      <el-input
        v-model="newFormInline.gym_id"
        placeholder="请输入场馆ID"
        clearable/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '教练ID不能为空'}]"
      label="教练ID" prop="coach_id">
      <el-input
        v-model="newFormInline.coach_id"
        placeholder="请输入教练ID"
        clearable/>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
