<template>
	<!-- 滑动组件 -->
	<view class="scorll-container">
		<scroll-view enable-back-to-top="true" @scroll="scroll" :scroll-top = "scrollTop" class="scroll-container__box" scroll-y="true">
			<slot></slot>
			<button @click="backTop">回到顶部</button>
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
		methods:{
			scroll(e){
				this.oldScroll = e.detail.scrollTop;
			},
			backTop(){
				this.scrollTop = this.oldScroll;
				this.$nextTick(()=>{
					this.scrollTop=0;
				})
			}
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
