<script setup lang="ts">
import {FormProps} from "@/views/card/typeList/form/types";
import {ref} from "vue";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    remain: 0,
    period: 0,
    bind_coach: 0,
    bind_course: 0,
    bind_gym: 0,
    daily_limit: 0,
    price: 0
  })
})
const typeOptions = [
  {
    value: 0,
    label: "否"
  },
  {
    value: 1,
    label: "是"
  }
];
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
      :rules="[{required: true, message: '卡名称不能为空'}]"
      label="卡名称" prop="name"
    >
      <el-input
        v-model="newFormInline.name"
        placeholder="请输入卡名称"
        clearable/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '权益次数不能为空'}]"
      label="权益次数" prop="remain"
    >
      <el-input
        v-model="newFormInline.remain"
        placeholder="请输入权益次数"
        clearable/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '有效时长不能为空'}]"
      label="有效时长" prop="name"
    >
      <el-input
        v-model="newFormInline.period"
        placeholder="请输入有效时长"
        clearable/>
    </el-form-item>
    <el-form-item label="是否需绑定教练才能购买">
      <el-select
        v-model="newFormInline.bind_coach"
        placeholder="请选择"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in typeOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="是否需绑定课程才能购买">
      <el-select
        v-model="newFormInline.bind_course"
        placeholder="请选择"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in typeOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="是否需绑定场馆才能购买">
      <el-select
        v-model="newFormInline.bind_gym"
        placeholder="请选择"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in typeOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '次数限制不能为空'}]"
      label="每天次数限制" prop="daily_limit"
    >
      <el-input
        v-model="newFormInline.daily_limit"
        placeholder="请输入每天次数限制"
        clearable/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '价格不能为空'}]"
      label="价格" prop="price"
    >
      <el-input
        v-model="newFormInline.price"
        placeholder="请输入价格"
        clearable/>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
