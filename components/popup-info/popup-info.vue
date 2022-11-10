<template>
	<uni-popup ref="popup" type="bottom" :mask-click="false">
		<view class="release-detailContainer">
			<!-- 关闭按钮 -->
			<view class="close_btn" @click="changeShow">
				<uni-icons type="closeempty"></uni-icons>
			</view>
			<!-- 请添加内容描述描述 -->
			<view class="content-commary">
				<text class="content-commary_text">简要描述:</text>
				<textarea v-model="articleDetailForm.intro" placeholder="请输入内容" maxlength="35">
						</textarea>
				<view class="commary-length">
					{{articleDetailForm.intro.length}}/35
				</view>
			</view>

			<!-- 选择文章模式 -->
			<view class="content-mode">
				<text class="content-commary_text">文章模式:</text>
				<view class="mode-box">
					<u-radio-group v-model="articleDetailForm.mode" placement="row" @change="groupChange">
						<u-radio :customStyle="{marginLeft: '10px'}" v-for="(item, index) in radioList" :key="index"
							:label="item.label" :name="item.name">
						</u-radio>
					</u-radio-group>

				</view>
			</view>
			<!-- 文章模式具体图形 -->
			<article-card :mode="articleDetailForm.mode"></article-card>
			<!-- 选择标签 -->
			<view class="article-label">
				<text class="content-commary_text">
					请选择标签
				</text>
				<view class="label-box" :class="{'label-color__selected':labelObj}" @click="this.show = true">
					{{labelObj.title || '请点击选择本文对应的标签'}}
				</view>
			</view>
			<u-picker title="选择标签" :show="show" @confirm="confirmPicker" :columns="columns" @cancel="cancelPicker"
				keyName="title"></u-picker>
			<view class="content-commit__btn"><button @click="articleDetailSubmit" type="primary">发布</button></view>
		</view>
	</uni-popup>
</template>

<script>
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			imageList: {
				type: Array,
				default: () => {
					return []
				}
			}
		},
		watch: {
			isShow(newVal) {
				if (newVal) {
					this.open()
					if(this.imageList.length===0){
						//数组长度为0则只保留基础mode
						this.radioList.splice(1,2);
					}
				} else {
					this.close()
				}
			},
			imageList:{
				handler(newArr){
					newArr = Array.from(newArr);
					if(newArr.length===0){
						//数组长度为0则只保留基础mode
						this.radioList.splice(1,2);
					}else if(newArr.length<=2){
						//数组长度为1-2则保留基础以及大图mode
						this.radioList.splice(2,1);
					}
				}
			}
		},
		created() {
			this.getLabel();
			//将属性进行备份
			this.backRadioList = JSON.parse(JSON.stringify(this.radioList));
			
		},
		data() {
			return {
				//picker显示
				show: false,
				columns: [],
				articleDetailForm: {
					//简要介绍
					intro: '',
					//分类id
					category_id: 0,
					//模式
					mode: 'base'
				},

				labelObj: '',
				//单选
				radioList: [{
						id: 1,
						name: 'base',
						label: '基本排版'
					},
					{
						id: 2,
						name: 'image',
						label: '大图排版'
					},
					{
						id: 3,
						name: 'column',
						label: '多图排版'
					},
				]

			};
		},
		methods: {
			//picker确认
			confirmPicker({value}){
				this.labelObj = value[0];
				this.articleDetailForm.category_id = this.labelObj.id;
				this.cancelPicker();
			},
			//picker取消
			cancelPicker() {
				this.show = false;
			},
			//开启方法
			open() {
				this.radioList = JSON.parse(JSON.stringify(this.backRadioList));
				this.$refs.popup.open('center')
			},
			//关闭方法
			close() {
				this.$refs.popup.close()
			},
			//获取标签
			async getLabel(){
				let {data} = await this.$api.getCategory()
				this.$set(this.columns,0,data)
				console.log(this.columns)
			},
			//修改弹出框状态
			changeShow() {
				this.$emit('changeShow')
			},
			//单选框选择
			groupChange(name) {
				console.log(name)
			},
			//文章提交
			articleDetailSubmit() {
				if(!this.articleDetailForm.intro){
					this.$msg('简介不能为空哦')
					return
				}
				if(!this.articleDetailForm.category_id){
					this.$msg('标签不能为空')
					return
				}
				this.changeShow()
				//浅拷贝
				let obj = Object.assign({}, this.articleDetailForm)
				this.$emit('articleDetail', obj)
				this.popupReset()

			},
			//内容模板重置
			popupReset() {
				//关闭之后将内容模板重置
				for (let key in this.articleDetailForm) {
					this.articleDetailForm[key] = '';
				}
				this.articleDetailForm.mode = 'base'
				this.labelObj = ''
			}
		},
	}
</script>

<style lang="scss" scoped>
	.release-detailContainer {
		width: 720rpx;
		height: 1060rpx;
		background-color: $uni-bg-color-grey;
		border-radius: $uni-border-radius-lg;
		box-sizing: border-box;
		padding: $uni-spacing-row-lg;
		position: relative;
		.close_btn {
			position: absolute;
			right: 0;
			top: 0;
			padding: $uni-spacing-col-base;
		}
		.content-commary {
			margin-top: $uni-spacing-row-base;
			position: relative;
			textarea {
				width: 100%;
				font-size: $uni-font-size-lg;
				height: 70px;
				margin: 10px auto;
				color: $uni-text-color-title;
				box-sizing: border-box;
				padding: $uni-spacing-row-sm;
				border: 1px solid #c8c7cc;
				box-shadow: $uni-boxShadow-base;
				border-radius: $uni-border-radius-lg;
			}
			.commary-length {
				color: $uni-text-color-grey;
				position: absolute;
				right: 5px;
				bottom: 5px;
			}
		}
		.content-mode {
			.mode-box {
				display: flex;
				justify-content: space-between;
				margin: $uni-spacing-row-base 0;
				box-sizing: border-box;
				.mode-base {
					width: 30%;
					height: 100px;
					border: 1px solid $uni-border-color;
				}
			}
		}
		.article-label {
			margin-top: $uni-spacing-row-base;

			.label-box {
				margin: $uni-spacing-row-base 0;
				padding: $uni-spacing-row-sm;
				box-sizing: border-box;
				height: 35px;
				border: 1px solid #c8c7cc;
				color: $uni-text-color-grey;
				border-radius: $uni-border-radius-lg;
			}

			.label-color__selected {
				color: $uni-text-color-title;
			}
		}
	}

	.content-commary_text {
		font-weight: bold;
		letter-spacing: 1mm;
	}
</style>
