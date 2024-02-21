<script setup lang="ts">
import {useI18n} from "vue-i18n";
import Motion from "../utils/motion";
import ReQrcode from "@/components/ReQrcode";
import {useUserStoreHook} from "@/store/modules/user";
import {checkQrCodeLogin, qrCodeLogin} from "@/api/login";
import {onMounted, ref} from "vue";
import {setToken} from "@/utils/auth";
import {STATES} from "xgplayer";
import DESTROYED = STATES.DESTROYED;


// 二维码的内容
let text = ref("")
// 过期时间，总的秒数
let expire_code = null;
// 会话id，根据请求的状态码检查是否登录
let session_id = null;
// 倒计时的时间
let second = 180
// 定时器id
let timer = null
// 获取登录的状态码
let code = null
let token = null
let disable = ref(false)

function handleReturnButtonClick() {
  clearInterval(timer); // 清除计时器
  useUserStoreHook().SET_CURRENTPAGE(0); // 处理返回按钮的逻辑
}
async function checkLogin() {
  if (!timer && second === expire_code) {
    timer = setInterval(() => {
      second--
      checkQrCodeLogin(session_id).then(response => {
        code = response.code
        token = response.data.token
      })
      if (code === 200) {
        setToken(token)
        clearInterval(timer)
      }
      if (second < 1) {
        clearInterval(timer)
        second = expire_code
        disable.value = true
      }
    }, 1000)
  }
}

qrCodeLogin().then(response => {
  text.value = response.data.qrcode;
  expire_code = response.data.expire_time
  session_id = response.data.session_id;
  second = expire_code
  checkLogin()
});

async function disabledClick() {
  await qrCodeLogin().then(() => {
    disable.value = false
  })
}
async function getQrCode() {
  await qrCodeLogin()
}
onMounted(async () => {
  await getQrCode()
})

const {t} = useI18n();
</script>

<template>
  <Motion class="-mt-2 -mb-2">
    <ReQrcode :disabled="disable" :text="text" @disabled-click="disabledClick"/>
  </Motion>
  <Motion :delay="100">
    <el-divider>
      <p class="text-gray-500 text-xs">{{ t("login.tip") }}</p>
    </el-divider>
  </Motion>
  <Motion :delay="150">
    <el-button
      class="w-full mt-4"
      @click="handleReturnButtonClick"
    >
      {{ t("login.back") }}
    </el-button>
  </Motion>
</template>
