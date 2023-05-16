/**
 * 
 回复接口
 
 */

import request from '@/http/request.js'

export const addReply = (data)=>{
	return request({
		url:'/reply/add',
		method:'POST',
		data
	})
}
export const getApplyList = (data)=>{
	return request({
		url:'/reply/query',
		data
	})
}
