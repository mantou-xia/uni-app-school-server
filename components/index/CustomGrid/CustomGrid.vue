<template>
	<view class="grid-container">
		<view class="grid-wrapper" style="width: 750rpx;">
			<hr-grid-swiper 
				ref="gridSwiper" 
				:grid-data="gridData" 
				:columns="4" 
				:rows="2" 
				:gap="10" 
				:aspectRatio="1"
				@item-click="handleGridItemClick" 
				style="width: 750rpx;"
			>
				<template #default="{ item, gridWidth, gridHeight }">
					<view 
						class="entry-item" 
						:style="{ width: gridWidth + 'px', height: gridHeight + 'px' }"
					>
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
				gridData: [
					{
						name: "campusErrand",
						label: "校园跑腿",
						icon: "icon-xiaoyuanpaotui",
						path: "/pages/index_campusErrand/index_campusErrand"
					},
					{
						name: "snackShop",
						label: "零食小店",
						icon: "icon-shangdianmendian",
						path: "/pages/index_snackShop/index_snackShop"
					},
					{
						name: "secondHandMarket",
						label: "二手闲置",
						icon: "icon-ershoushichang-01",
						path: "/pages/index_secondHandMarket/index_secondHandMarket"
					},
					{
						name: "organizationConsult",
						label: "机构咨询",
						icon: "icon-zixun",
						path: "/pages/index_organizationConsult/index_organizationConsult"
					},
					{
						name: "otherHelp",
						label: "其他帮助",
						icon: "icon-yonghuzhongxin-bangzhuzhongxin",
						path: "/pages/index_otherHelp/index_otherHelp"
					},
					{
						name: "newCar",
						label: "买新车",
						icon: "icon-diandongche",
						path: "/pages/index_newCar/index_newCar"
					},
					{
						name: "schoolMaterials",
						label: "学校资料",
						icon: "icon-wenjianziliao",
						path: "/pages/index_schoolMaterials/index_schoolMaterials"
					},
					{
						name: "campusMap",
						label: "校园地图",
						icon: "icon-ditu",
						path: "/pages/index_campusMap/index_campusMap"
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
			// 处理网格项点击事件
			handleGridItemClick(event) {
				// 打印完整的事件对象
				console.log('Complete event:', event);

				// 获取 item 和 index
				let item, index;

				// 处理事件对象
				if (event && typeof event === 'object') {
					// 如果 item 是数字（索引），index 是对象
					if (typeof event.item === 'number' && typeof event.index === 'object') {
						index = event.item;
						item = event.index;
					} 
					// 标准的 {index, item} 对象
					else if ('index' in event && 'item' in event) {
						index = event.index;
						item = event.item;
					} 
					// 如果是直接传递的 item 对象
					else if (event.name) {
						item = event;
						index = this.gridData.findIndex(gridItem => gridItem.name === event.name);
					}
				}

				console.log('Extracted index:', index);
				console.log('Extracted item:', item);

				// 如果item不存在，显示提示
				if (!item) {
					uni.showToast({
						title: '点击项目无效',
						icon: 'none'
					});
					return;
				}

				// 检查路径是否存在
				if (!item.path) {
					uni.showToast({
						title: `${item.label || '该功能'} 暂未开放`,
						icon: 'none'
					});
					return;
				}
				uni.navigateTo({ url: item.path });
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