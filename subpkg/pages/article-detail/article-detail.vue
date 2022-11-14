<template>
	<view class="detail-container" :style="{paddingBottom:safeAreaInsets+'px'}">
		<view class="detail-header">
			<!-- 文章内容区 -->
			<view class="detaile-title">{{article_detail.title}}</view>
			<!-- 作者信息 -->
			<view class="detail-authorInfo">
				<!-- 头像 -->
				<view class="detail-authorInfo__avator">
					<image :src="article_detail.head_img" mode="aspectFit"></image>
				</view>
				<!-- 作者昵称、发布时间 -->
				<view class="detail-authorInfo__msg">
					<!-- 昵称 -->
					<!-- 作者昵称 -->
					<view class="detail-authorInfo__msg-nickname">{{article_detail.author}}</view>
					<!-- 发布日期、浏览人数、收藏人数 -->
					<view class="detail-info detail-authorInfo__create">
						<!-- 发布日期 -->
						<span>{{article_detail.creation_time}}</span>
						<span>浏览 {{article_detail.visitors}}</span>
						<span>收藏 {{article_detail.collection_count}}</span>
					</view>

				</view>
				<!-- 关注按钮 -->
				<button size="mini" :type="isFollow?'primary':'default'" @click="follow">{{isFollow?"已关注":"关注"}}</button>
			</view>
		</view>
		<!-- 内容 -->
		<view class="detail-content">
			<u-parse :content="article_detail.content"></u-parse>
		</view>

		<!-- 评论区 -->
		<view class="detail-command__list">
			评论列表
		</view>
		<!--下方点赞、评论、收藏-->
		<view class="detail-bottom__menu">
			<detail-topmenue @changeCollect="changeCollect" @changeLike="changeLike" :likeAndCollect="likeAndCollect">
			</detail-topmenue>
		</view>
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse';
	import {
		mapState
	} from 'vuex'
	export default {
		onLoad(e) {
			this.id = e.id
			this.getArticleDetail(e.id)
			this.isLikeAndCollct()
			this.isFollows()
		},
		data() {
			return {
				//文章id
				id: 0,
				article_detail: {},
				//是否关注作者
				isFollow:false,
				//是否被点赞以及收藏
				likeAndCollect: {
					like: false,
					collect: false
				}
			};
		},
		computed: {
			...mapState('systemInfo', ['safeAreaInsets'])
		},
		methods: {
			//点赞按钮被点击
			async changeLike() {
				uni.showLoading()
				//根据点赞按钮状态来触发相对应处理接口
				this.likeAndCollect.like ?
					//取消点赞
					await this.$api.cancelLike({
						data: {
							article_id: this.id
						}
					}) :
					//点赞
					await this.$api.toLike({
						data: {
							article_id: this.id
						}
					});
				uni.hideLoading()
				//点赞
				this.likeAndCollect.like = !this.likeAndCollect.like;
				let message = this.likeAndCollect.like ? "点赞成功" : "取消点赞";
				this.$msg(message)
			},
			//收藏按钮被点击
			async changeCollect() {
				uni.showLoading()
				this.likeAndCollect.collect ?
					//取消收藏
					await this.$api.cancelCollect({
						data: {
							aid: this.id
						}
					}) :
					//收藏
					await this.$api.toCollect({
						data: {
							article_id: this.id
						}
					});
				uni.hideLoading()
				//收藏
				this.likeAndCollect.collect = !this.likeAndCollect.collect;
				let message = this.likeAndCollect.collect ? "收藏成功" : "取消收藏";
				this.$msg(message)
			},
			//查询文章详情
			async getArticleDetail(id) {
				let {
					data
				} = await this.$api.getArticleDetail({
					data: {
						id
					}
				})
				this.article_detail = data
			},
			//查询文章是否被点赞、收藏
			async isLikeAndCollct() {
				let isLike = await this.$api.isLike({
					data: {
						id: this.id
					}
				});
				let isCollect = await this.$api.isCollect({
					data: {
						aid: this.id
					}
				});
				//将点赞收藏初始状态赋值
				this.likeAndCollect.like = isLike.data
				this.likeAndCollect.collect = isCollect.data
			},
			//查询用户是否被关注
			async isFollows(){
				let {data} = await this.$api.isFollow();
				let isFollow = data.some(item=>item.follow_id === this.article_detail.user_id);
				this.isFollow = isFollow;
			},
			//关注
			async follow() {
				if(this.isFollow){
					//取消关注
					await this.$api.cancelFollow({data:{follow_id:this.article_detail.user_id}})
				}else{
					//关注
					await this.$api.toFollow({data:{follow_id:this.article_detail.user_id}})
				}
				this.isFollow = !this.isFollow;
				let msg = this.isFollow?"关注成功":"取消关注";
				this.$msg(msg)
			}
		},
		components: {
			uParse
		}
	}
</script>

<style lang="scss">
	.detail-container {
		padding: $uni-spacing-row-sm $uni-spacing-row-base;

		.detail-header {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			padding: $uni-spacing-row-base 0px;
			box-sizing: border-box;

			.detaile-title {
				font-size: 18px;
				font-weight: bold;
				color: $uni-text-color-title;
				padding-bottom: $uni-spacing-row-base;
				box-sizing: border-box;
			}

			.detail-authorInfo {
				display: flex;
				align-items: center;
				justify-content: space-between;

				.detail-authorInfo__avator {
					width: 35px;
					height: 35px;
					flex-shrink: 0;
					border-radius: $uni-border-radius-circle;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.detail-authorInfo__msg {
					flex: 1;
					display: flex;
					flex-direction: column;
					box-sizing: border-box;
					padding-left: $uni-spacing-row-base;

					.detail-authorInfo__msg-nickname {
						font-size: $uni-font-size-base;
						font-weight: bold;
					}

					.detail-info {
						color: $uni-text-color-grey;
						font-size: $uni-font-size-sm;
						box-sizing: border-box;
						display: flex;

						span {
							padding-right: 10px;
						}
					}
				}
			}
		}

		.detail-content {
			flex: 1;

		}

		.detail-command__list {
			background-color: gray;
			margin-bottom: 40px;
			box-sizing: border-box;
		}
	}
</style>
