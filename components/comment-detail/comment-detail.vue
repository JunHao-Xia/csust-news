<template>
	<view class="comment_detail">
		<!-- 评论显示总数 -->
		<view class="comment-total">
			<text class="title">1956条评论</text>
		</view>
		<!-- 评论信息 -->
		<view class="comment_info" @click="getFocus">
			<list-scroll>
				<block v-for="item in commentList" :key="item.id">
					<comment-card 
					@expectReply="expectReply" 
					@commentToReply="commentToReply"
					 @putAwayComment="putAwayComment"
					:comment="item">
					</comment-card>
				</block>
			</list-scroll>
		</view>
		<!-- 底部回复框 -->
		<view class="bottom-replyBox">
			<view class="bottom-item">
				<u-input ref="replyRef" @input="inputContent" :value="replyVal" @confirm="replyComment" :focus="isFocus"
					@blur="onBlur" :placeholder="placeHolder" border="surround" shape="circle" clearable
					prefixIcon="order" :customStyle="{
					height:'20px'
				}"></u-input>
			</view>
		</view>
	</view>
</template>

<script>
	import commentData from '../../mockdata/commentData.js'
	export default {
		props: {
			commentObj:{
				type:Object,
				default(){
					return {}
				}
			},
			article_id: {
				type: Number,
				default: 0
			},
			isFlush:{
				type:Boolean,
				default:false
			}
		},
		watch:{
			isFlush(){
				setTimeout(()=>{
					this.getCommentList(this.article_id)
				},500)	
			},
			commentObj(){
				this.commentToReply(this.commentObj)
			}
		},
		data() {
			return {
				keyword: '',
				placeHolder: '善意结善缘 恶语伤人心',
				isFocus: false,
				comment: {},
				commentId: 0,
				//更多评论
				commentList: [],
				//回复框内容
				replyVal: '',
				timeout:null,
				replyId:0
			};
		},
		methods: {
			getFocus() {
				this.isFocus = true
			},
			onBlur() {
				this.isFocus = false;
				console.log("BLUR=="+1);
			},
			commentToReply(comment) {
				//子评论
				if(comment.comment_id){
					this.commentId = comment.comment_id;
					this.replyId=comment.id
					this.placeHolder = `回复：${comment.reply_name}`
				}else{
					//父评论
					this.commentId = comment.id;
					this.placeHolder = `回复：${comment.author}`
				}
				this.getFocus()
			},
			inputContent(e) {
				clearTimeout(this.timeout);
				this.timeout = setTimeout(() => {
					this.replyVal=e
				}, 300);
			},
			//更多评论
			async getCommentList(id) {
				let {
					data
				} = await this.$api.getComments({
					k: 'aid',
					v: id,
					page: 1,
					size: 10
				})
				if(this.commentList.length!=0){
					this.commentList.unshift(data.list[0]);
				}else{
					this.commentList = data.list;
				}
				
			},
			//评论回复
			async replyComment(val) {
				if(!val){
					return;
				}
				if(this.commentId===0){
					//父评论
					this.$emit('parentComment',val,this.getCommentList)
				}else{
					//子评论回复
					const index = this.commentList.findIndex(item=>item.id===this.commentId);
					const obj = {comment_id:this.commentId,content:val}
					if(this.replyId!==0){
						obj['reply_id']=this.replyId
					}
					let res = await this.$api.addReply(obj);
					this.$set(this.commentList[index],'reply_count',this.commentList[index].reply_count+1)
					this.expectReply(this.commentId)
				}
				this.reset()
				this.$msg('评论成功')
			},
			//展开评论
			async expectReply(id) {
				let {
					data
				} = await this.$api.getApplyList({
					k: 'cid',
					v: id
				})
				console.log(data);
				const index = this.commentList.findIndex(item => item.id === id)
				this.$set(this.commentList[index], 'children', data)
			},
			//重置下方输入框
			reset() {
				this.replyVal = '';
				this.placeHolder = "善意结善缘 恶语伤人心"
				this.commentId = 0;
				this.replyId=0;
			},
			//收起评论
			putAwayComment(id){
				const index = this.commentList.findIndex(item => item.id === id);
				// 待优化
				this.$set(this.commentList[index],'children',[]);
			}

		},
		mounted() {
			this.getCommentList(this.article_id)
		}
	}
</script>

<style lang="scss">
	.comment_detail {
		overflow-wrap: break-word;
		display: flex;
		flex-direction: column;
		height: 1000rpx;
		border-radius: 10px;
		padding: 10px;
		box-sizing: border-box;

		.comment-total {
			font-size: 13px;
			color: #000;
			font-weight: 500;
			text-align: center;
		}

		.comment_info {
			margin-top: 30rpx;
			overflow: hidden;
			flex: 1;
		}

		.bottom-replyBox {
			position: absolute;
			width: 750rpx;
			height: 45px;
			display: flex;
			justify-content: center;
			align-items: center;
			left: 0;
			bottom: 0;
			border-top: 1px solid #eee;

			.bottom-item {
				width: 90%;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		&::after {
			content: "";
			/* 添加内容 */
			clear: both;
			/* 清楚两侧浮动 */
			display: block;
			/* 转换元素类型为块元素 */
			height: 45px;
			overflow: hidden;
			/* 溢出隐藏属性 */
			visibility: hidden;
			/* 隐藏属性 */
		}
	}
</style>
