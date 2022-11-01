const TOKEN = "token";
const USERINFO='userInfo';
export default {
	namespaced:true,
	state:()=>{
		return {
			//用户token
			token:'',
			//用户
			userInfo:{}
		}
	},
	mutations:{
		//设置token
		SET_TOKEN(state,token){
			state.token = token;
			this.commit('users/TOKEN_LOCATION',token)
		},
		//设置用户信息
		SET_USERINFO(state,userInfo){
			state.userInfo = userInfo;
			this.commit('users/USERINFO_LOCATION',userInfo)
		},
		//将token持久化
		TOKEN_LOCATION(state,token){
			uni.setStorageSync(TOKEN,token);
		},
		//将userinfo持久化
		USERINFO_LOCATION(state,userInfo){
			uni.setStorageSync(USERINFO,userInfo);
		}
	},
	actions:{
		//登录逻辑
		user_login({commit},userInfo){
			uni.login({
				provider: 'weixin',
				success:async ({code}) => {
					let {token} = await this.$api.login({
						data:{
							code
						}
					})
					this.commit('users/SET_TOKEN',token);
					this.commit('users/SET_USERINFO',userInfo);
				}
			})
		}
		
	}
	
	
}