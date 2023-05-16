<template>
	<view class="resultList-container">
		<view class="resultList__item" v-for="(item,index) in resultList" :key="item.id">
			<article-card :isDataShow="true" :articleObj="item" :mode = "item.mode"></article-card>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			resultList:{
				type:Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style lang="scss">
.resultList-container{
	box-sizing: border-box;
	padding: $uni-spacing-row-lg $uni-spacing-row-base;
}
</style>
