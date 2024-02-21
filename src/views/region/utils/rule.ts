import {FormRules} from "element-plus";
import {reactive} from "vue";

export const formRules = reactive(<FormRules>{
  name: [{required: true, message: "区域名称为必填项", trigger: "blur"}]
})
