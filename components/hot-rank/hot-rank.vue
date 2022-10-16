<template>
	<view class="hotRank-container">
		<image class="hotRank-container__bg" src="../../static/images/ranking-1.png" mode="aspectFit"></image>
		<text class="hotRank-container__text">1</text>
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

<style lang="scss" scoped>
	.hotRank-container{
		position: relative;
		text-align: center;
		width: 18px;
		height: 20px;
		.hotRank-container__bg{
			width: 100%;
			height: 100%;
		}
		.hotRank-container__text{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-55%,-55%);
			font-size: $uni-font-size-sm;
			font-weight: bold;
			color: $uni-text-color;
		}
	}

</style>
