/**
 * 
 *热榜
 **/
import request from '@/http/request.js'

export const hotTopList = ({data})=>{
	return request({
		url:'ranking/hot',
		method:'',
		data
	})
}