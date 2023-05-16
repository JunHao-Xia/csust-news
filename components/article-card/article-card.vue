<template>
	<view class="card-container" @click="toArticleDetail">
		<!-- 标题 -->
		<view class="card-title climp">
			{{articleObj.title || '此处是标题'}}
		</view>
		<view class="card-box">
		<!-- 基本图 -->
		<block v-if="mode==='base'">
			<view class="card-box__resume climp-2">
				{{articleObj.intro|| '这是简介哦 宝贝们'}}
				</view>
		</block>
		<!-- 大图 -->
		<block v-else-if="mode === 'image'">
			<view class="card-image">
				<image v-if="isDataShow"  :src="articleObj.picture_list[0]" mode="aspectFill"></image>
				<image v-else src="../../static/logo.png" mode="aspectFill"></image>
			</view>	
		</block>
		
		<!-- 多图 -->
		<block v-else-if="mode === 'column'">
			<view class="column-box">
				<block v-if="isDataShow">
				<view  class="column-box__item" v-for="(item,index) in articleObj.picture_list" :key="index">
					<image :src="item" mode="aspectFill"></image>
				</view>
				</block>
				<block v-else>
				<view  class="column-box__item" v-for="item in 3" :key="item">
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
				</block>
			</view>
		</block>
		</view>
		<view class="card-bottom__text">
			<!-- 喜欢浏览 -->
			<view class="visitAndLikeCnt">
				<span>浏览 {{articleObj.visitors || 0}}</span>
				<span>喜欢 {{articleObj.likes || 0}}</span>
			</view>
			<view class="card_createTime">
				<span>创建时间 {{articleObj.creation_time || 0}}</span>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			//是否是数据展示
			isDataShow:{
				type:Boolean,
				default:false
			},
			mode:{
				type:String,
				default:'base'
			},
			articleObj:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			toArticleDetail(){
				if(!this.isDataShow) return;
				uni.navigateTo({
					url:'/subpkg/pages/article-detail/article-detail?id='+this.articleObj.id
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.card-container{
	height: 110px;
	margin-bottom: 5px;
	border: 1px solid $uni-text-color-grey;
	box-shadow: $uni-boxShadow-base;
	border-radius: $uni-border-radius-lg;
	padding:$uni-spacing-row-base;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.card-title{
		font-weight: bold;
		font-size: 16px;
	}
	.card-box{
		flex: 1;
		overflow: hidden;
		display: flex;
		align-items: center;
		justify-content: space-between;
		// 基本类型盒子
		.card-box__resume{
			height: 60px;
			font-size: $uni-font-size-base;
			color: $uni-text-color;
		}
		//大图盒子
		.card-image{
			width: 100%;
			height: 70px;	
		}
		//多图盒子
		.column-box{
			width: 100%;
			height: 70px;
			box-sizing: border-box;
			display: flex;
			.column-box__item{
				padding: 5px;
				flex: 1;
				flex-shrink: 0;
				image{
					width: 100%;
					height: 100%;	
				}
			}
		}
	}
	.card-bottom__text{
		display: flex;
		justify-content: space-between;
		font-size: 10px;
		color: $uni-text-color-grey;
		.visitAndLikeCnt{
			&>span:first-child{
				padding-right: 10px;
			}
		}
	}
	
}
image{
		border-radius: $uni-border-radius-lg;
		width: 100%;
		height: 100%;
	}
</style>
