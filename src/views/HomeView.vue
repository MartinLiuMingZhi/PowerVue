<template>
  <div>
    <el-container>
      <!--      侧边栏-->
      <el-aside :width="asideWidth" style="min-height: 100vh; background-color:#478cf1">
        <div style="height: 60px;color: white;display: flex;align-items: center;justify-content: center">
<!--          <img src="../../assets/logo.png" alt="" style="width: 40px;height: 40px;">-->
          <!--          <transition name="el-fade-in-linear">-->
          <!--            <span style="margin-left: 5px;font-size: 15px" v-show="!isCollapse">校园商城购物平台</span>-->
          <!--          </transition>-->
          <span class="logo-title" v-show="!isCollapse">智能预警管理平台</span>
        </div>
        <el-menu
            :collapse="isCollapse"
            router
            background-color="#478cf1"
            text-color="rgba(255,255,255,0.65)"
            active-text-color="rgb(64, 158, 255)"
            style="border: none"
            :default-active="$route.path">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><i class="iconfont icon-alarm"></i></el-icon>
              <span>告警中心</span>
            </template>
            <el-menu-item index="/default">
              <el-icon><Histogram /></el-icon>
              <span>报警记录</span>
            </el-menu-item>
            <el-menu-item index="/capture">
              <el-icon><Histogram /></el-icon>
              <span>抓拍记录</span>
            </el-menu-item>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>系统管理</span>
            </template>
            <el-menu-item index="/device">
              <el-icon><Histogram /></el-icon>
              <span>设备管理</span>
            </el-menu-item>
            <el-menu-item index="/people">
              <el-icon><Histogram /></el-icon>
              <span>人员管理</span>
            </el-menu-item>
            <el-menu-item index="/user">
              <el-icon><Histogram /></el-icon>
              <span>用户管理</span>
            </el-menu-item>
            <el-menu-item index="/map">
              <el-icon><Histogram /></el-icon>
              <span>地图管理</span>
            </el-menu-item>
            <el-menu-item index="/system">
              <el-icon><Histogram /></el-icon>
              <span>系统信息</span>
            </el-menu-item>
          </el-sub-menu>
          <el-menu-item index="/log">
            <el-icon><i class="iconfont icon-log"></i></el-icon>
            <span>日志查询</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <!--        头部区域-->
        <el-header style="height: 60px; line-height: 60px; display: flex; align-items: center; box-shadow: 2px 0 6px rgba(0, 21, 41, .35);">
          <el-icon :size="26" @click="handleCollapse">
            <Component :is="collapseIcon"></Component>
          </el-icon>
          <el-breadcrumb separator="/" style="margin-left: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{path:$route.path}">{{$route.meta.name}}</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="flex: 1;width: 0;display:flex;align-items: center;justify-content: flex-end">
            <i class="iconfont icon-fullScreen" style="font-size: 26px" @click="handleFull"></i>
            <el-dropdown placement="bottom">
              <div style="display: flex;align-items: center;cursor: default;padding: 10px">
<!--                <el-avatar :size="40" :src="user.avatar" style="margin: 0 5px"/>-->
<!--                <span style="font-weight: bold;">{{user.username}}</span>-->
                <span style="font-weight: bold;">admin</span>
                <el-icon><CaretBottom /></el-icon>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="router.push('/password')">修改密码</el-dropdown-item>
                  <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

          </div>
        </el-header>
        <!--        主体区域-->
        <el-main >
          <router-view @update:user="updateUser"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref, toRefs} from "vue";
import {Goods, GoodsFilled, Setting} from "@element-plus/icons-vue";
import router from "@/router";

const isCollapse = ref(false)
const asideWidth = ref('200px')
const collapseIcon = ref('Fold')

const handleCollapse = () => {
  isCollapse.value = !isCollapse.value;
  asideWidth.value = isCollapse.value? '64px':'200px'
  collapseIcon.value = isCollapse.value? 'Expand':'Fold'
  console.log("点击了")
}
const user = JSON.parse(localStorage.getItem('token')||'{}')

// const user = reactive({
//   circleUrl : 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
//   name: ''
// })
// const {circleUrl} = toRefs(user)
const handleFull = () => {
  document.documentElement.requestFullscreen()
}

const logout = () =>{
  // Logout().then(res =>{
  //   console.log(res)
  //   if (res.data.code === 200){
  //     console.log("账号退出成功")
  //     router.push('/login')
  //   }else {
  //     console.log("账号退出失败")
  //   }
  // })
  // router.push('/login')
  router.replace('/login')
}

const updateUser = (new_user:any) =>{
  user.value = new_user
}

</script>

<style scoped lang="scss">
.el-menu--inline{
  background-color: #8ca7f1 !important;
}
.el-menu--inline .el-menu-item{
  background-color: #8ca7f1 !important;
}
.el-menu-item:hover, .el-sub-menu__title:hover{
  color: #ffffff !important;
}
.el-sub-menu__title:hover i{
  color: #ffffff !important;
}

//.el-menu-item.is-active{
//  background-color: #478cf1 !important;
//  border-radius: 10px !important;
//  margin: 20px !important;
//}
.el-menu-item{
  height: 50px !important;
  line-height: 50px !important;
}
.el-sub-menu__title{
  height: 50px !important;
  line-height: 50px !important;
}
.el-aside{
  transition: width .2s;
  box-shadow: 2px 0 6px rgba(48, 169, 220, 0.8);
}
.logo-title{
  margin-left: 5px;
  font-size: 15px;
  transition: all .2s;
}
.el-head{
  box-shadow: 2px 0 6px rgba(48, 169, 220, 0.8);
  display: flex;
  align-items: center;
}
</style>