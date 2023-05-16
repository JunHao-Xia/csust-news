import {
		mapMutations
	} from 'vuex'
export const userUpdateMixin={
	methods:{
		...mapMutations('users', ['USERINFO_LOCATION', 'SET_USERINFO_SINGLE']),
		/**
		 * type：键名
		 * value：值
		 */
		updateUserInfo(type,value){
			let userInfo = JSON.parse(uni.getStorageSync('userInfo') || '{}') 
			const user = this.$_.cloneDeep(userInfo);
			user[type] = value;
			this.USERINFO_LOCATION(user);
			this.SET_USERINFO_SINGLE(user);
		}
	}
}