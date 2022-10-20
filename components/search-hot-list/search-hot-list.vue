<template>
	<view class="searchHotList-container">
		<view class="searchHotList-container__title">
			长理头条 - 热搜尽在于此
		</view>
		<block v-for="(item,index) in list" :key="item._id">
		<view class="searchHotList-container__item" @click="onSearch(item)">
			<hot-rank :ranking="index+1"></hot-rank>
			<view class="searchHotList-container__item-title">
				{{item.label}}
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
		data() {
			return {
				list: [
				            {
				                _id: "608b70dcf9d99a7594662457",
								id: 0,
				                label: "2021Java面试题整理"
				            },
				            {
				                _id: "608b70dcf9d99a7594662458",
				                id: 1,
				                label: "程序员离职小技巧"
				            },
				            {
				                _id: "608b70dcf9d99a7594662459",
				                id: 2,
				                label: "java集合常见面试题"
				            },
				            {
				                _id: "608b70dcf9d99a759466245a",
				                id: 3,
				                label: "Linux 常用命令大全"
				            },
				            {
				                _id: "608b70dcf9d99a759466245b",
				                id: 4,
				                label: "spring"
				            },
				            {
				                _id: "608b70dcf9d99a759466245c",
				                id: 5,
				                label: "程序员如何找对象"
				            },
				            {
				                _id: "608b70dcf9d99a759466245d",
				                id: 6,
				                label: "前端常用技术"
				            },
				            {
				                _id: "608b70dcf9d99a759466245e",
				                id: 7,
				                label: "程序员如何接私活"
				            }
				        ]
			};
		},
		methods:{
			onSearch(item){
				this.$emit('onSearch',item.label)
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
