<script setup lang="ts">
import { DetailProps } from "@/views/coach/list/detail/types";
import { FormProps } from "@/views/gym/list/form/types";
import { ref } from "vue";
import ReCol from "@/components/ReCol";
import UploadIcon from "@iconify-icons/ri/upload-2-line";
import { picUpload } from "@/api/picUpload";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    banner: [],
    begin_time: 0,
    end_time: 0,
    gym_id: "123",
    info: "场馆介绍",
    latitude: 0,
    location: "地址",
    longitude: 0,
    name: "场馆名称",
    rate_id: 0,
    price: 0,
    rate: "",
    region_id: 0,
    score: 0,
    segment: [],
    skill: [],
    url: ""
  })
});
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const uploadRef = ref();
function importCommit(fileData) {
  return new Promise((resolve, reject) => {
    const data = new FormData();
    data.append("image", fileData.file);

    picUpload(data)
      .then(response => {
        // 处理成功回调
        newFormInline.value.url = response.data.url;
        console.log(newFormInline.value.url);
        resolve(response);
      })
      .catch(error => {
        // 处理失败回调
        console.log(error);
        reject(error);
      });
  });
}
function onSubmit() {
  uploadRef.value.submit();
}
function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });
</script>

<template>
  <el-form ref="ruleFormRef" :model="newFormInline">
    <re-col>
      <el-form-item
        :rules="[{ required: true, message: '场馆ID不能为空' }]"
        label="场馆ID"
        prop="gym_id"
      >
        <el-input v-model="newFormInline.gym_id" disabled />
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item label="场馆名称" prop="name">
        <el-input v-model="newFormInline.name" />
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item label="星级ID" prop="rate_id">
        <el-input v-model="newFormInline.rate_id" />
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item label="场馆介绍" prop="info">
        <el-input v-model="newFormInline.info" />
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        :rules="[{ required: true, message: '轮播图不能为空' }]"
        label="轮播图"
        prop="banner"
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
        <el-button type="primary" @click="onSubmit"> 提交图片 </el-button>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item label="开始营业时间" prop="begin_time">
        <el-input v-model="newFormInline.begin_time" />
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item label="结束营业时间" prop="end_time">
        <el-input v-model="newFormInline.end_time" />
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item label="地址" prop="location">
        <el-input v-model="newFormInline.location" />
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item label="经度" prop="longitude">
        <el-input v-model="newFormInline.longitude" />
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item label="纬度" prop="latitude">
        <el-input v-model="newFormInline.latitude" />
      </el-form-item>
    </re-col>
  </el-form>
</template>

<style scoped lang="scss"></style>
