
export default {
	namespaced:true,
	state:()=>{
		return {
		statusHeight:0,
		windowWidth:0,
		windowHeight:0	
		}
	},
	mutations:{
		updateSystemInfo(state,info){
			state.windowWidth=info.windowWidth;
			state.windowHeight=info.windowHeight;
			state.statusHeight=info.statusBarHeight;
		}
	},
	actions:{
		updateSystemInfo({commit}){
			let systemInfo = uni.getSystemInfoSync();
			console.log(systemInfo)
			commit('updateSystemInfo',systemInfo)
			
		}
		
	}
	
	
}