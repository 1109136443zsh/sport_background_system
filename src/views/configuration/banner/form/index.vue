<script setup lang="ts">
import {ref} from "vue";
import {FormProps} from "@/views/configuration/banner/form/types";
import {formRules} from "@/views/system/user/utils/rule";
import UploadIcon from "@iconify-icons/ri/upload-2-line";
import {picUpload} from "@/api/picUpload";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "更新",
    enable: 0,
    image: "",
    index_banner_id: 0,
    sort: 0,
    url: "",
    imageUrl: ""
  })
});
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
      console.log(newFormInline.value.imageUrl)
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
    :rules="formRules"
  >
    <el-form-item
      :rules="[{required: true, message: 'bannerID不能为空'}]"
      v-if="newFormInline.title === '更新'"
      label="bannerID" prop="index_banner_id">
      <el-input
        v-model="newFormInline.index_banner_id"
        clearable
        placeholder="请输入bannerID"
      />
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '是否启用不能为空'}]"
      v-if="newFormInline.title === '更新'"
      label="是否启用" prop="enable">
      <el-select
        v-model="newFormInline.enable"
        placeholder="请选择是否启用"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in typeOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '跳转链接不能为空'}]"
      label="跳转链接" prop="url">
      <el-input
        placeholder="请输入跳转地址"
        v-model="newFormInline.url"/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '图片地址不能为空'}]"
      label="图片地址" prop="url">
      <el-upload
        ref="uploadRef"
        v-model="newFormInline.image"
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
    <el-form-item
      :rules="[{required: true, message: '排序序号不能为空'}]"
      label="排序序号" prop="sort">
      <el-input
        v-model="newFormInline.sort"
        clearable
        placeholder="请输入图片排序序号"
      />
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
