<template>
	<view class = "hotSearch">
		<!-- 搜索框 -->
		<view class="hotSearch-container">
			<!-- 搜索框内部图标 -->
			<view class="hotSearch-container__icon">
				<u-icon color="#767676" name="search" size="20"></u-icon>
			</view>
			<!-- 搜索框内部文字 -->
			<view class="hotSearch-container__text">
				{{placehoderText}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			placehoderText:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
	.hotSearch{
		display: flex;
		align-items: center;
		.hotSearch-container{
			height: 36px;
			width: 100%;
			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-lg;
			border: 1px solid $uni-border-color;
			display: flex;
			align-items: center;
			padding: 0 $uni-spacing-row-base;
			.hotSearch-container__icon{
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.hotSearch-container__text{
				font-size: $uni-font-size-base;
				color: $uni-text-color-placeholder;
				margin-left: $uni-spacing-row-sm;
			}
		}
	}
</style>
