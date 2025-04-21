<template>
	<view class="content">
		<!-- 使用自定义轮播图组件 -->
		<custom-swiper v-model:bannerList="banner" />
		
		<!-- 使用自定义公告组件，传递公告内容 -->
		<custom-notice :notice-content="announcement" />

		<!-- 添加功能网格组件 -->
		<custom-grid></custom-grid>

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

export default {
	data() {
		return {
			banner: [
				{
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
			announcement: '欢迎使用校园服务平台，我们致力于为您提供最佳的服务体验！'
		}
	},
	components: {
		CustomSwiper,
		CustomNotice,
		CustomGrid
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