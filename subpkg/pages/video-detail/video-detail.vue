<template>
	<view class="videoContainer">
		<view class="video-box">
			<view class="video-item" @click.stop="tapVideoHover($event)">
				<video :id="video_detail._id" :loop="true" :muted="video_detail.isplay" :controls="false"
					:http-cache="true" :page-gesture="false" :show-fullscreen-btn="false" :show-loading="false"
					:show-center-play-btn="false" :enable-progress-gesture="false" :src="video_detail.src"
					style="width: 100%;height:100%; background-color: #000000; z-index: -1;"></video>
			</view>

			<!-- 暂停按钮 -->
			<view class="videoHover" @click.stop="tapVideoHover($event)" style="width: 100%; height: 100%;">
				<image v-if="video_detail.state==='pause'" class="playState" src="@/static/images/index/play.png">
				</image>
			</view>
			<view class="userInfo">
				<!-- 1.头像 -->
				<image @click="tozuozhe" class="userAvatar" src="https://cdn.uviewui.com/uview/album/1.jpg"
					mode="aspectFill"></image>
				<!-- 2.点赞 -->
				<view @click.stop="cLike('like');" class="userInfo-like">
					<image v-if="video_detail.like" src="@/static/images/index/xin.png"></image>
					<image v-if="!video_detail.like" src="@/static/images/index/xin-2.png"></image>
					<text class="baseText"
						:class="{'likeNumActive':this.video_detail.like}">{{video_detail.like_n}}</text>
				</view>
				<!-- 3.收藏 -->
				<view class="userInfo-collect" @click.stop="cLike('collect')"
					style="margin: 17px 0;">
					<image v-if="video_detail.collect" src="@/static/images/index/collect.png"></image>
					<image v-if="!video_detail.collect" src="@/static/images/index/collect2.png"></image>
					<text class="baseText">{{video_detail.collect_n}}</text>
				</view>
				<!-- 是否开启弹幕 -->
				<view class="userInfo-danmu" style="margin: 17px 0;" @click.stop="clickDanmu()">
					<image src="@/static/images/index/danmu.png"></image>
				</view>
				<!-- 4.分享 -->
				<view @click.stop="share" class="userInfo-share">
					<image src="@/static/images/index/share-fill.png"></image>
					<text class="baseText">分享</text>
				</view>
			</view>
			<!-- 底部文字 -->
			<view class="content">
				<text class="userName" style="width: 100%;">@{{video_detail.username}}</text>
				<!-- i={{i}} -->
				<text class="words" style="width:100%;">{{video_detail.msg}}</text>
				<!-- k={{k}} -->
				<!-- 	<view class="danmuInput" v-if="danmuConfig.danmuBtn">
						<u-input :customStyle="{
							padding:'3px 6px'
						}" placeholder="输入即可发送弹幕哦" fontSize="10px" shape="circle" color="#fff"></u-input>
					</view> -->
			</view>
		</view>
		<!-- 底部适配安全距离 -->
		<view class="btmSafeArea" :style="{height:safeArea+'px'}"></view>
	</view>
</template>

<script>
	import userList from '@/mockdata/index.js' //这个是假数据
	export default {
		data() {
			return {
				video_detail: {},
				safeArea: 0,
				touchNum: 0
			};
		},
		methods: {
			getVideoDetail(id) {
				const [videoObj] = userList.filter(item => item._id === id);
				this.video_detail = videoObj;
			},
			getSystemInfo() {
				const {
					safeArea
				} = uni.getWindowInfo()
				this.safeArea = safeArea.top
			},
			tapVideoHover(event) {
				const {state,like} = this.video_detail;
				this.touchNum++
				setTimeout(() => {
					if (this.touchNum == 1) {
						this.playVideo(state)
					}
					if (this.touchNum >= 2) {
						if (like != 1)
							this.cLike('like')
					}
					this.touchNum = 0
				}, 250)

			},
			playVideo(state){
				if (state == 'play' || state == 'continue') {
					this.video_detail.state = 'pause';
				} else {
					this.video_detail.state = 'continue';
				}
				if (this.video_detail.state == 'continue') {
					this.isClick = true;
					this.video_detail.playIng = true
					uni.createVideoContext(this.video_detail._id, this).play(); //暂停以后继续播放
					this.video_detail.isplay = false
				}
				if (this.video_detail.state == 'pause') {
					uni.createVideoContext(this.video_detail._id, this).pause(); //暂停以后继续播放
					this.video_detail.isplay = true
				}
			},
			cLike(type) {
				let sss = this.video_detail[type] ;
				this.video_detail[type] = !this.video_detail[type]
				const video = this.video_detail;
				if (type === 'like') {
					sss ? video.like_n -= 1 : video.like_n += 1;
				} else {
					sss ? video.collect_n -= 1 : video.collect_n += 1;
				}
			}
		},
		onLoad(e) {
			this.getVideoDetail(e.video_id)
			this.getSystemInfo()
			this.playVideo()
		}
	}
</script>

<style lang="scss" scoped>
	.videoContainer {
		height: 100%;
		display: flex;
		flex-direction: column;

		.video-box {
			width: 100%;
			height: 100%;

			.video-item {
				width: 100%;
				height: 100%;
			}

			.videoHover {
				position: absolute;
				top: 0;
				left: 0;
				display: flex;
				flex: 1;
				background-color: rgba(0, 0, 0, 0.1);
				justify-content: center;
				align-items: center;

				.playState {
					width: 160rpx;
					height: 160rpx;
					opacity: 0.2;
				}
			}

			.content {
				width: 620rpx;
				z-index: 99;
				position: absolute;
				display: flex;
				bottom: 70px;
				/* justify-content: center; */
				padding: 15rpx;
				flex-direction: column;
				justify-content: flex-start;
				color: #ffffff;

				.danmuInput {
					width: 60%;
				}

				.userName {
					font-weight: bold;
					font-size: 30rpx;
					color: #ffffff;
					margin-top: 80rpx;
				}

				.words {
					margin: 10rpx 0;
					font-size: 25rpx;
					color: #ffffff;
				}
			}

			.userInfo {
				position: absolute;
				bottom: 120px;
				right: 10px;
				flex-direction: column;

				.userAvatar {
					width: 100rpx;
					height: 100rpx;
					border-radius: 50%;
					margin-bottom: 15px;
					border-style: solid;
					border-width: 2px;
					border-color: #ffffff;
				}

				&-like,
				&-collect,
				&-share,
				&-danmu {
					opacity: 0.9;
					display: flex;
					flex-direction: column;
					align-items: center;

					image {
						width: 40px;
						height: 40px;
					}
				}
			}
		}
		.btmSafeArea{
			background-color: #000;
		}
	}
	.baseText {
		color: #FFFFFF;
		font-size: 14px;
		text-align: center;
		font-weight: bold;
	}
</style>
