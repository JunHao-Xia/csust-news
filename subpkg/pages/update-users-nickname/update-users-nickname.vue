<template>
	<view class="nickName-container">
		<view class="nickName-Box">
			<!-- 标题 -->
			<view class="title">
				用户名
			</view>
			<view class="nickName-input">
				<input type="nickname" @blur="bindblur" @input="bindinput" :value="userInfo.nickname || '微信用户'" placeholder="请输入用户名">
			</view>
			<!-- 提示信息 -->
			<view class="prompt">
				<text>2-16个汉字，可由英文、数字、符号组成</text>
			</view>
			<!-- 底部按钮 -->
			<view class="footer-btn">
				<view class="btn-sub" @click="onSubmit">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
	} from 'vuex'
	import {userUpdateMixin} from "@/mixins/userUpdateMixin"
	export default {
		mixins: [ userUpdateMixin ],
		data() {
			return {
			};
		},
		computed:{
			...mapState('users',['userInfo'])
		},
		methods: {
			bindblur(e) {
				this.nickName = e.detail.value; // 获取微信昵称
			},
			bindinput(e) {
				this.nickName = e.detail.value; //这里要注意如果只用blur方法的话用户在输入玩昵称后直接点击保存按钮，会出现修改不成功的情况。
			},
			onSubmit() {
				if (!this.nickName) {
					uni.showToast({
						icon: 'none',
						title: '请输入昵称'
					})
					return false;
				}
				//发送修改昵称请求
				this.$api.updateUser({nickname:this.nickName})
				//将vuex以及本地昵称进行修改
				this.updateUserInfo('nickname',this.nickName)
				uni.navigateBack()
				
				
				
				
			}
		}
	}
</script>

<style lang="scss">
	.nickName-container {
		height: 100%;
		background-color: #eee;

		.nickName-Box {
			.title {
				padding: 50rpx 0 20rpx 40rpx;
				letter-spacing: 0.5mm;
				font-weight: bold;
				font-size: $uni-font-size-lg;
			}

			.nickName-input {
				background-color: #fff;
				padding: 40rpx 30rpx;
			}

			.prompt {
				padding-left: 40rpx;
				margin-top: 20rpx;
				font-size: $uni-font-size-sm;
				color: $uni-text-color-grey;
			}

			.footer-btn {
				width: 100%;

				.btn-sub {
					width: 670rpx;
					margin: 80rpx auto 0;
					height: 90rpx;
					background: #2979ff;
					border-radius: 45rpx;
					line-height: 90rpx;
					text-align: center;
					font-size: 36rpx;
					color: #fff;
				}
			}
		}

	}
</style>
