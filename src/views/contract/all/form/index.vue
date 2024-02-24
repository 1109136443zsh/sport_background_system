<script setup lang="ts">
import {FormProps} from "@/views/contract/all/form/types";
import {ref} from "vue";
import {usePublicHooks} from "@/views/system/hooks";
import {formRules} from "@/views/system/user/utils/rule";
import {message} from "@/utils/message";
import Add from "@iconify-icons/ep/plus";
import UploadIcon from "@iconify-icons/ri/upload-2-line";
import {picUpload} from "@/api/picUpload";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    image: "",
    sign_time: "",
    user_id: "",
    url: ""
  })
});
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

function importCommit(fileData) {
  return new Promise((resolve, reject) => {
    const data = new FormData()
    data.append("image", fileData.file)

    picUpload(
      data
    ).then(response => {
      // 处理成功回调
      console.log(response)
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

const uploadRef = ref()
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);

function getRef() {
  return ruleFormRef.value;
}

defineExpose({getRef});
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules"
  >
    <el-form-item
      :rules="[{required: true, message: '用户ID不能为空'}]"
      label="用户ID" prop="user_id">
      <el-input
        v-model="newFormInline.user_id"
        clearable
        placeholder="请输入用户ID"
      />
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '签署时间不能为空'}]"
      label="签署时间" prop="sign_time">
      <el-input
        v-model="newFormInline.sign_time"
        clearable
        placeholder="请输入签署时间"
      />
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '图片不能为空'}]"
      label="图片地址" prop="user_id">
      <el-upload
        ref="uploadRef"
        :before-upload="onBefore"
        v-model="newFormInline.image"
        drag
        multiple
        action="http://115.28.37.42:7788/admin/imageUpload"
        class="!w-[150px] m-4"
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
        提交
      </el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
