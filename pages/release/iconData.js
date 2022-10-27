module.exports = {

	//toolbar list
	toolBarList: [{
		icon: 'icon-tupian',
		form: 'image'
	}, {
		icon: 'icon-Aa',
		form: ''
	}, {
		icon: 'icon-juzhongduiqi',
		form: ''
	}, {
		icon: 'icon-chehui',
		form: 'undo'
	}, {
		icon: 'icon-shujuhuifu',
		form: 'redo'
	}],

	//文字各种可选信息
	textStyleList: [
		[{
			name: "icon", //渲染模式
			value: [{
				icon: 'icon-zitijiacu',
				bold: 'strong'
			}, {
				icon: 'icon-zitixiahuaxian',
				underline: true
			}, {
				icon: 'icon-zitixieti',
				italic: 'em'
			}]
		},
		{
			name: "number",
			value: [18, 16, 14, 12, 11, 10]
		},
		{
			name: "color",
			value: ['#000000', '#888888', '#ffffff', '#f6de41', '#f68c41', '#fd3136', '#5ad8a6']
		}
	],
	//段落可选信息
 [{
			name: "icon",
			value: [{
				icon: 'icon-orderedList',
				form: 'ordered'
			}, {
				icon: 'icon-unorderedList',
				form: 'bullet'
			}]
		},
		{
			name: "icon",
			value: [{
				icon: 'icon-juzuo',
				align: 'left'
			}, {
				icon: 'icon-juzhongduiqi',
				align: 'center'
			}, {
				icon: 'icon-juyou',
				align: 'right'
			}]
		},
		{
			name: "number",
			value: ['1', '1.3','1.5', '2', '3']
		},
	]
	]
}
