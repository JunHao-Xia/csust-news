<script>
	export default {
		onLaunch: function() {
			//隐藏自带tabbar
			uni.hideTabBar()
			//页面开始获取屏幕宽高以及状态栏高
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";
	@import '@/static/css/global.scss';
</style>
