<template>
	<!-- 
	 富文本图标组件
	 -->
	<view class="toolBar-container">
		<!-- 键盘图标 -->
		<view class="toolBar-container__image">
			<i class="iconfont icon-jianpan btn_keyword"></i>
		</view>

		<!-- 遍历图标列表 -->
		<view class="toolBar-container__box">	
		<view class="toolBar-container__box-icon" @click="changeIconActive(index)" :class="{active:iconIndex === index}" v-for="(item,index) in list" :key="index">
		<i class = "iconfont" :class="item"></i>
		</view>
		</view>
		<!-- 完成图标 -->
		<view class="toolBar-container__finish">
			<i class="iconfont icon-zhengquewancheng btn-finish"></i>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				//选中图标
				iconIndex:-1,
				//图标列表
				list:['icon-tupian','icon-Aa','icon-juzhongduiqi','icon-xuanzekuang-duoxuanyixuan','icon-chehui','icon-shujuhuifu']
			};
		},
		methods:{
			changeIconActive(index){
				if(index ===1 || index ===2){
					this.iconIndex = index;
				}else{
					this.iconIndex = -1;
				}
				this.$emit('changInconActive',index)
			}
		}
	}
</script>

<style lang="scss" scoped>
.toolBar-container{
		width: 100%;
		margin: $uni-spacing-row-sm 0 0 0;
		height: 45px;
		border-top: 1px solid $uni-border-color;
		border-bottom: 1px solid $uni-border-color;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.toolBar-container__image{
			padding:$uni-spacing-row-base;
			box-sizing: border-box;
			position: relative;
			.btn_keyword{
				font-size: 20px;
			}
		}
		.toolBar-container__image::after{
			@extend .common;
			right:0;
		}
		.toolBar-container__finish{
			padding: $uni-spacing-row-base;
			box-sizing: border-box;
			position: relative;
			.btn-finish{
				font-size: 30px;
				font-weight: bold;
				color: #1296db;
			}
		}
	.toolBar-container__finish::after{
			@extend .common;
			left:0;
		}
	.toolBar-container__box{
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-around;
		.toolBar-container__box-icon{
			flex: 1;
			padding: $uni-spacing-row-base 0;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
		}
	}
	
}

//公共样式
.active{
	border-bottom: 3px solid #1296db;
}
.iconfont{
	font-size: 25px
}
.common{
		content: " ";
		border-left: 2px solid $uni-border-color;
		height: 20px;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
}
</style>
