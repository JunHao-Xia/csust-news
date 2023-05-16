<template>
	<view class="hotVideo-container">
		<swiper :vertical="true" @animationfinish="animationfinish" @change="change" :current="current"
			:indicator-dots="false" @touchstart="mpTouchstart" @touchend="mpTouchend">
			<swiper-item v-for="(list,index) in dataList" :key="index">
				<view class="video-box" v-if="Math.abs(k-index)<=1">
					<view class="video-item" @click.stop="tapVideoHover(list,$event)">
						<!-- 
						1.v-if：用于控制视频在节点的渲染数
						2.muted的默认值是 false，代表默认是禁音视频的
						3.http-cache默认开启视频缓存
						4.poster（封面（方案一））：这里的封面默认处理存储在阿里云的视频
						5.show-loading：这里默认去掉播放转圈的标志
						v-if="Math.abs(k-index)<=1"
						 -->
						<video :id="list._id+''+index" :loop="true" :danmu-list="danmuList" 
							:danmu-btn="isOpenDanmu" :enableDanmu="isOpenDanmu" :muted="list.isplay"
							:controls="false" :http-cache="true" :page-gesture="false" :show-fullscreen-btn="false"
							:show-loading="false" :show-center-play-btn="false" :enable-progress-gesture="false"
							:src="list.src" style="width: 100%;height:100%; background-color: #000000; z-index: -1;"
							:poster="list.src+'?x-oss-process=video/snapshot,t_100,f_jpg'"></video>
					</view>

					<!-- 暂停按钮 -->
					<view class="videoHover" @click.stop="tapVideoHover(list,$event)"
						style="width: 100%; height: 100%;">
						<image v-if="list.state==='pause'" class="playState" src="@/static/images/index/play.png">
						</image>
					</view>
					<view class="userInfo">
						<!-- 1.头像 -->
						<image @click="tozuozhe" class="userAvatar" src="https://cdn.uviewui.com/uview/album/1.jpg"
							mode="aspectFill"></image>
						<!-- 2.点赞 -->
						<view @click.stop="cLike(list.like,'like');" class="userInfo-like">
							<image v-if="list.like" src="@/static/images/index/xin.png"></image>
							<image v-if="!list.like" src="@/static/images/index/xin-2.png"></image>
							<text class="baseText" :class="{'likeNumActive':list.like}">{{list.like_n}}</text>
						</view>
						<!-- 3.收藏 -->
						<view class="userInfo-collect" @click.stop="cLike(list.collect,'collect')"
							style="margin: 17px 0;">
							<image v-if="list.collect" src="@/static/images/index/collect.png"></image>
							<image v-if="!list.collect" src="@/static/images/index/collect2.png"></image>
							<text class="baseText">{{list.collect_n}}</text>
						</view>
						<!-- 是否开启弹幕 -->
						<view class="userInfo-danmu" style="margin: 17px 0;" @click.stop="clickDanmu()">
							<image v-if="!isOpenDanmu" src="@/static/images/index/danmu.png"></image>
							<image v-else src="@/static/images/index/danmu-select.png"></image>
						</view>
						<!-- 4.分享 -->
						<view @click.stop="share" class="userInfo-share">
							<image src="@/static/images/index/share-fill.png"></image>
							<text class="baseText">分享</text>
						</view>
					</view>
					<!-- 底部文字 -->
					<view class="content">
						<text class="userName" style="width: 100%;">@{{list.username}}</text>
						<!-- i={{i}} -->
						<text class="words" style="width:100%;">{{list.msg}}-{{k+1}}</text>
						<!-- k={{k}} -->
						<view class="danmuInput" v-if="isOpenDanmu">
							<u-input :customStyle="{
								padding:'3px 6px'
							}" placeholder="输入即可发送弹幕哦" v-model="danmuValue" @confirm="sendDanMu"  fontSize="10px" shape="circle" color="#fff"></u-input>
						</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	import userList from '@/mockdata/index.js' //这个是假数据
	import {mapState} from 'vuex'
	export default {
		props: {
			dataList: {
				type: Array,
				default () {
					return [];
				}
			},
			k: {
				type: Number,
				default: 0
			},
			danmuList: {
				type: Array,
				default () {
					return []
				}
			}
		},
		computed:{
			...mapState('danmu',['isOpenDanmu'])
		},
		watch: {
			k(newVal) {
				this.current = newVal;
			}
		},
		data() {
			return {
				danmuValue:'',
				current: 0,
				mpstartTime: 0,
				//双击的计时事件
				touchNum: 0
			};
		},
		methods: {
			sendDanMu(val){
				this.danmuValue=""
				this.$emit('sendDanMu',val)
			},
			animationfinish(event) {
				this.$emit('animationfinish')
			},
			change(event) {
				this.$emit('videoChange', event)
			},
			mpTouchend() {
				const mptime = new Date() - this.mpstartTime;
				this.$emit('getmpTime', mptime)
			},
			mpTouchstart() {
				this.mpstartTime = new Date();
			},
			share() {
				console.log(1);
				uni.showToast({
					title: '分享',
					icon: 'none'
				})
			},
			tapVideoHover({
				state,
				like
			}, event) {
				this.touchNum++
				setTimeout(() => {

					if (this.touchNum == 1) {
						this.$emit('playVideo', state, like)
					}

					if (this.touchNum >= 2) {
						console.log(1);
						if (like != 1)
							this.$emit('cLike', like, 'like')
					}
					this.touchNum = 0
				}, 250)

			},
			//点赞 | 收藏
			cLike(sss, type) {
				this.$emit('cLike', sss, type)
			},
			clickDanmu(){
				this.$emit('clickDanmu')
			}
		},
		mounted() {
			this.dataList = userList
		}
	}
</script>

<style lang="scss" scoped>
	.hotVideo-container {
		padding: 5px;
		box-sizing: border-box;
		height: 100%;
		background-color: #000000;

		swiper {
			
			width: 100%;
			height: 100%;

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
					bottom: 20px;
					/* justify-content: center; */
					padding: 15rpx;
					flex-direction: column;
					justify-content: flex-start;
					color: #ffffff;
					.danmuInput{
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
					bottom: 110px;
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
					&-danmu{
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
		}
	}

	.baseText {
		color: #FFFFFF;
		font-size: 14px;
		text-align: center;
		font-weight: bold;
	}
</style>
