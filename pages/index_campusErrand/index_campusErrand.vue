<template>
	<view class="errand-page">
		<!-- 筛选菜单 -->
		<view class="filter-menu">
			<view class="dropdown">
				<text class="dropdown-label">
					分类: {{ selectedCategory }}
				</text>
				<view class="dropdown-content">
					<view class="dropdown-item" @tap="selectCategory('帮我取')">帮我取</view>
					<view class="dropdown-item" @tap="selectCategory('帮我送')">帮我送</view>
					<view class="dropdown-item" @tap="selectCategory('帮我水')">帮我水</view>
					<view class="dropdown-item" @tap="selectCategory('全部')">全部</view>
				</view>
			</view>

			<view class="dropdown">
				<text class="dropdown-label">
					时间: {{ currentFilter === 'today' ? '看今天' : '等预约' }}
				</text>
				<view class="dropdown-content">
					<view class="dropdown-item" @tap="toggleOrders()">看今天</view>
					<view class="dropdown-item" @tap="toggleOrders()">等预约</view>
				</view>
			</view>

			<view class="dropdown">
				<text class="dropdown-label">
					地区: {{ selectedRegion.join(', ') || '请选择地区' }}
				</text>
				<view class="dropdown-content">
					<view class="dropdown-item" @tap="toggleRegion('东苑')">东苑</view>
					<view class="dropdown-item" @tap="toggleRegion('中苑')">中苑</view>
					<view class="dropdown-item" @tap="toggleRegion('西苑')">西苑</view>
				</view>
			</view>
		</view>

		<!-- 单子列表 -->
		<scroll-view class="order-list" scroll-y>
			<view v-for="(order, index) in filteredOrders" :key="order.id" class="order-item"
				@tap="acceptOrder(order.id)">
				<view class="order-header">
					<text class="order-title">{{ order.title }}</text>
					<text class="order-category"
						:style="{ backgroundColor: getCategoryBgColor(order.category), color: '#fff' }">{{
							order.category }}</text>
				</view>
				<view class="order-meta">
					<view class="left-meta">
						<text>日期: {{ order.date }}</text>
						<text>时间: {{ order.timeInterval }}</text>
						<text>地区: {{ order.region.join(', ') }}</text>
					</view>
					<text class="right-meta">发布: {{ order.publishTime }}</text>
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
			currentFilter: 'today',
			selectedRegion: [],
			orders: [
				{ id: 1, title: '取外卖', category: '代取', date: '2023-10-01', timeInterval: '10:00 - 12:00', publishTime: '09-30 20:00', remarks: '请尽快取货', type: 'today', region: ['东苑'] },
				{ id: 2, title: '送文件', category: '代送', date: '2023-10-01', timeInterval: '14:00 - 16:00', publishTime: '10-01 09:00', remarks: '小心 fragile', type: 'today', region: ['中苑'] },
				{ id: 3, title: '早八高数', category: '代课', date: '2023-10-02', timeInterval: '09:00 - 11:00', publishTime: '10-02 18:00', remarks: '不点名速来', type: 'scheduled', region: ['西苑'] },
				{ id: 4, title: '其他任务', category: '其他', date: '2023-10-03', timeInterval: '15:00 - 17:00', publishTime: '10-03 12:00', remarks: '常规杂务', type: 'scheduled', region: ['东苑', '中苑'] },
				{ id: 5, title: '代取快递', category: '代取', date: '2023-10-01', timeInterval: '11:00 - 12:00', publishTime: '09-30 21:00', remarks: '请尽快取件', type: 'today', region: ['东苑', '西苑'] },
				{ id: 6, title: '送书籍', category: '代送', date: '2023-10-01', timeInterval: '13:00 - 15:00', publishTime: '10-01 08:00', remarks: '小心书籍', type: 'today', region: ['中苑'] },
				{ id: 7, title: '代课', category: '代课', date: '2023-10-02', timeInterval: '08:00 - 10:00', publishTime: '10-02 07:00', remarks: '请准时到达', type: 'scheduled', region: ['东苑', '西苑'] },
				{ id: 8, title: '送文件', category: '代送', date: '2023-10-03', timeInterval: '10:00 - 12:00', publishTime: '10-02 09:00', remarks: '请小心', type: 'scheduled', region: ['中苑'] },
				{ id: 9, title: '代取水', category: '代取', date: '2023-10-01', timeInterval: '09:00 - 10:00', publishTime: '09-30 22:00', remarks: '请尽快取水', type: 'today', region: ['东苑', '中苑', '西苑'] },
				{ id: 10, title: '代送快递', category: '代送', date: '2023-10-02', timeInterval: '14:00 - 16:00', publishTime: '10-01 10:00', remarks: '请小心', type: 'scheduled', region: ['西苑'] },
				{ id: 11, title: '代课', category: '代课', date: '2023-10-03', timeInterval: '15:00 - 17:00', publishTime: '10-02 11:00', remarks: '请准时到达', type: 'scheduled', region: ['东苑'] }
			]
		};
	},
	computed: {
		filteredOrders() {
			let filteredByType = this.orders.filter(o => {
				if (this.currentFilter === 'today') {
					return o.type === 'today';
				} else {
					return o.type === 'scheduled';
				}
			});

			switch (this.selectedCategory) {
				case '帮我取':
					filteredByType = filteredByType.filter(o => o.category === '代取');
					break;
				case '帮我送':
					filteredByType = filteredByType.filter(o => o.category === '代送');
					break;
				case '帮我水':
					filteredByType = filteredByType.filter(o => o.category === '代课');
					break;
			}

			// 过滤地区
			if (this.selectedRegion.length > 0) {
				filteredByType = filteredByType.filter(o => 
					o.region.some(r => this.selectedRegion.includes(r))
				);
			}

			return filteredByType;
		}
	},
	methods: {
		selectCategory(cat) {
			this.selectedCategory = cat;
		},
		toggleRegion(region) {
			const index = this.selectedRegion.indexOf(region);
			if (index === -1) {
				this.selectedRegion.push(region);
			} else {
				this.selectedRegion.splice(index, 1);
			}
		},
		toggleOrders() {
			this.currentFilter = this.currentFilter === 'today' ? 'scheduled' : 'today';
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

<style lang="scss">
page {
	padding: 0;
}

.errand-page {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f0f2f5;
}

.toggle-block {
	background-color: #4b7bec;
	color: #fff;
	padding: 10rpx;
	text-align: center;
	border-radius: 5rpx;
	margin: 10rpx 0;
	cursor: pointer;
}

.filter-menu {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	padding: 15rpx;
	background-color: #fff;
	border-radius: 8rpx;
	box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.1);
	margin-bottom: 10rpx;
}

.dropdown {
	position: relative;
}

.dropdown-label {
	cursor: pointer;
	color: #333;
	font-weight: bold;
	padding: 10rpx;
	border-radius: 5rpx;
	transition: background-color 0.3s;
	display: flex;
	align-items: center;
}

.icon-xiala {
	margin-left: 5rpx;
	width: 16rpx;
	height: 16rpx;
}

.dropdown-label:hover {
	background-color: #f0f0f0;
}

.dropdown-content {
	display: none;
	position: absolute;
	background-color: #fff;
	border-radius: 5rpx;
	box-shadow: 0 2rpx 5rpx rgba(0, 0, 0, 0.1);
	z-index: 1;
}

.dropdown:hover .dropdown-content {
	display: block;
}

.dropdown-item {
	padding: 10rpx 15rpx;
	cursor: pointer;
	transition: background-color 0.3s;
	border-radius: 5rpx;
}

.dropdown-item:hover {
	background-color: #e0e0e0;
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
	display: flex;
	justify-content: space-between;
	color: #999;
	margin-bottom: 15rpx;
	flex-direction: row;

	& text {
		display: block;
	}
}

.left-meta {
	flex: 1;
}

.right-meta {
	color: #999;
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

.toggle-text {
	font-size: 16px;
	font-weight: bold;
}
</style>
