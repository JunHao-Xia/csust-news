<template>
	<view>
		<my-login @successLogin = "onSuccessLogin"></my-login>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			onSuccessLogin(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">

</style>
