<template>
	<view class="comment-container" :style="{transform: `translateY(${-bottom}px)`}">
		 <uni-easyinput
		      v-model="value"
		      type="textarea"
		      placeholder="说点什么..."
		      :maxlength="50"
		      :inputBorder="false"
		    ></uni-easyinput> 
			<button type="primary" @click="commitComment" :disabled="!value" size="mini">提交</button>
	</view>
</template>

<script>
	export default {
		created() {
			uni.onKeyboardHeightChange(({height})=>{
				this.bottom = height
			})
		},
		props:{
			article_id:{
				type:Number,
				default:-1
			}
		},
		data() {
			return {
				//评论文本
				value:'',
				bottom:0
			};
		},
		methods:{
			//发表评论
			 async commitComment(){
					this.$emit('successComment',this.value)
				}
			}
		}
</script>

<style lang="scss" scoped>
.comment-container{
	background-color: $uni-bg-color;
	border-radius: $uni-border-radius-lg;
	padding: $uni-spacing-row-base;
	text-align: right;
	position: relative;
}
</style>
