module.exports={
	//恢复
	redo(){
		this.editorCtx.redo()
	},
	//有序 / 无序列表 /选中框
	listAll(types){
		this.editorCtx.format('list',types)
	},
	//上传图片
	 uploadImage(){
		uni.chooseMedia({
			mediaType:['image'],
			count:1,
			success:async (res)=>{
				let resFile = res.tempFiles[0].tempFilePath;
				uni.showLoading({
					title:"正在上传",
				})
				let imageResult = await uniCloud.uploadFile({
					filePath:resFile,
					cloudPath: String(Math.random()*5).split('.')[1] + '.png',
					fileType:'image'
				})
				let imageUrl = imageResult.fileID;
				this.PICTRUE_ADD(imageUrl);
				//将文件传至富文本
				this.editorCtx.insertImage({
					src:imageUrl,
					alt:'长理头条'
				})
				uni.hideLoading()
			}
		})
		
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