/**
 * 点赞接口
 */

import request from '@/http/request.js'
export const isLike = ({data})=>{
	return request({
		url:'/likes/info',
		data
	})
}