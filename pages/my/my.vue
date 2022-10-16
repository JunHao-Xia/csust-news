<template>
	<view>
		<view class="" v-for="item in 100">
			{{item}}
		</view>
		<button @click="backTop()">返回顶部</button>
		<tabbar :current='1'></tabbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			backTop(){
				uni.OnpageScroll({
					scrollTop:0
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
