<template>
	<!-- 滑动组件 -->
	<view class="scorll-container">
		<scroll-view class="scroll-container__box" scroll-y="true" >
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.scorll-container{
	height: 100%;
		.scroll-container__box{
					height: 100%;
				}
}
</style>
