<script setup lang="ts">
import {FormProps} from "@/views/order/list/userDetail/types";
import {ref} from "vue";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    user_id: 0,
    phone: "",
    nickname: "",
    avatar: "",
    gender: 0,
    age: 0,
    height: 0,
    weight: 0,
    muscle: 0,
    fat: 0,
    metabolism: 0,
    bmi: 0
  })
});
const newFormInline = ref(props.formInline);
const dataList = ref();
dataList.value = newFormInline.value.ids
</script>

<template>
  <div>
    <el-descriptions
      class="margin-top"
      title="学员信息"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="用户ID:">{{ dataList.user_id }}</el-descriptions-item>
      <el-descriptions-item label="手机号:">{{dataList.phone}}</el-descriptions-item>
      <el-descriptions-item label="昵称:">{{dataList.nickname}}</el-descriptions-item>
      <el-descriptions-item label="头像:">
<!--        <el-tag size="small">School</el-tag>-->
        <template #default>
          <el-image
            fit="cover"
            preview-teleported
            :src="dataList.avatar"
            :preview-src-list="[dataList.avatar]"
            class="w-[60px] h-[60px] rounded-full align-middle"
          />
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="性别">{{dataList.gender}}</el-descriptions-item>
      <el-descriptions-item label="年龄">{{dataList.age}}</el-descriptions-item>
      <el-descriptions-item label="身高">{{dataList.height}}cm</el-descriptions-item>
      <el-descriptions-item label="体重">{{dataList.weight}}kg</el-descriptions-item>
      <el-descriptions-item label="肌肉含量">{{dataList.muscle}}%</el-descriptions-item>
      <el-descriptions-item label="体脂率百分比">{{dataList.fat}}%</el-descriptions-item>
      <el-descriptions-item label="基础代谢">{{dataList.metabolism}}Kcal</el-descriptions-item>
      <el-descriptions-item label="BMI">{{dataList.bmi}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="scss">

</style>
