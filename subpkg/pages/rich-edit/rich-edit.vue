<template>
	<view class="release-container">
		<!--标题-->
			<release-title @inputVal = "inputVal" @release="openRelease"></release-title>
		<!--富文本输入栏 -->
		<view class="release-container__edit">
			<list-scroll>
				<editor id="editor" class="ql-container" placeholder="请输入内容" @input="onRichInput" @ready="onEditorReady"
				 @focus="onRichFocus"
					@blur="onRichBlur" @statuschange="richStatuschange" 
					:show-img-size="true"
					:show-img-toolbar="true"
					:show-img-resize="true"></editor>
					
			</list-scroll>
		</view>
			<!--tool-bar--> 
			<view class="toolBar-box" @focus="dddblur" :style="{marginBottom:keyHeight+'px'}">
			<tool-bar :trangger="trangger" :list="toolBarList" @changIconActive="changIconActive" @toolbarForm="toolBarForm"
				@changeIndex="changeIndex" @keyword="onKeyword" @finish="onFinish"></tool-bar>
			</view>
			<!--子菜单利用swiper-->
			<swiper class="swiper-container" v-show="iconToBox===1 || iconToBox ===2" :current="iconToBox-1">
				<swiper-item @touchmove.stop=""  class="swiper-container__item" v-for="(obj,index) in textStyleList" :key="index">
					<block v-for="(item,i) in obj" :key="i">
					<txtform-item @childIconStyle = "childIconStyle" :selectedStyle = "selectedStyle" :styleObj = "item"></txtform-item>
					</block> 
				</swiper-item>
			</swiper>
			<!-- 安全距离 -->
			<view :style="{height:safeDistance+'px'}"></view>
			<popup-info @articleDetail='articleDetailSubmit' :imageList = "imageList"  :isShow = "releaseShow" @changeShow="releaseShow=false"></popup-info>
		</view>
</template>

<script>
	import operateList from './operateMethod.js'
	import releaseTitle from './release-title'
	import {toolBarList,textStyleList} from './iconData.js'
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	export default {
		components:{
			releaseTitle
		},
		data() {
			return {
				releaseShow:false,
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
					'fontSize':this.setFontSize,
					'color':this.setTextColor,
					'list':this.listAll,
					'align':this.setAlignOfText,
					'lineHeight':this.setLineHight
				},
				iconToBox: -1,
				trangger:true,
				//安全距离
				safeDistance:0,
				//键盘高度
				keyHeight:0,
				//选中样式
				selectedStyle:{},
				//标题
				//提交表单
				submitForm:{
					//标题
					title:'',
					//内容
					content:'',
					//介绍
					intro:'',
					//分类
					category_id:0,
					//图片列表
					picture_list:''
				},
				//图片列表
				imageList:[]
				
			}
		},
		computed:{
			...mapState('uploadRichImage',['pictrue_list'])
		},
		created() {
			this.PICTRUE_CLEAR()
			//获取设备信息
			this.safeDistance = 40;
			//监听键盘变化
			// #ifdef MP-WEIXIN
			uni.onKeyboardHeightChange(res=>{
				if(res.height === 0 ){
					//恢复工具栏安全距离
					this.safeDistance = 40;
				}else{
					this.iconToBox = -1;
					this.safeDistance=0;
				}
				this.keyHeight = res.height;
				console.log("keyheight=" + this.keyHeight)
			})
			// #endif
		},
		methods: {
			...mapMutations('uploadRichImage',['PICTRUE_CLEAR','PICTRUE_ADD']),
			//点击键盘
			onKeyword() {
				//收起键盘
				uni.hideKeyboard();
			},
			// 点击完成
			onFinish() {
				uni.hideKeyboard();
			},
			gobackTop() {
			        uni.pageScrollTo({
			            scrollTop: 0
			        });
			},
			toolBarForm(form) {
				this.editorCtx.blur()
				console.log(form);
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
				console.log("获取焦点"+e)
				this.gobackTop()
				//将子富文本隐藏
				this.trangger = !this.trangger;	
			},
			//富文本框失去焦点时触发
			onRichBlur(e) {
				console.log("失去焦点")
				
			},
			//通过context修改样式时触发
			richStatuschange(e) {
				//选中样式
				this.selectedStyle= e.detail;
			},
			childIconStyle(form,value){
				this.mapName[form](value);
			},
			//标题传递
			inputVal(value){
				this.submitForm.title = value;
			},
			//发布
			async openRelease(){
				//判断内容是否正确填写
				if(!this.submitForm.title){
					this.$msg('标题不能为空')
					return
				}
				let {html} = await this.editorCtx.getContents()
				if(html === '<p><br></p>'){
					this.$msg('文章内容不能为空');
					return
				}
				console.log(this.pictrue_list);
				this.imageList =this.$_.cloneDeep(this.pictrue_list);
				this.releaseShow=true
				this.submitForm.content = html;
				
			},
			//弹出框中传给父类的其他文章信息
			async articleDetailSubmit(articleDetail){
				this.submitForm = {...this.submitForm,...articleDetail};
				console.log(this.submitForm);
				//根据mode来决定上传图片个数
				let uploadArr = this.modeToImageCount(articleDetail.mode);
				this.submitForm.picture_list = `[${uploadArr.toString()}]`;
				//进行发布文章操作
				//加载
				uni.showLoading()
				let res = await this.$api.addArticle({
					data:this.submitForm
				})
				uni.hideLoading()
				this.PICTRUE_CLEAR()
				//跳转界面
				uni.switchTab({
					url:'/pages/index/index?change='+1,
					success:()=> {
						this.$msg('添加文章成功','success')
					}
				})
				
				
			},
			modeToImageCount(mode){
				if(mode==='image'){
					return this.imageList.slice(0,1);
				}else if(mode === 'column'){
					return this.imageList.slice(0,3);
				}
				return []
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
		.release-container__edit {
			padding:0 5px;
			margin: 5px;
			box-sizing: border-box;
			flex: 1;
			overflow: hidden;
		}
		.toolBar-box{
			box-sizing: content-box;
		}

		#editor {
			width: 100%;
			height: 100%;
		}
			.swiper-container{
				margin: 5px 0;
				box-sizing: border-box;
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
