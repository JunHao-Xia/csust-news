<template>
	<view class="searchHotList-container">
		<view class="searchHotList-container__title">
			长理头条 - 热搜尽在于此
		</view>
		<block v-for="(item,index) in HotList" :key="item.id">
		<view class="searchHotList-container__item" @click="onSearch(item)">
			<hot-rank :ranking="index+1"></hot-rank>
			<view class="searchHotList-container__item-title">
				{{item.title}}
			</view>
			<view class="icon" v-if="index<=2">
				<image src="../../static/images/hot-icon.png" mode="aspectFit"></image>
			</view>
		</view>
		</block>
	</view>
</template>

<script>
	export default {
		props:{
			HotList:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {
			};
		},
		methods:{
			onSearch(item){
				console.log(item);
				this.$emit('onSearch',item.title)
			}
		}
	}
</script>

<style lang="scss">
.searchHotList-container{
	.searchHotList-container__title{
		font-weight: bold;
		font-size: $uni-font-size-base;
		color: $uni-text-color-hot;
		padding: 0 12px $uni-spacing-col-lg 12px;
		margin: 0 -12px $uni-spacing-col-lg -12px;
		box-shadow: 2px 2px 5px 1px rgba(143, 143, 143, 0.1);
	}
	.searchHotList-container__item{
		display: flex;
		align-items: center;
		padding: $uni-spacing-col-lg 0;
		.searchHotList-container__item-title{
			color: $uni-text-color;
			margin: 0 $uni-spacing-row-base;
			font-size: $uni-font-size-base;
		}
		.icon{
			width: 14px;
			height: 14px;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>
