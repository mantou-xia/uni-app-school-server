<template>
	<view class="errand-page">
		<!-- 分类选择器 -->
		<view class="category-selector">
			<view class="category-item red" :class="{ active: selectedCategory === '帮我取' }"
				@tap="selectCategory('帮我取')">帮我取</view>
			<view class="category-item green" :class="{ active: selectedCategory === '帮我送' }"
				@tap="selectCategory('帮我送')">帮我送</view>
			<view class="category-item blue" :class="{ active: selectedCategory === '帮我水' }"
				@tap="selectCategory('帮我水')">帮我水</view>
			<view class="category-item gray" :class="{ active: selectedCategory === '全部' }" @tap="selectCategory('全部')">
				全部</view>
		</view>

		<!-- 单子列表 -->
		<scroll-view class="order-list" scroll-y>
			<view v-for="(order, index) in filteredOrders" :key="order.id" class="order-item" @tap="acceptOrder(order.id)">
				<view class="order-header">
					<text class="order-title">{{ order.title }}</text>
					<text class="order-category" :style="{ backgroundColor: getCategoryBgColor(order.category), color: '#fff' }">{{ order.category }}</text>
				</view>
				<view class="order-meta">
					<text>时间: {{ order.timeInterval }}</text>
					<text>发布: {{ order.publishTime }}</text>
				</view>
				<view class="order-footer">
					<text class="order-remarks">备注: {{ order.remarks }}</text>
					<text class="detail-text">查看详情</text>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			selectedCategory: '全部',
			orders: [
				{ id: 1, title: '取外卖', category: '代取', timeInterval: '10:00 - 12:00', publishTime: '09-30 20:00', remarks: '请尽快取货' },
				{ id: 2, title: '送文件', category: '代送', timeInterval: '14:00 - 16:00', publishTime: '10-01 09:00', remarks: '小心 fragile' },
				{ id: 3, title: '早八高数', category: '代课', timeInterval: '09:00 - 11:00', publishTime: '10-02 18:00', remarks: '不点名速来' },
				{ id: 4, title: '其他任务', category: '其他', timeInterval: '15:00 - 17:00', publishTime: '10-03 12:00', remarks: '常规杂务' }
			]
		};
	},
	computed: {
		filteredOrders() {
			switch (this.selectedCategory) {
				case '帮我取':
					return this.orders.filter(o => o.category === '代取');
				case '帮我送':
					return this.orders.filter(o => o.category === '代送');
				case '帮我水':
					return this.orders.filter(o => o.category === '代课');
				default:
					return this.orders;
			}
		}
	},
	methods: {
		selectCategory(cat) {
			this.selectedCategory = cat;
		},
		acceptOrder(id) {
			uni.navigateTo({ url: `/pages/index_campusErrand/order_detail/order_detail?id=${id}` });
		},
		getCategoryBgColor(category) {
			switch (category) {
				case '代取': return '#ff6b6b';
				case '代送': return '#40c463';
				case '代课': return '#4b7bec';
				default: return '#a4a4a4';
			}
		}
	}
}
</script>

<style>
page {
	padding: 0;
}

.errand-page {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f0f2f5;
}

.category-selector {
	flex-direction: row;
	display: flex;
	justify-content: space-around;
	padding: 20rpx;
	background-color: #fff;
	box-shadow: 0 2rpx 5rpx rgba(0, 0, 0, 0.05);
}

.category-item {
	padding: 10rpx 25rpx;
	border-radius: 20rpx;
	color: #fff;
	font-size: 14px;
	transition: all 0.3s;
}

.category-item.active {
	background-color: #fff !important;
	color: #333 !important;
	border: 1rpx solid #ccc;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.category-item.red {
	background-color: #ff6b6b;
}

.category-item.green {
	background-color: #40c463;
}

.category-item.blue {
	background-color: #4b7bec;
}

.category-item.gray {
	background-color: #a4a4a4;
}

.order-list {
	flex: 1;
	padding: 20rpx;
}

.order-item {
	background-color: #fff;
	margin-bottom: 20rpx;
	border-radius: 10rpx;
	padding: 20rpx 40rpx 20rpx 20rpx;
	border-left: 6rpx solid #4b7bec;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.03);
}

.order-header {
	flex-direction: row;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 25rpx;
}

.order-title {
	font-size: 20px;
	font-weight: bold;
	color: #333;
}

.order-category {
	font-size: 16px;
	padding: 4rpx 8rpx;
	border-radius: 60rpx;
}

.order-meta {
	font-size: 14px;
	display: flex;
	justify-content: space-between;
	color: #999;
	margin-bottom: 15rpx;
}

.order-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 5rpx;
}

.order-remarks {
	font-size: 16px;
	color: #555;
	margin-bottom: 15rpx;
}

.detail-text {
	color: #4b7bec;
	font-size: 14px;
	font-weight: bold;
}
</style>
