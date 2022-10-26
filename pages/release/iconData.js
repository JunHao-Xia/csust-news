module.exports={
	
	//toolbar list
	toolBarList:[{icon:'icon-tupian',form:'image'},{icon:'icon-Aa',form:''},{icon:'icon-juzhongduiqi',form:''},{icon:'icon-chehui',form:'undo'},{icon:'icon-shujuhuifu',form:'redo'}],
	
	//文字各种可选信息
	Textlist:[{
		multiSelect:true,	//是否可多选
		name:"icon",	//名称
		value:[{icon:'icon-zitijiacu',form:'bold'},{icon:'icon-zitixiahuaxian',form:'underline'},{icon:'icon-zitixieti',form:'italic'}]
	},
	{
		name:"size",
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
			value:[{icon:'icon-orderedList',form:'ordered'},{icon:'icon-unorderedList',form:'bullet'}]
		},
		{
			name:"icon",
			value:[{icon:'icon-juzuo',form:'left'},{icon:'icon-juzhongduiqi',form:'center'},{icon:'icon-juyou',form:'right'}]
		},
		{
			name:"section",
			value:[1,1.3,1.5,2,3]
		},
	]
}