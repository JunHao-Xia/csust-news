<template>
	<view class="detail-container">
		<!-- 文章内容区 -->
		<view class="detaile-title">
			我是CSDN最硬核的作者，谁赞成，谁反对?
		</view>
		<!-- 作者信息 -->
		<view class="detail-authorInfo">
			<!-- 头像 -->
			<view class="detail-authorInfo__avator"><image src="../../static/images/default-avatar.png" mode="aspectFit"></image></view>
			<!-- 作者昵称、发布时间 -->
			<view class="detail-authorInfo__msg">
				<!-- 昵称 -->
				<!-- 作者昵称 -->
				<view class="detail-authorInfo__msg-nickname">
					兔老大RabbitMq
				</view>
				<!-- 发布日期 -->
				<view class="detail-authorInfo__create">
					于 2021-04-28 13:01:15 发布
				</view>
			</view>
			<!-- 关注按钮 -->
				<button size="mini" type="primary">关注</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.detail-container{
	height: 100%;
	padding:$uni-spacing-row-sm $uni-spacing-row-base;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	.detaile-title{
		font-size: 18px;
		font-weight: bold;
		color:$uni-text-color-title;
		padding: $uni-spacing-row-base 0px;
		box-sizing: border-box;
	}
	.detail-authorInfo{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.detail-authorInfo__avator{
			width: 35px;
			height: 35px;
			flex-shrink: 0;
			border-radius: $uni-border-radius-circle;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.detail-authorInfo__msg{
			flex: 1;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding-left: $uni-spacing-row-base;
		.detail-authorInfo__msg-nickname{
			font-size: $uni-font-size-base;
			font-weight: bold;
		}
		.detail-authorInfo__create{
			color: $uni-text-color-grey;
			font-size:$uni-font-size-sm;
		}
		}
		
	}
}
</style>
