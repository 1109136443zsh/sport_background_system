<script setup lang="ts">

import ReCol from "@/components/ReCol";
import { barChart } from "./component/chart"
import Segmented from "@/components/ReSegmented";
import {newCustomsData} from "./data"
</script>

<template>
  <div>
    <el-row :gutter="24" justify="space-around">
      <re-col
        v-motion
        class="mb-[18px]"
        :value="10"
        :xs="10"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card class="bar-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">新用户数量</span>
          </div>
          <div class="flex justify-between items-start mt-3">
            <barChart
              :new-customs-data="newCustomsData.count"
              :date="newCustomsData.date"
            />
          </div>
        </el-card>
      </re-col>
      <re-col
        v-motion
        class="mb-[18px]"
        :value="10"
        :xs="24"
        :initial="{
          opacity: 0,
          y: 100
        }"
        :enter="{
          opacity: 1,
          y: 0,
          transition: {
            delay: 400
          }
        }"
      >
        <el-card class="bar-card" shadow="never">
          <div class="flex justify-between">
            <span class="text-md font-medium">新用户数量</span>
          </div>
          <div class="flex justify-between items-start mt-3">
            <barChart
              :new-customs-data="newCustomsData.count"
              :date="newCustomsData.date"
            />
          </div>
        </el-card>
      </re-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

</style>
