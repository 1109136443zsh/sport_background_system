<script setup lang="ts">
import {FormProps} from "@/views/course/detail/types";
import {ref} from "vue";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    title: "新增",
    course_type: 0,
    gym_list: [],
    coach_list: [],
    type: 0,
    price: 0,
    price_info: "",
    subtitle: "",
    name: "",
    course_id: "",
  })
});
const newFormInline = ref(props.formInline);
</script>

<template>
  <div>
    <el-descriptions
      class="margin-top"
      title="课程信息"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="课程ID">{{ newFormInline.course_id }}</el-descriptions-item>
      <el-descriptions-item label="课程名称">{{ newFormInline.name }}</el-descriptions-item>
      <el-descriptions-item label="价格">
        <template #default>
          <span>{{ (newFormInline.price / 100).toFixed(2) }}</span>
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="小标题">{{ newFormInline.subtitle }}</el-descriptions-item>
      <el-descriptions-item label="课程类型">
        {{
          newFormInline.type === 1 ? "私教课" :
            newFormInline.type === 2 ? "特色课" :
              newFormInline.type === 3 ? "训练营" :
                newFormInline.type === 4 ? "团操" : ''
        }}
      </el-descriptions-item>
      <el-descriptions-item label="价格介绍">{{ newFormInline.price_info }}</el-descriptions-item>
    </el-descriptions>
    <h3>可上课门店</h3>
    <el-table
      :data="newFormInline.gym_list"
      align-whole="center"
      table-layout="auto"
    >
      <el-table-column label="场馆ID" prop="gym_id"/>
      <el-table-column label="场馆名称" prop="name"/>
      <el-table-column label="地址名" prop="location"/>
      <el-table-column label="场馆照片">
        <template #default="{row}">
          <el-image
            fit="cover"
            preview-teleported
            :src="row.cover_image"
            :preview-src-list="[row.cover_image]"
            class="w-[60px] h-[60px] rounded-full align-middle"
          />
        </template>
      </el-table-column>
      <el-table-column label="经度" prop="longitude"/>
      <el-table-column label="纬度" prop="latitude"/>
      <el-table-column label="场馆等级" prop="rate"/>
      <el-table-column label="场馆等级ID" prop="rate_id"/>
      <el-table-column label="场馆所属区域ID" prop="region_id"/>
      <el-table-column label="标签" prop="tags"/>
      <el-table-column label="评分" prop="score"/>
    </el-table>
    <h3>可上课教练</h3>
    <el-table
      :data="newFormInline.coach_list"
      align-whole="center"
      table-layout="auto"
    >
      <el-table-column label="名称" prop="name"/>
      <el-table-column label="ID" prop="coach_id"/>
      <el-table-column label="教练图像">
        <template #default="{row}">
          <el-image
            fit="cover"
            preview-teleported
            :src="row.cover_image"
            :preview-src-list="[row.cover_image]"
            class="w-[60px] h-[60px] rounded-full align-middle"
          />
        </template>
      </el-table-column>
      <el-table-column label="所属区域ID" prop="region_id"/>
      <el-table-column label="评分" prop="score"/>
      <el-table-column label="课时费" prop="price"/>
      <el-table-column label="擅长技能" prop="skill"/>
      <el-table-column label="星级" prop="rate"/>
      <el-table-column label="限定接单性别" prop="gender_limit"/>
    </el-table>
  </div>
</template>

<style scoped lang="scss">

</style>
