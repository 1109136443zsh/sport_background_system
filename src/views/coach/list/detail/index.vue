<script setup lang="ts">
import {DetailProps} from "@/views/coach/list/detail/types";
import {ref} from "vue";
import PureTableBar from "@/components/RePureTableBar/src/bar";

const props = withDefaults(defineProps<DetailProps>(), {
  formInline: () => ({
    banner: [],
    case: [],
    coach_id: 0,
    course: [],
    cover_image: "",
    gender_limit: 0,
    info: "",
    name: "",
    price: 0,
    rate: "",
    region_id: 0,
    score: 0,
    segment: [],
    skill: [],
    "01HN9PTMVNETH24VW5KBD91GYY": null,
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
      <el-descriptions-item label="教练ID">{{dataList.coach_id}}</el-descriptions-item>
      <el-descriptions-item label="教练名称">{{dataList.name}}</el-descriptions-item>
      <el-descriptions-item label="教练评分">{{dataList.score}}</el-descriptions-item>
      <el-descriptions-item label="教练图像">
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
      <el-descriptions-item label="课时费">{{dataList.price}}</el-descriptions-item>
      <el-descriptions-item label="教练星级">{{dataList.rate}}</el-descriptions-item>
      <el-descriptions-item label="教练所属区域ID">{{dataList.region_id}}</el-descriptions-item>
      <el-descriptions-item label="教练介绍">{{dataList.info}}</el-descriptions-item>
      <el-descriptions-item label="限定接单用户性别">{{dataList.gender_limit}}</el-descriptions-item>
      <el-descriptions-item label="案例">{{dataList.case}}</el-descriptions-item>
      <el-descriptions-item label="轮播图">{{dataList.banner}}</el-descriptions-item>
    </el-descriptions>
    <h3>预约时间段</h3>
    <el-table
      :data="dataList.segment"
      align-whole="center"
      table-layout="auto"
    >
      <el-table-column label="时间节点ID" prop="time_id"/>
      <el-table-column label="时间点状态" prop="status"/>
    </el-table>
    <h3>教练可上课程</h3>
    <el-table :data="dataList.course">
      <el-table-column label="课程ID" prop="course_id"/>
      <el-table-column label="课程名称" prop="name"/>
      <el-table-column label="课程类型" prop="type"/>
      <el-table-column label="价格" prop="price"/>
      <el-table-column label="价格介绍" prop="price_info"/>
      <el-table-column label="小标题" prop="subtitle"/>
    </el-table>
  </div>
</template>

<style scoped lang="scss">

</style>
