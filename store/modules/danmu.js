const ARTICLE_LIST="danmu"
export default {
	namespaced:true,
	// state信息
	state:()=>{
		return {
			//弹幕是否开启
			isOpenDanmu:false
		}
	},
	mutations:{
		//弹幕状态上传至vuex
		danmuStateSave(state){
			state.isOpenDanmu=!state.isOpenDanmu;
		}
	}

}