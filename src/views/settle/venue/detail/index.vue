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
      :border="true"
    >
      <el-descriptions-item label="申请ID：">
        {{ newFormInline.apply_id }}
      </el-descriptions-item>
      <el-descriptions-item label="申请状态：">{{
          newFormInline.apply_status === 0 ? "未审核" :
              newFormInline.apply_status === 1 ? "已通过" :
                  newFormInline.apply_status === 2 ? "已拒绝" : ''}}</el-descriptions-item>
      <el-descriptions-item label="申请时间：">{{ formatTime(newFormInline.apply_time) }}</el-descriptions-item>
      <el-descriptions-item label="真实名称：">
        {{ newFormInline.name }}
      </el-descriptions-item>
      <el-descriptions-item label="场馆介绍：">
        {{ newFormInline.info }}
      </el-descriptions-item>
      <el-descriptions-item label="openid：">
        {{ newFormInline.openid }}
      </el-descriptions-item>
      <el-descriptions-item label="手机号：">
        {{ newFormInline.phone }}
      </el-descriptions-item>
      <el-descriptions-item label="场馆照片：">
        <template #default>
          <el-image
            fit="cover"
            preview-teleported
            :src="newFormInline.gym_image"
            :preview-src-list="[newFormInline.gym_image]"
            class="w-[60px] h-[60px] align-middle"
          />
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="场馆可授课程：">
        {{ newFormInline.skill }}
      </el-descriptions-item>
      <el-descriptions-item label="申请人职位：">
        {{ newFormInline.job }}
      </el-descriptions-item>
      <el-descriptions-item label="详细地址：">
        {{ newFormInline.location }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="scss">

</style>
