
const HISTORY_KEY = 'search_list'
export default {
	namespaced:true,
	state:()=>{
		return {
			listHistory:uni.getStorageSync(HISTORY_KEY) || []
		}
	},
	mutations:{
		//保存数据至location
		saveToHistory(state){
			uni.setStorage({
				key:HISTORY_KEY,
				data:state.listHistory
			})
		},
		//添加搜索记录 将直接将数据提至首部
		addSearchHistory(state,val){
			let index = state.listHistory.findIndex(item =>item ===  val);
			if(index !== -1){
				state.listHistory.splice(index,1);
			}
			state.listHistory.unshift(val);
			this.commit('searchHistory/saveToHistory');
		},
		//删除指定数据
		deleteHistory(state,index){
			state.listHistory.splice(index,1);
			//本地数据删除
			uni.setStorage({
				key:HISTORY_KEY,
				data:state.listHistory
			})
		},
		//删除所有的搜索记录
		deleteAllHistory(state){
			state.listHistory = []
			//本地数据清空
			uni.removeStorageSync(HISTORY_KEY);
		}

	}
	
}