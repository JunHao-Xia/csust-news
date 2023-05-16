<template>
	<view class="list-container">
		<button type="default" :open-type="listConfig.avatarUrl?'chooseAvatar':''" @chooseavatar="chooseavatar"
			@click="clickInfoBtn">
			<!-- 标题 -->
			<view class="title">
				<text>{{title}}</text>
			</view>
			<!-- 头像 -->
			<view class="content">
				<!-- 头像 -->
				<view v-if="listConfig.avatarUrl" class="right-box">
					<image :src="listConfig.avatarUrl" class="refreshIcon"></image>
				</view>

				<!-- 昵称 -->
				<view class="right-box" v-else-if="listConfig.nickName">
					<text class="rightText">{{listConfig.nickName}}</text>
				</view>
				
				
				<!-- 性别 -->
				<view class="right-box" v-else-if="listConfig.type==='sex'">
					<text class="rightText">{{typeValue || '请选择性别'}}</text>
				</view>
				
				<!-- 出生日期 -->
				<view class="right-box" v-else-if="listConfig.type==='birthday'">
					<text class="rightText">{{typeValue || '请选择出生日期'}}</text>
				</view>

				<u-icon name="arrow-right" color="black" size="20"></u-icon>
			</view>
		</button>
	</view>
</template>

<script>
	export default {
		props: {
			title: {
				type: String,
				default: ''
			},
			typeValue:{
				type:String,
				default:''
			},
			listConfig: {
				type: Object,
				default () {
					return {
						avatarUrl: '',
						nickName: '',
						type:''
					}
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			chooseavatar(e){
				this.$emit('chooseavatar',e)
			},
			clickInfoBtn() {
				const {
					avatarUrl,
					nickName,
					sex,
					area
				} = this.listConfig;
				//如果是头像就直接返回
				if(avatarUrl) return;
				else if(nickName){
					this.$emit('update-user-nickName')
				}else if(this.listConfig.type==='sex'){
					this.$emit('chooiceSex')
				}else{
					this.$emit('chooiceBirth')
				}
			}
		}
	}
</script>

<style lang="scss">
	.list-container {
		background: #fff;

		button {
			background: #fff;
			display: flex;
			justify-content: space-between;
			padding-top: 5px;
			padding-bottom: 5px;
			border: none;
			border-bottom: 1px solid #eee;
			align-items: center;

			.title {
				padding: 7px 0;
				font-size: $uni-font-size-lg;
			}

			.content {
				display: flex;
				justify-content: center;
				align-items: center;

				.right-box {
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.refreshIcon {
					width: 70rpx;
					height: 70rpx;
					border-radius: 50%;
				}

			}
		}

		.rightText {
			color: #CDCDCD;
			font-size: $uni-font-size-lg;
		}
	}
</style>
