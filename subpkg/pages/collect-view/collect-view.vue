<template>
	<view class="collect-container">
		<view class="collect-box">
			<view class="collect-subsection">
				<u-subsection :list="list" mode="subsection" :current="curNow" @change="sectionChange"></u-subsection>
			</view>
			<view style="margin: 20rpx; 0">
				<uni-easyinput v-model="searchContent" prefixIcon="search" @confirm="searchKeyWord" placeholder="搜索用户备注或名字"></uni-easyinput>
			</view>
			<view class="total">
				<text>共收藏文章({{collectArticleCount}}篇)</text>
			</view>
		</view>
		<!-- 收藏文章 -->
		<view class="collect-content" v-if="curNow===0">
			<u-swipe-action>
				<u-swipe-action-item
				:options="options1"
				 v-for="(item, index) in fileterArticleList"
				 :key="item.article_id"
				 :name="item.article_id"
				 :index="index"
				 @click="clickSwiperBtn">
					<view class="swipe-action u-border-top u-border-bottom">
						<view class="swipe-action__content">
							<view class="swipe-action__content__avatar">
								<image :src="item.img_path?item.img_path:'../../../static/logo.png'" mode="aspectFit"></image>
							</view>
							<text class="swipe-action__content__text">{{item.title}}</text>
						</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				list: ['文章', '视频'],
				curNow:0,
				//收藏文章列表
				collectArticleList:[],
				//收藏文章数
				collectArticleCount:0,
				//搜索内容
				searchContent:'',
				//收藏视频数
				collectVideoCount:0,
				options1: [{
					text: '取消收藏',
					style: {
				        backgroundColor: '#f56c6c'
				    }
				}],
			}
		},
		computed:{
			fileterArticleList(){
				if(!this.searchContent){
					return this.collectArticleList
				}else{
					return this.collectArticleList.filter(item=>item.title.includes(this.searchContent));
				}
			}
		},
		methods:{
			sectionChange(index){
				this.curNow = index;
			},
			async getMyCollectArticle(){
				 let {data} = await this.$api.getOurselfCollect()
				 this.collectArticleList=data
				 this.collectArticleCount = data.length;
			},
			async clickSwiperBtn({name}){
				const i = this.collectArticleList.findIndex((obj)=>(obj.article_id==name));
				//后台取消关注
				try{
					await this.$api.cancelCollect({data:{
						aid:name
					}})
					this.$msg('操作成功')
				}catch(e){
					this.$msg('操作失败')
				}
				this.collectArticleList.splice(i,1);
				
			}
		},
		mounted() {
			this.getMyCollectArticle()
		}
	}
</script>

<style lang="scss" scoped>
	.collect-container {
		height: 100%;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
	
		.collect-box{
			.search-box {
				margin: 20rpx 0;
			}
	
			.total {
				font-size: 13px;
				color: gray;
				font-weight: 400;
			}
		}	
		.collect-content {
			flex: 1;
			.u-demo-block__title {
				padding: 10px 0 2px 15px;
			}
			/deep/.u-swipe-action-item{
				margin-top: 20rpx;
			}
		
			.swipe-action {
				&__content {
					padding: 25rpx 10rpx;
					display: flex;
					align-items: center;
					&__avatar{
						width: 70rpx;
						height: 70rpx;
						image{
							border-radius: 50%;
							width: 100%;
							height: 100%;
						}
					}
		
					&__text {
						padding-left: 20rpx;
						font-size: 15px;
						color: $u-main-color;
					}
				}
			}
		}
		}
</style>