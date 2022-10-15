<template>
	<view class="hot-container">
		<view class="hot-container__logo">
			<image src="../../static/csustTop.png" mode="aspectFit"></image>
		</view>
		<view class="hot-container__search">
		<hot-search :placehoderText="placehoderText"></hot-search>
		</view>
		<view class="hot-container__uTabs">
		<u-tabs  :list= "list" @touchmove.stop></u-tabs>
		</view>
		<!-- <view class="hot-container__card">
			<hot-card></hot-card>
		</view> -->
		<view v-for="item in 100">
			{{item}}
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
		}
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
		top: 0; 
	}
}
</style>
