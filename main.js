import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import uView from '@/uni_modules/uview-ui'
import api from '@/http/api/index.js'
import message from '@/until/index.js'
import _ from 'lodash'
import store from './store'
Vue.config.productionTip = false
Vue.prototype.$api = api;
Vue.prototype.$msg = message
Vue.prototype.$_=_;
Vue.use(uView)
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif