<template>
	<view class="release-container">
		<u-overlay :show="show" @click="updateOverlay" opacity="0.1">
			<view class="release-container__box">
			<view class="release-container__boxItem" @tap.stop>
				<view class="release-container__boxItem-base" @click="openArtcle">
					<u-icon labelPos="bottom" label="发表文章" name="file-text" size="30"></u-icon>
				</view>
				<view class="release-container__boxItem-base" @click="openVideo">
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
			},
			//打开发布文章页
			openArtcle(){
				this.$emit('updateOverlay');
				uni.navigateTo({
					url:'/subpkg/pages/rich-edit/rich-edit'
				})
			},
			openVideo(){
				this.$emit('updateOverlay');
				uni.chooseVideo({
					sourceType:['camera','album'],
					success:(res)=>{
						uni.navigateTo({
							url:'/subpkg/pages/upload-video/upload-video?videoUrl='+res.tempFilePath
						})
						
					}
				})
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
		margin-bottom: 80px;
			.release-container__boxItem{
				background-color: white;
				position: relative;
				width: 200px;
				height: 50px;
				box-shadow: $uni-boxShadow-base;
				border-radius: $uni-border-radius-lg;
				border: 1px solid rgba(143, 143, 143, 0.4);
				padding: $uni-spacing-row-base;
				display: flex;
				align-items: center;
				justify-content: space-around;
				&::before{
					content: '';
					width: 0;
					height: 0;
					border: 10px solid;
					position: absolute;
					transform: translateX(-50%);
					bottom: -21px;
					left: 50%;
					border-color:  $uni-color-lightBlue transparent transparent;
				}
				&::after{
					content: '';
					width: 0;
					height: 0;
					border: 10px solid;
					position: absolute;
					bottom: -20px;
					transform: translateX(-50%);
					left: 50%;
					border-color:  #fff transparent transparent;
				}
			}
		}
		
	

</style>
