<template>
	<view class="top_text">
			<!-- 顶部文字 -->
			<text class="title">{{title}}</text>
			<!-- 快捷登录框 当url带参数时有效 -->
			<text class="tip">{{subTitle}}</text>
		</view>
</template>

<script>
	export default {
		props:{
			title:{
				type:String,
				default:'请选择登录方式'
			},
			subTitle:{
				type:String,
				default:'将根据第三方账号服务平台的授权范围获取你的信息'
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	
.top_text{
	.title{
	  display: flex;
	  padding: 18px 0 5px 0;
	  font-weight: 800;
	}
	.tip {
	  display: flex;
	  color: #BDBDC0;
	  font-size: 11px;
	  margin: 6px 0;
	}
			
	}
</style>