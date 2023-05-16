<template>
	<view class="my-container">
		<!-- 用户相关信息 -->
		<view class="userInfo">
			<!-- 背景 --> 
			<view class="defaultAvatarUrl" @click="login">
				<image v-if="isLoginFlag" :src="userInfo.img_path?userInfo.img_path:defaultAvaUrl" mode="aspectFit"></image>
				<uni-icons v-else color="#ffffff" size="50" type="person-filled" />
			</view>
			<!--  名字-->
			<view class="logo-title">
				<text class="uer-name">{{isLoginFlag?userInfo.nickname:'未登录'}}</text>
			</view>
		</view>

		<!-- 图标与相关信息 -->
		<u-row customStyle="margin-bottom: 10px;background-color: #FFFFFF;">
			<u-col span="3" v-for="(item,index) in gridList"  :key="index">
				<view class="middleIconText" @click="clickMiddleIcon(item.url)">
					<uni-icons class="icon" color="#007AFF" :type="item.icon" size="26"></uni-icons>
					<text class="text">{{item.text}}</text>
				</view>
			</u-col>
		</u-row>
		<!-- 相关标签内容 -->
		<u-cell-group customStyle="margin-bottom: 10px;background-color: #FFFFFF;" v-for="(item,index) in ucenterList" :key="index">
			<u-cell
				v-for="(subItem,i) in item" :key="i"
			    :title="subItem.title"
				:icon="subItem.icon"
				isLink
				@click="showToast(subItem)"
			></u-cell>
		</u-cell-group>
		<view class="logout" v-if="isLoginFlag">
			<u-button type="error" @click="logout">退出登录</u-button>
		</view>
		
		<tabbar :current="1"></tabbar>
	</view>
</template>

<script>
	import {mapState,mapActions,mapGetters} from 'vuex'
	export default {
		data() {
			return {
				// 默认头像
				defaultAvaUrl:'../../static/logo.png',
				//相关信息
				gridList: [{
						"text": '文章',
						"icon": "chat",
						'url':'/subpkg/pages/my-article/my-article'
					},
					{
						"text": '视频',
						"icon": "cloud-upload",
						"url":'/subpkg/pages/my-video/my-video'
					},
					{
						"text": '关注',
						"icon": "download",
						'url':'/subpkg/pages/attention-view/attention-view'
					},
					{
						"text": '收藏',
						"icon": "contact",
						'url':'/subpkg/pages/collect-view/collect-view'
					}
				],
				ucenterList: [
				[
					{
						"title": '观看历史',
						"to": '/subpkg/pages/video-history/video-history',
						"icon": "share-square"
					},
					{
						"title":'阅读历史',
						"to": '/subpkg/pages/read-history/read-history',
						"icon": "coupon"
					},
					{
						"title": '我的消息',
						"to": '',
						"icon": "star"
					},
					{
						"title": '个人信息',
						"to": '/subpkg/pages/personal-user/personal-user',
						"event": 'getScore',
						"icon": "account"
					}
				],
				[{
					"title": '问题与反馈',
					"to": '/subpkg/pages/questionBack/questionBack',
					"icon": "question-circle"
				}] 
			],
			
			};
		},
		computed:{
			...mapState('users',['userInfo']),
			...mapGetters('users',['isLoginFlag'])
		},
		methods: {
			...mapActions('users',['isLogin','user_logout']),
			login(){
				uni.navigateTo({
					url:'/subpkg/pages/user-login/user-login'
				})
			},
			showToast(item){
				if(this.isLogin()){
					uni.navigateTo({
						url:item.to
					})
				}
				
			},
			clickMiddleIcon(url){
				uni.navigateTo({
					url
				})
			},
			logout(){
				console.log('logout退出登录');
				this.user_logout()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.my-container {
		height: 100%;
		background-color: #f8f8f8;
		.userInfo {
			// padding: 20rpx;
			padding-top: 60px;
			background-image: url(../../static/images//headers.png);
			flex-direction: column;
			align-items: center;

			.defaultAvatarUrl {
				width: 150rpx;
				height: 150rpx;
				background-color: #007aff;
				border-radius: 100%;
				margin: 0 auto;
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					border-radius: 50%;
					width: 100%;
					height: 100%;
				}
			}

			.logo-title {
				flex: 1;
				display: flex;
				align-items: center;
				justify-content: center;

				.uer-name {
					height: 100rpx;
					line-height: 100rpx;
					font-size: 38rpx;
					color: #FFFFFF;
				}
			}
		}
	}
	.text{
		font-size: 16px;
		height: 25px;
		line-height: 25px; 
		color: #817f82;
	}
	.middleIconText{
		padding: 40rpx 0;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
.logout{
	padding: 0 20rpx;
}	
	
</style>
