<script setup lang="ts">
import {FormProps} from "@/views/bill/form/types";
import {ref} from "vue";
import ReCol from "@/components/ReCol";
import UploadIcon from "@iconify-icons/ri/upload-2-line";
import {createFormData} from "@pureadmin/utils";
import {formUpload} from "@/api/mock";
import {message} from "@/utils/message";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    bill_id: 0,
    bill_file: []
  })
});
const ruleFormRef = ref()
const uploadRef = ref()
const newFormInline = ref(props.formInline)

function getRef() {
  return ruleFormRef.value;
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
        action="#"
        class="!w-[200px]"
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
