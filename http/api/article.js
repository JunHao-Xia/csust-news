/**
 * 文章接口模块
 */
import request from '@/http/request.js'

//查询/分页所有文章
export const getArticleAll=({method,data})=>{
	return request({
		url:'/article/query',
		data
	});
}
//文章添加
export const addArticle = ({method,data})=>{
	return request({
		url:'/article/add',
		method:'POST',
		data
	});
}

//根据文章标题模糊查询   data:{k,v}
export const getArticleToContent = ({method,data})=>{
	return request({
		url:'article/query',
		data
	});
}
//查询文章详情
export const getArticleDetail=({data})=>{
	return request({
		url:'article/detail',
		data
	});
}


