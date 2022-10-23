<template>
	<view class="release-container">
		<list-scroll>
		<editor id="editor" class="ql-container"
		:placeholder="placeholder" 
		@input = "onRichInput"  
		@ready="onEditorReady"
		@show-img-resize = "true"
		@show-img-toolbar = "true"
		@show-img-size = "true"
		@focus = "onRichFocus"
		@blur = "onRichBlur"
		@statuschange = "richStatuschange"
		></editor>
		</list-scroll>
		<view class="release-container__btn">
		<!--tool-bar-->
		<tool-bar @changInconActive="changInconActive"></tool-bar>
		<!-- toolBar下方文字样式选择盒子 -->
		<view class="toolBar-txtForm" v-if="iconToBox===1">
			<!-- 文字样式 -->
			<txtform-item v-for="(item,index) in Textlist" :key="index" :list= "item.value" :type = "item.name"></txtform-item>
		</view>
		<!-- toolBar下方段落样式选择盒子 -->
		<view class="toolBar-sectionForm" v-if="iconToBox===2">
			<!-- 段落样式 -->
			<txtform-item v-for="(item,index) in sectionList" :key="index" :list= "item.value" :type = "item.name"></txtform-item>
		</view>
		</view>
	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				placeholder: '开始输入...',
				iconToBox:0,
				//文字各种可选信息
				Textlist:[{
					name:"icon",
					value:['icon-zitijiacu','icon-zitixiahuaxian','icon-zitixieti']
				},
				{
					name:"text",
					value:['标题','小标题','正文','注释']
				},
				{
					name:"text",
					value:[18,16,14,12,11,10]
				},
				{
					name:"color",
					value:[ '#000000','#888888','#ffffff','#f6de41','#f68c41','#fd3136','#5ad8a6']
				}
				],
				//段落可选信息
				sectionList:[
					{
						name:"icon",
						value:['icon-juzuo','icon-juzhongduiqi','icon-juyou']
					},
					{
						name:"icon",
						value:['icon-orderedList','icon-unorderedList','icon-icon-indent-left','icon-icon-indent-right']
					},
					{
						name:"text",
						value:[1,1.3,1.5,2,3]
					},
				]
			}
		},
		methods: {
			//当富文本框准备时回调
			onEditorReady() {
			    // #ifdef MP-BAIDU
			    this.editorCtx = requireDynamicLib('editorLib').createEditorContext('editor');
			    // #endif
			    
			    // #ifdef APP-PLUS || H5 ||MP-WEIXIN
			    uni.createSelectorQuery().select('#editor')
				.context((res) => {
					console.log(res.context);
			      this.editorCtx = res.context;
			    }).exec()
			    // #endif
			},
			//撤销
			undo() {
				console.log(this.editorCtx)
				this.editorCtx.undo()
			},
			//清空所有
			clearAll(){
				this.editorCtx.clear()
			},
			//输入时触发函数
			onRichInput({detail}){
				console.log(detail)
			},
			//富文本框聚焦时触发函数
			onRichFocus(e){
				console.log("聚焦")
			},
			//富文本框失去焦点时触发
			onRichBlur(e){
				console.log("失去焦点")
			},
			//通过context修改样式时触发
			richStatuschange(){
				console.log("修改样式")
			},
			//有序 / 无序列表 /选中框
			listAll(types){
				this.editorCtx.format('list',types)
			},
			//上传图片
			uploadImage(){
				this.editorCtx.insertImage({
					src:'https://pic1.imgdb.cn/item/63534ea216f2c2beb1fec198.jpg',
					alt:'长理头条',
					success:()=>{
					}
				})
				// uni.chooseImage({
				// 	count:1,
				// 	sizeType:['original','compressed'],
				// 	sourceType:'album',
					
				// })
			},
			//设置粗体
			setBold(){
				this.editorCtx.format('bold');
			},
			//toolbar触发函数
			changInconActive(index){
				this.iconToBox = index;
			}
			
		}
	}
</script>

<style lang="scss" scoped>
.release-container {
	#editor {
			width: 100%;
			border: 1px solid black;
		}
	.toolBar-txtForm{
		@extend .toolBar-common;
		justify-content: space-between;
	}
	.toolBar-sectionForm{
		@extend .toolBar-common;
		justify-content: space-around;
	}
}
.toolBar-common{
	padding: $uni-spacing-row-lg $uni-spacing-row-base;
	box-sizing: border-box;
	height: 200px;
	display: flex;
	flex-direction: column;
	background-color: $uni-bg-color-grey;
}
</style>
