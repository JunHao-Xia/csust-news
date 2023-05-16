<template>
	<view class="readHistory-container">
			<view class="hot-container__content">
				<list-scroll>
					<block class="hotCard" v-for="(item,index) in articleList" :key="item.id">
					<hot-card noRank  :index="index" :item="item"></hot-card>
					</block>	
				</list-scroll>
			</view>	
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {pictrueListChangeMode} from '../../../until/index.js'
	export default {
		data() {
			return {
				articleList: [],
			}
		},
		computed: {
			...mapState('readVideoHistory', ['readArticleHistory'])
		},
		methods: {
			getArticleList(ids) {
				let list = [];
				ids.map(async (item) => {
					let {data} = await this.$api.getArticleAll({
						k: 'id',
						v: item
					})
					let changArr = pictrueListChangeMode(data)
					this.articleList = [...this.articleList,...changArr]
				})
			}
		},
		mounted() {
			this.getArticleList(this.readArticleHistory);
		}
	}
</script>

<style lang="scss" scoped>
	.readHistory-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 10rpx 15rpx;
		.hot-container__content{
			flex: 1;
		}
	}
</style>
