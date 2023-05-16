<template>
	<view class="personal-container">
		<person-info-list-item :listConfig="{avatarUrl:userInfo.img_path?userInfo.img_path:defaultAvaUrl}" @chooseavatar="chooseavatar" :title="'头像'" />
		<person-info-list-item :listConfig="{nickName:userInfo.nickname || '微信用户'}"
			@update-user-nickName="updateNickName" :title="'昵称'" />
		<person-info-list-item :listConfig="{type:'sex'}" :typeValue="ganderTextToNum" :title="'性别'"
			@chooiceSex="chooseSex" />
		<person-info-list-item :listConfig="{type:'birthday'}" :typeValue="userInfo.birthday" :title="'出生日期'"
			@chooiceBirth="chooiceBirth" />
		<!-- 男女 -->
		<u-picker :show="show" :columns="columns" ref="uPicker" @cancel="show=false" @confirm="confirm"></u-picker>
		<!-- 日期 -->
		<u-datetime-picker :show="datashow" @cancel="datashow=false"
			@confirm="dataComfirm" mode="date">
		</u-datetime-picker>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		userUpdateMixin
	} from "@/mixins/userUpdateMixin"
	import imgageBase64 from '../../../until/imageToBase64.js'
	export default {
		mixins: [userUpdateMixin],
		data() {
			return {
				defaultAvaUrl:'/static/logo.png',
				show: false,
				datashow: false,
				columns: [
					['男', '女']
				]
			}
		},
		computed: {
			...mapState('users', ['userInfo']),
			ganderTextToNum(){
				let ganderCode = this.userInfo.gander*1;
				if(ganderCode===1){
					return '男';
				}else if (ganderCode===2){
					return '女';
				}else{
					return '';
				}
				
			}
		},
		methods: {
			async chooseavatar({detail}){
				console.log();
				//请求数据获取用户信息
				let baseImage = await imgageBase64(detail.avatarUrl,'png');
				this.$api.updateAvatar(baseImage)
				//更新本地
				this.updateUserInfo('avatarUrl',baseImage)
			},
			confirm({
				indexs
			}) {
				let sexValue = indexs[0]*1 +1;
				//更新vuex以及本地
				this.updateUserInfo('gander', sexValue)
				//更新数据库
				this.$api.updateUser({gander:sexValue})
				//关闭弹出框
				this.show = false
			},
			// 选择出生日期
			chooiceBirth() {
				this.datashow = true;
			},
			changeHandler(e) {
				console.log(e);
			},
			updateNickName() {
				uni.navigateTo({
					url: '/subpkg/pages/update-users-nickname/update-users-nickname'
				})
			},
			chooseSex() {
				this.show = true
			},
			dataComfirm(e) {
				const {
					value
				} = e;
				//更新本地
				let timeStr = uni.$u.timeFormat(value, 'yyyy-mm-dd');
				this.updateUserInfo('birthday', timeStr)
				//更新数据库
				this.$api.updateUser({birthday:timeStr})
				//关闭
				this.datashow=false
			}
		}
	}
</script>

<style lang="scss" scoped>
	.personal-container {
		height: 100%;
		margin-top: 20rpx;
	}
</style>
