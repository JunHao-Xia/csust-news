<template>
	<view class="commentList-container">
		<!-- 评论顶部 -->
		<view class="comment-box">
				<!-- 评论用户头像 -->
				<view class="comment-item__avatar">
					<image :src="commentObj.head_img"></image>
				</view>
				
				<view class="comment-item__other">
				<!-- 评论者名称、 -->
					<!-- 评论作者 -->
					<view class="comment-item__other-author">{{commentObj.article_author || commentObj.reply_name}}</view>
					<!-- 评论内容 -->
					<view class="comment-content">
						{{commentObj.content}}
					</view>
					<!-- 评论时间-->
					<view class="comment-bottom">
						<view class="comment-createTime">
							{{commentObj.creation_time}}
						</view>
						<view class="comment-replay" @click="clickReplyBtn">
							<uni-icons type="chatbubble" size="20"></uni-icons>
						</view>
					</view>
				</view>
	
		</view>
		<!-- 回复评论 -->
		<!-- <view class="comment-reply__item" v-for="item in comment_replyList" :key="item.id">
			<article-comment-box  :commentObj = "item"></article-comment-box>
		</view> -->
		
	</view>
</template>

<script>
	import articleCommentBox  from '@/components/article-comment-box/article-comment-box'
	export default {
		props:{
			commentObj:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				//子评论列表
				comment_replyList:[],
			};
		},
		// created(){
		// 	this.pareFindChilComment(this.commentObj.comment_id)
		// },
		components:{
			articleCommentBox
		},
		methods:{
			//点击回复按钮
			clickReplyBtn(){
				//文章详情页跳转页面
				this.$emit('clickReplyBtn',this.commentObj);
			}
			
		}
	}
</script>

<style lang="scss">
.commentList-container{
	display: flex;
	flex-direction: column;
	.comment-reply__item{
		margin-left: 40px;
	}
	//评论页面
	.comment-box{
		margin-top: 10px;
		display: flex;
		//头像
		.comment-item__avatar{
			width: 30px;
			height: 30px;
			border-radius: 50%;
			overflow: hidden;
			flex-shrink: 0;
			margin-right: 10px;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.comment-item__other{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			//评论者名称
			.comment-item__other-author{
				font-size: 14px;
				color: $uni-text-color-title;
				font-weight: bold;
			}
			//内容
			.comment-content{
				font-size: 13px;
				color: $uni-text-color;
			}
			//底部回复按钮以及创建时间
			.comment-bottom{
				
				display: flex;
				justify-content: space-between;
				align-items: center;
				.comment-createTime{
					font-size: 12px;
					color: $uni-text-color-grey;
				}
				.comment-replay{
					margin-right: 10px;
				}
			}
		}
		
	
	}


}
</style>
