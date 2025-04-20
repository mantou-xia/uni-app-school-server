<template>
	<view class="content">
		<!-- 测试块 -->
		<view class="test-block"></view>

		<!-- 使用自定义轮播图组件 -->
		<custom-swiper 
			v-model:bannerList="banner"
		/>

		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<ren-customer-navigator></ren-customer-navigator>
	</view>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CustomSwiper from '@/components/index/CustomSwiper/CustomSwiper.vue';

const currentIndex = ref(0);
const banner = ref([
	{
		id: 1,
		url: 'https://picsum.photos/seed/1/800/400',
	},
	{
		id: 2,
		url: 'https://picsum.photos/seed/2/800/400',
	},
	{
		id: 3,
		url: 'https://picsum.photos/seed/3/800/400',
	}
]);

const title = 'Hello World';
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