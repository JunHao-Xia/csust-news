<template>
	<view class="hot-container">
		<!-- 顶部头像 -->
		<view class="hot-container__logo">
			<image src="../../static/csustTop.png" mode="aspectFit"></image>
		</view>
		<!-- 搜索框 -->
		<view class="hot-container__search" @click="toSearchPage">
			<hot-search :placehoderText="placehoderText"></hot-search> 
		</view>
		
		<!-- 标签栏 -->
		<slot name="tabs"></slot>
		<view class="hot-container__uTabs">
			<u-tabs keyName="title" @click="categoryClick" :list="labelList" @touchmove.stop></u-tabs>
		</view>
		<view class="hot-container__content">
			<list-scroll @scrolltolower="scrolltolower">
				<block class="hotCard" v-for="(item,index) in content" :key="item.id">
				<hot-card @clickArticleDetail="clickArticleDetail" :index="index" :item="item"></hot-card>
				</block>
				<view class="buttomLoadingMore">
					<u-loadmore :status="status" marginBottom="20"/>
				</view> 	
			</list-scroll>
		</view>		
	</view>
</template>

<script>
	import {pictrueListChangeMode} from '@/until/index'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				placehoderText:'Uniapp',
				labelList:[],
				//加载状态
				status:'loading',
				page:1,
				size:5,
				//记录当前标签id
				k:1,
				content:[]
			};
		},
		watch:{
			k(){
				this.content=[]
			}
		},
		methods:{
			...mapMutations('readVideoHistory',['articleHistory_add']),
			toSearchPage(){
				uni.navigateTo({
				url: "/subpkg/pages/search-blog/search-blog"
				})
			},
			async getArticleInfo(){
			let {data} = await	this.$api.getArticleAll({
					page:this.page,
					size:this.size,
					k:'cid',
					v:this.k
				})
				let dealList = pictrueListChangeMode(this.$_.cloneDeep(data.list))
				console.log(dealList);
				this.content = [...this.content,...dealList];
				if(dealList.length <this.size){
					this.status='noMore'
				}
				return dealList.length
			},
			async scrolltolower(){
				// 有问题
				if(this.status==='noMore')return;
				this.page=this.page+1;
				let resultLen = await this.getArticleInfo()
				
				if(resultLen <this.size){
					this.status='noMore'
				}
			},
			clickArticleDetail(id){
				this.articleHistory_add(id)
			},
			async getCategory(){
				let {data} = await this.$api.getCategory()
				this.labelList=data;
				this.k = data[0].id;
			},
			async categoryClick(item){
					this.k  = item.id;
					this.status='loading'
					this.page = 1;
					await this.getArticleInfo()
			}
		},
		// 获取分类
		mounted() {
			this.getCategory()
			this.getArticleInfo();
			
			
		}
	}
</script>

<style lang="scss">
	.hot-container {
		display: flex;
		flex-direction: column;
		height: 100%;
		.hot-container__logo {
			width: 100%;
			height: 100px;
			display: flex;
			justify-content: center;
			image {
				width: 180px;
				height: 100px;
			}
		}

		.hot-container__search {
			padding: 0 $uni-spacing-row-lg;
			box-sizing: border-box;
		}

		.hot-container__uTabs {
			background-color: #fff;
			position: sticky;
			z-index: 99;
			top: 0;
		}
		.hot-container__content{
			padding: 5px 10px 0 10px;
			box-sizing: border-box;
			flex: 1;
			overflow: hidden;
			.hotCard{
				margin-top: 10px;
			}
			.buttomLoadingMore{
				padding-bottom: 5rpx;
			}
		}
	}
</style>
