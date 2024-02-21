<script setup lang="ts">
import {FormProps} from "@/views/course/form/types";
import {ref} from "vue";
import {usePublicHooks} from "@/views/system/hooks";
import {formRules} from "@/views/system/user/utils/rule";
import ReCol from "@/components/ReCol";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    course_type: 0,
    price: "",
    price_info: "",
    subtitle: 0,
    name: "",
    course_id: 0
  })
});
const typeOption = [
  {
    label: "私教课",
    value: 0
  },
  {
    label: "特色课",
    value: 1
  },
  {
    label: "训练营",
    value: 2
  },
  {
    label: "团操",
    value: 3
  }
]
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
    label-width="82px"
  >
    <el-row :gutter="30">
      <re-col
        v-if="newFormInline.title === '更新'"
        :value="12" :xs="24" :sm="24">
        <el-form-item label="课程ID" prop="course_id">
          <el-input
            disabled
            v-model="newFormInline.course_id"
            clearable
            placeholder="请输入课程ID"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="课程名称" prop="name">
          <el-input
            v-model="newFormInline.name"
            clearable
            placeholder="请输入课程名称"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="价格" prop="price">
          <el-input
            v-model="newFormInline.price"
            clearable
            placeholder="请输入价格"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="数字价格" prop="subtitle">
          <el-input
            v-model="newFormInline.subtitle"
            clearable
            placeholder="请输入数字价格"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="价格介绍" prop="price_info">
          <el-input
            v-model="newFormInline.price_info"
            clearable
            placeholder="请输入价格介绍"
          />
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="课程类型">
          <el-select
            v-model="newFormInline.sex"
            placeholder="请选择课程类型"
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in typeOption"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>

    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>
