
const TOKEN = "token";
const USERINFO='userInfo';
export default {
	namespaced:true,
	state:()=>{
		return {
			//用户token
			token:uni.getStorageSync(TOKEN)||'',
			//用户
			userInfo:uni.getStorageSync(USERINFO)|| {},
		}
	},
	getters:{
		isLogin(state){
			if(state.token) return  true;
			return false
		}
	},
	mutations:{
		//设置相关用户信息
		SET_USERINFO(state,[token,userInfo]){
			state.token = token;
			state.isLogin =true;
			this.commit('users/TOKEN_LOCATION',token)
			this.commit('users/USERINFO_LOCATION',userInfo)
		},
		LOGOUT(state){
			state.token='';
			state.userInfo={};
			this.commit('users/TOKEN_CLEAR');
			this.commit('users/USERINFO_CLEAR');
		},
		//将token持久化
		TOKEN_LOCATION(state,token){
			uni.setStorage({
				key:TOKEN,
				data:token
			})
		},
		//将userinfo持久化
		USERINFO_LOCATION(state,userInfo){
			uni.setStorage({
				key:USERINFO,
				data:JSON.stringify(userInfo)
			})
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
		//登录
		user_login({commit},[token,userInfo]){
			this.commit('users/SET_USERINFO',[token,userInfo])
		},
		//退出登录
		user_logout(){
			this.commit('users/LOGOUT')
		},
		async isLogin({getters}){
			if(getters.isLogin) return true;
			let [err,res] = await uni.showModal({
				title:'登录之后完成后续操作',
				content:'立即跳转登陆界面?'
			})
			if(res.confirm){
				uni.navigateTo({
					url:'/subpkg/pages/login-pages/login-pages'
				})
			}
			return false
			
			
		}
		
	}
	
	
}