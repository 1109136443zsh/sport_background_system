import {reactive} from "vue";
import {FormRules} from "element-plus";

export const formRules = reactive(<FormRules>{
  user_id: [{ required: true,message: "用户id为必填项", trigger: "blur"}]
})
