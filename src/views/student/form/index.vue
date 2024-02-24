<script setup lang="ts">
import {FormProps} from "@/views/student/utils/types";
import {ref} from "vue";
import ReCol from "@/components/ReCol";
import {message} from "@/utils/message";
import Add from "@iconify-icons/ep/plus";
import Eye from "@iconify-icons/ri/eye-line";
import Delete from "@iconify-icons/ri/delete-bin-7-line";
import type {UploadFile} from "element-plus";
import UploadIcon from "@iconify-icons/ri/upload-2-line";
import {picUpload} from "@/api/picUpload";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    user_id: 0,
    nickname: "",
    gender: 0,
    height: 0,
    weight: 0,
    age: 0,
    avatar: "",
    muscle: 0,
    metabolism: 0,
    fat: 0,
    bmi: 0,
    url: ""
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
const uploadRef = ref()
function importCommit(fileData) {
  return new Promise((resolve, reject) => {
    const data = new FormData()
    data.append("image", fileData.file)

    picUpload(
      data
    ).then(response => {
      // 处理成功回调
      newFormInline.value.url = response.data.url
      console.log(newFormInline.value.url)
      resolve(response)
    })
      .catch(error => {
        // 处理失败回调
        console.log(error)
        reject(error)
      });
  });
}
function onSubmit() {
  uploadRef.value.submit()
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
            v-model="newFormInline.user_id"
            placeholder="请输入用户id："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '用户昵称不能为空'}]"
          label="用户昵称：" prop="nickname"
        >
          <el-input
            v-model="newFormInline.nickname"
            clearable
            placeholder="请输入用户昵称："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '性别不能为空'}]"
          label="用户性别:" prop="gender">
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
        <el-form-item
          :rules="[{required: true, message: '身高不能为空'}]"
          label="身高:" prop="height">
          <el-input
            v-model="newFormInline.height"
            clearable
            placeholder="请输入身高："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '体重不能为空'}]"
          label="体重:" prop="weight">
          <el-input
            v-model="newFormInline.weight"
            clearable
            placeholder="请输入体重："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '年龄不能为空'}]"
          label="年龄:" prop="age">
          <el-input
            v-model="newFormInline.age"
            clearable
            placeholder="请输入年龄："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '肌肉含量不能为空'}]"
          label="肌肉含量:" prop="muscle">
          <el-input
            v-model="newFormInline.muscle"
            clearable
            placeholder="请输入肌肉含量："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '体脂率不能为空'}]"
          label="体脂率:" prop="fat">
          <el-input
            v-model="newFormInline.fat"
            clearable
            placeholder="请输入体脂率："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '基础代谢不能为空'}]"
          label="基础代谢:" prop="metabolism">
          <el-input
            v-model="newFormInline.metabolism"
            clearable
            placeholder="请输入基础代谢："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: 'BMI不能为空'}]"
          label="BMI:" prop="bmi">
          <el-input
            v-model="newFormInline.bmi"
            clearable
            placeholder="请输入BMI："/>
        </el-form-item>
      </re-col>
      <re-col :value="12" :xs="24" :sm="24">
        <el-form-item
          :rules="[{required: true, message: '头像不能为空'}]"
          label="头像:" prop="age">
          <el-upload
            ref="uploadRef"
            v-model="newFormInline.avatar"
            drag
            multiple
            action="http://115.28.37.42:7788/admin/imageUpload"
            class="!w-[180px]"
            :auto-upload="false"
            :http-request="importCommit"
          >
            <div class="el-upload__text">
              <IconifyIconOffline
                :icon="UploadIcon"
                width="26"
                class="m-auto mb-2"
              />
              可点击或拖拽上传
            </div>
          </el-upload>
          <el-button
            type="primary"
            @click="onSubmit"
          >
            提交头像
          </el-button>
        </el-form-item>
      </re-col>
    </el-row>
  </el-form>
</template>

<style scoped lang="scss">

</style>
