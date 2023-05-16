// https://kuim.xyz/hot_wall
// mock地址：口根地址https://www.fastmock.site/mock/761841793d1bd9bc082fc7fad95a88ce/hot_wall
const BASE_UTL = "https://kuim.xyz/hot_wall";
function request({url,method,data}){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_UTL+url,
			method:method || 'GET',
			data,
			header:{
			'user-token':uni.getStorageSync('token')
			},
			success:({data})=>{
				if(data.code ===0){
					resolve(data)
				}else{
					uni.showToast({
					    title: data.msg,
					    icon: 'none',
					    mask: true,
					    duration: 3000
					    });
						reject(data.msg)
				}
			},
			fail: (err) => {
				reject(err)
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}
export default request;