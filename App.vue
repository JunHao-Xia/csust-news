<script>
	export default {
		onLaunch: function() {
			//隐藏自带tabbar
			uni.hideTabBar()
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
		@import '@/static/fonts/iconfont.css';
</style>
