<script setup lang="ts">

import {FormProps} from "@/views/gym/list/detail/types";
import {ref} from "vue";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import dayjs from "dayjs";

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
      title="场馆信息"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="场馆ID">{{ dataList.gym_id }}</el-descriptions-item>
      <el-descriptions-item label="场馆名称">{{ dataList.name }}</el-descriptions-item>
      <el-descriptions-item label="图像">
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
      <el-descriptions-item label="地址名">{{ dataList.location }}</el-descriptions-item>
      <el-descriptions-item label="所属区域ID">{{ dataList.region_id }}</el-descriptions-item>
      <el-descriptions-item label="场馆等级">{{ dataList.rate }}</el-descriptions-item>
      <el-descriptions-item label="场馆介绍">{{ dataList.info }}</el-descriptions-item>
      <el-descriptions-item label="场馆等级ID">{{ dataList.rate_id }}</el-descriptions-item>
      <el-descriptions-item label="经度">{{ dataList.longitude }}</el-descriptions-item>
      <el-descriptions-item label="纬度">{{ dataList.latitude }}</el-descriptions-item>
      <el-descriptions-item label="评分">{{ dataList.score }}</el-descriptions-item>
      <el-descriptions-item label="标签">{{ dataList.tags }}</el-descriptions-item>
      <el-descriptions-item label="营业时间">{{ formatTime(dataList.begin_time) }}</el-descriptions-item>
      <el-descriptions-item label="结束营业时间">{{ formatTime(dataList.end_time) }}</el-descriptions-item>
      <el-descriptions-item label="轮播图">{{ dataList.banner }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<style scoped lang="scss">

</style>
