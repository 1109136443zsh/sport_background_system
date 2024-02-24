<script setup lang="ts">

import {FormProps} from "@/views/order/list/checkin/types";
import {ref} from "vue";
import {picUpload} from "@/api/picUpload";
import {formRules} from "@/views/system/user/utils/rule";
import UploadIcon from "@iconify-icons/ri/upload-2-line";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    checkin_code: "",
    checkin_fast: ""
  })
})
const ruleFormRef = ref();
const newFormInline = ref(props.formInline);
const typeOptions = [
  {
    value: true,
    label: "启用"
  },
  {
    value: false,
    label: "禁用"
  }
];
const uploadRef = ref()
function importCommit(fileData) {
  return new Promise((resolve, reject) => {
    const data = new FormData()
    data.append("image", fileData.file)

    picUpload(
      data
    ).then(response => {
      // 处理成功回调
      newFormInline.value.imageUrl = response.data.url
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
function getRef() {
  return ruleFormRef.value;
}

defineExpose({ getRef });

</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
    :rules="formRules">
    <el-form-item
      label="上传核销码" prop="checkin_code">
      <el-upload
        ref="uploadRef"
        v-model="newFormInline.checkin_code"
        drag
        multiple
        action="http://115.28.37.42:7788/admin/imageUpload"
        class="!w-[180px] m-4"
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
    <el-form-item
      label="快捷核销" prop="checkin_fast">
      <el-input
        v-model="newFormInline.checkin_fast"
        clearable
        placeholder="请输入10为快捷核销码"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
