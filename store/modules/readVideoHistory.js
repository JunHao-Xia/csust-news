const ARTICLE_LIST="article_list"
const VIDEO_LIST="video_list"
export default {
	namespaced:true,
	// state信息
	state:()=>{
		return {
			readArticleHistory:uni.getStorageSync(ARTICLE_LIST) || [],
			videoHistory:uni.getStorageSync(VIDEO_LIST) || []
		}
	},
	mutations:{
		//保存文章历史在本地
		articleHistory_location(state){
			uni.setStorage({
				key:ARTICLE_LIST,
				data:state.readArticleHistory
			})
		},
		//保存视频历史在本地
		videoHistory_location(state){
			uni.setStorage({
				key:VIDEO_LIST,
				data:state.videoHistory
			})
		},
		//文章历史添加
		articleHistory_add(state,id){
			state.readArticleHistory.push(id);
			this.commit('readVideoHistory/articleHistory_location');
		},
		//视频历史添加
		videoHistory_add(state,id){
			const flag = state.videoHistory.some((item)=>item===id);
			if(!flag){
				state.videoHistory.push(id);
			}
			this.commit('readVideoHistory/videoHistory_location');
		},
	}

}