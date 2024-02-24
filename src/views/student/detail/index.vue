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
      <el-descriptions-item label="用户ID">{{newFormInline.user_id}}</el-descriptions-item>
      <el-descriptions-item label="用户昵称">{{newFormInline.nickname}}</el-descriptions-item>
      <el-descriptions-item label="头像">
        <template #default>
          <el-image
            fit="cover"
            preview-teleported
            :src="newFormInline.avatar"
            :preview-src-list="[newFormInline.avatar]"
            class="w-[60px] h-[60px] rounded-full align-middle"
          />
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="手机号：">{{newFormInline.phone}}</el-descriptions-item>
      <el-descriptions-item label="openid：">{{newFormInline.openid}}</el-descriptions-item>
      <el-descriptions-item label="unionid：">{{newFormInline.unionid}}</el-descriptions-item>
      <el-descriptions-item label="性别：">{{ newFormInline.gender }}</el-descriptions-item>
      <el-descriptions-item label="年龄：">{{ newFormInline.age }}</el-descriptions-item>
      <el-descriptions-item label="身高：">{{ newFormInline.height }}cm</el-descriptions-item>
      <el-descriptions-item label="体重：">{{ newFormInline.weight }}kg</el-descriptions-item>
      <el-descriptions-item label="肌肉含量：">{{ newFormInline.muscle }}KG</el-descriptions-item>
      <el-descriptions-item label="体脂率百分比：">{{ newFormInline.fat }}%</el-descriptions-item>
      <el-descriptions-item label="基础代谢：">{{ newFormInline.metabolism }}Kcal</el-descriptions-item>
      <el-descriptions-item label="BMI：">{{ newFormInline.bmi }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>


<style scoped lang="scss">

</style>
