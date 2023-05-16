<template>
	<!-- 
	 富文本图标组件
	 -->
	<view class="toolBar-container">
		<!-- 键盘图标 -->
		<view class="toolBar-container__keyword" @click="keyword">
			<i class="iconfont icon-jianpan btn_keyword"></i>
		</view>

		<!-- 遍历图标列表 -->
		<view class="toolBar-container__box">
				<view class="toolBar-container__box-icon" @click.prevent="toolBarClick(item.form,index)"
					:class="{active:iconIndex === index}" v-for="(item,index) in list" :key="index">
					<i class="iconfont" :class="item.icon"></i>
				</view>
		</view>
		<!-- 完成图标 -->
		<view class="toolBar-container__finish" @click="finish">
			<i class="iconfont icon-zhengquewancheng btn-finish"></i>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default () {
					return []
				}
			},
			//触发器
			trangger: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				//选中图标
				iconIndex: -1,
				//图标列表
			};
		},
		watch: {
			trangger() {
				this.iconIndex = -1;
			}
		},
		methods: {
			toolBarClick(form, index) {
				//如果点击tab按钮首先将iconIndex设置为-1
				console.log("test:",form, index);
				this.iconIndex = -1;
				if (!form) {
					this.iconIndex = index;
					this.$emit('changeIndex', index)
					return;
				}
				this.$emit('changeIndex', index)
				this.$emit('toolbarForm', form);
			},
			keyword() {
				this.$emit('keyword');
			},
			finish() {
				this.$emit('finish');
			}
		}
	}
</script>

<style lang="scss" scoped>
	.toolBar-container {
		border: 1px solid black;
		width: 100%;
		height: 45px;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.toolBar-container__keyword {
			border: 1px solid black;
			padding: $uni-spacing-row-base;
			box-sizing: border-box;
			position: relative;

			.btn_keyword {
				font-size: 20px;
			}
		}

		.toolBar-container__keyword::after {
			@extend .common;
			right: 0;
		}

		.toolBar-container__finish {
			padding: $uni-spacing-row-base;
			box-sizing: border-box;
			position: relative;

			.btn-finish {
				font-size: 30px;
				font-weight: bold;
				color: #1296db;
			}
		}

		.toolBar-container__finish::after {
			@extend .common;
			left: 0;
		}

		.toolBar-container__box {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-around;

			.toolBar-container__box-icon {
				flex: 1;
				padding: $uni-spacing-row-base 0;
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}
		}

	}

	//公共样式
	.active {
		border-bottom: 3px solid #1296db;
	}

	.iconfont {
		font-size: 25px
	}

	.common {
		content: " ";
		border-left: 2px solid $uni-border-color;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
	}
</style>
