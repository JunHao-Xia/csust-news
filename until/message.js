
	//消息模块
export default function showMessage(title,icon,success){
		uni.showToast({
			title,
			icon:icon || 'none',
			success:success || ''
		})
	}
