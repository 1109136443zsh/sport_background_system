<script setup lang="ts">
import {FormProps} from "@/views/bill/addForm/types";
import {ref} from "vue";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    amount: 0,
    tax_id: "",
    address: "",
    title: "",
    title_type: 0,
    phone: "",
    bank: "",
    bank_account: ""
  })
});

const ruleFormRef = ref()
const uploadRef = ref()
const newFormInline = ref(props.formInline)

function getRef() {
  return ruleFormRef.value;
}

const typeOptions = [
  {
    value: 0,
    label: "个人"
  },
  {
    value: 1,
    label: "单位"
  }
];
defineExpose({getRef})
</script>

<template>
  <el-form
    :model="newFormInline"
    ref="ruleFormRef"
  >
    <el-form-item
      :rules="[{required: true, message: '抬头不能为空'}]"
      label="抬头" prop="title">
      <el-input
        v-model="newFormInline.title"
        placeholder="请输入抬头"
        clearable/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '抬头类型不能为空'}]"
      label="抬头类型">
      <el-select
        v-model="newFormInline.title_type"
        placeholder="请选择抬头类型"
        class="w-full"
        clearable
      >
        <el-option
          v-for="(item, index) in typeOptions"
          :key="index"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '金额不能为空'}]"
      label="金额" prop="amount">
      <el-input
        v-model="newFormInline.amount"
        placeholder="请输入金额"
        clearable/>
    </el-form-item>
    <el-form-item
      :rules="[{required: true, message: '税号不能为空'}]"
      label="税号" prop="tax_id">
      <el-input
        v-model="newFormInline.tax_id"
        placeholder="请输入税号"
        clearable/>
    </el-form-item>
    <el-form-item label="注册地址" prop="address">
      <el-input
        v-model="newFormInline.address"
        placeholder="请输入注册地址"
        clearable/>
    </el-form-item>
    <el-form-item label="注册电话" prop="phone">
      <el-input
        v-model="newFormInline.phone"
        placeholder="请输入注册电话"
        clearable/>
    </el-form-item>
    <el-form-item label="开户行" prop="bank">
      <el-input
        v-model="newFormInline.bank"
        placeholder="请输入开户行"
        clearable/>
    </el-form-item>
    <el-form-item label="卡号" prop="bank_account">
      <el-input
        v-model="newFormInline.bank_account"
        placeholder="请输入卡号"
        clearable/>
    </el-form-item>
  </el-form>
</template>

<style scoped lang="scss">

</style>
