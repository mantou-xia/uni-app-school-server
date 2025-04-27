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
		<view class="content-area">
			<scroll-view scroll-y class="order-list">
				<view v-for="(order, index) in filteredOrders" :key="order.id" class="order-item" 
					:class="'category-' + getCategoryClass(order.category)"
					@tap="acceptOrder(order.id)">
					<view class="order-header">
						<view class="order-type">
							<uni-icons :type="getOrderIcon(order.category)" size="18" color="#666"></uni-icons>
							<text>{{ order.title }}</text>
							<view class="fee-badge" :class="'fee-' + getCategoryClass(order.category)">
								<text class="fee-amount">￥{{ order.fee }}</text>
							</view>
						</view>
						<text class="order-status" :style="{ backgroundColor: getCategoryBgColor(order.category) }">{{ order.category }}</text>
					</view>
					
					<view class="order-content">
						<view class="info-row">
							<view class="info-item location" :class="'location-' + getCategoryClass(order.category)">
								<text class="label">日期</text>
								<text class="value">{{ order.date }}</text>
							</view>
							<view class="info-item location" :class="'location-' + getCategoryClass(order.category)">
								<text class="label">时间</text>
								<text class="value">{{ order.timeInterval }}</text>
							</view>
						</view>
						
						<!-- 根据订单类型显示不同的位置信息 -->
						<view class="location-row" v-if="order.category === '代课'">
							<view class="location-item">
								<view class="location-icon start">
									<uni-icons type="location-filled" size="16" color="#4b7bec"></uni-icons>
								</view>
								<text class="location-text">{{ order.startPoint }}</text>
							</view>
						</view>
						
						<view class="location-row" v-else>
							<view class="location-item">
								<view class="location-icon start">
									<uni-icons type="location-filled" size="16" color="#2196f3"></uni-icons>
								</view>
								<text class="location-text">{{ order.startPoint }}</text>
							</view>
							<view class="location-arrow">
								<uni-icons type="arrowthinright" size="16" color="#999"></uni-icons>
							</view>
							<view class="location-item">
								<view class="location-icon end">
									<uni-icons type="location" size="16" color="#ff4757"></uni-icons>
								</view>
								<text class="location-text">{{ order.endPoint }}</text>
							</view>
						</view>
						
						<view class="info-row">
							<view class="info-item location" :class="'location-' + getCategoryClass(order.category)">
								<text class="label">备注</text>
								<text class="value">{{ order.remarks }}</text>
							</view>
						</view>

						<view class="order-footer">
							<text class="time">发布: {{ order.publishTime }}</text>
							<view class="btn-group">
								<button class="btn" :class="getCategoryClass(order.category)">查看详情</button>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
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
				{ id: 1, title: '取外卖', category: '代取', date: '2023-10-01', timeInterval: '10:00 - 12:00', publishTime: '09-30 20:00', remarks: '请尽快取货', type: 'today', region: ['东苑'], fee: '8', startPoint: '东苑1号宿舍楼', endPoint: '东苑食堂' },
				{ id: 2, title: '送文件', category: '代送', date: '2023-10-01', timeInterval: '14:00 - 16:00', publishTime: '10-01 09:00', remarks: '小心 fragile', type: 'today', region: ['中苑'], fee: '10', startPoint: '行政楼', endPoint: '中苑3栋' },
				{ id: 3, title: '早八高数', category: '代课', date: '2023-10-02', timeInterval: '09:00 - 11:00', publishTime: '10-02 18:00', remarks: '不点名速来，请签到拍照课件', type: 'scheduled', region: ['西苑'], fee: '50', startPoint: '教学楼B302', endPoint: null },
				{ id: 4, title: '其他任务', category: '其他', date: '2023-10-03', timeInterval: '15:00 - 17:00', publishTime: '10-03 12:00', remarks: '常规杂务', type: 'scheduled', region: ['东苑', '中苑'], fee: '15', startPoint: '学生活动中心', endPoint: '图书馆' },
				{ id: 5, title: '代取快递', category: '代取', date: '2023-10-01', timeInterval: '11:00 - 12:00', publishTime: '09-30 21:00', remarks: '请尽快取件', type: 'today', region: ['东苑', '西苑'], fee: '12', startPoint: '菜鸟驿站', endPoint: '西苑2栋' },
				{ id: 6, title: '送书籍', category: '代送', date: '2023-10-01', timeInterval: '13:00 - 15:00', publishTime: '10-01 08:00', remarks: '小心书籍', type: 'today', region: ['中苑'], fee: '9', startPoint: '图书馆', endPoint: '中苑1号楼' },
				{ id: 7, title: '代课', category: '代课', date: '2023-10-02', timeInterval: '08:00 - 10:00', publishTime: '10-02 07:00', remarks: '请准时到达，完成签到并拍课件', type: 'scheduled', region: ['东苑', '西苑'], fee: '40', startPoint: '教学楼A405', endPoint: null },
				{ id: 8, title: '送文件', category: '代送', date: '2023-10-03', timeInterval: '10:00 - 12:00', publishTime: '10-02 09:00', remarks: '请小心', type: 'scheduled', region: ['中苑'], fee: '11', startPoint: '办公楼', endPoint: '中苑食堂' },
				{ id: 9, title: '代取水', category: '代取', date: '2023-10-01', timeInterval: '09:00 - 10:00', publishTime: '09-30 22:00', remarks: '请尽快取水', type: 'today', region: ['东苑', '中苑', '西苑'], fee: '5', startPoint: '超市', endPoint: '实验室' },
				{ id: 10, title: '代送快递', category: '代送', date: '2023-10-02', timeInterval: '14:00 - 16:00', publishTime: '10-01 10:00', remarks: '请小心', type: 'scheduled', region: ['西苑'], fee: '13', startPoint: '西苑5栋', endPoint: '快递站' },
				{ id: 11, title: '代课', category: '代课', date: '2023-10-03', timeInterval: '15:00 - 17:00', publishTime: '10-02 11:00', remarks: '请准时到达，记笔记并拍照课件', type: 'scheduled', region: ['东苑'], fee: '45', startPoint: '教学楼C201', endPoint: null }
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
		},
		getCategoryClass(category) {
			switch (category) {
				case '代取': return 'fetch';
				case '代送': return 'delivery';
				case '代课': return 'class';
				default: return 'other';
			}
		},
		getOrderIcon(category) {
			switch (category) {
				case '代取':
					return 'paperplane';
				case '代送':
					return 'shop';
				case '代课':
					return 'person-filled';
				default:
					return 'bars';
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
	background-color: #f5f5f5;
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

.content-area {
	flex: 1;
	padding: 30rpx;
	overflow-y: auto;
}

.order-list {
	height: 100%;
}

.order-item {
	background-color: #fff;
	border-radius: 12rpx;
	padding: 30rpx;
	margin-bottom: 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
	border-left: 6rpx solid #2196f3;
	position: relative;
}

.fee-badge {
	display: inline-flex;
	align-items: center;
	margin-left: 20rpx;
	background: linear-gradient(135deg, #ff6b6b, #ff4757);
	padding: 4rpx 12rpx;
	border-radius: 8rpx;
	box-shadow: 0 2rpx 6rpx rgba(255, 71, 87, 0.3);
	position: relative;
	top: -2rpx;
}

.fee-amount {
	color: #fff;
	font-size: 24rpx;
	font-weight: bold;
}

.fee-fetch {
	background: linear-gradient(135deg, #ff6b6b, #ff4757);
}

.fee-delivery {
	background: linear-gradient(135deg, #40c463, #2ecc71);
}

.fee-class {
	background: linear-gradient(135deg, #4b7bec, #3b5998);
}

.fee-other {
	background: linear-gradient(135deg, #a4a4a4, #777777);
}

.order-item.category-fetch .fee-badge {
	background: linear-gradient(135deg, #ff6b6b, #ff4757);
}

.order-item.category-delivery .fee-badge {
	background: linear-gradient(135deg, #40c463, #2ecc71);
}

.order-item.category-class .fee-badge {
	background: linear-gradient(135deg, #4b7bec, #3b5998);
}

.order-item.category-other .fee-badge {
	background: linear-gradient(135deg, #a4a4a4, #777777);
}

.order-item.category-fetch {
	border-left-color: #ff6b6b;
}

.order-item.category-delivery {
	border-left-color: #40c463;
}

.order-item.category-class {
	border-left-color: #4b7bec;
}

.order-item.category-other {
	border-left-color: #a4a4a4;
}

.order-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20rpx;
}

.order-type {
	display: flex;
	align-items: center;
	gap: 10rpx;
	font-size: 30rpx;
	font-weight: 500;
	color: #333;
}

.order-status {
	font-size: 26rpx;
	padding: 10rpx 30rpx;
	border-radius: 30rpx;
	color: #fff;
}

.order-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.info-row {
	display: flex;
	flex-direction: column;
	gap: 12rpx;
}

.info-item {
	display: flex;
	align-items: center;
}

.info-item.location {
	position: relative;
	padding-left: 30rpx;
}

.info-item.location::before {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background-color: #2196f3;
}

.info-item.location-fetch::before {
	background-color: #ff6b6b;
}

.info-item.location-delivery::before {
	background-color: #40c463;
}

.info-item.location-class::before {
	background-color: #4b7bec;
}

.info-item.location-other::before {
	background-color: #a4a4a4;
}

.label {
	font-size: 26rpx;
	color: #999;
	margin-right: 20rpx;
	min-width: 120rpx;
}

.value {
	font-size: 28rpx;
	color: #333;
	flex: 1;
}

.order-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20rpx;
	padding-top: 20rpx;
	border-top: 2rpx solid #f5f5f5;
}

.time {
	font-size: 24rpx;
	color: #999;
}

.btn-group {
	display: flex;
	gap: 20rpx;
}

.btn {
	font-size: 26rpx;
	padding: 10rpx 30rpx;
	border-radius: 30rpx;
	color: #fff;
	background-color: #2196f3;
}

.btn.fetch {
	background-color: #ff6b6b;
}

.btn.delivery {
	background-color: #40c463;
}

.btn.class {
	background-color: #4b7bec;
}

.btn.other {
	background-color: #a4a4a4;
}

.location-row {
	display: flex;
	align-items: center;
	background-color: #f8f9fa;
	padding: 16rpx;
	border-radius: 8rpx;
	margin: 10rpx 0;
}

.location-item {
	display: flex;
	align-items: center;
	flex: 1;
}

.location-icon {
	width: 36rpx;
	height: 36rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10rpx;
}

.location-icon.start {
	background-color: rgba(33, 150, 243, 0.1);
}

.location-icon.end {
	background-color: rgba(255, 71, 87, 0.1);
}

.location-text {
	font-size: 28rpx;
	color: #333;
	flex: 1;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.location-arrow {
	display: flex;
	align-items: center;
	padding: 0 20rpx;
}

/* 为代课类型订单添加特定样式 */
.order-item.category-class .location-icon.end {
	background-color: rgba(75, 123, 236, 0.1);
}

.order-item.category-class .location-row {
	background-color: rgba(75, 123, 236, 0.05);
}
</style>
