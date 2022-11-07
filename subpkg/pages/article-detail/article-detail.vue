<template>
	<view class="detail-container" :style="{paddingBottom:safeAreaInsets+'px'}">
		<view class="detail-header">
		<!-- 文章内容区 -->
		<view class="detaile-title">我是CSDN最硬核的作者，谁赞成，谁反对?</view>
		<!-- 作者信息 -->
		<view class="detail-authorInfo">
			<!-- 头像 -->
			<view class="detail-authorInfo__avator"><image src="/static/images/default-avatar.png" mode="aspectFit"></image></view>
			<!-- 作者昵称、发布时间 -->
			<view class="detail-authorInfo__msg">
				<!-- 昵称 -->
				<!-- 作者昵称 -->
				<view class="detail-authorInfo__msg-nickname">兔老大RabbitMq</view>
				<!-- 发布日期 -->
				<view class="detail-authorInfo__create">于 2021-04-28 13:01:15 发布</view>
			</view>
			<!-- 关注按钮 -->
				<button size="mini" type="primary" @click="fellow">关注</button>
		</view>
		</view>
		
		<!-- 内容 -->
		<view class="detail-content">
			<u-parse :content="content"></u-parse>
		</view>
		
		<!-- 评论区 -->
		<view class="">
			评论列表
		</view>
		<!--  -->
		<view class=""></view>
		
		
	</view>
</template>

<script>
	import uParse from '@/components/gaoyia-parse/parse';
	 import {mapState} from 'vuex'
	export default {
		data() {
			return {
				content: `<p style="text-align: center;"><img style="max-width:100%;height:auto" src="https://img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp" data-custom="id=wux-upload--1634023008358-1" class="editor-img"></p><p style="line-height: 2; text-align: left;"><strong style="font-size: 18px;">肖申克的救赎</strong></p><p>导演: <span style="color: rgb(90, 216, 166);">弗兰克</span>·<span style="color: rgb(90, 216, 166);">德拉邦特</span></p><p>编剧: 弗兰克·德拉邦特 / 斯蒂芬·金</p><p>主演: 蒂姆·罗宾斯 / 摩根·弗里曼 / 鲍勃·冈顿 / 威廉姆·赛德勒 / 克兰西·布朗 / <span style="font-size: 12px; color: rgb(136, 136, 136);">更多...</span></p><p>类型: 剧情 / 犯罪</p><p>制片国家/地区: 美国</p><p>语言: 英语</p><p>上映日期: 1994-09-10(多伦多电影节) / 1994-10-14(美国)</p><p>片长: 142分钟</p><p>又名: 月黑高飞(港) / 刺激1995(台) / 地狱诺言 / 铁窗岁月 / 消香克的救赎</p><p style="line-height: 2; text-align: left;">IMDb: tt0111161</p><p style="text-align: left;"><strong style="font-size: 16px;">剧情简介</strong></p><p style="text-align: left;">一场谋杀案使银行家安迪（蒂姆•罗宾斯&nbsp;Tim&nbsp;Robbins&nbsp;饰）蒙冤入狱，谋杀妻子及其情人的指控将囚禁他终生。在肖申克监狱的首次现身就让监狱“大哥”瑞德（摩根•弗里曼&nbsp;Morgan&nbsp;Freeman&nbsp;饰）对他另眼相看。瑞德帮助他搞到一把石锤和一幅女明星海报，两人渐成患难&nbsp;之交。很快，安迪在监狱里大显其才，担当监狱图书管理员，并利用自己的金融知识帮助监狱官避税，引起了典狱长的注意，被招致麾下帮助典狱长洗黑钱。偶然一次，他得知一名新入狱的小偷能够作证帮他洗脱谋杀罪。燃起一丝希望的安迪找到了典狱长，希望他能帮自己翻案。阴险伪善的狱长假装答应安迪，背后却派人杀死小偷，让他唯一能合法出狱的希望泯灭。沮丧的安迪并没有绝望，在一个电闪雷鸣的风雨夜，一场暗藏几十年的越狱计划让他自我救赎，重获自由！老朋友瑞德在他的鼓舞和帮助下，也勇敢地奔向自由。本片获得1995年奥斯卡10项提名，以及金球奖、土星奖等多项提名。</p><p style="text-align: left;"><br></p><p style="text-align: left;"><strong style="font-size: 16px;">肖申克的救赎 The Shawshank Redemption 获奖情况</strong></p><p>第67届奥斯卡金像奖  (1995)</p><p>最佳影片(提名) 妮基·马文</p><p>最佳男主角(提名) 摩根·弗里曼</p><p>最佳改编剧本(提名) 弗兰克·德拉邦特</p><p>最佳摄影(提名) 罗杰·狄金斯</p><p>最佳剪辑(提名) 理查德·弗朗西斯-布鲁斯</p><p>最佳音响(提名) 威利·D·伯顿 / 迈克尔·赫尔比克 / 罗伯特·J·利特 / 艾略特·泰森</p><p>最佳原创配乐(提名) 托马斯·纽曼</p><p>第52届金球奖  (1995)</p><p>电影类 剧情片最佳男主角(提名) 摩根·弗里曼</p><p>电影类 最佳编剧(提名) 弗兰克·德拉邦特</p><p>第19届日本电影学院奖  (1996)</p><p>最佳外语片</p><p>第20届报知映画赏  (1995)</p><p style="text-align: left;">海外作品奖 弗兰克·德拉邦特</p>`,	
			};
		},
		computed:{
			...mapState('systemInfo',['safeAreaInsets'])
		},
		methods:{
			fellow(){
				console.log('关注按钮')
			}
		},
		components:{
			uParse
		}
	}
</script>

<style lang="scss">
.detail-container{
	padding:$uni-spacing-row-sm $uni-spacing-row-base;
	.detail-header{
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		padding: $uni-spacing-row-base 0px;
		box-sizing: border-box;
	.detaile-title{
		font-size: 18px;
		font-weight: bold;
		color:$uni-text-color-title;
		padding-bottom: $uni-spacing-row-base;
		box-sizing: border-box;
	}
	.detail-authorInfo{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.detail-authorInfo__avator{
			width: 35px;
			height: 35px;
			flex-shrink: 0;
			border-radius: $uni-border-radius-circle;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.detail-authorInfo__msg{
			flex: 1;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			padding-left: $uni-spacing-row-base;
		.detail-authorInfo__msg-nickname{
			font-size: $uni-font-size-base;
			font-weight: bold;
		}
		.detail-authorInfo__create{
			color: $uni-text-color-grey;
			font-size:$uni-font-size-sm;
		}
		}
		
	}
	}
	.detail-content{
		flex: 1;
		
	}
}
</style>
