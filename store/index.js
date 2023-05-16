import Vue from 'vue';
import Vuex from 'vuex'
Vue.use(Vuex) 
import users from './modules/users';
import searchHistory from './modules/searchHistory'
import uploadRichImage from './modules/uploadRichImage'
import readVideoHistory from './modules/readVideoHistory'
import danmu from './modules/danmu'
const store = new Vuex.Store({
	modules:{
		users,
		searchHistory,
		uploadRichImage,
		readVideoHistory,
		danmu
	}
})

export default store;