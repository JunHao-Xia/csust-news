<template>
	<view class="hot-container">
		<view class="hot-container__logo">
			<image src="../../static/csustTop.png" mode="aspectFit"></image>
		</view>
		<view class="hot-container__search" @click="toSearchPage">
			<hot-search :placehoderText="placehoderText"></hot-search>
		</view>
		<view class="hot-container__uTabs">
			<u-tabs :list="labelList" keyName="title" @touchmove.stop @click="clickTabs"></u-tabs>
		</view>
		<view class="hot-container__card">
			<hot-card v-for="(item,index) in categoryList" :item = "item" :index="index" :key="item.id"></hot-card>
		</view>
	</view>
</template>

<script>
	export default {
		created() {
			this.getLabel()
		},
		data() {
			return {
				placehoderText: "长理头条热榜....",
				//标签列表
				labelList: [],
				//类别文章列表
				categoryList: []
			};
		},
		methods: {
			async getLabel() {
				let {
					data
				} = await this.$api.getCategory();
				this.labelList = data;
				this.findArticleToCategory(data[0].id)
			},
			//根据分类ID查找列表
			async findArticleToCategory(cID) {
				let {data} = await this.$api.getArticleToContent({
					data: {
						k: 'cid',
						v: cID
					}
				})
				console.log(data)
				this.categoryList=data;
			},
			clickTabs(e) {
				let {id} = e;
				this.findArticleToCategory(id)
				//当页面被点击，触发页面内容置顶
				uni.$emit('tabToBackTop');
			},
			
			// 跳转至subpkg下的search-blog页面
			toSearchPage() {
				uni.navigateTo({
					url: "/subpkg/pages/search-blog/search-blog"
				})
			},
			
		}

	}
</script>

<style lang="scss" scoped>
	.hot-container {
		.hot-container__logo {
			width: 100%;
			height: 100px;
			display: flex;
			justify-content: center;

			image {
				width: 180px;
				height: 100px;
			}
		}

		.hot-container__search {
			padding: 0 $uni-spacing-row-lg;
			box-sizing: border-box;
		}

		.hot-container__uTabs {
			background-color: #fff;
			position: sticky;
			z-index: 99;
			top: 0;
		}
	}
</style>
