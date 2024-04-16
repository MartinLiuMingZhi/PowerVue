<template>
  <el-row style="min-height: 100vh" class="bg-indigo-500">
    <el-col :lg="16" :md="12" class="flex items-center justify-center">
      <div>
        <div class="font-bold text-5xl text-light-50 mb-4">欢迎光临</div>
        <div class="text-gray-200 text-sm text-2xl">核电探伤后台管理中心</div>
      </div>
    </el-col>
    <el-col :lg="8" :md="12" class="bg-indigo-50 flex items-center justify-center flex-col">
      <h2 class="font-bold text-3xl text-gray-800">欢迎回来</h2>
      <div class="flex items-center justify-center my-5 text-gray-300 space-x-2">
        <span class="h-[1px] w-16 bg-gray-200"></span>
        <div>账号密码登录</div>
        <span class="h-[1px] w-16 bg-gray-200"></span>
      </div>
      <el-form :model="user" :rules="rules" ref="loginRef" class="w-[250px]">
        <el-form-item prop="username">
          <el-input prefix-icon="User" size="default" placeholder="请输入账号" v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="Lock" size="default" show-password placeholder="请输入密码" v-model="user.password" ></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <div style="display: flex">
            <el-input prefix-icon="CircleCheck" size="default" style="flex: 1" placeholder="验证码" v-model="user.code"></el-input>
            <div style="flex: 1;height: 36px">
              <valid-code @update:value="getCode"/>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round color="#626aef" style="width: 100%" @click="login(loginRef)">登录</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import ValidCode from "../components/ValidCode.vue"
import {ElMessage} from 'element-plus'
import type {FormInstance} from 'element-plus'
import { reactive, ref } from 'vue'
import router from "@/router"

const loginRef = ref<FormInstance>();
const validCode = ref("");

const getCode = (code:any) =>{
  console.log(code)
  validCode.value = code.toLowerCase()
}
  // 验证码校验
const validateCode = (rule:any, value:any, callback:any) => {
  if (value === '') {
    callback(new Error('请输入验证码'))
  } else if (value.toLowerCase() !== validCode.value) {
    callback(new Error('验证码错误'))
  } else {
    callback()
  }
}

const user = reactive({
  username:'',
  password:'',
  code:'',
})

const rules = reactive({
  username: [
    { required:true,message:'请输入账号', trigger: 'blur' },
    { min:5,max:8,message:'账号长度为5到8位',trigger:'blur'}],
  password: [
    { required:true,message:'请输入密码', trigger: 'blur' },
    {min:8,max:16,message:'密码长度为8到16位',trigger:'blur'}],
  code: [{ validator: validateCode, trigger: 'blur' }],
})

const login = (formEl: FormInstance | undefined) =>{
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid){
      // Login({ username: user.username, password: user.password }).then(res =>{
      //   if (res.data.code === '200'){
      //     console.log(res);
      //     //将token进行报存
      //     localStorage.setItem('token',JSON.stringify(res.data.data));
      //     console.log(document.cookie)
      //     ElMessage.success("登陆成功");
      //     //跳转界面
      //     router.push('/home')
      //     console.log("登录成功")
      //   }else {
      //     console.log(res)
      //     ElMessage.error(res.data.message)
      //   }
      // })
      if (user.username == "admin"&& user.password=="12345678"){
        router.replace('/home')
        console.log("登陆成功")
      }
    }else {
      console.log("登录失败")
      return false
    }
  })
}
</script>

<style scoped lang="scss">

</style>