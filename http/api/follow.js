
/**
 * 
 关注
 */
import request from '@/http/request.js'
//查询当前用户关注列表
export const isFollow = ()=>{
	return request({
		url:'/follow/query/uid'
	})
}

//关注
export const toFollow = ({data})=>{
	return request({
		url:'/follow/add',
		method:'POST',
		data
	})
}
//取消关注
export const cancelFollow = ({data})=>{
	return request({
		url:'/follow/del_follow',
		method:'DELETE',
		data
	})
}
//获取当前用户关注数量
export const getFollowCount=(data)=>{
	return request({
		url:'/follow/count/uid', 
		data
	})
}
//获取当前用户粉丝
export const getFansCount=(data)=>{
	return request({
		url:'/follow/count/fid', 
		data
	})
}

//获取当前用户关注作者信息
export const getFollowInfo=(data)=>{
	return request({
		url:'/follow/query', 
		data
	})
}