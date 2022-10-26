module.exports={
	//恢复
	redo(){
		this.editorCtx.redo()
	},
	//有序 / 无序列表 /选中框
	listAll(types){
		console.log(types)
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
	//设置下划线
	setUnderLine(){
		this.editorCtx.format('underline');
	},
	//设置字体大小
	setFontSize(size){
		this.editorCtx.format('fontSize',size+'px')
	},
	//设置文字颜色
	setTextColor(color){
		this.editorCtx.format('color',color)
	},
	//设置文字对齐方式
	setAlignOfText(align){
		this.editorCtx.format('align',align)
	},
	//设置斜体
	setItalic(){
		this.editorCtx.format('italic');
	},
	//行高
	setLineHight(height){
		this.editorCtx.format('lineHeight',height)
	},
	//撤销
	undo() {
		this.editorCtx.undo();
	},
	
	
}