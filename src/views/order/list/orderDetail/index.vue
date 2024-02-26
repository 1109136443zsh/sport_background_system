<script setup lang="ts">
import {FormProps} from "@/views/order/list/orderDetail/types";
import editForm from "@/views/order/list/orderDetail/form/index.vue"
import {h, ref} from "vue";
import dayjs from "dayjs";
import {addDialog} from "@/components/ReDialog/index";
import {updateComplain} from "@/api/order";
import {message} from "@/utils/message";
import {urlApi} from "@/api/utils";

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
    beforeSure: (done, {options}) => {
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
      <el-descriptions-item label="订单ID">{{ newFormInline.order_id }}</el-descriptions-item>
      <el-descriptions-item label="最终价格">{{ newFormInline.price }}</el-descriptions-item>
      <el-descriptions-item label="支付状态">
        <template #default>
          <el-tag effect="plain">
            {{
              newFormInline.status_pay === 0 ? '未支付' :
                newFormInline.status_pay === 1 ? '支付中' :
                  newFormInline.status_pay === 2 ? '支付成功' :
                    newFormInline.status_pay === 3 ? '退款中' :
                      newFormInline.status_pay === 4 ? '已退款' : ''
            }}
          </el-tag>
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="预定时间节点ID">{{ newFormInline.segment_id }}</el-descriptions-item>
      <el-descriptions-item label="预定日期时间戳">{{ formatTime(newFormInline.schedule_date) }}</el-descriptions-item>
      <el-descriptions-item label="订单状态">
        <template #default>
          <el-tag effect="plain">
            {{
              newFormInline.status_order === 0 ? '未支付' :
                newFormInline.status_order === 1 ? '支付中' :
                  newFormInline.status_order === 2 ? '支付成功' :
                    newFormInline.status_order === 3 ? '退款中' :
                      newFormInline.status_order === 4 ? '已退款' : ''
            }}
          </el-tag>
        </template>
      </el-descriptions-item>
      <el-descriptions
        class="margin-top"
        title="学员评价信息"
        :column="3"
        :border="true"
      >
        <el-descriptions-item label="学员是否平均评价">{{newFormInline.is_comment === true ? "已评价" : "未评价"}}</el-descriptions-item>
        <el-descriptions-item label="评价图片">
          <template #default>
            <el-image
              fit="cover"
              preview-teleported
              :src="urlApi + newFormInline.comment_image"
              :preview-src-list="[urlApi + newFormInline.comment_image]"
              class="w-[60px] h-[60px] rounded-full align-middle"
            />
          </template>
        </el-descriptions-item>
        <el-descriptions-item label="评价视频">{{newFormInline.comment_video}}</el-descriptions-item>
        <el-descriptions-item label="评价内容">{{newFormInline.comment}}</el-descriptions-item>
      </el-descriptions>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title="订单教练信息"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="教练名称">{{ newFormInline.coach_name }}</el-descriptions-item>
      <el-descriptions-item label="教练ID">{{ newFormInline.coach_id }}</el-descriptions-item>
      <el-descriptions-item label="教练图像">
        <template #default>
          <el-image
            fit="cover"
            preview-teleported
            :src="urlApi + newFormInline.coach_image"
            :preview-src-list="[urlApi + newFormInline.coach_image]"
            class="w-[60px] h-[60px] rounded-full align-middle"
          />
        </template>
      </el-descriptions-item>
      <el-descriptions-item label="教练电话">{{ newFormInline.coach_phone }}</el-descriptions-item>
      <el-descriptions-item label="教练等级">{{ newFormInline.coach_rate }}</el-descriptions-item>
      <el-descriptions-item label="教练评分">{{ newFormInline.coach_score }}</el-descriptions-item>
    </el-descriptions>
    <el-descriptions
      class="margin-top"
      title="订单场馆信息"
      :column="3"
      :border="true"
    >
      <el-descriptions-item label="场馆名称">{{ newFormInline.gym_name }}</el-descriptions-item>
      <el-descriptions-item label="场馆ID">{{ newFormInline.gym_id }}</el-descriptions-item>
      <el-descriptions-item label="场馆费用">{{ newFormInline.gym_price }}</el-descriptions-item>
      <el-descriptions-item label="场馆等级">{{ newFormInline.gym_rate }}</el-descriptions-item>
      <el-descriptions-item label="场馆地址">{{ newFormInline.gym_location }}</el-descriptions-item>
      <el-descriptions-item label="经度">{{ newFormInline.gym_longitude }}</el-descriptions-item>
      <el-descriptions-item label="纬度">{{ newFormInline.gym_latitude }}</el-descriptions-item>
    </el-descriptions>
    <el-table
      :data="newFormInline.complain"
    >
      <el-table-column label="投诉的工单ID" prop="complain_id"/>
      <el-table-column label="发起投诉主体" prop="complain_type">
        <template #default="row">
          <el-tag effect="plain">
            {{
              row.complain_type === 0 ? '学员' :
                row.complain_type === 1 ? '教练' :
                  row.complain_type === 2 ? '场馆' : ''
            }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="投诉内容" prop="claim"/>
      <el-table-column label="处理状态" prop="status_complain">
        <template #default="row">
          <el-tag effect="plain">
            {{
              row.complain_status === 0 ? '未处理' :
                row.complain_status === 1 ? '处理中' :
                  row.complain_status === 2 ? '已处理' : ''
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
