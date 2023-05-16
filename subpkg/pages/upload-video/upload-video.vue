<template>
	<view class="video-container">
		<view class="video-box">
			<video id="myVideo" :src="videoSrc" @error="videoErrorCallback" controls></video>
		</view>
		<!-- 上传视频封面 -->
		<view class="video-poster">
			<text class="txt">视频封面</text>
			<u-upload :fileList="fileList1" @afterRead="afterRead" @delete="deletePic" name="1" multiple :maxCount="1">
			</u-upload>
		</view>

		<!-- 标题 -->
		<view class="video-title">
			<u-input v-model="vTitle" placeholder="有趣的标题会让更多人看到你的视频" border="bottom" placeholderClass="placeHoder">
			</u-input>
		</view>
		<!-- 文章描述 -->
		<view class="video-desc">
			<u-textarea v-model="vDesc" placeholder="详细介绍一下视频哦" border="bottom" autoHeight></u-textarea>
		</view>

		<view class="suBtn">
			<u-button type="primary" @click="uploadVideo" text="完成"></u-button>
		</view>
	</view>
</template>

<script>
	//封面临时路径存储
	let postImg = ''
	export default {
		onLoad(e) {
			console.log(e);
			this.videoSrc = e.videoUrl
		},
		data() {
			return {
				videoSrc: '',
				vTitle: '',
				vDesc: '',
				fileList1: []
			};
		},
		methods: {
			videoErrorCallback(e) {
				console.log(e);
			},
			async uploadVideo() {
				
				if (!this.vTitle || !this.vDesc) {
					this.$msg('标题简介不能为空')
					return
				}
				//封面上传
				// let imageResult = await uniCloud.uploadFile({
				// 	filePath:item.url,
				// 	cloudPath: String(Math.random()*5).split('.')[1] + '.png',
				// 	fileType:'image'
				// })
				// let imageUrl = imageResult.fileID;
				// 上传视频请求后台
				// 视频上传成功
				setTimeout(() => {
					this.$msg('视频上传成功')
				}, 500)
				uni.navigateBack()
			},
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let item = event.file[0];
				postImg = item.url;
				this[`fileList${event.name}`].push({
					...item,
					status: 'success',
					message: ''
				})
				
		}
}
	}
</script>

<style lang="scss" scoped>
	.video-container {
		height: 100%;
		padding: 10px 15px;
		box-sizing: border-box;
		.video-poster{
			display: flex;
			align-items: center;
			margin-top: 20rpx;
			.txt{
				color: #333;
				font-size: 14px;
				font-weight: 500;
				margin-right: 20rpx;
				
			}
		}

		.video-box {
			height: 20%;
			border-radius: 8px;

			#myVideo {
				width: 100%;
				height: 100%;
				border-radius: 8px;
			}
		}

		.video-title {
			margin-top: 30rpx;

			/deep/.u-input {
				input {
					font-size: 20px !important;
					font-weight: bold;
				}
			}
		}

		.video-desc {
			margin-top: 30rpx;
		}

		.suBtn {
			margin-top: 30rpx;
		}
	}

	/deep/.placeHoder {
		font-size: 17px !important;
	}
</style>
