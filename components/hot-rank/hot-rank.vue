<template>
	<view class="hotRank-container">
		<image class="hotRank-container__bg" :src="getRockBg" mode="aspectFit"></image>
		<text class="hotRank-container__text" :class="{'text-white':ranking<=3}">{{ranking}}</text>
	</view>
</template>

<script>
	export default {
		props:{
			ranking:{
				type:Number,
				require:true
			}
		},
		data() {
			return {
				
			};
		},
		computed:{
			getRockBg(){
				//第一到第三更改样式
				if(this.ranking<=3){
					return require(`@/static/images/ranking-${this.ranking}.png`)
				}
				return require('@/static/images/ranking-other.png')
			}
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
	.text-white{
		color: white;
	}
	}

</style>
