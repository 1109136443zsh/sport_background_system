import {reactive} from "vue";
import {FormRules} from "element-plus";

export const formRules = reactive(<FormRules>{
  user_id: [{ required: true,message: "用户id为必填项", trigger: "blur"}],
  role_id: [{ required: true,message: "角色id为必填项", trigger: "blur"}],
  role_name: [{ required: true,message: "角色名称为必填项", trigger: "blur"}]
})
