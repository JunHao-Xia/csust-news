
export default {
	namespaced:true,
	state:()=>{
		return {
		statusHeight:0,
		windowWidth:0,
		windowHeight:0,
		//获取底部安全距离
		safeAreaInsets:40,
		
		}
	},
	mutations:{
		updateSystemInfo(state,info){
			state.windowWidth=info.windowWidth;
			state.windowHeight=info.windowHeight;
			state.statusHeight=info.statusBarHeight;
			state.safeAreaInsets = info.safeAreaInsets.top;
		}
	},
	actions:{
		updateSystemInfo({commit}){
			let systemInfo = uni.getSystemInfoSync();
			commit('updateSystemInfo',systemInfo)
			
		}
		
	}
	
	
}