<script setup lang="ts">
import {FormProps} from "@/views/order/list/checkin/types";
import {ref} from "vue";
import ReQrcode from "@/components/ReQrcode/src";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    checkin_code: "",
    checkin_fast: ""
  })
})

const newFormInline = ref(props.formInline);
const dataList = ref()
dataList.value = newFormInline.value.ids
</script>

<template>

  <div>
    <el-descriptions
      class="margin-top"
      title="场馆信息"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="核销码">
        <ReQrcode :text="newFormInline.checkin_code"/>
      </el-descriptions-item>
      <el-descriptions-item label="快速核销编号">{{ dataList.checkin_fast }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="scss">

</style>
