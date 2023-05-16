/**
 * 用户接口
 */

import request from '@/http/request.js'

export const login = (data)=>{
	return request({
		url:'/user/login',
		method:'post',
		data
	})
}
// 更新用户头像
export const updateAvatar = (data)=>{
	return request({
		url:'/user/update/picture',
		method:'post',
		data
	})
}
//修改用户其他信息
export const updateUser = (data)=>{
	return request({
		url:'/user/update',
		method:'PUT',
		data
	})
}

//查询用户信息通过
export const findUserInfo=(data)=>{
		return request({
			url:'/user/info',
			data
		})
}