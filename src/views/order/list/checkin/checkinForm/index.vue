<script setup lang="ts">

import {FormProps} from "@/views/order/list/checkin/types";
import {ref} from "vue";

const props = withDefaults(defineProps<FormProps>(), {
  formInline: () => ({
    checkin_code: "",
    checkin_fast: ""
  })
})
const newFormInline = ref(props.formInline);

</script>

<template>
  <div>test</div>
</template>

<style scoped lang="scss">

</style>
