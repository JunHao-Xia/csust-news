const TOKEN = "token";
const USERINFO = "userInfo";
export default {
	namespaced:true,
	// state信息
	state:()=>{
		return {
			//token
			token:uni.getStorageSync(TOKEN) || '',
			//用户信息
			userInfo:JSON.parse(uni.getStorageSync(USERINFO) || '{}') 
		}
	},
	// getter
	getters:{
		isLoginFlag(state){
			if(!state.token){
				return false
			}
			return true
		}
		
	},
	mutations:{
		// 设置相关用户信息
		SET_USERINFO(state,[token,userInfo]){
			state.token = token;
			state.userInfo = userInfo;
			this.commit('users/TOKEN_LOCATION',token);
			this.commit('users/USERINFO_LOCATION',userInfo)
		},
		// 退出登录
		LOGOUT(state){
			state.userInfo={};
			state.token = '';
			this.commit('users/TOKEN_CLEAR');
			this.commit('users/USERINFO_CLEAR')
		},
		//将token持久化
		TOKEN_LOCATION(state,token){
			uni.setStorageSync(TOKEN,token)
		},
		SET_USERINFO_SINGLE(state,userInfo){
			state.userInfo = userInfo;
		},
		//将userInfo持久化
		USERINFO_LOCATION(state,userInfo){
			uni.setStorageSync(USERINFO,JSON.stringify(userInfo))
		},
		//将本地token删除
		TOKEN_CLEAR(state){
			uni.removeStorage({
				key:TOKEN
			})
		},
		//将本地用户对象删除
		USERINFO_CLEAR(state){
			uni.removeStorage({
				key:USERINFO
			})
		}
		
	},
	actions:{
		user_logout({commit}){
			this.commit('users/LOGOUT')
		},
		//登录
		user_login({commit},[token,userInfo]){
			this.commit('users/SET_USERINFO',[token,userInfo])
		},
		isLogin({state}){
			if(!state.token){
				uni.navigateTo({
					url:'/subpkg/pages/user-login/user-login'
				})
				return false;
			}else{
				return true;
			}
			
		}
		
	}
}