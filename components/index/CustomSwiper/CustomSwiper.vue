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

<script>
export default {
	name: 'CustomSwiper',
	props: {
		bannerList: {
			type: Array,
			default: () => [
				{ id: 1, url: 'https://picsum.photos/seed/1/800/400' },
				{ id: 2, url: 'https://picsum.photos/seed/2/800/400' },
				{ id: 3, url: 'https://picsum.photos/seed/3/800/400' }
			]
		}
	},
	data() {
		return {
			currentBannerList: this.bannerList
		}
	},
	methods: {
		async fetchRandomImages() {
			try {
				this.currentBannerList = await Promise.all(
					this.currentBannerList.map(async (item, index) => ({
						...item,
						url: `https://picsum.photos/seed/${Date.now() + index}/800/400`
					}))
				);
				this.$emit('update:bannerList', this.currentBannerList);
			} catch (error) {
				console.error('获取轮播图失败:', error);
			}
		}
	},
	mounted() {
		this.fetchRandomImages();
	}
}
</script>

<style scoped>
.carousel-container {
	width: 750rpx;
	height: 400rpx;
	position: relative;
	overflow: hidden;
}

.carousel {
	width: 750rpx;
	height: 400rpx;
}

.carousel-item {
	width: 750rpx;
	height: 400rpx;
}

.carousel-image {
	width: 750rpx;
	height: 400rpx;
	border-radius: 16rpx;
}
</style> 