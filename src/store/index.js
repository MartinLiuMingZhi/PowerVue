import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'

const store = createStore({
  state(){
    return {
      //用户信息
      user: {}
    }
  },
  getters: {
  },
  mutations: {
    //记录用户信息
    SET_USERINFO(state,user){
      state.user = user
    }
  },
  actions: {
  },
  modules: {
  }
})

const app = createApp(App)
app.use(store)
export default store