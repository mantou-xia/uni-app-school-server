<template>
	<view class="grid-container" style="width: 750rpx;">
		<view class="grid-wrapper" style="width: 750rpx;">
			<hr-grid-swiper ref="gridSwiper" :grid-data="gridData" :columns="4" :rows="2" :gap="10" :aspectRatio="1"
				style="width: 750rpx;">
				<template #default="{ item, gridWidth, gridHeight }">
					<view class="entry-item" :style="{ width: gridWidth + 'px', height: gridHeight + 'px' }">
						<view :class="['entry-item-icon', 'iconfont', item.icon]"></view>
						<view class="slot-text">{{ item.label }}</view>
					</view>
				</template>
			</hr-grid-swiper>
		</view>
	</view>
</template>

<script>
	import hrGridSwiper from "@/uni_modules/hr-grid-swiper/components/hr-grid-swiper/hr-grid-swiper.vue"

	export default {
		name: "CustomGrid",
		components: {
			hrGridSwiper
		},
		data() {
			return {
				gridData: [{
						name: "campusErrand",
						label: "校园跑腿",
						icon: "icon-xiaoyuanpaotui"
					},
					{
						name: "snackShop",
						label: "零食小店",
						icon: "icon-shangdianmendian"
					},
					{
						name: "secondHandMarket",
						label: "二手闲置",
						icon: "icon-ershoushichang-01"
					},
					{
						name: "organizationConsult",
						label: "机构咨询",
						icon: "icon-zixun"
					},
					{
						name: "otherHelp",
						label: "其他帮助",
						icon: "icon-yonghuzhongxin-bangzhuzhongxin"
					},
					{
						name: "newCar",
						label: "买新车",
						icon: "icon-maiche"
					},
					{
						name: "schoolMaterials",
						label: "学校资料",
						icon: "icon-wenjianziliao"
					},
					{
						name: "campusMap",
						label: "校园地图",
						icon: "icon-ditu"
					}
				]
			};
		},
		mounted() {
			// 强制设置容器宽度
			this.$nextTick(() => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.grid-wrapper').boundingClientRect((rect) => {
					console.log('Grid wrapper width:', rect ? rect.width : 'No rect');
				}).exec();
			});
		},
		methods: {
			// 手动触发宽度计算
			forceWidthCalculation() {
				this.$refs.gridSwiper.fetchContainerWidth();
			}
		}
	}
</script>

<style lang="scss">
	.grid-container {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 15rpx;
		box-sizing: border-box;
	}

	.grid-wrapper {
		margin: 0 auto;
	}

	.entry-item {
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.entry-item-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 10rpx;
		font-size: 64rpx;
		color: #333;
	}

	.icon-image {
		width: 28px;
		height: 28px;
	}

	.slot-text {
		font-size: 14px;
		color: #333;
		text-align: center;
	}
</style>