<script setup lang="ts">
import {FormProps} from "@/views/coach/list/gymEnable/types";
import {h, onMounted, ref} from "vue";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import Delete from "@iconify-icons/ri/delete-bin-7-line";
import editForm from "@/views/coach/list/gymEnable/form/index.vue"
import {message} from "@/utils/message";
import AddFill from "@iconify-icons/ri/add-circle-line";
import {addDialog} from "@/components/ReDialog/index";
import {getGymEnableList, gymEnableAdd, gymEnableRemove} from "@/api/coach/coach";


const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    coach_id: 0,
    gym_id: 0,
    gym_name: "",
    gym_location: ""
  })
});
const loading = ref(true)
const formRef = ref()
const dataList = ref()

async function onSearch() {
  loading.value = true
  await getGymEnableList({
    coach_id: newFormInline.value.coach_id,
    page: 1
  }).then(response => {
    if (response.code === 200) {
      dataList.value = response.data
    } else {
      message("出错了，请重试", {
        type: "error"
      })
    }
  }).catch(() => {
    message("获取数据失败，请重试", {
      type: "error"
    })
  })
  setTimeout(() => {
    loading.value = false;
  }, 500);
}

function openDialog() {
  addDialog({
    props: {
      formInline: {
        coach_id: newFormInline.value.coach_id,
        gym_id: ""
      }
    },
    width: "46%",
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(editForm, {ref: formRef}),
    beforeSure: (done, {options, index}) => {
      const FormRef = formRef.value.getRef();
      const curData = options.props.formInline
      FormRef.validate(valid => {
        if (valid) {
          gymEnableAdd({
            coach_id: curData.coach_id,
            gym_id: curData.gym_id
          }).then((res) => {
            if (res.code === 200) {
              message(`成功添加教练可去场馆`, {
                type: "success"
              });
              done();
              onSearch();
            } else {
              message(`出错了`, {
                type: "error"
              });
            }
          }).catch(() => {
            message(`添加失败`, {
              type: "error"
            });
          })
        }
      })
    },
  })
}

const newFormInline = ref(props.formInline);

async function handDelete(row) {
  await gymEnableRemove({
    coach_id: newFormInline.value.coach_id,
    gym_id: row.gym_id
  }).then((res) => {
    if (res.code === 200) {
      message(`您删除了场馆名称为${row.gym_name}的这条数据`,
        {type: "success"});
      onSearch()
    } else {
      message(`出错了`,
        {
          type: "error"
        });
    }
  }).catch(() => {
    message(`删除失败`,
      {
        type: "error"
      });
  })
}

onMounted(async () => {
  onSearch();
});

</script>

<template>
  <div>
    <PureTableBar title="列表" @refresh="onSearch">
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog"
        >
          添加课程
        </el-button>
      </template>
      <el-table
        v-loading="loading"
        :data="dataList"
      >
        <el-table-column label="场馆ID" prop="gym_id"/>
        <el-table-column label="场馆名字" prop="gym_name"/>
        <el-table-column label="场馆地址" prop="gym_location"/>
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-popconfirm
              :title="`是否删除场馆id为${row.gym_id}的这条数据`"
              @confirm="handDelete(row)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  link
                  class="reset-margin"
                  :icon="useRenderIcon(Delete)"
                >
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">

</style>
