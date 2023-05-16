<template>
	<view class="commentCard-container">

		<view class="commentCard-box" @click.stop="clickCardReply(comment)">
			<!-- 左边头像 -->
			<view class="commentCard-box__avatar">
				<u-avatar :size="!isReply?40:30" :src="comment.head_img?comment.head_img:src" shape="circle"></u-avatar>
			</view>
			<!-- 右边 -->
			<view class="commentCard-box__info">
				<!-- 名称 -->
				<view class="commentCard-box__info-name">
					<text>热爱永无终章</text>
					<block v-if="comment.reply_id && comment.reply_id!==-1">
						<view class="icon">
							<u-icon name="play-right-fill" size="10"></u-icon>
						</view>
						<text>{{comment.reply_id}}</text>
					</block>
					
				</view>
				
				
				<!-- 评论内容 -->
				<view class="commentCard-box__info-content">
					{{comment.content}}
				</view>
				<!-- 底部内容 -->
				<view class="commentCard-box__info-bottom">
					<!-- 时间 -->
					<view class="createTime">
						{{comment.creation_time}}
					</view>
					<!-- 回复按钮 -->
					<view class="replybtn">回复</view>
				</view>
				<!-- 子评论区域 -->
				<view class="reply-comment" v-if="comment.children && comment.children.length!==0">
					<!-- <comment-card></comment-card> -->
					<block v-for="obj in comment.children" :key="obj.id">
						<comment-card isReply :comment="obj" @commentToReply="clickCardReply"></comment-card>
					</block>

				</view>
			</view>
		</view>
		<!-- 底部回复 -->
		<view class="openMoreReply" v-if="!isReply">
			<view  v-if="residueReplyCmp!==0" @click="expectReply" style="display: flex;">
				<text class="expand">展开{{residueReplyCmp}}条回复</text>
				<u-icon name="arrow-down" size="13"></u-icon>
			</view>
			<block v-else-if="residueReplyCmp===0 && comment.children &&  comment.children.length!=0">
				<view @click="putAwayComment" style="display: flex;">
					<text>收起</text>
					<u-icon name="arrow-up" size="13"></u-icon>
				</view>
			</block>
		</view>




	</view>
</template>

<script>
	/**
	
	 * */
	import commentCard from '@/components/comment-card/comment-card.vue'
	export default {
		props: {
			comment: {
				type: Object,
				default () {
					return {}
				},

			},
			isReply: {
				type: Boolean,
				default: false
			},

		},
		computed: {
			//剩余评论
			residueReplyCmp() {
				if (this.comment.children && this.comment.children.length !== 0) {
					return this.comment.reply_count - this.comment.children.length
				} else {
					return this.comment.reply_count;
				}
			}
		},
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/album/1.jpg'
			}
		},
		methods: {
			clickCardReply(item) {
				this.$emit('commentToReply', item)
			},
			expectReply() {
				this.$emit('expectReply', this.comment.id)
			},
			putAwayComment() {
				this.$emit('putAwayComment', this.comment.id)
			}
		},
		components: {
			commentCard
		}

	}
</script>

<style lang="scss" scoped>
	.commentCard-container {
		margin: 20rpx 0;

		.commentCard-box {
			display: flex;

			&__avatar {
				width: 120rpx;
				display: flex;
				justify-content: center;
				flex-shrink: 0;
			}

			&__info {
				word-wrap: break-word;
				word-break: normal;
				flex: 1;
				display: flex;
				flex-direction: column;
				color: gray;
				font-size: 12px;
				&-name{
					display: flex;
					align-items: center;
					.icon{
						padding: 0 10rpx;
					}
				}
				&-content {
					padding: 7rpx 0;
					color: #333;
					font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
					font-weight: 500;
					font-size: 14px;
				}

				&-bottom {
					display: flex;

					.replybtn {
						margin-left: 20rpx;
						font-weight: bold;
					}
				}


			}

		}

		.openMoreReply {
			color: gray;
			font-size: 12px;
			width: 40%;
			margin: 20rpx 0;
			margin-left: 190rpx;
			position: relative;
			font-weight: bold;
			display: flex;

			.expand {
				margin-right: 10rpx;

				&::after {
					content: '';
					display: block;
					width: 20%;
					left: -25%;
					top: 42%;
					position: absolute;
					height: 1px;
					background: gray;
				}
			}
		}
	}
</style>
