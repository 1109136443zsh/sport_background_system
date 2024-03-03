<script setup lang="ts">
import {FormProps} from "@/views/card/typeList/courseList/types";
import {h, onMounted, ref} from "vue";
import {addCardTypeCourseList, getCardTypeCourseList, removeCardTypeCourseList} from "@/api/card";
import {message} from "@/utils/message";
import PureTableBar from "@/components/RePureTableBar/src/bar";
import {useRenderIcon} from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-circle-line";
import {addDialog} from "@/components/ReDialog/index";
import editForm from "@/views/card/typeList/courseList/form/index.vue"
import Delete from "@iconify-icons/ri/delete-bin-7-line";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    card_type_id: 0,
    course_id: "",
    price: 0,
    price_info: "",
    subtitle: "",
    name: "",
    type: 1,
    id: 0
  })
});
const loading = ref(false)
const tableRef = ref()
const formRef = ref()
const dataList = ref()
const newFormInline = ref(props.formInline);
const columns: TableColumnList = [
  {
    label: "课程ID",
    prop: "course_id"
  },
  {
    label: "价格",
    prop: "price",
    cellRenderer: ({row}) => {
      const yuan = (row.price / 100).toFixed(2);
      return yuan
    },
    /*cellRenderer: ({row}) => {
      const amountInYuan = (row.price / 100).toFixed(2); // 将分转换为元，并保留两位小数
      return <span>{amountInYuan} </span>;
    }*/
  },
  {
    label: "价格介绍",
    prop: "price_info"
  },
  {
    label: "小标题",
    prop: "subtitle"
  },
  {
    label: "课程名",
    prop: "name"
  },
  {
    label: "课程类型",
    prop: "type"
  },
  {
    label: "会员卡课程关联ID",
    prop: "id"
  },
  {
    label: "操作",
    slot: "operation",
    fixed: "right"
  }
]

async function onSearch() {
  loading.value = true
  await getCardTypeCourseList({
    card_type_id: newFormInline.value.card_type_id
  }).then(response => {
    console.log(response)
    if (response.code === 200) {
      dataList.value = response.data
      setTimeout(() => {
        loading.value = false;
      }, 500);
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
}

function openDialog() {
  addDialog({
    title: "添加课程",
    props: {
      formInline: {
        card_type_id: newFormInline.value.card_type_id,
        course_id: "",
      }
    },
    width: "46%",
    draggable: true,
    fullscreenIcon: true,
    closeOnClickModal: false,
    contentRenderer: () => h(editForm, {ref: formRef}),
    beforeSure: (done, {options}) => {
      const FormRef = formRef.value.getRef()
      const curData = options.props.formInline;
      FormRef.validate(valid => {
        if (valid) {
          addCardTypeCourseList({
            card_type_id: curData.card_type_id,
            course_id: curData.course_id
          }).then(response => {
            if (response.code === 200) {
              message(`成功添加`, {
                type: "success"
              });
              done();
              onSearch()
            } else {
              message(`出错了`, {
                type: "error"
              });
            }
          }).catch(error => {
            console.log(error)
            message(`添加课程失败`, {
              type: "error"
            });
          })
        }
      })
    },
  })
}

async function handDelete(row) {
  await removeCardTypeCourseList({
    id: row.id
  }).then((res) => {
    if (res.code === 200) {
      message(`您删除了课程名称为${row.name}的这条数据`,
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
      {type: "error"});
  })
}

onMounted(async () => {
  await onSearch();
});
</script>

<template>
  <div>
    <PureTableBar
      title="列表"
      :columns="columns"
      @refresh="onSearch"
    >
      <template #buttons>
        <el-button
          type="primary"
          :icon="useRenderIcon(AddFill)"
          @click="openDialog"
        >
          添加课程
        </el-button>
      </template>
      <template v-slot="{size, dynamicColumns}">
        <pure-table
          ref="tableRef"
          adaptive
          :data="dataList"
          :size="size"
          :loading="loading"
          :columns="dynamicColumns"
          align-whole="center"
          table-layout="auto"
          :header-cell-style="{
              background: 'var(--el-fill-color-light)',
              color: 'var(--el-text-color-primary)'
            }"
        >
          <template #operation="{ row }">
            <el-popconfirm
              :title="`是否解除绑定课程ID为${row.course_id}的这条数据`"
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
        </pure-table>
      </template>
    </PureTableBar>
  </div>
</template>

<style scoped lang="scss">

</style>
