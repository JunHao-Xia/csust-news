<template>
	<view class="detail-container">
		<view class="detail-header">
			<!-- 文章内容区 -->
			<view class="detaile-title">{{article_detail.title}}</view>
			<view class="detail-intro">
				{{article_detail.intro}}
			</view>
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
				<button size="mini" :type="isFollow?'primary':'default'"
					@click="follow">{{isFollow?"已关注":"关注"}}</button>
			</view>
		</view>
		<!-- 内容 -->
		<view class="detail-content">
			<u-parse :content="article_detail.content" :selectable="true"></u-parse>
		</view>

		<!-- 评论区 -->
		<view class="detail-command__list">
			<!-- 最新评论 -->
			<view class="commntList-title">最新评论</view>
			<view class="commentlist-box" v-for="item in commentApart" :key="item.id">
				<article-comment-box @clickReplyBtn="clickReplyBtn(item)" :commentObj="item"></article-comment-box>
			</view>
			<view class="moreComment">
				<view class="moreComment-box" @click="toCommentDetail">
					<span>查看全部评论</span>
					<span>
						<uni-icons type="right" size="12" color="#999"></uni-icons>
					</span>
				</view>
			</view>
		</view>
		<!--下方点赞、评论、收藏-->
		<view class="detail-bottom__menu">
			<detail-topmenue @openComment="openComment" @changeCollect="changeCollect" @changeLike="changeLike"
				:likeAndCollect="likeAndCollect">
			</detail-topmenue>
		</view>
		<!-- 评论弹出框 -->
		<uni-popup ref="comment_popup" type="bottom" @change="changPopupofState">
			<article-comment-commit v-if="isShowComment" :article_id="id" @successComment="successComment">
			</article-comment-commit>
		</uni-popup>

		<!-- 更多评论弹出框 -->
		<uni-popup ref="moreComment_popup" background-color="#ffffff" type="bottom">
			<comment-detail :commentObj="commentObj" :isFlush="isFlush" :article_id="id" @parentComment="commitComments"></comment-detail>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions,
		mapGetters
	} from 'vuex'
	export default {
		onLoad(e) {
			const id = e.id * 1
			this.id = id;
			this.getArticleDetail(id)
		},
		onShow() {
			this.isLikeAndCollct(this.id)
			this.isFollows()
			this.getCommentPart(this.id)
		},
		computed: {
			...mapGetters('users', ['isLoginFlag'])
		},
		data() {
			return {
				//本页面评论点击回复时，被回复id
				commentObj:{},
				//文章id
				id: 0,
				//评论
				commentApart: [],
				isShowComment: false,
				article_detail: {},
				//是否关注作者
				isFollow: false,
				//更新
				isFlush:false,
				//是否被点赞以及收藏
				likeAndCollect: {
					like: false,
					collect: false
				},
				content: `<p>露从今夜白，月是故乡明</p><img src="https://cdn.uviewui.com/uview/swiper/2.jpg" />`
			};
		},
		methods: {
			...mapActions('users', ['isLogin']),
			//点击评论列表打开评论框
			async openComment() {
				let islogin = await this.isLogin()
				if (!islogin) return;
				this.$refs.comment_popup.open('bottom')
			},
			//点赞按钮被点击
			async changeLike() {
				let islogin = await this.isLogin()
				if (!islogin) return;
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
				let islogin = await this.isLogin()
				if (!islogin) return;
				uni.showLoading()
				if (this.likeAndCollect.collect) {
					//取消收藏
					await this.$api.cancelCollect({
						data: {
							aid: this.id
						}
					})
				} else {
					//收藏
					await this.$api.toCollect({
						data: {
							article_id: this.id
						}
					});
					this.article_detail.collection_count++;
				}
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
					id
				})
				this.article_detail = data
			},
			//查询文章是否被点赞、收藏
			async isLikeAndCollct(id) {
				if (!this.isLoginFlag) return;
				let isLike = await this.$api.isLike({
					id
				});
				let isCollect = await this.$api.isCollect({
					aid: id
				});
				//将点赞收藏初始状态赋值
				this.likeAndCollect.like = isLike.data
				this.likeAndCollect.collect = isCollect.data
			},
			//查询用户是否被关注
			async isFollows() {
				if (!this.isLoginFlag) return;
				let {
					data
				} = await this.$api.isFollow();
				let isFollow = data.some(item => item.follow_id === this.article_detail.user_id);
				this.isFollow = isFollow;
			},
			//关注
			async follow() {
				let islogin = await this.isLogin()
				if (!islogin) return;
				if (this.isFollow) {
					//取消关注
					await this.$api.cancelFollow({
						data: {
							follow_id: this.article_detail.user_id
						}
					})
				} else {
					//关注
					await this.$api.toFollow({
						data: {
							follow_id: this.article_detail.user_id
						}
					})
				}
				this.isFollow = !this.isFollow;
				let msg = this.isFollow ? "关注成功" : "取消关注";
				this.$msg(msg)
			},
			//切换changPopupofState的状态
			changPopupofState({
				show
			}) {
				if (show) {
					this.isShowComment = show;
				} else {
					setTimeout(() => {
						this.isShowComment = show
					}, 200)
				}
			},

			//查取部分评论
			async getCommentPart(id) {
				let {
					data
				} = await this.$api.getComments({
					k: 'aid',
					v: id,
					page: 1,
					size: 5
				})
				this.commentApart = data.list;
			},
			//添加评论
			async commitComments(value,getCommentList) {
				await this.$api.addComment({
					article_id: this.id,
					content: value
				})
				getCommentList && getCommentList(this.id)
				this.getCommentPart(this.id)
			},
			successComment(value) {
				this.commitComments(value);
				this.$refs.comment_popup.close()
				this.isShowComment = false;
				this.$nextTick(() => {
					this.getCommentPart(this.article_detail.id);
				})
				this.isFlush=!this.isFlush
				this.$msg('评论成功')
			},
			//点击详情页评论按钮：携带信息跳转详情界面
			clickReplyBtn(commentObj) {
				this.commentObj = commentObj
				this.toCommentDetail()
			},

			//跳转至评论详情页
			toCommentDetail() {
				// uni.navigateTo({
				// 	url: `../../comment-detail/comment-detail?articleId=${this.id}`
				// })
				this.$refs.moreComment_popup.open('bottom')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.detail-container {
		padding: $uni-spacing-row-sm $uni-spacing-row-base;
		padding-bottom: 40px;

		.detail-header {
			box-sizing: border-box;
			display: flex;
			flex-direction: column;
			padding: $uni-spacing-row-base 0px;
			box-sizing: border-box;

			.detail-intro {
				padding: 0 5px 10px 5px;
				color: #BABABA;
				font-size: 14px;
			}

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
			min-height: 500px;

		}

		.detail-command__list {
			margin-bottom: 60px;
			box-sizing: border-box;

			//标题
			.commntList-title {
				padding: 10px 0;
				font-size: 14px;
				color: #666;
				border-bottom: 1px #f5f5ff solid;
			}

			.moreComment {
				display: flex;
				justify-content: center;

				.moreComment-box {
					display: flex;
					align-items: center;

					&>span:first-child {
						font-size: 12px;
						color: $uni-text-color-grey;
					}
				}

			}
		}
	}
</style>
