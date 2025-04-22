<template>
	<view class="content">
		<!-- 使用自定义轮播图组件 -->
		<custom-swiper v-model:bannerList="banner" />

		<!-- 使用自定义公告组件，传递公告内容 -->
		<custom-notice :notice-content="announcement" />

		<!-- 添加功能网格组件 -->
		<custom-grid></custom-grid>

		<!-- 使用自定义搜索组件，添加输入和搜索事件，指定搜索类型 -->
		<custom-search 
			type="shopping"
			@input="handleSearchInput" 
			@search="handleSearch"
		></custom-search>
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<ren-customer-navigator></ren-customer-navigator>
	</view>
</template>

<script>
	import CustomSwiper from '@/components/index/CustomSwiper/CustomSwiper.vue';
	import CustomNotice from '@/components/index/CustomNotice/CustomNotice.vue';
	import CustomGrid from '@/components/index/CustomGrid/CustomGrid.vue';
	import CustomSearch from '@/components/common/CustomSearch/CustomSearch.vue';
	export default {
		data() {
			return {
				banner: [{
						url: 'https://picsum.photos/seed/1/800/400',
					},
					{
						url: 'https://picsum.photos/seed/2/800/400',
					},
					{
						url: 'https://picsum.photos/seed/3/800/400',
					}
				],
				title: 'Hello World',
				announcement: '欢迎使用校园服务平台，我们致力于为您提供最佳的服务体验！',
				searchKeyword: '' // 添加搜索关键词状态
			}
		},
		components: {
			CustomSwiper,
			CustomNotice,
			CustomGrid,
			CustomSearch
		},
		methods: {
			// 处理搜索输入事件
			handleSearchInput(searchData) {
				const { keyword, type } = searchData;
				this.searchKeyword = keyword;
				console.log(`正在${type === 'shopping' ? '商城' : '发现'}搜索:`, keyword);
			},

			// 处理搜索确认事件
			handleSearch(searchData) {
				const { keyword, type } = searchData;
				
				// 根据搜索类型执行不同的搜索逻辑
				if (type === 'shopping') {
					// 商城搜索逻辑
					uni.showModal({
						title: '商城搜索',
						content: `您在商城搜索：${keyword}`,
						showCancel: false,
						confirmText: '确定'
					});
					// 可以添加跳转到商城搜索结果页的逻辑
					// uni.navigateTo({ url: `/pages/shopping/search?keyword=${keyword}` });
				} else {
					// 发现页搜索逻辑
					uni.showModal({
						title: '发现搜索',
						content: `您在发现页搜索：${keyword}`,
						showCancel: false,
						confirmText: '确定'
					});
					// 可以添加跳转到发现页搜索结果页的逻辑
					// uni.navigateTo({ url: `/pages/find/search?keyword=${keyword}` });
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.test-block {
		width: 750rpx;
		height: 100rpx;
		background-color: red;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

<!-- 公告 -->
<style lang="scss">
	// 样式已移至 CustomNotice 组件
</style>