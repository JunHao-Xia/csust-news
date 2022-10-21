<template>
	<view class="searchBlog-container">
		<view class="searchBlog-container__box">
			<hot-search v-model="searchText" 
			:placehoderText="placehoderText" 
			:isShowInput="true"
			:config="{
				backgroundColor:'#f1f0f3'
			}"
			@search="onSearchConfirm"
			@focus="onSearchFocus"
			@blur="onSearchBlur"
			@clear="onSearchClear"
			@cancel="onSearchCancel"></hot-search>
		</view>
		<!-- 热搜列表 -->
		<view class="searchBlog-container__hotListBox card" v-if="showType===HOT_LIST">
			<search-hot-list @onSearch = "onSearchConfirm"></search-hot-list>
		</view>
		<!-- 热搜历史 -->
		<view class="searchBlog-container__hotHistoryBox" v-else-if="showType===HOT_HISTORY">
			<search-history @searchHisContent = "onSearchConfirm"></search-history>
		</view>
		<!--搜索结果列表  -->
		<view class="searchBlog-container__hotResultBox" v-else>
			<search-result-list></search-result-list>
		</view>
	</view>
</template>

<script>
	// 热搜列表
	const HOT_LIST = '0';
	// 热搜历史
	const HOT_HISTORY = '1';
	// 热搜结果
	const HOT_RESULT = '2';
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				//输入框内容
				searchText:"",
				//输入框placehoder
				placehoderText:"uniapp",
				HOT_LIST,
				HOT_HISTORY,
				HOT_RESULT,
				showType:HOT_LIST,
				//搜索历史记录
				/*
					默认情况、点击取消按钮显示【热搜列表】
					获取焦点、点击清空x按钮 显示【搜索历史】
					点击热搜列表item、点击搜索历史、按下搜索键显示搜索结果
				*/ 
			};
		},
		methods:{
			...mapMutations('searchHistory',['addSearchHistory']),
			onSearchConfirm(val){
				this.searchText = val?val:this.placehoderText;
				this.showType = HOT_RESULT
				this.addSearchHistory(this.searchText)
			},
			onSearchFocus(val){
				this.showType = HOT_HISTORY
			},
			onSearchBlur(val){},
			onSearchClear(val){
				this.showType = HOT_HISTORY
			},
			onSearchCancel(val){
				this.showType = HOT_LIST;
			}
		}
	}
</script>

<style lang="scss">
.searchBlog-container{
	.searchBlog-container__box{
		background-color: $uni-bg-color;
		padding: $uni-spacing-row-sm;
		position: sticky;
		top: 0;
		z-index: 9;
	}
}
</style>
