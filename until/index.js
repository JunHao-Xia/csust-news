//消息模块
export default function showMessage(title, icon, success) {
		uni.showToast({
			title,
			icon: icon || 'none',
			success: success || ''
		})
	}
export function pictrueListChangeMode(list) {
		list.map(item => {
			let picList = item.picture_list;
			if (picList === null || picList === '[]'){
				console.log(1);
				item.mode='base';
				return;
			}
			let res = picList.replace(/\[|]/g, '').split(',')
			item.picture_list = res;
			if (res.length <= 2) {
				item.mode = "image"
			} else {
				item.mode = 'column';
			}
		})
		return list;
	}

export  function getRandomColor() {
            const rgb = []
            for (let i = 0; i < 3; ++i) {
                let color = Math.floor(Math.random() * 256).toString(16)
                color = color.length == 1 ? '0' + color : color
                rgb.push(color)
            }
            return '#' + rgb.join('')
        }
