<template>
<view class="my-container__box">
			<!-- 图片 -->
			<view class="my-container__box-image">
				<image src="../../static/images/default-avatar.png" mode="aspectFill"></image>
			</view>
			<!-- 文字 -->
			<view class="my-container__box-text">
				<text>登录后可同步记录</text>
			</view>
			<!-- 按钮 -->
			<view class="my-container__box-btn">
				<button type="primary" @click="login">微信用户一键登录</button>
			</view>
</view>
</template>

<script>
	/**
	 * emit：login
	 * 
	 * */
	 
	 import {mapActions} from 'vuex'
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapActions('users',['user_login']),
			//登录
			async login(){
				uni.showLoading({
					title:"加载中"
				})
				uni.getUserProfile({
					lang:'zh_CN',
					desc:'study',
					success:({userInfo})=>{
							uni.login({
								provider: 'weixin',
								success:async ({code}) => {
									let {data} = await this.$api.login({
										data:{
											code
										}
									})
									//传递结果以及用户信息
									this.user_login([data.token,userInfo])
									this.$emit('successLogin')
								}
							})
					},
					fail() {
						uni.showToast({
							title:"授权失败",
							icon:'error'
						})
					},
					complete() {
						uni.hideLoading()
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.my-container__box{
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-top: 25%;
	
	.my-container__box-image{
		width: 78px;
		height: 78px;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.my-container__box-text{
		margin: $uni-spacing-row-big 0;
		color: $uni-text-color-grey;
		font-size: $uni-font-size-base;
	}
	.my-container__box-btn{
		width: 85%;
	}
	}
</style>
