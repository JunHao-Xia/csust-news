<template>
	<!-- 滑动组件 -->
	<view class="scorll-container">
		<scroll-view enable-back-to-top="true" @scrolltolower="lower" @scroll="scroll" :scroll-top = "scrollTop" class="scroll-container__box" scroll-y="true">
			<slot></slot>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//
				oldScroll:0,
				scrollTop:0
			};
		},
		
		created() {
			uni.$on('tabToBackTop',()=>{
				this.backTop()
			})
		},
		methods:{
			scroll(e){
				this.oldScroll = e.detail.scrollTop;
			},
			backTop(){
				if(this.oldScroll <150) return;
				this.scrollTop = this.oldScroll;
				this.$nextTick(()=>{
					this.scrollTop=0;
				})
			},
			lower(){
				this.$emit('scrolltolower');
			}
		},
		beforeDestroy() {
			uni.$off('tabToBackTop')
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
