<template>
	<view class="navList-container">
		<swiper class="navList-container__swiper" :current="topNavIndex" @change="change">
			<swiper-item class="navList-container__swiper-item">
				<hot></hot>
			</swiper-item>
			<swiper-item class="navList-container__swiper-item">
				<hot-video ref="videoRef" :danmuList="danmuList" @animationfinish="animationfinish" :dataList="dataList"
					@videoChange="videoChange" :k="k" @playVideo="playVideo" @getmpTime="getmpTime" @cLike="cLike"
					@clickDanmu="clickDanmu" @sendDanMu="sendDanMu"></hot-video>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	let audo = uni.createInnerAudioContext()
	audo.loop = true
	import userList from '@/mockdata/index.js' //这个是假数据‘
	import {
		getRandomColor
	} from '../../until/index.js'
	import {
		mapMutations
	} from 'vuex'
	export default {
		props: {
			topNavIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				//当前滚动swiper页码
				current: 0,
				dataList: [],
				danmuList: [{
						text: '第 1s 出现的弹幕',
						color: '#ff0000',
						time: 1
					},
					{
						text: '第 3s 出现的弹幕',
						color: '#ff00ff',
						time: 3
					}
				],
				k: 0,
				mptime: 0,
				changeTimeout: "",
				videoRef: null,
				videoContext:null,
				isClick: false
			};
		},
		watch: {
			async k(k, old_k) {
				this.videoContext =  uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this.videoRef)
				// console.log(k, old_k)
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
		methods: {
			...mapMutations('danmu', ['danmuStateSave']),
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
			//弹幕发送
			sendDanMu(val) {
					this.videoContext.sendDanmu({
						text: val,
						color: getRandomColor()
					});
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
			//开启弹幕
			clickDanmu() {
				this.danmuStateSave()
			},
			//播放
			playVideo(state, like) {
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
			change(e) {
				let {
					current
				} = e.detail;
				//swiper滑动触发事件  使得顶部nav发生改变
				this.$emit('listSwiperChange', current);
				if (current === 1) {
					//跳转到视频页面
					if (this.dataList.length !== 0 && this.isClick) {
						this.dataList[this.k].state = 'play';
						uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this.videoRef).play()
						audo.play()
					}
				} else {
					if (this.isClick) {
						this.dataList[this.k].state = 'pause';
						uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this.videoRef).pause()
						audo.pause()
					}
				}
			}
		},
		mounted() {
			this.videoRef = this.$refs.videoRef;
			this.dataList = userList;
			this.videoContext = uni.createVideoContext(this.dataList[this.k]._id + '' + this.k, this.videoRef)
		}
	}
</script>

<style lang="scss">
	.navList-container {
		height: 100%;

		.navList-container__swiper {
			height: 100%;

			.navList-container__swiper-item {
				height: 100%;
			}
		}
	}
</style>
