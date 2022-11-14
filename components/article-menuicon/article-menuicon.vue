<template>
	<view class="menuIcon-container">
		<view class="menuIcon-box" @click="clickLike" v-if="icontype==='like'">
			<image class="iconImage" :src="likeAction"></image>
			<text class="txt">点赞</text>
		</view>
		<view class="menuIcon-box" @click="clickCollect" v-else>
			<image class="iconImage"  :src="collectAction"></image>
			<text class="txt">收藏</text>
		</view>
		
	</view>
</template>

<script>
	export default {
		props:{
			isActive:{
				type:Boolean,
				default:false
			},
			icontype:{
				type:String,
				default:'like'
			},
			isLike:{
				type:Boolean,
				default:false
			},
			isCollect:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			likeAction(){
				if(this.isLike){
					return require('@/static/images/praise.png')
				}
				return require('@/static/images/un-praise.png')
			},
			collectAction(){
				if(this.isCollect){
					return require('@/static/images/collect.png')
				}
				return require('@/static/images/un-collect.png')
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			clickLike(e){
				this.$emit('changeLike')
			},
			clickCollect(e){
				this.$emit('changeCollect')
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.menuIcon-container{
		.menuIcon-box{
			display: flex;
			flex-direction: column;
			align-items: center;
		.iconImage {
		    width: $uni-img-size-base;
		    height: $uni-img-size-base;
		  }
		  .txt {
		    font-size: $uni-font-size-sm;
		    color: $uni-text-color;
		  }
		  }
	}
</style>
