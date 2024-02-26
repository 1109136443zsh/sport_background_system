<script setup lang="ts">

import {FormProps} from "@/views/gym/list/detail/types";
import {ref} from "vue";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import dayjs from "dayjs";
import {urlApi} from "@/api/utils";
import * as url from "url";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    gym_id: 0,
    name: "",
    cover_image: "",
    location: "",
    longitude: 0,
    latitude: 0,
    rate: "",
    rate_id: 0,
    region_id: 0,
    score: 0,
    tags: [],
    info: "",
    begin_time: 0,
    end_time: 0,
    banner: []
  })
})
const newFormInline = ref(props.formInline);

function formatTime(time) {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
}
</script>

<template>
  <div>
    <el-descriptions
      class="margin_top"
      title="场馆信息"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="场馆ID">{{ newFormInline.gym_id }}</el-descriptions-item>
      <el-descriptions-item label="场馆名称">{{ newFormInline.name }}</el-descriptions-item>
      <el-descriptions-item label="图像">
        <template #default>
          <el-image
            fit="cover"
            preview-teleported
            :src="urlApi + newFormInline.cover_image"
            :preview-src-list="[urlApi + newFormInline.cover_image]"
            class="w-[60px] h-[60px] rounded-full align-middle"
          />
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="地址名">{{ newFormInline.location }}</el-descriptions-item>
      <el-descriptions-item label="所属区域ID">{{ newFormInline.region_id }}</el-descriptions-item>
      <el-descriptions-item label="场馆等级">{{ newFormInline.rate }}</el-descriptions-item>
      <el-descriptions-item label="场馆介绍">{{ newFormInline.info }}</el-descriptions-item>
      <el-descriptions-item label="场馆等级ID">{{ newFormInline.rate_id }}</el-descriptions-item>
      <el-descriptions-item label="经度">{{ newFormInline.longitude }}</el-descriptions-item>
      <el-descriptions-item label="纬度">{{ newFormInline.latitude }}</el-descriptions-item>
      <el-descriptions-item label="评分">{{ newFormInline.score }}</el-descriptions-item>
      <el-descriptions-item label="标签">{{ newFormInline.tags }}</el-descriptions-item>
      <el-descriptions-item label="营业时间">{{ formatTime(newFormInline.begin_time) }}</el-descriptions-item>
      <el-descriptions-item label="结束营业时间">{{ formatTime(newFormInline.end_time) }}</el-descriptions-item>
      <el-descriptions-item label="轮播图">{{ newFormInline.banner }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="scss">

</style>
