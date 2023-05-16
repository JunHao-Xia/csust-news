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
			<search-hot-list :HotList="HotList" @onSearch = "onSearchConfirm"></search-hot-list>
		</view>
		<!-- 热搜历史 -->
		<view class="searchBlog-container__hotHistoryBox" v-else-if="showType===HOT_HISTORY">
			<search-history @searchHisContent = "onSearchConfirm"></search-history>
		</view>
		<!--搜索结果列表  -->
		<view class="searchBlog-container__hotResultBox" v-else>
			<search-result-list :resultList="search_resultList"></search-result-list>
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
				//热搜列表
				HotList:[],
				//搜索结果
				search_resultList:[]
				//搜索历史记录
				/*
					默认情况、点击取消按钮显示【热搜列表】
					获取焦点、点击清空x按钮 显示【搜索历史】
					点击热搜列表item、点击搜索历史、按下搜索键显示搜索结果
				*/ 
			};
		},
		created() {
			this.getHotList()
		},
		methods:{
			...mapMutations('searchHistory',['addSearchHistory']),
			//根据标题查找文章
			async getArticleToTitle(val){
				let {data} = await this.$api.getArticleAll({k:'name',v:val})
				this.objDealFunc(data);
			},
			//根据简介查找文章
			async getArticleToIntro(val){
				let {data} = await this.$api.getArticleAll({k:'intro',v:val});
				if(data.length===0) return;
				this.objDealFunc(data)
				
			},
			//添加mode以及转换数组
			objDealFunc(data){
				if(this.search_resultList.length!==0){
					//去重
					this.search_resultList.forEach(item=>{
						let flag = data.some(val=>val.id === item.id)
						if(flag){
							let index = data.findIndex(val=>val.id === item.id);
							data.splice(index,1);
						}
					})
				}
				//data为去重后的数据合并
				this.search_resultList = [...this.search_resultList,...data];
				this.search_resultList.map(item=>{
					let picList = item.picture_list;
					if(Array.isArray(item.picture_list))	return
					if(picList === null || picList === '[]'){
						item.mode = "base";
						return;
					}
					let res = picList.replace(/\[|]/g,'').split(',')
					item.picture_list = res;
					if(res.length<=2){
						item.mode="image"
					}else{
						item.mode ='column';
					}	
				})
			},
			async getHotList(){
				let {data} = await this.$api.hotTopList({
					data:{top:10}
				})
				console.log(data)
				this.HotList = data
				
			},
			onSearchConfirm(val){
				this.searchText = val?val:this.placehoderText;
				this.showType = HOT_RESULT
				this.addSearchHistory(this.searchText)
				this.getArticleToTitle(this.searchText);
				this.getArticleToIntro(this.searchText);
			},
			onSearchFocus(val){
				this.showType = HOT_HISTORY
				//切换将数据清空
				this.clearResultList()
			},
			onSearchBlur(val){},
			onSearchClear(val){
				this.showType = HOT_HISTORY;
				 //切换将数据清空
				this.clearResultList()
			},
			onSearchCancel(val){
				this.showType = HOT_LIST;
				//切换将数据清空
				this.clearResultList()
			},
			
			//将结果数据清空
			clearResultList(){
				this.search_resultList=[]
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
