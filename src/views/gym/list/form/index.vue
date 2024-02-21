<script setup lang="ts">

import {DetailProps} from "@/views/coach/list/detail/types";
import {FormProps} from "@/views/gym/list/form/types";
import {ref} from "vue";
import ReCol from "@/components/ReCol";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    banner: [],
    begin_time: 0,
    end_time: 0,
    gym_id: "123",
    info: "场馆介绍",
    latitude: 0,
    location: "地址",
    longitude: 0,
    name: "场馆名称",
    rate_id: 0,
    price: 0,
    rate: "",
    region_id: 0,
    score: 0,
    segment: [],
    skill: [],
  })
})
const ruleFormRef = ref()
const newFormInline = ref(props.formInline)

function getRef() {
  return ruleFormRef.value;
}

defineExpose({getRef})
</script>

<template>
  <el-form
    ref="ruleFormRef"
    :model="newFormInline"
  >
    <re-col>
      <el-form-item
        :rules="[{required: true, message: '场馆ID不能为空'}]"
        label="场馆ID" prop="gym_id">
        <el-input
          disabled
          v-model="newFormInline.gym_id"/>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        label="场馆名称" prop="name">
        <el-input v-model="newFormInline.name"/>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        label="星级ID" prop="rate_id">
        <el-input v-model="newFormInline.rate_id"/>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        label="场馆介绍" prop="info">
        <el-input v-model="newFormInline.info"/>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        :rules="[{required: true, message: '轮播图不能为空'}]"
        label="轮播图" prop="banner">
        <el-select
          allow-create
          filterable
          multiple
          v-model="newFormInline.banner"
        >
        </el-select>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        label="开始营业时间" prop="begin_time">
        <el-input v-model="newFormInline.begin_time"/>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        label="结束营业时间" prop="end_time">
        <el-input v-model="newFormInline.end_time"/>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        label="地址" prop="location">
        <el-input v-model="newFormInline.location"/>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        label="经度" prop="longitude">
        <el-input v-model="newFormInline.longitude"/>
      </el-form-item>
    </re-col>
    <re-col>
      <el-form-item
        label="纬度" prop="latitude">
        <el-input v-model="newFormInline.latitude"/>
      </el-form-item>
    </re-col>
  </el-form>
</template>

<style scoped lang="scss">

</style>
