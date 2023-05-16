<template>
	<view class="myArticle-container">
		<view class="myArticle-header">
			<!-- 文章总数 -->
			<view class="myArticle-total">
				<text class="myArticle-total__text">共有{{content.length}}篇文章</text>
			</view>
		</view>
		<!-- 文章列表 -->
		<view class="myArticle-list">
			<list-scroll>
				<block class="hotCard" @click="navigatToDetail(item)" v-for="(item,index) in content" :key="item.id">
				<hot-card :index="index" @delArticle="delArticle" isMyArticle isDel :item="item"></hot-card>
				</block>	
			</list-scroll>
			
		</view>
	</view>
</template>

<script>
	import {mapState} from 'vuex';
	import {pictrueListChangeMode} from '@/until/index';
	export default {
		computed:{
			...mapState('users',['userInfo'])
		},
		data() {
			return {
				content:[],
				isDel:false
			};
		},
		methods:{
			async getUserArticle(){
				let {data} = await this.$api.getArticleAll({k:'uid',v:this.userInfo.id});	
				this.content = pictrueListChangeMode(data);
			},
			async delArticle(id){
				//获取id所在数组索引；
				const index = this.content.findIndex((item)=>(item.id===id));
				//更新数据库
				try{
					await this.$api.delArticleToid({ids:[id]})
					//删除索引对应数组元素
					this.content.splice(index,1)
					this.$msg('删除成功')
				}catch(e){
					this.$msg('删除失败')
				}
				
			}
		},
		mounted(){
			this.getUserArticle()
		}
	}
</script>

<style lang="scss" scoped>
.myArticle-container{
	height: 100%;
	box-sizing: border-box;
	padding: 20rpx 20rpx;
	display: flex;
	flex-direction: column;
	.myArticle-header{
		height: 30rpx;
		padding: 10rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 13px;
		color: gray;
		font-weight: 400;
		.myArticle-del{
			&__text{
				font-size: 13px ;
				color: #333;
			}
		}
	}
	.myArticle-list{
		flex: 1;
		overflow: hidden;
		padding: 20px 10px;
	}
}
</style>
