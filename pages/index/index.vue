<template>
	<view class="home">
		<top-navbar :list = "list" :swiperIndex="swiperIndex" @clickTopTab="clickTopTab"></top-navbar>
		<view class="home-list">
			<nav-list :topNavIndex="topNavIndex" @listSwiperChange="listSwiperChange"></nav-list>
		</view>
		<tabbar :current='0'></tabbar>
	</view>
</template>

<script>
	
import {mapActions} from 'vuex'
	export default {
		data() {
			return {
				list: [{name: '热榜'}, {name: '热播'}],
				topNavIndex:0,
				swiperIndex:0
			}
		},
		onLoad() {
			this.updateSystemInfo()
		},
		methods: {
			...mapActions('systemInfo',['updateSystemInfo']),
			//获得顶部导航点击的对应下标  通过top-navbar事件clickTopTab传递至swiper修改对应值
			clickTopTab(index){
				this.topNavIndex = index;
			},
			//获得swiper滑动时对应下标  通过swiper事件listSwiperChange传递至nav-navbar修改对应值
			listSwiperChange(index){
				this.swiperIndex=index
			}
		}
	}
</script>

<style lang="scss">
page{
	height: 100%;
	display: flex;
}
.home{
	flex: 1;
	display: flex;
	flex-direction: column;
	overflow: hidden;
	.home-list{
		flex: 1;
		overflow: hidden;
	}
}
		
	
</style>
