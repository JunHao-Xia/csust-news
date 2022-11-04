/**
 * 用户接口
 */

import request from '@/http/request.js'

export const login = ({data})=>{
	return request({
		url:'/user/login',
		method:'post',
		data
	})
}