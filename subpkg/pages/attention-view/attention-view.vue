<template>
	<view class="attetion-container">
		<view class="attention-box">
			<view class="attetion-subsection">
				<u-subsection :list="list" mode="subsection" :current="curNow" @change="sectionChange"></u-subsection>
			</view>
			<view style="margin: 20rpx; 0">
				<uni-easyinput prefixIcon="search" @clear="clearSearch" @confirm="searchKeyWord" placeholder="搜索用户备注或名字"></uni-easyinput>
			</view>
			<view class="total">
				<text v-if="curNow===0">我的关注({{attentionCount}}人)</text>
				<text v-else>我的粉丝({{fans}}人)</text>
			</view>
		</view>
		<!-- 关注作者 -->
		<view class="attetion-content" v-if="curNow===0">
			<u-swipe-action>
				<u-swipe-action-item
				:options="options1"
				 v-for="(item, index) in filterAttentionList"
				 :key="item.follow_id"
				 :name="item.follow_id"
				 :index="index"
				 @click="clickSwiperBtn">
					<view class="swipe-action u-border-top u-border-bottom">
						<view class="swipe-action__content">
							<view class="swipe-action__content__avatar">
								<image :src="item.follow_picture?item.follow_picture:'../../../static/logo.png'" mode="aspectFit"></image>
							</view>
							<text class="swipe-action__content__text">{{item.follow}}</text>
						</view>
					</view>
				</u-swipe-action-item>
			</u-swipe-action>
		</view>
		<!-- 粉丝 -->
		<view class="attetion-content" v-else>
			
		</view>
	</view>

</template>

<script>
	import {mapState} from 'vuex'
	export default {
		computed:{
			...mapState('users',['userInfo'])
		},
		data() {
			return {
				list: ['作者', '粉丝'],
				options1: [{
					text: '取关',
					style: {
                        backgroundColor: '#f56c6c'
                    }
				}],
				curNow:0,
				//用户关注数量
				attentionCount: 0,
				//粉丝数量
				fans:0,
				//用户关注信息列表
				attentionList: [],
				filterAttentionList:[]
				

			}
		},
		mounted() {
			this.FollowCount();
			this.FollowAuthorInfo();
		},
		methods: {
			//清空搜索内容
			clearSearch(){
				this.filterAttentionList = this.$_.cloneDeep(this.attentionList)
			},
			//搜索相关用户
			searchKeyWord(val){
				if(!val){
					this.filterAttentionList = this.attentionList;
				}else{
					this.filterAttentionList = this.attentionList.filter((item)=>(item.follow.includes(val)))
				}
			},
			sectionChange(index) {
				this.curNow = index;
			},
			//获取关注或者粉丝数量
			async FollowCount(type) {
				let res;
				if(type==='fans'){
					res = await this.$api.getFansCount()
				}else{
					res = await this.$api.getFollowCount();
				}
				this.attentionCount = res.data
			},
			//获取作者关注信息
			async FollowAuthorInfo() {
				let res = await this.$api.getFollowInfo({k:'uid',v:this.userInfo.id})
				this.filterAttentionList = res.data
				this.attentionList = this.$_.cloneDeep(this.filterAttentionList);
			},
			//点击取关按钮
			async clickSwiperBtn(item){
				const i = this.filterAttentionList.findIndex((obj)=>(obj.follow_id==item.name));
				//后台取关
				try{
					await this.$api.cancelFollow({data:{
						follow_id:item.name
					}})
					this.$msg('操作成功')
				}catch(e){
					this.$msg('操作失败')
				}
				//将数据删除
				this.filterAttentionList.splice(i,1);
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.attetion-container {
		height: 100%;
		padding: 30rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;

		.attention-box {

			.total {
				font-size: 13px;
				color: gray;
				font-weight: 400;
			}
		}

		.attetion-content {
			flex: 1;
			.u-demo-block__title {
				padding: 10px 0 2px 15px;
			}
			/deep/.u-swipe-action-item{
				margin-top: 20rpx;
			}

			.swipe-action {
				&__content {
					padding: 25rpx 10rpx;
					display: flex;
					align-items: center;
					&__avatar{
						width: 70rpx;
						height: 70rpx;
						image{
							border-radius: 50%;
							width: 100%;
							height: 100%;
						}
					}

					&__text {
						padding-left: 20rpx;
						font-size: 15px;
						color: $u-main-color;
					}
				}
			}
		}
	}
</style>
