<template>
	<view class="release-container__header">
		<view class="release-container__header-title">
			<input type="text" placeholder="标题" maxlength="20" />
		</view>
		<view class="release-container__header-btn">
			<button type="primary">发布</button>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.release-container__header{
		margin: 10px 5px;
		display: flex;
		height: 40px;
		box-sizing: border-box;
	
		.release-container__header-title {
			flex: 1;
			box-sizing: border-box;
			margin-right: 5px;
	
			input {
				height: 40px;
				padding: 0 5px;
				border-radius: $uni-border-radius-lg;
				border: 1px solid $uni-border-color;
			}
		}
	
		.release-container__header-btn {
			width: 60px;
			height: 40px;
	
			button {
				width: 100%;
				height: 100%;
				font-size: 16px;
			}
	
		}
	}
</style>