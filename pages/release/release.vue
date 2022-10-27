<template>
	<view class="release-container" :style="{paddingBottom:safeAreaInsets-safeDistance+chilrenBoxHeight+'px'}">
		<!--标题-->
			<release-title></release-title>
		<!--富文本输入栏 -->
		<view class="release-container__edit" @click="clickEdit">
			<list-scroll>
				<editor id="editor" class="ql-container" placeholder="请输入内容" @input="onRichInput" @ready="onEditorReady"
					@show-img-resize="true" @show-img-toolbar="true" @show-img-size="true" @focus="onRichFocus"
					@blur="onRichBlur" @statuschange="richStatuschange"></editor>
			</list-scroll>
		</view>
			<!--tool-bar-->
			<tool-bar :tragger="tragger" :list="toolBarList" @changIconActive="changIconActive" @toolbarForm="toolBarForm"
				@changeIndex="changeIndex" @keyword="onKeyword" @finish="onFinish"></tool-bar>
				
			<!--子菜单利用swiper-->
			<swiper class="swiper-container" v-show="iconToBox===1 || iconToBox ===2" :current="iconToBox-1">
				<swiper-item class="swiper-container__item" v-for="(obj,index) in textStyleList" :key="index">
					<block v-for="(item,i) in obj" :key="i">
					<txtform-item :styleObj = "item"></txtform-item>
					</block>
				</swiper-item>
			</swiper>
			
		</view>
	</view>
</template>

<script>
	import operateList from './operateMethod.js'
	import releaseTitle from './release-title'
	import {toolBarList,textStyleList} from './iconData.js'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		components:{
			releaseTitle
		},
		data() {
			return {
				//表格数据
				toolBarList,
				//子样式栏渲染数据
				textStyleList,
				//映射方法名数据
				mapName: {
					'undo': this.undo,
					'redo': this.redo,
					'image': this.uploadImage,
					'bold':this.setBold,
					'italic':this.setItalic,
					'underline':this.setUnderLine,
					'size':this.setFontSize,
					'color':this.setTextColor,
					'list':this.listAll,
					'align':this.setAlignOfText,
					'section':this.setLineHight
				},
				iconToBox: 0
			}
		},
		
		methods: {
			//点击键盘
			onKeyword() {
				console.log('点击键盘');
				//收起键盘
				uni.hideKeyboard();
			},
			// 点击完成
			onFinish() {
				uni.hideKeyboard();
			},
			toolBarForm(form) {
				//toolBar传递回来并且通过mapName对象映射成函数名
				this.mapName[form]();
			},
			//将操作方法导入到组件内
			...operateList,

			changeIndex(index) {
				this.iconToBox = index;
			},
			//当富文本框准备时回调
			onEditorReady() {
				// #ifdef MP-BAIDU
				this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
				// #endif

				// #ifdef APP-PLUS || H5 ||MP-WEIXIN
				uni.createSelectorQuery().select('#editor')
					.context((res) => {
						this.editorCtx = res.context;
					}).exec()
				// #endif
			},
			//输入时触发函数
			onRichInput() {
				
			},
			//富文本框聚焦时触发函数
			onRichFocus(e) {
				
			},
			//富文本框失去焦点时触发
			onRichBlur(e) {
				
			},
			//通过context修改样式时触发
			richStatuschange(e) {
				console.log("修改样式")
			},
			//子盒子传入修改样式
			changeTextStyle(item,form){
				
			}

		}
	}
</script>

<style lang="scss" scoped>
	.release-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;

		//空出底部安全距离高度
		.release-container__header {
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
					border: 1px solid $uni-border-color;
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

		.release-container__edit {
			padding: 5px;
			margin: 5px;
			box-sizing: border-box;
			border-radius: $uni-border-radius-lg;
			border: 1px solid $uni-border-color;
			flex: 1;
			overflow: hidden;
		}

		#editor {
			width: 100%;
			height: 100%;
		}
			.swiper-container{
				height: 180px;
				.swiper-container__item{
					padding: $uni-spacing-row-lg $uni-spacing-row-base;
					box-sizing: border-box;
					height: 180px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					background-color: $uni-bg-color-grey;
				}
			}
			
		}
</style>
