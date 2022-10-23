<template>
	<view class="txtform-container">
		<view class="txtform-container__box" v-for="(item,index) in list" :key="index">
			<!-- 图标行 -->
			<i v-if="type===ICON" class="iconfont" :class="item"></i>
			<!-- 文字行 -->
			<view v-else-if="type===TEXT" class="txtform-text">{{item}}</view>
			<!-- 颜色行 -->
			<view v-else class="circle-color" :style="{backgroundColor:item}"></view>
		</view>
	</view>
</template>

<script>
	const ICON="icon";
	const TEXT = "text";
	const COLOR= "color"
	export default {
		props:{
			type:{
				type:String,
				default:ICON
			},
			list:{
				type:Array,
				default(){
					return []
				}
			}
		},
		data() {
			return {
				ICON:"icon",
				TEXT:"text",
				COLOR:"color"
			};
		}
	}
</script>

<style lang="scss" scoped>
.txtform-container{
			background-color: $uni-bg-color;
			height: 35px;
			border-radius: $uni-border-radius-lg;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.txtform-container__box{
				flex: 1;
				padding: 7px 0;
				border-radius: $uni-border-radius-lg;
				display: flex;
				justify-content: center;
				align-items: center;
				.circle-color{
					width: 20px;
					height: 20px;
					border: 1px solid black;
					border-radius: $uni-border-radius-circle;
				}
				.txtform-text{
					font-size: 16px;
				}
				&:active{
					background-color: $uni-bg-color-hover;
				}
			}
}

.iconfont{
	font-size: 18px;
}
</style>
