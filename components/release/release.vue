<template>
	<view class="release-container">
		<u-overlay :show="show" @click="updateOverlay" opacity="0">
			<view class="release-container__box">
			<view class="release-container__boxItem" @tap.stop>
				<view class="release-container__boxItem-base">
					<u-icon labelPos="bottom" label="发表文章" name="file-text" size="30"></u-icon>
				</view>
				<view class="release-container__boxItem-base">
					<u-icon name="play-right" labelPos="bottom" label="上传视频" size="30"></u-icon>
				</view>
			</view>
			</view>
		</u-overlay>
		</view>
</template>

<script>
	export default {
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
			};
		},
		methods:{
			updateOverlay(){
				this.$emit('updateOverlay');
			}
		}
	}
</script>

<style lang="scss">
	.release-container__box {
		flex: 1;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: flex-end;
		margin-bottom: 170rpx;
			.release-container__boxItem{
				position: relative;
				width: 300rpx;
				height: 50px;
				box-shadow: 5px 5px 1px gray;
				border-radius: $uni-border-radius-lg;
				border: 4px solid $uni-color-lightBlue;
				display: flex;
				align-items: center;
				justify-content: space-around;
				&::before{
					content: '';
					width: 0;
					height: 0;
					border: 10px solid;
					position: absolute;
					bottom: -24px;
					left: 65px;
					border-color:  $uni-color-lightBlue transparent transparent;
				}
				&::after{
					content: '';
					width: 0;
					height: 0;
					border: 10px solid;
					position: absolute;
					bottom: -18px;
					left: 65px;
					border-color:  #fff transparent transparent;
				}
				.release-container__boxItem-base{
					
				}
			}
		}
		
	

</style>
