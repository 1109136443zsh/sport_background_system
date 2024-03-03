<script setup lang="ts">
import {FormProps} from "@/layout/components/form/coach/types";
import {ref} from "vue";
import {picUpload} from "@/api/picUpload";
import UploadIcon from "@iconify-icons/ri/upload-2-line";
import ReCol from "@/components/ReCol";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    name: "",
    info: "",
    gender_limit: 2,
    skill: "",
    coach_id: "",
    price: 0,
    rate: "",
    coachCase: "",
    banner: "",
    url: ""
  })
})
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
        <el-form-item label="星级：" prop="rate">
          <el-input v-model="newFormInline.rate"/>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item
          label="擅长技能：" prop="skill"
          :rules="[{ required: true, message: '擅长技能不能为空'}]"
        >
          <el-input v-model="newFormInline.skill"/>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item
          label="轮播图：" prop="coach_id"
          :rules="[{ required: true, message: '轮播图不能为空'}]"
        >
          <el-upload
            ref="uploadRef"
            v-model="newFormInline.banner"
            drag
            multiple
            action="http://115.28.37.42:7788/admin/imageUpload"
            class="!w-[180px] m-2"
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
            提交图片
          </el-button>
        </el-form-item>
      </re-col>
      <re-col>
        <el-form-item
          label="案例：" prop="coachCase"
          :rules="[{ required: true, message: '案例不能为空'}]"
        >
          <el-input v-model="newFormInline.coachCase"/>
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
