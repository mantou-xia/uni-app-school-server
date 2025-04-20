<template>
	<view class="content">
		<!-- 使用自定义轮播图组件 -->
		<custom-swiper v-model:bannerList="banner" />

		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{ title }}</text>
		</view>
		<ren-customer-navigator></ren-customer-navigator>
	</view>
</template>

<script>
import CustomSwiper from '@/components/index/CustomSwiper/CustomSwiper.vue';

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
			title: 'Hello World'
		}
	},
	components: {
		CustomSwiper
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