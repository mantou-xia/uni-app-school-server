<template>
	<view class="carousel-container">
		<swiper 
			class="carousel" 
			:indicator-dots="true" 
			:autoplay="true" 
			:interval="3000" 
			:duration="500"
			:circular="true"
			indicator-color="rgba(255,255,255,0.4)"
			indicator-active-color="#d43c33"
		>
			<swiper-item v-for="(item, index) in bannerList" :key="item.id" class="carousel-item">
				<image 
					:src="item.url" 
					mode="aspectFill" 
					class="carousel-image"
				/>
			</swiper-item>
		</swiper>
	</view>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, withDefaults } from 'vue';

interface BannerItem {
	id: number;
	url: string;
}

const props = withDefaults(defineProps<{
	bannerList?: BannerItem[];
}>(), {
	bannerList: () => [
		{ id: 1, url: 'https://picsum.photos/seed/1/800/400' },
		{ id: 2, url: 'https://picsum.photos/seed/2/800/400' },
		{ id: 3, url: 'https://picsum.photos/seed/3/800/400' }
	]
});

// 获取随机图片
const fetchRandomImages = async () => {
	try {
		return await Promise.all(
			props.bannerList.map(async (item, index) => ({
				...item,
				url: `https://picsum.photos/seed/${Date.now() + index}/800/400`
			}))
		);
	} catch (error) {
		console.error('获取轮播图失败:', error);
		return props.bannerList.map((item, index) => ({
			...item,
			url: `https://picsum.photos/seed/fallback${index}/800/400`
		}));
	}
};

const emit = defineEmits(['update:bannerList']);

onMounted(async () => {
	const randomImages = await fetchRandomImages();
	emit('update:bannerList', randomImages);
});
</script>

<style scoped>
.carousel-container {
	width: 750rpx; /* 使用uni-app的屏幕宽度单位 */
	height: 400rpx;
	position: relative;
	overflow: hidden;
	background-color: #f0f0f0; /* 添加背景色以便调试 */
	margin: 0 auto; /* 居中 */
}

.carousel {
	width: 750rpx; /* 使用uni-app的屏幕宽度单位 */
	height: 400rpx;
	background-color: #e0e0e0; /* 添加背景色以便调试 */
}

.carousel-item {
	width: 750rpx; /* 使用uni-app的屏幕宽度单位 */
	height: 400rpx;
	background-color: #d0d0d0; /* 添加背景色以便调试 */
}

.carousel-image {
	width: 750rpx; /* 使用uni-app的屏幕宽度单位 */
	height: 400rpx;
	border-radius: 16rpx;
}
</style> 