<script setup lang="ts">
import {FormProps} from "@/views/coach/rate/form/types";
import {ref, watch} from "vue";
import ReCol from "@/components/ReCol";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "",
    bonus: 0,
    charge: 0,
    name: "",
    rate_id: 0
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
    <re-col v-if="newFormInline.title === '更新'">
      <el-form-item
        label="星级id" prop="rate_id"
        :rules="[{required: true, message: '星级id不能为空'}]"
      >
        <el-input
          v-model="newFormInline.rate_id"/>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        label="星级名称" prop="name"
        :rules="[{required: true, message: '星级名称不能为空'}]"
      >
        <el-input
          v-model="newFormInline.name"/>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        label="学员额外付费" prop="charge"
        :rules="[{required: true, message: '学员额外付费不能为空'}]"
      >
        <el-input
          v-model="newFormInline.charge"/>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        label="教练额外分成费用" prop="bonus"
        :rules="[{required: true, message: '教练额外分成费用不能为空'}]"
      >
        <el-input
          v-model="newFormInline.bonus"/>
      </el-form-item>
    </re-col>
  </el-form>
</template>

<style scoped lang="scss">

</style>
