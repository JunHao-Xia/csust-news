/**
 * 类被接口
 */

import request from '@/http/request.js'

//获取全部类别
export const getCategory = ({data})=>{
	return request({
		url:'/category/add',
		data
	})
}