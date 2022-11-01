const BASE_UTL = "https://kuim.xyz/hot_wall";
function request({url,method,data}){
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_UTL+url,
			method:method || 'GET',
			data,
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