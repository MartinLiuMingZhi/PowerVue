import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'windi.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import * as echarts from 'echarts';//引入echarts
import './assets/css/iconfont/iconfont.css'


const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus,{
    locale:zhCn
})
app.use(router)
app.mount('#app')
app.config.globalProperties.$axios = axios;
axios.defaults.withCredentials = true
app.config.globalProperties.$echarts = echarts;//全局使用
