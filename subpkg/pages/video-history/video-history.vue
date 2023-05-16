<template>
	<view class="video-container">
		<view class="video-box" @click="open(index)" v-for="(item,index) in dataList" :key="item._id">
			<video :loop="true" :muted="list.isplay" :controls="false" :http-cache="true" :page-gesture="false"
				:show-fullscreen-btn="false" :show-loading="false" :show-center-play-btn="false"
				:enable-progress-gesture="false"
				:src="item.src"></video>
		</view>
		<uni-popup ref="popup" type="bottom" background-color="#000000">
			<view class="popupContainer" :style="{height:height+'px',width:width+'px'}">
				 <view class="popupBox">
				 	<hot-video ref="videoRef"
				 	@animationfinish="animationfinish" 
				 	:dataList="dataList"
				 	@videoChange="videoChange" 
				 	:k="k" 
				 	@playVideo="playVideo"
				 	@getmpTime="getmpTime"
				 	@cLike="cLike"
					></hot-video>
				 </view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import userList from '@/mockdata/index.js' //这个是假数据
	export default {
		data() {
			return {
				isShow:false,
				dataList: [],
				width:0,
				height:0,
				k: 0,
				mptime: 0,
				changeTimeout: "",
				videoRef:null,
				isClick: false
			}
		},
		watch: {
			async k(k, old_k) {
				console.log(k, old_k)
				this.dataList[old_k].isplay = true
				this.dataList[old_k].state = 'pause'
				console.log('预留第' + (old_k + 1) + '个视频：' + this.dataList[old_k]._id + '' + old_k)
				// 2.0版本已经去掉了下面这一句，视频不用暂停，只需要把声音禁止就行
				uni.createVideoContext(this.dataList[old_k]._id + '' + old_k, this)
					.stop() //如果视频暂停，那么旧视频停止，这里的this.dataList[old_k]._id + '' + old_k，后面加 old_k 是为了每一个视频的 id 值不同，这样就可以大程度的避免串音问题
				console.log('已经暂停 --> 第' + (old_k + 1) + '个视频～') //提示
				this.dataList[k].state = 'play'
				clearTimeout(this.changeTimeout);
				this.dataList[k].isplay = false
				if (this.mptime < 200) {
					this.changeTimeout = setTimeout(() => {
						uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this.videoRef).play()
					}, 1400)
				} else {
					uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this.videoRef).play()
				}
				var p = k + 1;
				console.log('预加载第' + (p + 1) + '个视频：' + this.dataList[p]._id + '' + p)
			}
		},
		methods:{
			open(index){
				this.$refs.popup.open('bottom')
				this.k = index;
			},
			close(){
				this.$refs.popup.close()
			},
			// 滑动到尾部
			animationfinish() {
				if (this.k == this.dataList.length - 1) {
					console.log("加载视频");
				}
			},
			//视频滑动
			videoChange(event) {
				this.k = event.detail.current
			},
			//getmpTime
			getmpTime(time) {
				this.mptime = time;
			},
			//点赞  ||  收藏
			cLike(sss, type) {
				this.dataList[this.k][type] = !this.dataList[this.k][type]
				const video = this.dataList[this.k];
				if (type === 'like') {
					sss ? video.like_n -= 1 : video.like_n += 1;
				} else {
					sss ? video.collect_n -= 1 : video.collect_n += 1;
				}
			
			},
			//播放
			playVideo(state,like) {
				if (state == 'play' || state == 'continue') {
					this.dataList[this.k].state = 'pause';
				} else {
					this.dataList[this.k].state = 'continue';
				}
				if (this.dataList[this.k].state == 'continue') {
					this.isClick = true;
					this.dataList[this.k].playIng = true
					uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this.videoRef)
						.play(); //暂停以后继续播放
					this.dataList[this.k].isplay = false
				}
				if (this.dataList[this.k].state == 'pause') {
					uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this.videoRef)
						.pause(); //暂停以后继续播放
					this.dataList[this.k].isplay = true
				}
			},
			//获取设备1宽高
			getPhoneInfo(){
				let res = uni.getWindowInfo()
				this.width = res.windowWidth;
				this.height = res.windowHeight-res.safeAreaInsets.bottom;
			},
			navbarLeft(){
				this.close()
			}
		},
		mounted() {
			this.getPhoneInfo()
			
			this.videoRef = this.$refs.videoRef;
			this.dataList = userList
		}
	}
</script>

<style lang="scss" scoped>
	.video-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		.video-box {
			width: 250rpx;
			height: 400rpx;
			padding: 2px;
			box-sizing: border-box;

			video {
				width: 100%;
				height: 100%;
			}
		}
	}
	.popupContainer{
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 0 10rpx;
		.popupBox{
			flex: 1;
		}
	}
</style>
