<template>
	<view class="hotCard-container">
		<view class="hotCard-container__box">
		<!-- 左边盒子 -->
		<view class="hotCard-letf">
			<!-- 排名 -->
			<hot-rank :ranking="index+1"></hot-rank>
		</view>
		<!-- 右边盒子 -->
		<view class="hotCard-right">
			<!-- 标题 -->
			<view class="hotCard-right__title">
				标题
			</view>
			<!-- 描述 -->
			<view class="hotCard-right__desc">
				描述
			</view>
			<!-- 文章信息 -->
			<view class="hotCard-right__info">
				<!-- 作者 -->
				<view class="hotCard-right__info-author">
					作者
				</view>
				<!-- 热度 -->
				<view class="hotCard-right__info-hot">
					<image class="hotCard-right__info-hot-image" src="../../static/images/hot-icon.png"></image>
					<text class="hotCard-right__info-hot-hotText">1000k</text>
				</view>
			</view>
		</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			index:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.hotCard-container{
	padding-bottom: $uni-spacing-col-lg;
	.hotCard-container__box{
		display: flex;
		margin: 0 $uni-spacing-row-base;
		padding:$uni-spacing-col-lg $uni-spacing-row-base;
		background-color: $uni-bg-color;
		border-radius: $uni-border-radius-lg;
		box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
		.hotCard-letf{
			margin-right:$uni-spacing-row-sm;
		}
		.hotCard-right{
			width: 100%;
			.hotCard-right__title{
				font-size: $uni-font-size-lg;
				font-weight: bold;
				color: $uni-text-color-title;
			}
			.hotCard-right__desc{
				padding-top: $uni-spacing-col-sm;
				font-size: $uni-font-size-base;
				color: $uni-text-color;
		}
		.hotCard-right__info{
			margin-top: $uni-spacing-col-sm;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.hotCard-right__info-author{
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}
			.hotCard-right__info-hot{
				.hotCard-right__info-hot-image{
					width:$uni-img-size-sm;
					height: $uni-img-size-sm;
				}
				.hotCard-right__info-hot-hotText{
					padding-left: $uni-spacing-row-sm;
					color: $uni-text-color-hot;
					font-size: $uni-font-size-sm;
				}
			}
		}
		}
	}
}
</style>
