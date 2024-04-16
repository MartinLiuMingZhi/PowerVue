import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      meta:{name:'登录'},
      component: () => import('../views/LoginView.vue'),
    },
    {
      path:'/home',
      name:'home',
      meta:{name:'主页'},
      redirect:'/default',
      component: () => import('../views/HomeView.vue'),
      children:[
          {
            path:'/default',
            name:'default',
            meta:{name:'告警中心'},
            component: () => import('../views/DefaultView.vue'),
          },
          {
            path:'/capture',
            name:'capture',
            meta:{name:'抓拍记录'},
            component: () => import('../views/CaptureView.vue'),
          },
          {
            path:'/device',
            name:'device',
            meta:{name:'设备管理'},
            component: () => import('../views/DeviceView.vue'),
          },
          {
            path:'/people',
            name:'people',
            meta:{name: '人员管理'},
            component: () => import('../views/PeopleView.vue'),
          },
          {
            path:'/user',
            name:'user',
            meta:{name: '用户管理'},
            component: () => import('../views/UserView.vue'),
          },
          {
            path:'/map',
            name:'name',
            meta:{name:'地图管理' },
            component: () => import('../views/MapView.vue'),
          },
          {
            path:'/system',
            name:'system',
            meta:{name: '系统信息'},
            component: () => import('../views/SystemView.vue'),
          },
          {
            path:'/log',
            name:'log',
            meta:{name: '日志查询'},
            component: () => import('../views/LogView.vue'),
          }
      ]
    },
    {
      path:'/:pathMatch(.*)*',
      name:'NotFound',
      meta:{name:'无法访问'},
      component: () => import('../views/NotFoundView.vue'),
    },
  ]
})

export default router
