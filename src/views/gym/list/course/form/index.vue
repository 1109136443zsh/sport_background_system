<script setup lang="ts">

import {FormProps} from "@/views/gym/list/course/form/types";
import {ref} from "vue";
import ReCol from "@/components/ReCol";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    gym_id: 0,
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
    <re-col>
      <el-form-item
        label="场馆ID" prop="gym_id"
        :rules="[{required: true, message: '场馆ID不能为空'}]"
      >
        <el-input
          disabled
          v-model="newFormInline.gym_id"/>
      </el-form-item>
    </re-col>
    <re-col >
      <el-form-item
        label="课程ID" prop="course_id"
        :rules="[{required: true, message: '课程ID不能为空'}]"
      >
        <el-input
          v-model="newFormInline.course_id"/>
      </el-form-item>
    </re-col>

  </el-form>
</template>

<style scoped lang="scss">

</style>
