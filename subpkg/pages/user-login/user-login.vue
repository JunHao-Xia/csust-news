<template>
	<view class="uni-content">
		<login-top-text :title="title" :subTitle="subTitle"></login-top-text>
		<!-- 微信登录 -->
		<view class="weixin-login">
			<view class="weixin-logo">
				<u-icon name="weixin-circle-fill" color="#08bb06" size="80"></u-icon>
			</view>
			<view class="pass-weixin-logo">
				<image @click.stop="passWxLogin" src="../../../static/images/weixin.png" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				subTitle: '将根据第三方账号服务平台的授权范围获取你的信息',
				title: '微信登陆'
			}
		},
		methods: {
			...mapActions('users',['user_logout','user_login']),
			passWxLogin() {
				uni.showLoading({
					title: "加载中"
				})
				uni.login({
					"provider": "weixin",
					"onlyAuthorize": true, // 微信登录仅请求授权认证
					success: async (event) => {
						const {
							code
						} = event
						try {
							//客户端成功获取授权临时票据（code）,向业务服务器发起登录请求。
							let {data} = await this.$api.login({code});
							let id = data.user_id;
							let res = await this.$api.findUserInfo({id:data.user_id})
							//更新vuex 用户信息以及token信息
							this.user_login([data.token,res.data]);
							//更新完成
							uni.navigateBack()
						} catch (e) {
							uni.showToast({
								title: '登陆失败',
								icon: 'error'
							})
						}
					},fail() {
						uni.showToast({
							title:'登陆失败',
							icon:'error'
						})
					},
					complete() {
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	.uni-content {
		padding: 0 20px;
		box-sizing: border-box;
		height: 50%;
		display: flex;
		flex-direction: column;

		.weixin-login {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: center;

			.weixin-logo {
				display: flex;
				justify-content: center;
			}

			.pass-weixin-logo {
				display: flex;
				justify-content: center;
				margin-top: 20px;

				image {
					width: 225px;
					height: 42px;
				}
			}
		}

		.smsLogin-container {
			.caption {
				margin-top: 10px;
			}

			.getSmsCode {
				/deep/.u-input {
					margin-top: 10px;
					padding: 10px 10px !important;
					background-color: #F8F8F8;
				}
			}

			.btn {
				margin-top: 10px;
			}
		}


	}
</style>
