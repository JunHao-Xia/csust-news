<template>
	<view class="hotCard-container" @click="articleDetail">
		<view class="hotCard-container__box">
			<!-- 左边盒子 -->
			<view class="hotCard-letf" v-if="!noRank">
				<!-- 排名 -->
				<hot-rank :ranking="index+1"></hot-rank>
			</view>
			<!-- 右边盒子 -->
			<view class="hotCard-right">
				<!-- 标题 -->
				<view class="hotCard-right__title">
					{{item.title}}
				</view>
				<!-- 描述 -->
				<view class="hotCard-right__desc climp-1">
					{{item.intro}}
				</view>
				<!-- 大图模式 -->
				<block v-if="item.mode === 'image'">
					<view class="bigImage">
						<image :src="item.picture_list[0]" mode="aspectFill"></image>
					</view>
				</block>
				<!-- 多图模式 -->
				<block v-if="item.mode === 'column'">
					<view class="columnImage">
						<view v-for="(ImgaUrl,index) in item.picture_list" class="columnImage-item">
							<image :src="ImgaUrl" mode="aspectFill"></image>
						</view>
					</view>
				</block>
				<!-- 文章信息 -->
				<view class="hotCard-right__info">
					<!-- 作者 -->
					<view class="hotCard-right__info-author" v-if="!isMyArticle">
						<!-- 作者头像 -->
						<view class="author_avatar">
							<image :src="item.head_img?item.head_img:'../../static/logo.png'" mode="aspectFill"></image>
						</view>
						<view class="author_name">
							{{item.author}}
						</view>
					</view>
					<view class="hotCard-right__info-author" v-else>
						<view class="author_name">
							创建时间：{{item.creation_time}}
						</view>
					</view>
					<!-- 热度 -->
					<view class="hotCard-right__info-hot">
						<image class="hotCard-right__info-hot-image" src="../../static/images/hot-icon.png"></image>
						<text class="hotCard-right__info-hot-hotText">10k</text>
					</view>
				</view>
			</view>
			<!-- 删除按钮 -->
			<block v-if="isDel">
			<view class="hotCard-container__box_delIcon" @click.stop="delArticle">
				<u-icon name="close-circle" color="#dd524d" size="20"></u-icon>
			</view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			index: {
				type: Number,
				default: 0
			},
			item: {
				type: Object,
				default: () => {
					return {}
				}
			},
			isMyArticle:{
				type:Boolean,
				default:false
			},
			isDel:{
				type:Boolean,
				default:false
			},
			noRank:{
				type:Boolean,
				default(){
					return false
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			articleDetail() {
				this.$emit('clickArticleDetail',this.item.id)
				uni.navigateTo({
					url: '/subpkg/pages/article-detail/article-detail?id=' + this.item.id
					
				})
			},
			delArticle(){
				this.$emit('delArticle',this.item.id)
			}
		}
	}
</script>

<style lang="scss">
	.hotCard-container {
		padding-bottom: $uni-spacing-col-lg;

		.hotCard-container__box {
			position: relative;
			display: flex;
			margin: 0 $uni-spacing-row-base;
			padding: $uni-spacing-col-lg $uni-spacing-row-base;
			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-lg;
			border: 1px solid rgba(143, 143, 143, 0.4);

			.hotCard-letf {
				margin-right: $uni-spacing-row-sm;
			}

			.hotCard-right {
				width: 100%;

				.hotCard-right__title {
					font-size: $uni-font-size-lg;
					font-weight: bold;
					color: $uni-text-color-title;
				}

				.hotCard-right__desc {
					padding: $uni-spacing-col-sm 0;
					font-size: $uni-font-size-base;
					color: $uni-text-color;
				}
				.bigImage{
					height: 120rpx;
					image{
						border-radius: 5px;
						width: 100%;
						height: 100%;
					}
				}
				.columnImage{
					height: 120rpx;
					display: flex;
					.columnImage-item{
						flex: 1;
						padding: 2px;
						box-sizing: border-box;
						image{
							border-radius: 5px;
							width: 100%;
							height: 100%;
						}
					}
				}
				.hotCard-right__info {
					margin-top: $uni-spacing-col-sm;
					display: flex;
					align-items: center;
					justify-content: space-between;

					.hotCard-right__info-author {
						font-size: $uni-font-size-sm;
						color: $uni-text-color-grey;
						display: flex;
						align-items: center;

						.author_avatar {
							width: 20px;
							height: 20px;
							margin-right: 5px;

							image {
								width: 100%;
								height: 100%;
								border-radius: $uni-border-radius-circle;
							}
						}
					}

					.hotCard-right__info-hot {
						display: flex;
						align-items: flex-end;

						.hotCard-right__info-hot-image {
							width: $uni-img-size-sm;
							height: $uni-img-size-sm;
						}

						.hotCard-right__info-hot-hotText {
							padding-left: $uni-spacing-row-sm;
							color: $uni-text-color-hot;
							font-size: $uni-font-size-sm;
						}
					}
				}
			}
			.hotCard-container__box_delIcon{
				position: absolute;
				right: 20rpx;
				top: 20rpx;
			}
		}
	}
</style>
