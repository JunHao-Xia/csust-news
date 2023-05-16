<template>
	<view class="home">
		<!-- 顶部导航栏 -->
		<top-nav>
			<u-tabs 
			:list="list" 
			:lineHeight="5"
			:lineWidth="30"
			:current="swiperIndex"
			:activeStyle="{
			            color: '#303133',
			            fontWeight: 'bold',
			            transform: 'scale(1.3)'
			        }"
			:inactiveStyle="{
			            color: '#606266',
			            transform: 'scale(1)'
			        }"
			@click="clickTabs"
			></u-tabs>
		</top-nav>
		<view class="home-list">
		<content-list :topNavIndex="topTabsIndex" @listSwiperChange="listSwiperChange"></content-list>
		</view>
		<tabbar :current="0"></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{name: '热榜'}, {name: '热播'}],
				topTabsIndex:0,
				swiperIndex:0
			}
		},
		onLoad() {
			
		},
		methods: {
			clickTabs({name,index}){
				this.topTabsIndex=index;
			},
			//swiper发生改变
			listSwiperChange(e){
				this.topTabsIndex=e;
				this.swiperIndex=e;
			},
			//获取标签栏
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
