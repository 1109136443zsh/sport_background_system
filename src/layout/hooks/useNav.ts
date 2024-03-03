import { storeToRefs } from "pinia";
import { getConfig } from "@/config";
import { useRouter } from "vue-router";
import { emitter } from "@/utils/mitt";
import userAvatar from "@/assets/user.jpg";
import { getTopMenu } from "@/router/utils";
import {storageLocal, useGlobal} from "@pureadmin/utils";
import type { routeMetaType } from "../types";
import { transformI18n } from "@/plugins/i18n";
import { router, remainingPaths } from "@/router";
import {computed, type CSSProperties, h, ref} from "vue";
import { useAppStoreHook } from "@/store/modules/app";
import { useUserStoreHook } from "@/store/modules/user";
import { useEpThemeStoreHook } from "@/store/modules/epTheme";
import { usePermissionStoreHook } from "@/store/modules/permission";
import {addDialog} from "@/components/ReDialog/index";
import {updateGym} from "@/api/gym";
import {message} from "@/utils/message";
import {getUserSelf} from "@/api/admin/user";
import gymForm from "@/layout/components/form/gym/index.vue"
import coachForm from "@/layout/components/form/coach/index.vue"
import {DataInfo, userKey} from "@/utils/auth";
import {updateCoach} from "@/api/coach/coach";

const errorInfo = "当前路由配置不正确，请检查配置";

export function useNav() {
  const pureApp = useAppStoreHook();
  const routers = useRouter().options.routes;
  const { wholeMenus } = storeToRefs(usePermissionStoreHook());
  /** 平台`layout`中所有`el-tooltip`的`effect`配置，默认`light` */
  const tooltipEffect = getConfig()?.TooltipEffect ?? "light";

  const getDivStyle = computed((): CSSProperties => {
    return {
      width: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      overflow: "hidden"
    };
  });

  /** 用户名 */
  const username = computed(() => {
    return useUserStoreHook()?.username;
  });

  /** 设置国际化选中后的样式 */
  const getDropdownItemStyle = computed(() => {
    return (locale, t) => {
      return {
        background: locale === t ? useEpThemeStoreHook().epThemeColor : "",
        color: locale === t ? "#f4f4f5" : "#000"
      };
    };
  });

  const getDropdownItemClass = computed(() => {
    return (locale, t) => {
      return locale === t ? "" : "dark:hover:!text-primary";
    };
  });

  const avatarsStyle = computed(() => {
    return username.value ? { marginRight: "10px" } : "";
  });

  const isCollapse = computed(() => {
    return !pureApp.getSidebarStatus;
  });

  const device = computed(() => {
    return pureApp.getDevice;
  });

  const { $storage, $config } = useGlobal<GlobalPropertiesApi>();
  const layout = computed(() => {
    return $storage?.layout?.layout;
  });

  const title = computed(() => {
    return $config.Title;
  });

  /** 动态title */
  function changeTitle(meta: routeMetaType) {
    const Title = getConfig().Title;
    if (Title) document.title = `${transformI18n(meta.title)} | ${Title}`;
    else document.title = transformI18n(meta.title);
  }

  /** 退出登录 */
  function logout() {
    useUserStoreHook().logOut();
  }

  const formRef = ref()
  function openUpdateDialog() {
    const role = storageLocal().getItem<DataInfo<number>>(userKey)?.role ?? "";
    let ids = null
    getUserSelf().then(response => {
      if (response.code === 200) {
        ids = response.data
        if (role === "场馆"){
          addDialog({
            title: "更新场馆信息",
            props: {
              formInline: {
                gym_id: ids.gym_id,
                name: ids.name,
                rate_id: ids.rate_id,
                info: ids.info,
                banner: ids.banner,
                begin_time: ids.begin_time,
                end_time: ids.end_time,
                location: ids.location,
                longitude: ids.longitude,
                latitude: ids.latitude,
                url: "",
                tags: ids.tags
              }
            },
            width: "46%",
            draggable: true,
            fullscreenIcon: true,
            closeOnClickModal: false,
            contentRenderer: () => h(gymForm, {ref: formRef}),
            beforeSure: (done, {options}) => {
              const FormRef = formRef.value.getRef();
              const curData = options.props.formInline;
              FormRef.validate(valid => {
                if (valid) {
                  updateGym(
                    {
                      gym_id: curData.gym_id,
                      name: curData.name,
                      rate_id: curData.rate_id,
                      info: curData.info,
                      banner: curData.url,
                      begin_time: curData.begin_time,
                      end_time: curData.end_time,
                      location: curData.location,
                      longitude: curData.longitude,
                      latitude: curData.latitude
                    }
                  ).then(() => {
                    message(`成功更新场馆信息`, {
                      type: "success"
                    });
                    done();
                  }).catch(() => {
                    message(`更新场馆信息失败`, {
                      type: "error"
                    });
                  })
                }
              })
            },
          })
        } else if (role === "教练") {
          /*addDialog({
            title: "更新教练信息",
            props: {
              formInline: {
                name: ids.name ?? "",
                coach_id: ids.coach_id ?? "",
                skill: ids.skill,
                gender_limit: ids.gender_limit ?? "",
                rate_id: ids.rate_id ?? "",
                info: ids.info ?? "",
                banner: ids.banner ?? "",
                coachCase: ids.coachCase ?? "",
                url: ""
              }
            },
            width: "46%",
            draggable: true,
            fullscreenIcon: true,
            closeOnClickModal: false,
            contentRenderer: () => h(coachForm, {ref: formRef}),
            beforeSure: (done, { options}) => {
              const FormRef = formRef.value.getRef();
              const curData = options.props.formInline;
              FormRef.validate(valid => {
                if (valid) {
                  console.log(curData.url)
                  updateCoach({
                    coach_id: curData.coach_id,
                    name: curData.name,
                    rate_id: curData.rate_id,
                    skill: curData.skill,
                    info: curData.info,
                    banner: curData.url,
                    coachCase: curData.coachCase,
                    gender_limit: curData.gender_limit
                  }).then((res) => {
                    console.log(res)
                    if (res.code === 200) {
                      message(`成功更新教练信息`, {
                        type: "success"
                      });
                      done();
                    } else {
                      message(`更新教练信息失败`, {
                        type: "error"
                      });
                    }
                  }).catch(() => {
                    message(`更新教练信息失败`, {
                      type: "error"
                    });
                  })
                }
              })
            },
          })*/
        }
      }
    })
  }

  function backTopMenu() {
    router.push(getTopMenu()?.path);
  }

  function onPanel() {
    emitter.emit("openPanel");
  }

  function toggleSideBar() {
    pureApp.toggleSideBar();
  }

  function handleResize(menuRef) {
    menuRef?.handleResize();
  }

  function resolvePath(route) {
    if (!route.children) return console.error(errorInfo);
    const httpReg = /^http(s?):\/\//;
    const routeChildPath = route.children[0]?.path;
    if (httpReg.test(routeChildPath)) {
      return route.path + "/" + routeChildPath;
    } else {
      return routeChildPath;
    }
  }

  function menuSelect(indexPath: string) {
    if (wholeMenus.value.length === 0 || isRemaining(indexPath)) return;
    emitter.emit("changLayoutRoute", indexPath);
  }

  /** 判断路径是否参与菜单 */
  function isRemaining(path: string) {
    return remainingPaths.includes(path);
  }

  /** 获取`logo` */
  function getLogo() {
    return new URL("/logo.svg", import.meta.url).href;
  }

  return {
    title,
    device,
    layout,
    logout,
    routers,
    $storage,
    backTopMenu,
    onPanel,
    getDivStyle,
    changeTitle,
    toggleSideBar,
    menuSelect,
    handleResize,
    resolvePath,
    getLogo,
    isCollapse,
    pureApp,
    username,
    userAvatar,
    avatarsStyle,
    tooltipEffect,
    getDropdownItemStyle,
    getDropdownItemClass,
    openUpdateDialog
  };
}
