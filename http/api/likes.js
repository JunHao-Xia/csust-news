/**
 * 点赞接口
 */

import request from '@/http/request.js'
export const isLike = (data)=>{
	return request({
		url:'/likes/info',
		data
	})
}
//点赞
export const toLike = ({data})=>{
	return request({
		url:'/likes/add',
		method:'POST',
		data
	})
}

//取消点赞
export const cancelLike = ({data})=>{
	return request({
		url:'/likes/del_follow',
		method:'DELETE',
		data
	})
}