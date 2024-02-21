<script setup lang="ts">
import {FormProps} from "@/views/coach/list/form/types";
import ReCol from "@/components/ReCol";
import {ref} from "vue";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    info: "",
    gender_limit: 2,
    skill: [],
    coach_id: "",
    price: 0,
    rate_id: 0,
    case: [],
    banner: []
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
    :model="newFormInline"
    ref="ruleFormRef"
  >
    <el-row>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          label="教练id：" prop="coach_id"
          :rules="[{ required: true, message: '教练id不能为空'}]"
        >
          <el-input
            disabled
            v-model="newFormInline.coach_id"/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="教练名字：" prop="name">
          <el-input
            v-model="newFormInline.name"/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="限定接单性别：" prop="gender_limit">
          <el-input v-model="newFormInline.gender_limit"/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="星级id：" prop="rate_id">
          <el-input v-model="newFormInline.rate_id"/>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item
          allow-create
          filterable
          multiple
          label="擅长技能：" prop="skill"
          :rules="[{ required: true, message: '擅长技能不能为空'}]"
        >
          <el-select
            allow-create
            filterable
            multiple
            v-model="newFormInline.skill">
          </el-select>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item
          label="轮播图：" prop="banner"
          :rules="[{ required: true, message: '轮播图不能为空'}]"
        >
          <el-select
            allow-create
            filterable
            multiple
            v-model="newFormInline.banner">
          </el-select>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item
          label="案例：" prop="case"
          :rules="[{ required: true, message: '案例不能为空'}]"
        >
          <el-select
            allow-create
            filterable
            multiple
            v-model="newFormInline.case">
          </el-select>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item label="介绍：" prop="info">
          <el-input v-model="newFormInline.info"/>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>
