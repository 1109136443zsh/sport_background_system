<script setup lang="ts">
import {FormProps} from "@/views/bill/uploadForm/types";
import {ref} from "vue";
import UploadIcon from "@iconify-icons/ri/upload-2-line";
import {picUpload} from "@/api/picUpload";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    bill_id: 0,
    bill_file: [],
    url: ""
  })
});
const ruleFormRef = ref()
const uploadRef = ref()
const newFormInline = ref(props.formInline)

function getRef() {
  return ruleFormRef.value;
}

function importCommit(fileData) {
  return new Promise((resolve, reject) => {
    const data = new FormData()
    data.append("image", fileData.file)

    picUpload(
      data
    ).then(response => {
      // 处理成功回调
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
    label-width="82px"
  >
    <el-form-item
      label="附件"
      prop="bill_file"
      :rules="[{ required: true, message: '附件不能为空' }]"
    >
      <el-upload
        ref="uploadRef"
        v-model:file-list="newFormInline.bill_file"
        drag
        multiple
        action="http://115.28.37.42:7788/admin/imageUpload"
        class="!w-[200px]"
        :http-request="importCommit"
        :auto-upload="false"
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
      label="发票id"
      prop="bill_id"
      :rules="[ { required: true, message: '发票id不能为空'}]"
    >
      <el-input
        v-model="newFormInline.bill_id"/>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
