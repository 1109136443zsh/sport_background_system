<script setup lang="ts">
import {FormProps} from "@/views/student/utils/types";
import {ref} from "vue";
import ReCol from "@/components/ReCol";
import {message} from "@/utils/message";
import Add from "@iconify-icons/ep/plus";
import Eye from "@iconify-icons/ri/eye-line";
import Delete from "@iconify-icons/ri/delete-bin-7-line";
import type {UploadFile} from "element-plus";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    user_id: 0,
    nickname: "",
    gender: 0,
    height: 0,
    weight: 0,
    exercise_purpose: [],
    history_sport: [],
    history_injury: [],
    age: 0,
    avatar: "",
    openid: "",
    phone: "",
    unionid: ""
  })
})

const sexOption = [
  {
    value: 1,
    label: "男"
  },
  {
    value: 0,
    label: "女"
  }
]
const onBefore = file => {
  if (!["image/jpeg", "image/png", "image/gif"].includes(file.type)) {
    message("只能上传图片");
    return false;
  }
  const isExceed = file.size / 1024 / 1024 > 2;
  if (isExceed) {
    message(`单个图片大小不能超过2MB`);
    return false;
  }
};

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
    label-width="82px"
  >
    <el-row>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          label="用户id：" prop="user_id"
          :rules="[{required: true, message: '用户id不能为空'}]"
        >
          <el-input
            disabled
            v-model="newFormInline.user_id"
            placeholder="请输入用户id："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          label="用户昵称：" prop="nickname"
        >
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="请输入用户昵称："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="用户性别:">
          <el-select
            v-model="newFormInline.gender"
            placeholder="请输入用户性别："
            class="w-full"
            clearable
          >
            <el-option
              v-for="(item, index) in sexOption"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="身高:" prop="height">
          <el-input
            v-model="newFormInline.height"
            clearable
            placeholder="请输入身高："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="体重:" prop="weight">
          <el-input
            v-model="newFormInline.weight"
            clearable
            placeholder="请输入体重："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          label="运动目的" prop="exercise_purpose"
          :rules="[{required: true, message: '运动目的不能为空'}]">
          <el-select
            v-model="newFormInline.exercise_purpose"
            allow-create
            filterable
            multiple
            placeholder="请输入运动目的"
          >
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          label="运动史:" prop="history_sport"
          :rules="[{required: true, message: '运动史不能为空'}]">
          <el-select
            v-model="newFormInline.history_sport"
            allow-create
            multiple
            filterable
            placeholder="请输入运动史"
          >
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          label="伤痛史:" prop="history_injury"
          :rules="[{required: true, message: '伤痛史不能为空'}]"
        >
          <el-select
            v-model="newFormInline.history_injury"
            allow-create
            filterable
            multiple
            placeholder="请输入伤痛史"
          >
          </el-select>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="年龄:" prop="age">
          <el-input
            v-model="newFormInline.age"
            clearable
            placeholder="请输入年龄："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item label="头像:" prop="age">
          <el-upload
            v-model="newFormInline.avatar"
            drag
            multiple
            action="#"
            class="!w-[130px]"
            :auto-upload="false"
            :headers="{ Authorization: 'eyJhbGciOiJIUzUxMiJ9.admin' }"
            :before-upload="onBefore"
          >
            <IconifyIconOffline :icon="Add" class="m-auto" width="30"/>
            <template #file="{ file }">
              <div
                v-if="file.status == 'ready' || file.status == 'uploading'"
                class="mt-[35%] m-auto"
              >
                <p class="font-medium">文件上传中</p>
                <el-progress
                  class="mt-2"
                  :stroke-width="2"
                  :text-inside="true"
                  :show-text="false"
                  :percentage="file.percentage"
                />
              </div>
            </template>
          </el-upload>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>
