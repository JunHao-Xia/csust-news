<template>
	<view class="txtform-container">
		<view class="txtform-container__box" @click="iconToIndex(item,index)" v-for="(item,index) in styleObj.value" :key="index">
			<!-- 图标行 -->
			<i v-show="styleObj.name==ICON" class="iconfont" :class="item.icon"></i>
			<!-- 文字行 -->
			<view v-show="styleObj.name===SIZE || styleObj.name ===SECTION" class="txtform-text">{{item}}</view>
			<!-- 颜色行 -->
			<view v-show="styleObj.name===COLOR" class="circle-color" :style="{backgroundColor:item}"></view>
		</view>
	</view>
</template>

<script>
	const ICON="icon";
	const SIZE = "size";
	const COLOR= "color";
	export default {
		props:{
			/*styleObj 
				multiSelect:是否可多选样式
				name	条件渲染组件
				value {icon:图标名,form?:样式}
			*/  
			styleObj:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				ICON:"icon",
				SIZE:"size",
				SECTION:"section",
				COLOR:"color",
			};
		},
		methods:{
			iconToIndex(item){
				if(item.form){
					this.$emit('changeTextStyle',item.form);
				}else{
					this.$emit('changeTextStyle',this.styleObj.name,item);
				}
				
			}
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
				padding: 10px 0;
				box-sizing: border-box;
				border-radius: $uni-border-radius-lg;
				display: flex;
				justify-content: center;
				align-items: center;
				&:active{
					background-color: $uni-bg-color-hover;
				}
				.circle-color{
					width: 20px;
					height: 20px;
					border: 1px solid black;
					box-sizing: border-box;
					border-radius: $uni-border-radius-circle;
				}
				.txtform-text{
					font-size: 16px;
				}
				
			}
}

.iconfont{
	font-size: 16px;
}
</style>
