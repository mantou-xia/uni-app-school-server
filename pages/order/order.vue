<template>
	<view class="order-page">
		<!-- 头部分类层 -->
		<view class="category-tabs">
			<view 
				v-for="(tab, index) in tabs" 
				:key="index" 
				:class="['tab-item', currentTab === index ? 'active' : '']"
				@click="changeTab(index)"
			>
				<text>{{tab.name}}</text>
			</view>
		</view>
		
		<!-- 内容区域 -->
		<view class="content-area">
			<!-- 这里根据分类显示不同内容 -->
			<scroll-view scroll-y class="order-list">
				<view v-if="currentOrders.length === 0" class="empty-container">
					<image src="/static/logo.png" mode="aspectFit" class="empty-img"></image>
					<text class="empty-text">暂无相关订单</text>
				</view>
				<view v-else v-for="(order, index) in currentOrders" :key="index" class="order-item">
					<view class="order-header">
						<view class="order-type">
							<uni-icons :type="getOrderIcon(order.category)" size="18" color="#666"></uni-icons>
							<text>{{order.category}}</text>
						</view>
						<text class="order-status" :class="order.status">{{getStatusText(order.status)}}</text>
					</view>
					
					<view class="order-content">
						<view class="info-row">
							<view class="info-item location">
								<text class="label">取件地点</text>
								<text class="value">{{order.pickupAddress}}</text>
							</view>
							<view class="info-item location">
								<text class="label">送达地点</text>
								<text class="value">{{order.deliveryAddress}}</text>
							</view>
						</view>
						
						<view class="info-row" v-if="order.items">
							<view class="info-item">
								<text class="label">物品信息</text>
								<text class="value">{{order.items}}</text>
							</view>
						</view>

						<view class="fee-section">
							<view class="fee-item">
								<text>基础配送费</text>
								<text class="fee">¥{{order.fee}}</text>
							</view>
							<view class="fee-item" v-if="order.tip > 0">
								<text>追加金额</text>
								<text class="fee highlight">+¥{{order.tip}}</text>
							</view>
							<view class="fee-item total">
								<text>总计</text>
								<text class="fee">¥{{(Number(order.fee) + Number(order.tip || 0)).toFixed(2)}}</text>
							</view>
						</view>

						<view class="info-row">
							<view class="info-item">
								<text class="label">订单编号</text>
								<text class="value">{{order.orderNo}}</text>
							</view>
							<view class="info-item">
								<text class="label">下单时间</text>
								<text class="value">{{order.time}}</text>
							</view>
						</view>
					</view>

					<view class="order-footer">
						<text class="time">{{order.time}}</text>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<ren-customer-navigator></ren-customer-navigator>
	</view>
</template>

<script>
import renCustomerNavigator from '../../components/ren-customer-navigator/ren-customer-navigator.vue';
export default {
	data() {
		return {
			currentTab: 0,
			tabs: [
				{name: '我的发布'},
				{name: '我的接单'}
			],
			// 所有订单数据
			allOrders: [
				{
					id: 100007,
					user_id: 1001,
					rider_id: 2004,
					category: '校园跑腿',
					fee: '6.00',
					tip: '4.00',
					title: '帮取材料',
					date: '2024-04-24 14:25:18',
					deadline: '2024-04-24 16:25:00',
					finish_time: '2024-04-24 15:30:22',
					time_interval: '2小时内',
					remarks: '材料在老师办公室，已经打包好了',
					region: '学校',
					pickupAddress: '教师办公楼-A302',
					deliveryAddress: '实验楼-B505',
					contact: '139****2468',
					status: 'completed',
					statusText: '已完成',
					items: '实验材料 1包',
					orderNo: '100250424142518600678',
					time: '2024-04-24 14:25:18',
					create_time: '2024-04-24 14:25:18',
					modify_time: '2024-04-24 15:30:22',
					isMyPublish: true,
					isMyAccept: false
				},
				{
					id: 100008,
					user_id: 1002,
					rider_id: 2001,
					category: '快递代取',
					fee: '4.50',
					tip: '1.50',
					title: '取邮政快递',
					date: '2024-04-23 10:15:44',
					deadline: '2024-04-23 12:15:00',
					finish_time: '2024-04-23 11:20:35',
					time_interval: '2小时内',
					remarks: '小件快递，取件码8765',
					region: '学校',
					pickupAddress: '邮政快递点',
					deliveryAddress: '教学楼-C栋302',
					contact: '136****1357',
					status: 'completed',
					statusText: '已完成',
					items: '快递包裹 1个',
					orderNo: '100250423101544600679',
					time: '2024-04-23 10:15:44',
					create_time: '2024-04-23 10:15:44',
					modify_time: '2024-04-23 11:20:35',
					isMyPublish: false,
					isMyAccept: true
				},
				{
					id: 100009,
					user_id: 1001,
					rider_id: 2005,
					category: '食堂打饭',
					fee: '5.50',
					tip: '2.00',
					title: '午餐打包',
					date: '2024-04-22 11:45:38',
					deadline: '2024-04-22 12:45:00',
					finish_time: '2024-04-22 12:30:15',
					time_interval: '1小时内',
					remarks: '要辣，多加点菜',
					region: '学校',
					pickupAddress: '第一食堂-1楼',
					deliveryAddress: '实验楼-A208',
					contact: '138****2468',
					status: 'completed',
					statusText: '已完成',
					items: '回锅肉饭 1份, 饮料 1瓶',
					orderNo: '100250422114538600680',
					time: '2024-04-22 11:45:38',
					create_time: '2024-04-22 11:45:38',
					modify_time: '2024-04-22 12:30:15',
					isMyPublish: true,
					isMyAccept: false
				},
				{
					id: 100010,
					user_id: 1003,
					rider_id: 2001,
					category: '代跑腿',
					fee: '7.00',
					tip: '3.00',
					title: '取打印材料',
					date: '2024-04-21 15:20:33',
					deadline: '2024-04-21 17:20:00',
					finish_time: '2024-04-21 16:15:42',
					time_interval: '2小时内',
					remarks: '彩印，A4纸，双面打印',
					region: '学校',
					pickupAddress: '图书馆-打印店',
					deliveryAddress: '学生宿舍6栋-B402',
					contact: '185****7890',
					status: 'completed',
					statusText: '已完成',
					items: '打印资料 30页',
					orderNo: '100250421152033600681',
					time: '2024-04-21 15:20:33',
					create_time: '2024-04-21 15:20:33',
					modify_time: '2024-04-21 16:15:42',
					isMyPublish: false,
					isMyAccept: true
				}
			]
		};
	},
	computed: {
		// 根据当前选中的标签筛选订单
		currentOrders() {
			switch (this.currentTab) {
				case 0: // 我的发布
					return this.allOrders.filter(order => order.isMyPublish && order.status === 'completed');
				case 1: // 我的接单
					return this.allOrders.filter(order => order.isMyAccept && order.status === 'completed');
				default:
					return [];
			}
		}
	},
	methods: {
		changeTab(index) {
			this.currentTab = index;
		},
		// 获取状态文本
		getStatusText(status) {
			const statusMap = {
				'pending': '待帮助',
				'processing': '正在帮助',
				'completed': '已完成',
				'rewarding': '正在悬赏'
			};
			return statusMap[status] || '未知状态';
		},
		getOrderIcon(type) {
			switch (type) {
				case '快递代取':
					return 'paperplane';
				case '食堂打饭':
					return 'shop';
				case '校园跑腿':
				case '代跑腿':
					return 'person-filled';
				default:
					return 'bars';
			}
		}
	},
	components: {
		renCustomerNavigator
	}
}
</script>

<style>
.order-page {
	display: flex;
	flex-direction: column;
	height: 100vh;
	background-color: #f5f5f5;
}

.category-tabs {
	display: flex;
	background-color: #fff;
	padding: 20rpx 0;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.tab-item {
	flex: 1;
	text-align: center;
	font-size: 28rpx;
	color: #666;
	position: relative;
	padding: 16rpx 0;
}

.tab-item.active {
	color: #2196f3;
	font-weight: 500;
}

.tab-item.active::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 40rpx;
	height: 4rpx;
	background-color: #2196f3;
	border-radius: 2rpx;
}

.content-area {
	flex: 1;
	padding: 30rpx;
	overflow-y: auto;
}

.empty-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding-top: 200rpx;
}

.empty-img {
	width: 240rpx;
	height: 240rpx;
	margin-bottom: 30rpx;
}

.empty-text {
	font-size: 28rpx;
	color: #999;
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

.order-status.completed {
	background-color: #4caf50;
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

.fee-section {
	background-color: #f8f9fa;
	border-radius: 8rpx;
	padding: 20rpx;
}

.fee-item {
	display: flex;
	justify-content: space-between;
	font-size: 26rpx;
	color: #666;
	margin-bottom: 10rpx;
}

.fee-item:last-child {
	margin-bottom: 0;
}

.fee-item.total {
	margin-top: 16rpx;
	padding-top: 16rpx;
	border-top: 2rpx solid #eee;
	font-weight: 500;
	color: #333;
}

.fee {
	font-weight: 500;
	color: #333;
}

.fee.highlight {
	color: #ff9800;
}

.order-footer {
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20rpx;
	padding-top: 20rpx;
	border-top: 2rpx solid #f5f5f5;
}

.time {
	font-size: 24rpx;
	color: #999;
}
</style>
