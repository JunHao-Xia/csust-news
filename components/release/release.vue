<template>
	<view class="release-container">
		<u-overlay :show="show" @click="updateOverlay" opacity="0">
			<view class="release-container__box">
			<view class="release-container__boxItem" @tap.stop>
				<view class="release-container__boxItem-base" @click="openArtcle">
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
	import {mapActions} from 'vuex'
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
			...mapActions('users',['isLogin']),
			updateOverlay(){
				this.$emit('updateOverlay');
			},
			//打开发布文章页
			async openArtcle(){
				this.$emit('updateOverlay');
				// 判断是否登录
				let flag = await this.isLogin();
				if(!flag) return;
				uni.navigateTo({
					url:'/subpkg/pages/release/release'
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
				border: 1px solid $uni-color-lightBlue;
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
				.release-container__boxItem-base{
					
				}
			}
		}
		
	

</style>
