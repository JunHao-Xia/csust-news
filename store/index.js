//导入Vue和VueX
import Vue from 'vue'
import Vuex from 'vuex'
//导入系统相关信息
import systemInfo from './modules/systemInfo'
//安装Vuex
Vue.use(Vuex)

const store = new Vuex.Store({
	modules:{
		systemInfo
	}
})

export default store;