import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 用的技术：vue + elementui + axios + vuex + router

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 引入common.css
import './css/common.css'
// 引入axios
// import axios from 'axios'
// Vue.prototype.$axios = axios
import {get,post} from './http'
Vue.prototype.$get = get
Vue.prototype.$post = post
// // 引入axios
// import {get, post} from './http'
// Vue.prototype.$get = get
// Vue.prototype.$post = post


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
