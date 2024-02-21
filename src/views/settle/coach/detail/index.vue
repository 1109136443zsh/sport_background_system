<script setup lang="ts">
import {FormProps} from "@/views/settle/coach/detail/types";
import {ref} from "vue";
import dayjs from "dayjs";
const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    apply_id: 0,
    apply_status: 0,
    apply_time: 0,
    avatar: "",
    cover_image: "",
    info: "",
    name: "",
    openid: "",
    phone: "",
    skill: []
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
      title="教练入驻信息"
      :column="3"
    >
      <el-descriptions-item label="申请ID：">
        {{dataList.apply_id}}
      </el-descriptions-item>
      <el-descriptions-item label="申请状态：">{{dataList.apply_status}}</el-descriptions-item>
      <el-descriptions-item label="申请时间：">{{ formatTime(dataList.apply_time)}}</el-descriptions-item>
      <el-descriptions-item label="教练名称：">
        {{dataList.name}}
      </el-descriptions-item>
      <el-descriptions-item label="教练介绍：">
        {{dataList.info}}
      </el-descriptions-item>
      <el-descriptions-item label="openid：">
        {{dataList.openid}}
      </el-descriptions-item>
      <el-descriptions-item label="手机号：">
        {{dataList.phone}}
      </el-descriptions-item>
      <el-descriptions-item label="封面图：">
        <template #default>
          <el-image
            fit="cover"
            preview-teleported
            :src="dataList.cover_image"
            :preview-src-list="[dataList.cover_image]"
            class="w-[60px] h-[60px] rounded-full align-middle"
          />
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="头像：">
        <template #default>
          <el-image
            fit="cover"
            preview-teleported
            :src="dataList.avatar"
            :preview-src-list="[dataList.avatar]"
            class="w-[60px] h-[60px] rounded-full align-middle"
          />
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="擅长技能：">
        {{dataList.skill}}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="scss">

</style>
