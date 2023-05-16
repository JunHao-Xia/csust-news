<template>
	<view class = "hotSearch">
		<!-- 可输入搜索框 -->
		<uni-search-bar v-if="isShowInput"
		class="mysearch-bar"
		:radius="100" 
		:bgColor="config.backgroundColor"
		:placeholder="placehoderText"
		:value="value" 
		@confirm="onSearch"
		@focus="onFocus"
		@blur="onBlur"
		@clear="onClear"
		@cancel="onCancel"
		@input="onInput">
		<u-icon slot="clearIcon" name="close-circle-fill" color="#999999"></u-icon>
		</uni-search-bar>
		<!-- 搜索框 -->
		<view v-else class="hotSearch-container" :style="{
			height: config.height + 'px',
			backgroundColor: config.backgroundColor,
			border: config.border
		}">
			<!-- 搜索框内部图标 -->
			<view class="hotSearch-container__icon">
				<u-icon color="#767676" :name="config.icon" size="20"></u-icon>
			</view>
			<!-- 搜索框内部文字 -->
			<view class="hotSearch-container__text" :style="{color:config.textColor}">
				{{placehoderText}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"hot-search",
		props:{
			// 通过输入内容通过value进行绑定
			value:{
				type:String,
				default:""
			},
			//可输入对象配置属性
			config:{
				type:Object,
				default(){
					return{
						height:36,
						backgroundColor:"#ffffff",
						icon:'search',
						textColor:"#5f5f5f",
						border:"1px solid #c9c9c9"
					}
				}
			},
			//是否可输入
			isShowInput:{
				type:Boolean,
				default:false
			},
			// placehoder文本
			placehoderText:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			/*
				点击搜索按钮时触发
			*/
			onSearch(){
				this.$emit('search',this.value);
			},
			/*
				输入框获得焦时触发
			*/
			onFocus(){
				this.$emit('focus',this.value);
			},
			/*
				输入框失去焦点时触发
			*/
			onBlur(){
				this.$emit('blur',this.value);
			},
			/*
				点击清空按钮时触发
			*/
			onClear(){
				this.$emit('clear',this.value);
			},
			/*
				点击取消按钮时触发
			*/
			onCancel(){
				this.$emit('cancel',this.value);
			},
			/*
				value改变时触发
			*/
			onInput(val){
				this.$emit('input',val)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hotSearch{
		display: flex;
		align-items: center;
		
		.mysearch-bar{
			width: 100%;
			border-radius: 12px;
		}
		.hotSearch-container{
			height: 36px;
			width: 100%;
			background-color: $uni-bg-color;
			border-radius: $uni-border-radius-lg;
			border: 1px solid $uni-border-color;
			display: flex;
			align-items: center;
			padding: 0 $uni-spacing-row-base;
			.hotSearch-container__icon{
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.hotSearch-container__text{
				font-size: $uni-font-size-base;
				color: $uni-text-color-placeholder;
				margin-left: $uni-spacing-row-sm;
			}
		}
	}
</style>