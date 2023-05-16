/**
 * 收藏接口
 * */
 
 import request from '@/http/request.js'
 export const isCollect = (data)=>{
 	return request({
 		url:'/collection/article',
 		data
 	})
 }
 
 
 //收藏
 export const toCollect = ({data})=>{
 	return request({
 		url:'/collection/add',
 		method:'POST',
 		data
 	})
 }
 
 //取消收藏
 export const cancelCollect = ({data})=>{
 	return request({
 		url:'/collection/cancel?aid='+data.aid,
 		method:'DELETE',
 	})
 }
 
 //用户查看自己的收藏
 
 export const getOurselfCollect = (data)=>{
 	return request({
 		url:'/collection/query/uid',
		data
 	})
 }