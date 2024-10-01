<template>
  <el-button type="primary" @click="login">{{text}}</el-button>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";

const x = ref(false)
const text = ref("系统信息")
  const  login = () =>{
    x.value = !x.value
    console.log(x.value)
    if (x.value) text.value = "关闭"
    else text.value = "系统信息"
  }
</script>

<style scoped lang="scss">

</style>