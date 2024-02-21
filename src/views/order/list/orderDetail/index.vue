<script setup lang="ts">
import {FormProps} from "@/views/order/list/orderDetail/types";
import editForm from "@/views/order/list/orderDetail/form/index.vue"
import {h, ref} from "vue";
import dayjs from "dayjs";
import {addDialog} from "@/components/ReDialog/index";
import {updateComplain} from "@/api/order";
import {message} from "@/utils/message";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    coach_id: 0,
    coach_image: "",
    coach_name: "",
    coach_phone: "",
    coach_rate: "",
    coach_score: 0,
    comment: "",
    comment_image: "",
    comment_video: "",
    complain: [],
    course_id: 0,
    course_name: "",
    course_score: 0,
    gym_id: 0,
    gym_latitude: 0,
    gym_longitude: 0,
    gym_location: "",
    gym_name: "",
    gym_price: 0,
    gym_rate: "",
    is_comment: false,
    order_id: 0,
    price: 0,
    schedule_date: 0,
    segment_id: 0,
    status_order: 0,
    status_pay: 0,
  })
});
const newFormInline = ref(props.formInline);
const dataList = ref()
dataList.value = newFormInline.value.ids

function openDialog(row) {
  addDialog({
    title: "更新投诉订单",
    props: {
      formInline: {
        complain_id: row.complain_id,
        complain_status: row.complain_status
      }
    },
    width: "46%",
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(editForm, {ref: formRef}),
    beforeSure: (done, {options, index}) => {
      const FormRef = formRef.value.getRef();
      const curData = options.props.formInline;
      FormRef.validate(valid => {
        if (valid) {
          updateComplain({
            complain_id: curData.complain_id,
            complain_status: curData.complain_status
          }).then(() => {
            message(`您更新了投诉订单ID为${curData.complain_id}的状态成功`,
              {
                type: "success"
              });
            done()
          }).catch(() => {
            message(`提交失败`,
              {
                type: "error"
              });
          })
        }
      })
    },
  })
}

const formRef = ref()

function formatTime(time) {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
}
</script>

<template>
  <div>
    <el-descriptions
      class="margin-top"
      title="订单信息"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="订单ID">{{ dataList.order_id }}</el-descriptions-item>
      <el-descriptions-item label="最终价格">{{ dataList.price }}</el-descriptions-item>
      <el-descriptions-item label="支付状态">
        <template #default>
          <el-tag effect="plain">
            {{
              dataList.status_pay === 0 ? '未支付' :
                dataList.status_pay === 1 ? '支付中' :
                  dataList.status_pay === 2 ? '支付成功' :
                    dataList.status_pay === 3 ? '退款中' :
                      dataList.status_pay === 4 ? '已退款' : ''
            }}
          </el-tag>
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="预定时间节点ID">{{ dataList.segment_id }}</el-descriptions-item>
      <el-descriptions-item label="预定日期时间戳">{{ formatTime(dataList.segment_date) }}</el-descriptions-item>
      <el-descriptions-item label="订单状态">
        <template #default>
          <el-tag effect="plain">
            {{
              dataList.status_order === 0 ? '未支付' :
                dataList.status_order === 1 ? '支付中' :
                  dataList.status_order === 2 ? '支付成功' :
                    dataList.status_order === 3 ? '退款中' :
                      dataList.status_order === 4 ? '已退款' : ''
            }}
          </el-tag>
        </template>
      </el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title="订单教练信息"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="教练名称">{{ dataList.coach_name }}</el-descriptions-item>
      <el-descriptions-item label="教练ID">{{ dataList.coach_id }}</el-descriptions-item>
      <el-descriptions-item label="教练图像">
        <template #default>
          <el-image
            fit="cover"
            preview-teleported
            :src="dataList.coach_image"
            :preview-src-list="[dataList.coach_image]"
            class="w-[60px] h-[60px] rounded-full align-middle"
          />
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="教练电话">{{ dataList.coach_phone }}</el-descriptions-item>
      <el-descriptions-item label="教练等级">{{ dataList.coach_rate }}</el-descriptions-item>
      <el-descriptions-item label="教练评分">{{ dataList.coach_score }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title="订单场馆信息"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="场馆名称">{{ dataList.gym_name }}</el-descriptions-item>
      <el-descriptions-item label="场馆ID">{{ dataList.gym_id }}</el-descriptions-item>
      <el-descriptions-item label="场馆费用">{{ dataList.gym_price }}</el-descriptions-item>
      <el-descriptions-item label="场馆等级">{{ dataList.gym_rate }}</el-descriptions-item>
      <el-descriptions-item label="场馆地址">{{ dataList.gym_location }}</el-descriptions-item>
      <el-descriptions-item label="经度">{{ dataList.gym_longitude }}</el-descriptions-item>
      <el-descriptions-item label="纬度">{{ dataList.gym_latitude }}</el-descriptions-item>
    </el-descriptions>
    <el-table
      :data="dataList.complain"
    >
      <el-table-column label="投诉的工单ID" prop="complain_id"/>
      <el-table-column label="发起投诉主体" prop="complain_type">
        <template #default>
          <el-tag effect="plain">
            {{
              dataList.complain.complain_type === 0 ? '学员' :
                dataList.complain.complain_type === 1 ? '教练' :
                  dataList.complain.complain_type === 2 ? '场馆' : ''
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="投诉内容" prop="claim"/>
      <el-table-column label="处理状态" prop="status_complain">
        <template #default>
          <el-tag effect="plain">
            {{
              dataList.complain.complain_status === 0 ? '未处理' :
                dataList.complain.complain_status === 1 ? '处理中' :
                  dataList.complain.complain_status === 2 ? '已处理' : ''
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button
            type="primary"
            link
            class="reset-margin"
            @click="openDialog(row)"
          >
            更新投诉订单状态
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">

</style>
