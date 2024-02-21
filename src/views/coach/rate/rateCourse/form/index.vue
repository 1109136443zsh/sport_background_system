<script setup lang="ts">

import {DetailProps} from "@/views/coach/list/detail/types";
import {FormProps} from "@/views/coach/rate/rateCourse/form/types";
import {ref} from "vue";
import ReCol from "@/components/ReCol";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    rate_id: 0,
    course_id: 0
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
    <re-col>
      <el-form-item
        label="星级id" prop="rate_id"
        :rules="[{required: true, message: '星级id不能为空'}]"
      >
        <el-input
          disabled
          v-model="newFormInline.rate_id"/>
      </el-form-item>
    </re-col>
    <re-col>
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
