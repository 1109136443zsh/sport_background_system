<script setup lang="ts">
import {UserDetailProps} from "@/views/student/detail/types";
import {ref} from "vue";
import ReCol from "@/components/ReCol";

const props = withDefaults(defineProps<UserDetailProps>(), {
  formInline: () => ({
    age: 0,
    avatar: "",
    bmi: 0,
    fat: 0,
    gender: 0,
    height: 0,
    metabolism: 0,
    muscle: 0,
    nickname: "",
    openid: "",
    phone: "",
    unionid: "",
    user_id: 0,
    weight: 0,
    ids: []
  })
})

const ruleFormRef = ref()
const newFormInline = ref(props.formInline)
const dataList = ref()
dataList.value = newFormInline.value.ids
function getRef() {
  return ruleFormRef.value;
}

defineExpose({getRef})

</script>

<template>
  <div>
    <el-descriptions
      class="margin-top"
      title="学员信息"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="用户ID">{{dataList.user_id}}</el-descriptions-item>
      <el-descriptions-item label="用户昵称">{{dataList.nickname}}</el-descriptions-item>
      <el-descriptions-item label="头像">
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
      <el-descriptions-item label="手机号：">{{dataList.phone}}</el-descriptions-item>
      <el-descriptions-item label="openid：">{{dataList.openid}}</el-descriptions-item>
      <el-descriptions-item label="unionid：">{{dataList.unionid}}</el-descriptions-item>
      <el-descriptions-item label="性别：">{{dataList.gender}}</el-descriptions-item>
      <el-descriptions-item label="年龄：">{{dataList.age}}</el-descriptions-item>
      <el-descriptions-item label="身高：">{{dataList.height}}cm</el-descriptions-item>
      <el-descriptions-item label="体重：">{{dataList.weight}}kg</el-descriptions-item>
      <el-descriptions-item label="肌肉含量：">{{dataList.muscle}}KG</el-descriptions-item>
      <el-descriptions-item label="体脂率百分比：">{{dataList.fat}}%</el-descriptions-item>
      <el-descriptions-item label="基础代谢：">{{dataList.metabolism}}Kcal</el-descriptions-item>
      <el-descriptions-item label="BMI：">{{dataList.bmi}}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>


<style scoped lang="scss">

</style>
