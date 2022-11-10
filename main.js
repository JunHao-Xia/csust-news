import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import api from '@/http/api/index.js'
import message from '@/until/message.js'
Vue.prototype.$msg = message
Vue.prototype.$api = api;
import store from './store'
Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import store from './store'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif