<template>
	<view class="txtform-container">
		<view class="txtform-container__box" :class="{active:isActiveMethod(item)}" @click="clickChildIcon(item)"  v-for="(item,index) in styleObj.value" :key="index">
			<!-- :class="{active:isActiveMethod(item)}" -->
			<!-- 图标行 -->
			<i v-if="styleObj.name===ICON" class="iconfont" :class="item.icon"></i>
			<!-- 文字行 -->
			<view v-if="styleObj.name===FONTSIZE || styleObj.name===LINEHEIGHT" class="txtform-text">{{item}}</view>
			<!-- 颜色行 -->
			<view v-if="styleObj.name===COLOR" class="circle-color" :style="{backgroundColor:item}"></view>
		</view>
	</view>
</template>

<script>
	const ICON="icon";
	const FONTSIZE = "fontSize";
	const LINEHEIGHT = "lineHeight";
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
			},
			//选中样式
			selectedStyle:{
				type:Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				ICON,
				FONTSIZE,
				COLOR,
				LINEHEIGHT
			};
		},
		methods:{
			//是否被选中  return bool
			isActiveMethod(item){
				let selectKeys=Object.keys(this.selectedStyle)
				if(selectKeys.length===0)	return false;
				return selectKeys.some(key=>{
					if(this.styleObj.name === 'fontSize'){
						return item+'px' === this.selectedStyle[key]
					}else if(this.styleObj.name === 'lineHeight'){
						return item+'' === this.selectedStyle[key]
					}
					else if(this.styleObj.name === 'color'){
						return item === this.selectedStyle[key]
					}
					return item[key] === this.selectedStyle[key]
				}) 
			},
			//点击子图标按钮(传递属性以及值)
			clickChildIcon(item){
				if(item.form){
					this.$emit('childIconStyle',item.form,item[item.form]);
				}else{
					this.$emit('childIconStyle',this.styleObj.name,item)
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
			box-sizing: border-box;
			.txtform-container__box{
				flex: 1;
				padding: 10px 0;
				box-sizing: border-box;
				border-radius: $uni-border-radius-lg;
				display: flex;
				justify-content: center;
				align-items: center;
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
.active{
		background-color: $uni-bg-color-hover;
}
.iconfont{
	font-size: 16px;
}
</style>
