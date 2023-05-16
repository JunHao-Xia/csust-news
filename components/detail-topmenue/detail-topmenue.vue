<template>
	<view class="bottom-container">
		<!-- 下菜单左边评论框 -->
		<view class="menu-commandBox" @click="openComment">
				<hot-search
				:placehoderText="placehoder"
				:config="{
					height: 28,
					backgroundColor: '#eeedf4',
					icon: 'edit-pen',
					textColor: '#a6a5ab',
					border: 'none'
				}"  
				></hot-search>
		</view>
		<!-- 下菜单右边点赞以及收藏框 -->
		<view class="menu-right">
			<!-- 点赞 -->
			<view class="option-box">
				<article-menuicon @changeLike = "changeLike" :isLike="likeAndCollect.like"></article-menuicon>
			</view>
			<!-- 收藏  -->
			<view class="option-box">
				<article-menuicon @changeCollect ="changeCollect" :icontype="collect"  :isCollect="likeAndCollect.collect"></article-menuicon>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			placehoder:{
				type:String,
				default:"评论一句，前排打call"
			},
			likeAndCollect:{
				type:Object,
				require:true
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			//打开评论
			openComment(){
				this.$emit('openComment');
			},
			//传递changLike事件
			changeLike(){
				this.$emit('changeLike')
			},
			//传递changeCollect事件
			changeCollect(){
				this.$emit('changeCollect')
			}
		}
	}
</script>

<style lang="scss">
.bottom-container{
	  position: fixed;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  background-color: $uni-bg-color;
	  padding: 4px 6px 32px 6px;
	  display: flex;
	  border-top: 1px solid $uni-bg-color-grey;
	  align-items: center;
	  .menu-commandBox{
		  flex-grow: 1;
	  }
	  .menu-right{
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-grow: 1;
	  }
}
</style>
