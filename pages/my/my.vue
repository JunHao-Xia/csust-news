<template>
	<view class="my-container">
		<my-login v-if="!isLogin" ></my-login>
		<view class="logout-container" v-else>
			<!-- 头像 -->
			<view class="logout-container__avatar">
				<image :src="userInfo.avatarUrl" mode="aspectFill"></image>
			</view>
			<view class="logout_nickName">{{userInfo.nickName}}</view>
			<!-- 相关信息 -->
			<view class="logout-container__info">
				<!-- 创作 -->
				<view class="logout-container__info-text">
					<text class="divider">创作</text>
				</view>  
				<!-- 关注 -->
				<view class="divider logout-container__info-text">
					<text class="divider">关注</text>
				</view>
				<!-- 收藏 -->
				<view class="logout-container__info-text">
					<text>收藏</text>
				</view>
			</view>
			
			<view class="logout-container__btn">
				<button type="warn" @click="logout">退出登录</button>
			</view>
			
			
		</view>
		<tabbar :current='1'></tabbar>
	</view>
</template>

<script>
	import {mapState,mapActions,mapGetters} from 'vuex'
	export default {
		data() {
			return {
			};
		},
		computed:{
			...mapGetters('users',['isLogin']),
			...mapState('users',['userInfo'])
		},
		methods:{
			...mapActions('users',['user_logout']),

			//退出登录
			logout(){
				this.user_logout()
			}
	}
	}
</script>

<style lang="scss">
.my-container{
	height: 100%;
	display: flex;
	flex-direction: column;
	.logout-container{
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 15%;
		box-sizing: border-box;
		.logout-container__info{
			padding: $uni-spacing-row-big;
			box-sizing: border-box;
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.logout-container__info-text{
				text-align: center;
				font-size: $uni-font-size-lg;
				flex: 1;
				position: relative;
				.divider::after{
					content: "";
					position: absolute;
					height: 10px;
					border-left: 1px solid black;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}
		.logout-container__avatar{
			width: 78px;
			height: 78px;
			border-radius: $uni-border-radius-circle;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.logout-container__btn{
			width: 100%;
		}
	}
}
</style>
