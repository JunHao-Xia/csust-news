<template>
	<view class="videoCard-container" @click="videoDetail">
		<!-- 视频 -->
		<view class="video-box">
			<image src="../../static/images/play_history_3_3.jpg" mode="aspectFill" alt=""/>
		</view>
		<!-- 相关信息 -->
		<view class="video-info">
			<!-- 标题 -->
			<!-- 介绍信息 -->
			<view class="video-info__desc climp-2">
				AW带娃大无多哇大无多阿瓦达无多哇多阿达瓦多
			</view>
			<!-- 作者信息以及其他 -->
			<view class="video-info__about">
				<view class="video-info__about-box">
					<!-- 作者名称 -->
					<view class="video-info__about-author">
						nick
					</view>
					<!-- 播放次数 -->
					<view class="video-info__about-playCount">
						{{123}}次播放
					</view>
				</view>
				
				<view class="video-info__about-trash">
					<u-icon name="trash-fill" color="#646464" size="20"></u-icon>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		methods:{
			videoDetail(){
				this.$emit('videoDetail','60ee559d9dad850001bf5956')
			}
		}
	}
</script>
<style lang="scss" scoped>
	.videoCard-container{
		padding:15rpx;
		height: 160rpx;
		box-sizing: border-box;
		display: flex;
		.video-box{
			width: 300rpx;
			image{
				border-radius: 5px;
				width: 100%;
				height: 100%;
			}
		}
		.video-info{
			padding-left: 20rpx;
			box-sizing: border-box;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			&__desc{
				font-size: 29rpx;
				color: #333;
				font-weight: 500;
			}
			.video-info__about{
				display: flex;
				align-items:center;
				justify-content: space-between;
				color:#646464;
				font-size:25upx;
				.video-info__about-box{
					display: flex;
					.video-info__about-playCount{
						margin-left: 20rpx;
					}
				}
			}
		}
	}
</style>