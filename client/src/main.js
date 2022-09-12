import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import "@/assets/font/iconfont.css"
import api from "@/api"
import msg from '@/components/Message.vue';//不加.vue后缀会报错：Module not found: Error:CaseSensitivePathsPlugin]

Vue.use(msg)

Vue.config.productionTip = false
Vue.prototype.$api = api
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')