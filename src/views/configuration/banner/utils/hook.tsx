import {h, onMounted, ref, toRaw} from "vue";
import {message} from "@/utils/message";
import editForm from "@/views/configuration/banner/form/index.vue"
import {addBanner, deleteBanner, getBannerList, updateBanner} from "@/api/config";
import {FormItemProps} from "@/views/configuration/banner/form/types";
import {addDialog} from "@/components/ReDialog/index";
import {urlApi} from "@/api/utils";

export function useBanner() {
  const loading = ref(true)
  const dataList = ref();
  const formRef = ref()
  const columns: TableColumnList = [
    {
      label: "图片地址",
      prop: "image",
      cellRenderer: ({row}) => (
        <el-image
          fit="cover"
          preview-teleported={true}
          src={urlApi + row.image}
          preview-src-list={Array.of(urlApi + row.image)}
          class="w-[48px] h-[48px] align-middle"
        />
      )
    },
    {
      label: "跳转地址",
      prop: "url"
    },
    {
      label: "排序序号",
      prop: "sort"
    },
    {
      label: "是否启用",
      prop: "enable",
      minWidth: 90,
      cellRenderer: ({row, props}) => (
        <el-tag
          size={props.size}
          type={row.enable === false ? "danger" : ""}
          effect="plain"
        >
          {row.enable === true ? "启用" : "已禁用"}
        </el-tag>
      )
    },
    {
      label: "操作",
      fixed: "right",
      width: 180,
      slot: "operation"
    }
  ]

  function openDialog(title = "更新", row?: FormItemProps) {
    addDialog({
      title: `${title}轮播图`,
      props: {
        formInline: {
          title,
          index_banner_id: row?.index_banner_id ?? "",
          image: row?.image ?? "",
          url: row?.url ?? "",
          enable: row?.enable ?? "",
          sort: row?.sort ?? "",
          imageUrl: ""
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
            if (title === "更新") {
              updateBanner({
                index_banner_id: curData.index_banner_id,
                image: curData.imageUrl,
                url: curData.url,
                enable: curData.enable,
                sort: curData.sort
              }).then(() => {
                message(`更新轮播图成功`, {
                  type: "success"
                });
                done(); // 关闭弹框
                onSearch(); // 刷新表格数据
              }).catch(() => {
                message(`更新失败，请重试`,
                  {
                    type: "error"
                  });
              })
            } else {
              addBanner({
                image: curData.imageUrl,
                url: curData.url,
                sort: curData.sort
              }).then(() => {
                message(`添加轮播图成功`, {
                  type: "success"
                });
                done(); // 关闭弹框
                onSearch(); // 刷新表格数据
              }).catch((error) => {
                console.log(error)
                message(`添加失败，请重试`,
                  {
                    type: "error"
                  });
              })
            }
          }
        })
      },
    })
  }

  async function handleDelete(row) {
    await deleteBanner({
      index_banner_id: row.index_banner_id
    }).then(() => {
      message(`您成功删除了一条数据`,
        {
          type: "success"
        });
      onSearch();
    }).catch(() => {
      message("操作失败，请重试", {
        type: "error"
      })
    })
  }

  async function onSearch() {
    loading.value = true;
    await getBannerList().then(response => {
      if (response.code === 200) {
        dataList.value = response.data
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

  onMounted(async () => {
    onSearch()
  })

  return {
    columns,
    dataList,
    onSearch,
    openDialog
  }
}
