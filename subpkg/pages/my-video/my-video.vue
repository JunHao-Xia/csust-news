<template>
	<view class="myVideo-container">
		<list-scroll>
		<view class="item" v-for="item in 10" :key="item">
			<video-card @videoDetail="videoDetail"></video-card>
		</view>
		</list-scroll>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			videoDetail(id){
				uni.navigateTo({
					url:'/subpkg/pages/video-detail/video-detail?video_id='+id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.myVideo-container{
	height: 100%;
	padding: 5rpx 15rpx 50rpx 15rpx;
	overflow: hidden;
	box-sizing: border-box;
	.item{
		margin-top: 20rpx;
		
	}
}
</style>
