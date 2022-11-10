/**
 * 类被接口
 */

import request from '@/http/request.js'

//获取全部类别
export const getCategory = ()=>{
	return request({
		url:'/category/query'
	})
}