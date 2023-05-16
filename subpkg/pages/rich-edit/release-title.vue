<template>
	<view class="release-container__header">
		<view class="release-container__header-title">
			<input type="text" placeholder="标题" v-model="value" @input="inputValue" maxlength="25" />
		</view>
		<view class="release-container__header-btn">
			<button type="primary" @click="openRelease">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				value:''
			}
		},
		methods:{
			inputValue(){
				if(this.value.length>=25) return;
				this.$emit('inputVal',this.value)
			},
			openRelease(){
				this.$emit('release');
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.release-container__header{
		margin: 10px 5px;
		display: flex;
		height: 40px;
		box-sizing: border-box;
	
		.release-container__header-title {
			flex: 1;
			box-sizing: border-box;
			margin-right: 5px;
	
			input {
				height: 40px;
				padding: 0 5px;
				border-radius: $uni-border-radius-lg;
				border-bottom: 1px solid $uni-border-color;
			}
		}
	
		.release-container__header-btn {
			width: 60px;
			height: 40px;
	
			button {
				width: 100%;
				height: 100%;
				font-size: 16px;
			}
	
		}
	}
</style>