<script setup lang="ts">
import {FormProps} from "@/views/settle/venue/detail/types";
import {ref} from "vue";
import dayjs from "dayjs";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    apply_id: 0,
    apply_status: 0,
    apply_time: 0,
    avatar: "",
    gym_image: "",
    info: "",
    name: "",
    openid: "",
    phone: "",
    skill: [],
    job: "",
    location: ""
  })
});
const newFormInline = ref(props.formInline);
const dataList = ref()
dataList.value = newFormInline.value.ids
function formatTime(time) {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
}
</script>

<template>
  <div>
    <el-descriptions
      class="margin_top"
      title="教场馆入驻信息"
      :column="3"
    >
      <el-descriptions-item label="申请ID：">
        {{dataList.apply_id}}
      </el-descriptions-item>
      <el-descriptions-item label="申请状态：">{{dataList.apply_status}}</el-descriptions-item>
      <el-descriptions-item label="申请时间：">{{ formatTime(dataList.apply_time)}}</el-descriptions-item>
      <el-descriptions-item label="真实名称：">
        {{dataList.name}}
      </el-descriptions-item>
      <el-descriptions-item label="场馆介绍：">
        {{dataList.info}}
      </el-descriptions-item>
      <el-descriptions-item label="openid：">
        {{dataList.openid}}
      </el-descriptions-item>
      <el-descriptions-item label="手机号：">
        {{dataList.phone}}
      </el-descriptions-item>
      <el-descriptions-item label="场馆照片：">
        <template #default>
          <el-image
            fit="cover"
            preview-teleported
            :src="dataList.gym_image"
            :preview-src-list="[dataList.gym_image]"
            class="w-[60px] h-[60px] align-middle"
          />
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="场馆可授课程：">
        {{dataList.skill}}
      </el-descriptions-item>
      <el-descriptions-item label="申请人职位：">
        {{dataList.job}}
      </el-descriptions-item>
      <el-descriptions-item label="详细地址：">
        {{dataList.location}}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="scss">

</style>
