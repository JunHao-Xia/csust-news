<template>
	<view class="release-container" :style="{paddingBottom:safeAreaInsets-safeDistance+chilrenBoxHeight+'px'}">
		<view class="release-container__header">
			<view class="release-container__header-title">
				<input type="text" placeholder="标题" @focus="topInputTitle" maxlength="20" />
			</view>
			<view class="release-container__header-btn">
				<button type="default">发布</button>
			</view>
		</view>
		<view class="release-container__edit" @click="clickEdit">
			<list-scroll>
				<editor id="editor" class="ql-container" placeholder="请输入内容" @input="onRichInput" @ready="onEditorReady"
					@show-img-resize="true" @show-img-toolbar="true" @show-img-size="true" @focus="onRichFocus"
					@blur="onRichBlur" @statuschange="richStatuschange"></editor>
			</list-scroll>
		</view>
		<view class="release-container__btn"
			:style="{height:45+keyHeight+'px'}">
			<!--tool-bar-->
			<view class="toolBar-container_toolBox">
			<tool-bar :tragger="tragger" :list="toolBarList" @changIconActive="changIconActive" @toolbarForm="toolBarForm"
				@changeIndex="changeIndex" @keyword="onKeyword" @finish="onFinish"></tool-bar>
			</view>

			<!--子菜单-->
			<swiper class="swiper-container" v-if="iconToBox===1 || iconToBox ===2" :current="iconToBox-1">
				<swiper-item class="toolBar-txtForm" @touchmove.stop="">
					<!-- toolBar下方文字样式选择盒子 -->
					<!-- 文字样式 -->
					<txtform-item @changeTextStyle = "changeTextStyle"  v-for="(item,index) in Textlist" :key="index"
						:styleObj="item">
					</txtform-item>
				</swiper-item>
				<swiper-item class="toolBar-txtForm" @touchmove.stop="">
					<!-- toolBar下方段落样式选择盒子 -->
					<!-- 段落样式 -->
					<txtform-item @changeTextStyle = "changeTextStyle" v-for="(item,index) in sectionList" :key="index"
						:styleObj="item">
					</txtform-item>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import operateList from './operateMethod.js'
	import iconData from './iconData.js'
	import {
		mapState,
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				//表格数据
				...iconData,
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
				iconToBox: 0,
				bottom: 0,
				tragger:true,
				//安全距离
				safeDistance:0,
				//子选择项高度
				chilrenBoxHeight: 0,
				//键盘高度
				keyHeight: 0,
			}
		},
		computed: {
			...mapState('systemInfo', ['safeAreaInsets'])
		},
		created() {
			this.updateSystemInfo();
			//监听键盘变化
			// #ifdef MP-WEIXIN
			uni.onKeyboardHeightChange(res=>{
				this.keyHeight = res.height
				})
			// #endif
			
		},
		destroyed() {
			// #ifdef MP-WEIXIN
			uni.offKeyboardHeightChange();
			// #endif
		},
		methods: {
			//标题栏聚焦
			topInputTitle(){
				this.keyHeight=0;
			},
			...mapActions('systemInfo', ['updateSystemInfo']),
			//点击编辑框
			clickEdit(){
				this.safeDistance = this.safeAreaInsets;
			},
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
				if(index ===1 || index ===2){
					this.chilrenBoxHeight = 180;
					// this.safeDistance = this.safeAreaInsets;
				}else{
					this.chilrenBoxHeight =0;
				}
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
			onRichInput({
				detail
			}) {
				console.log(detail)
			},
			//富文本框聚焦时触发函数
			onRichFocus(e) {
				this.safeDistance = this.safeAreaInsets;
				this.chilrenBoxHeight =0;
				this.iconToBox = -1;
				this.tragger = !this.tragger
				console.log('触发')
			},
			//富文本框失去焦点时触发
			onRichBlur(e) {
				console.log("失去焦点")
			},
			//通过context修改样式时触发
			richStatuschange(e) {
				console.log(e)
				this.safeDistance=0;
				console.log("修改样式")
			},
			//子盒子传入修改样式
			changeTextStyle(item,form){
				if(form){
					this.mapName[item](form);
				}else{
					//列表类型
					if(item==='ordered' || item === 'bullet'){
						this.mapName['list'](item);
					}
					//段落类型
					else if (item ==='left' || item === 'center' || item ==='right'){
						this.mapName['align'](item);
					}
					else{
						this.mapName[item]()
					}
					
				}	
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
		.release-container__btn {
			height: 45px;
			padding: 0 5px;
			box-sizing: border-box;
			.swiper-container{
				height: 180px;
				.toolBar-txtForm {
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

	}
</style>
