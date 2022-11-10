<template>
	<view class="card-container">
		<!-- 标题 -->
		<view class="card-title">
			我是文章的标题哦
		</view>
		<view class="card-box">
		<!-- 基本图 -->
		<block v-if="mode==='base'">
			<view class="card-box__resume">
				我是一个对文章的描述哦~~~
			</view>
		</block>
		<!-- 大图 -->
		<block v-else-if="mode === 'image'">
			<image class="card-image"  src="../../static/logo.png" mode="aspectFill"></image>	
		</block>
		
		<!-- 多图 -->
		<block v-else-if="mode === 'column'">
			<view class="card-box__column">
				<view class="card-box__column__item" v-for="item in 3" :key="item">
					<image src="../../static/logo.png" mode="aspectFill"></image>
				</view>
			</view>
		</block>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			mode:{
				type:String,
				default:'base'
			}
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss" scoped>
.card-container{
	height: 100px;
	border: 1px solid $uni-text-color-grey;
	box-shadow: $uni-boxShadow-base;
	border-radius: $uni-border-radius-lg;
	padding:$uni-spacing-row-base;
	display: flex;
	flex-direction: column;
	.card-title{
		font-weight: bold;
		font-size: 16px;
		margin-bottom:$uni-spacing-row-sm;
	}
	.card-box{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.card-box__column{
			flex:1;
			height: 100%;
			display: flex;
			.card-box__column__item{
				flex: 1;
				padding: 0px $uni-spacing-row-sm;
				box-sizing: border-box;
				image{
					width: 100%;
					height: 100%;
				}
			}
			
		}
		image{
			border-radius: $uni-border-radius-lg;
			width: 100%;
			height: 100%
		}
		.card-box__image{
			width: 70px;
			height: 70px;
			border-radius: $uni-border-radius-lg;
			border: 1px solid $uni-text-color-grey;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
	}
	
}
</style>
