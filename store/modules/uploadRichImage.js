export default {
	namespaced:true,
	// state信息
	state:()=>{
		return {
			pictrue_list:[]
		}
	},
	mutations:{
		PICTRUE_CLEAR(state){
			state.pictrue_list=[];
		},
		PICTRUE_ADD(state,pictrue){
			state.pictrue_list = [...state.pictrue_list,pictrue]
		}
	}

}