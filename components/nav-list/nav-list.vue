<template>
	<view class="navList-container">
		<swiper class="navList-container__swiper" :current = "topNavIndex" @change="change">
			<swiper-item class="navList-container__swiper-item">
				<list-scroll><view v-for="item in 100">{{item}}</view></list-scroll>
			</swiper-item>
			<swiper-item>
				<list-scroll><view v-for="item in 100">{{item}}</view></list-scroll>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		props:{
			topNavIndex:{
				type:Number,
				default:0
			}
		},
		data() {
			return {
				//当前滚动swiper页码
				current:0
			};
		},
		methods:{
			change(e){
				let {current} = e.detail;
				//swiper滑动触发事件  使得顶部nav发生改变
				this.$emit('listSwiperChange',current);
			}
		}
	}
</script>

<style lang="scss">
.navList-container{
	height: 100%;
	.navList-container__swiper{
		height: 100%;
		.navList-container__swiper-item{
			height: 100%;
			
		}
	}
}
</style>
