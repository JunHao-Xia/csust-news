<template>
	<view class="topNavBar-container" >
	<view :style = "{height:menuButton + 'px'}"></view>
	<view class="topNavBar-container__fixed">
		<!-- 占位状态栏高度 -->
	<view :style="{height:statusBarHeight+'px'}"></view>
	<view class="topNavBar-container__tab" :style="{height:menuButton-statusBarHeight + 'px',width:windowWidth+'px'}">
		<slot></slot>
	</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 statusBarHeight:0,
				 windowWidth:375,
				 menuButton:44,
				 windowWidth: 0,
				 windowHeight: 0
			};
		},
		created() {
			//获取手机系统信息
			const info = uni.getSystemInfoSync();
			//获取手机上方状态栏高度
			this.statusBarHeight = info.statusBarHeight;
			this.windowWidth = info.windowWidth;
			// #ifndef APP-PLUS || H5 || MP-ALIPAY
			//获取微信胶囊信息
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			this.menuButton = menuButtonInfo.bottom;
			// #endif
		}
	}
</script>

<style lang="scss" scoped>
.topNavBar-container{
	.topNavBar-container__fixed{
		position: fixed;
		top: 0;
		left: 0;
		overflow: hidden;
		z-index: 99;
		.topNavBar-container__tab{
			display: flex;
			align-items: center;
			justify-content: center;
		}
		}
	
}

</style>
