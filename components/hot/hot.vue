<template>
	<view class="hot-container">
		<view class="hot-container__logo">
			<image src="../../static/csustTop.png" mode="aspectFit"></image>
		</view>
		<view class="hot-container__search" @click="toSearchPage">
		<hot-search :placehoderText="placehoderText"></hot-search>
		</view>
		<view class="hot-container__uTabs">
		<u-tabs  :list= "list" @touchmove.stop @click="clickTabs"></u-tabs>
		</view>
		<view class="hot-container__card">
			<hot-card v-for="(item,index) in 10" :index="index" :key="index"></hot-card>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				placehoderText:"长理头条热榜....",
				list:[
					{name:'java'},
					{name:'前端'},
					{name:'后端'},
					{name:'python'},
					{name:'生活'},
					{name:'电竞'},
					{name:'科学'},
					{name:'科学'},
					{name:'科学'},
					{name:'科学'},
				]
			};
		},
		methods:{
			clickTabs(e){
				//当页面被点击，触发页面内容置顶
				uni.$emit('tabToBackTop');
			},
			
			// 跳转至subpkg下的search-blog页面
			toSearchPage(){
				uni.navigateTo({
					url:"/subpkg/pages/search-blog/search-blog"
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
.hot-container{
	.hot-container__logo{
		width: 100%;
		height: 100px;
		display: flex;
		justify-content: center;
		image{
			width: 180px;
			height: 100px;
		}
	}
	.hot-container__search{
		padding: 0 $uni-spacing-row-lg;
		box-sizing: border-box;
	}
	.hot-container__uTabs{
		background-color: #fff;
		position: sticky;
		z-index: 99;
		top: 0; 
	}
}
</style>
