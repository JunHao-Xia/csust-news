/**
 * 
	评论接口
 
 */

import request from '@/http/request.js'

export const getComments = (data)=>{
	return request({
		url:'/comments/query',
		data
	})
}

export const addComment = (data)=>{
	return request({
		url:'/comments/add',
		method:'POST',
		data
	})
}
//根据父id查找子评论
export const findChildComment = (data)=>{
	return request({
		url:'/reply/query',
		data
	})
}
