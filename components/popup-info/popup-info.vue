<template>
	<uni-popup ref="popup" type="bottom" :mask-click="false">
		<view class="release-detailContainer">
			<!-- 关闭按钮 -->
			<view class="close_btn" @click="changeShow">
				<uni-icons type="closeempty"></uni-icons>
			</view>
			<!-- 请添加内容描述描述 -->
			<view class="content-commary">
				<text class="content-commary_text">简要描述:</text>
				<textarea v-model="value" placeholder="请输入内容" maxlength="35">
						</textarea>
				<view class="commary-length">
					{{value.length}}/35
				</view>
			</view>

			<!-- 选择文章模式 -->
			<view class="content-mode">
				<text class="content-commary_text">文章模式:</text>
				<view class="mode-box">
					<u-radio-group v-model="radioVal" placement="row" @change="groupChange">
						<u-radio :customStyle="{marginLeft: '10px'}" v-for="(item, index) in radioList" :key="index"
							:label="item.label" :name="item.name">
						</u-radio>
					</u-radio-group>

				</view>
			</view>
			<!-- 文章模式具体图形 -->
			<article-card :mode="radioVal"></article-card>
			<!-- 选择标签 -->
			<view class="article-label">
				<text class="content-commary_text">
					请选择标签
				</text>
				<view class="label-box" @click="this.show = true">
					请点击选择本文对应的标签
				</view>
			</view>
			<u-picker title="选择标签" :show="show" @confirm="confirmPicker" :columns="columns" @cancel="cancelPicker"
				keyName="label"></u-picker>
			<view class="content-commit__btn"><button type="primary">提交</button></view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			}
		},
		watch: {
			isShow(newVal) {
				if (newVal) {
					this.open()
				} else {
					this.close()
				}

			}
		},
		data() {
			return {
				//picker显示
				show: false,
				columns: [
					[{
						label: '雪月夜',
						// 其他属性值
						id: 2021
						// ...
				 }, {
						label: '冷夜雨',
						id: 804
					}]
				],
				//简要标题
				value: '',
				//单选
				radioVal: 'base',
				radioList: [{
						id: 1,
						name: 'base',
						label: '基本排版'
					},
					{
						id: 2,
						name: 'image',
						label: '大图排版'
					},
					{
						id: 3,
						name: 'column',
						label: '多图排版'
					},
				]

			};
		},
		methods: {
			confirmPicker(e) {
				
				this.cancelPicker();
			},
			cancelPicker() {
				this.show = false;
			},
			open() {
				this.$refs.popup.open('center')
			},
			close() {
				this.$refs.popup.close()
			},
			changeShow() {
				this.$emit('changeShow')
			},
			groupChange(name) {
				console.log(name)
			}
		},
	}
</script>

<style lang="scss" scoped>
	.release-detailContainer {
		width: 720rpx;
		height: 1060rpx;
		background-color: $uni-bg-color-grey;
		border-radius: $uni-border-radius-lg;
		box-sizing: border-box;
		padding: $uni-spacing-row-lg;
		position: relative;

		.close_btn {
			position: absolute;
			right: 0;
			top: 0;
			padding: $uni-spacing-col-base;
		}

		.content-commary {
			margin-top: $uni-spacing-row-base;
			position: relative;

			textarea {
				width: 100%;
				font-size: $uni-font-size-lg;
				height: 70px;
				margin: 10px auto;
				color: $uni-text-color-title;
				box-sizing: border-box;
				padding: $uni-spacing-row-sm;
				border: 1px solid #c8c7cc;
				box-shadow: $uni-boxShadow-base;
				border-radius: $uni-border-radius-lg;
			}

			.commary-length {
				color: $uni-text-color-grey;
				position: absolute;
				right: 5px;
				bottom: 5px;
			}
		}

		.content-mode {
			.mode-box {
				display: flex;
				justify-content: space-between;
				margin: $uni-spacing-row-base 0;
				box-sizing: border-box;

				.mode-base {
					width: 30%;
					height: 100px;
					border: 1px solid $uni-border-color;

				}
			}

		}

		.article-label {
			margin-top: $uni-spacing-row-base;

			.label-box {
				color: $uni-text-color-grey;
				margin: $uni-spacing-row-base 0;
				padding: $uni-spacing-row-sm;
				box-sizing: border-box;
				height: 35px;
				border: 1px solid #c8c7cc;
				border-radius: $uni-border-radius-lg;
			}
		}
	}

	.content-commary_text {
		font-weight: bold;
		letter-spacing: 1mm;
	}
</style>
