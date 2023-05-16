<template>
	<view class="searchHistory-container">
		<!-- 搜索历史上方栏 -->
		<view class="searchHistory-container__box">
			<view class="searchHistory-container__box-title">
				搜索历史
			</view>
			<view class="searchHistory-container__box-icon" v-if="!isShowSearch" @click="isShowSearch=true">
				<uni-icons type="trash"></uni-icons>
			</view>
			<view class="searchHistory-container__box-txt" v-else>
				<text class="txt" @click="onClearAll">全部删除</text>
				<text class="txt" @click="isShowSearch=false">完成</text>
			</view>
		</view>
		<!-- 搜索历史内容 -->
		<view class="searchHistory-container__content">
			<block v-for="(item,index) in listHistory" :key="index">
				<view class="searchHistory-container__content-item">
					<text class="history-text climp" @click="searchHisContent(item)">{{item}}</text>
					<uni-icons type="clear" v-if="isShowSearch" @click="deleteHistory(index)"></uni-icons>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				isShowSearch:false,
				
			};
		},
		computed:{
			...mapState('searchHistory',['listHistory'])
		},
		methods:{
			...mapMutations('searchHistory',['deleteHistory','deleteAllHistory']),
			onClearAll(){
				uni.showModal({
					title:"提示",
					content:"是否删除全部历史记录",
					success: ({confirm}) => {
						if(confirm){
							this.deleteAllHistory();
							this.isShowSearch = false;
						}
						
					}
				})
			},
			//判断如果不是删除状态的情况下，搜索历史记录内容
			searchHisContent(item){
				if(!this.isShowSearch){
					this.$emit('searchHisContent',item)
				}
			}
		
		}
	}
</script>

<style lang="scss">
.searchHistory-container{
	padding:$uni-spacing-col-lg $uni-spacing-row-lg;
	.searchHistory-container__box{
		display: flex;
		justify-content: space-between;
		.searchHistory-container__box-title{
			color: $uni-text-color;
			font-size: $uni-font-size-sm;
			padding: $uni-spacing-col-sm $uni-spacing-row-sm;
		}
		.searchHistory-container__box-txt{
			.txt{
				color: $uni-text-color-grey;
				font-size: $uni-font-size-sm;
				padding: $uni-spacing-col-sm $uni-spacing-row-sm;
			}
		}
	}
	.searchHistory-container__content{
		margin-top: $uni-spacing-row-lg;
		.searchHistory-container__content-item{
			width: 50%;
			display: inline-block;
			box-sizing: border-box;
			padding:$uni-spacing-col-base $uni-spacing-row-base;
			position: relative;
			.history-text{
				width: 85%;
				color: $uni-text-color;
				font-size: $uni-font-size-base;
				display: inline-block;
			}
			
		}
		.searchHistory-container__content-item:nth-child(odd):before{
			content: ' ';
			display: inline-block;
			border-left: 1px solid #999;
			height: 10px;
			position: absolute;
			transform: translateY(-50%);
			top: 50%;
			right: 0;
		}
		
		
	}
	
}
</style>
