<template>
	<view class="uTabbar-container">
		<u-tabbar :value="current" @change="change" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
			<view class="uTabbar-container__public" @click="openRelease">
				<image src="https://cdn.uviewui.com/uview/common/min_button_select.png" mode="aspectFill"></image>
			</view>
			<u-tabbar-item text="首页" icon="home"></u-tabbar-item>
			<u-tabbar-item text="我的" icon="account"></u-tabbar-item>
		</u-tabbar>
		<release :show="show" @updateOverlay="openRelease"></release>
	</view>
</template>

<script>
	export default {
		props: {
			current: {
				type: Number,
				default: 0,
			}
		},
		data() {
			return {
				value: 0,
				list: ['index', 'my'],
				show: false
			}
		},
		methods: {
			change(e) {
				uni.switchTab({
					url: `/pages/${this.list[e]}/${this.list[e]}`
				})
			},
			openRelease() {
				this.show = !this.show;
			}

		}
	}
</script>
<style lang="scss" scoped>
	.uTabbar-container {
		position: relative;
		.uTabbar-container__public {
			width: 45px;
			height: 45px;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translateX(-50%) translateY(-100%);

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
