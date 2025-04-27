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
				<view v-for="(order, index) in currentOrders" :key="index" class="order-item" @click="goToOrderDetail(order)">
					<view class="order-header">
						<view class="order-type">
							<uni-icons :type="getOrderIcon(order.type)" size="18" color="#666"></uni-icons>
							<text>{{order.type}}</text>
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
								<text>配送费</text>
								<text class="fee">¥{{order.fee}}</text>
							</view>
							<view class="fee-item" v-if="order.tip > 0">
								<text>小费</text>
								<text class="fee highlight">+¥{{order.tip}}</text>
							</view>
						</view>

						<view class="order-footer">
							<text class="time">{{order.time}}</text>
							<view class="btn-group">
								<button 
									class="btn" 
									:class="order.status"
									@click.stop="handleOrderAction(order)"
								>{{getActionText(order.status)}}</button>
							</view>
						</view>
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
				{name: '全部订单'},
				{name: '我的订单'},
				{name: '我的接单'},
				{name: '正在悬赏'}
			],
			// 所有订单数据
			allOrders: [
				{
					type: '快递代取',
					status: 'pending',
					statusText: '待帮助',
					expressType: '中件',
					expressCount: 1,
					remark: '一件衣服',
					expectedDelivery: '尽快送达',
					pickupAddress: '快递点-科技园快递点（南信一号楼数学楼东侧店）',
					deliveryAddress: '男生宿舍-学生公寓2栋-2单元2-304d',
					fee: '3.00',
					tip: '0.00',
					time: '2024-03-10 14:30',
					orderNo: '100250425143509600672',
					payTime: '2025-04-25 14:35:24',
					acceptTime: '2025-04-25 14:39:25'
				},
				{
					type: '快递代取',
					status: 'processing',
					statusText: '正在帮助',
					pickupAddress: '快递点-菜鸟驿站（3号柜台）',
					deliveryAddress: '学生宿舍8栋-B305',
					items: '快递包裹 1件',
					fee: '3.00',
					tip: '2.00',
					time: '2024-03-10 12:00',
					orderNo: '100250425143509600673'
				},
				{
					type: '食堂打饭',
					status: 'completed',
					statusText: '已帮助',
					pickupAddress: '第一食堂-2楼',
					deliveryAddress: '图书馆-3楼自习室',
					items: '黄焖鸡米饭 1份',
					fee: '3.00',
					tip: '1.00',
					time: '2024-03-10 15:30',
					orderNo: '100250425143509600674'
				},
				{
					type: '快递代取',
					status: 'rewarding',
					statusText: '正在悬赏',
					pickupAddress: '快递点-京东快递站点',
					deliveryAddress: '教学楼-A栋201',
					items: '大件快递 1个',
					fee: '5.00',
					tip: '3.00',
					time: '2024-03-10 16:20',
					orderNo: '100250425143509600675'
				},
				{
					type: '校园跑腿',
					status: 'pending',
					statusText: '待帮助',
					pickupAddress: '图书馆-1楼打印店',
					deliveryAddress: '教学楼-C栋405',
					items: '打印资料 20页',
					fee: '2.00',
					tip: '1.00',
					time: '2024-03-10 17:00',
					orderNo: '100250425143509600676',
					remark: '双面打印，彩印'
				},
				{
					type: '食堂打饭',
					status: 'rewarding',
					statusText: '正在悬赏',
					pickupAddress: '第二食堂-1楼',
					deliveryAddress: '实验楼-B区203',
					items: '麻辣香锅套餐 1份',
					fee: '4.00',
					tip: '5.00',
					time: '2024-03-10 11:30',
					orderNo: '100250425143509600677',
					remark: '不要太辣，多加青菜'
				},
				{
					type: '校园跑腿',
					status: 'processing',
					statusText: '正在帮助',
					pickupAddress: '校医院',
					deliveryAddress: '女生宿舍-6栋-504',
					items: '药品',
					fee: '5.00',
					tip: '3.00',
					time: '2024-03-10 09:15',
					orderNo: '100250425143509600678',
					remark: '帮取感冒药，已开好处方'
				},
				{
					type: '快递代取',
					status: 'completed',
					statusText: '已帮助',
					pickupAddress: '快递点-顺丰快递点（西门店）',
					deliveryAddress: '教师公寓-3号楼-502',
					items: '快递包裹 2件',
					fee: '6.00',
					tip: '2.00',
					time: '2024-03-10 08:30',
					orderNo: '100250425143509600679',
					remark: '易碎物品，请小心搬运'
				},
				{
					type: '食堂打饭',
					status: 'processing',
					statusText: '正在帮助',
					pickupAddress: '第三食堂-3楼',
					deliveryAddress: '体育馆-羽毛球场',
					items: '水饺 2份，可乐 1瓶',
					fee: '3.50',
					tip: '2.50',
					time: '2024-03-10 18:45',
					orderNo: '100250425143509600680',
					remark: '水饺要韭菜馅的'
				},
				{
					type: '校园跑腿',
					status: 'rewarding',
					statusText: '正在悬赏',
					pickupAddress: '学生活动中心',
					deliveryAddress: '音乐厅',
					items: '乐器搬运',
					fee: '10.00',
					tip: '8.00',
					time: '2024-03-10 13:20',
					orderNo: '100250425143509600681',
					remark: '小提琴一个，需要小心搬运'
				}
			]
		};
	},
	computed: {
		// 根据当前选中的标签筛选订单
		currentOrders() {
			switch (this.currentTab) {
				case 1: // 我的订单
					return this.allOrders.filter(order => 
						order.status === 'pending' || order.status === 'processing');
				case 2: // 我的接单
					return this.allOrders.filter(order => 
						order.status === 'processing' || order.status === 'completed');
				case 3: // 正在悬赏
					return this.allOrders.filter(order => 
						order.status === 'rewarding');
				default: // 全部订单
					return this.allOrders;
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
				'completed': '已帮助',
				'rewarding': '正在悬赏'
			};
			return statusMap[status] || '未知状态';
		},
		// 跳转到订单详情
		goToOrderDetail(order) {
			uni.navigateTo({
				url: `/pages/order/orderDetail/orderDetail?orderNo=${order.orderNo}`,
				success: () => {
					// 传递完整的订单数据
					const eventChannel = this.getOpenerEventChannel();
					eventChannel.emit('acceptOrderData', { order });
				},
				fail: (err) => {
					console.error('跳转失败：', err);
					uni.showToast({
						title: '跳转失败，请重试',
						icon: 'none'
					});
				}
			});
		},
		getOrderIcon(type) {
			switch (type) {
				case '快递代取':
					return 'paperplane';
				case '食堂打饭':
					return 'shop';
				case '校园跑腿':
					return 'person-filled';
				default:
					return 'bars';
			}
		},
		getActionText(status) {
			switch (status) {
				case 'pending':
					return '接单';
				case 'processing':
					return '完成';
				case 'rewarding':
					return '抢单';
				case 'completed':
					return '查看';
				default:
					return '查看';
			}
		},
		handleOrderAction(order) {
			switch (order.status) {
				case 'pending':
				case 'rewarding':
					uni.showModal({
						title: '接单确认',
						content: '确认接此订单吗？',
						success: (res) => {
							if (res.confirm) {
								// 更新订单状态
								order.status = 'processing';
								order.statusText = '配送中';
								uni.showToast({
									title: '接单成功',
									icon: 'success'
								});
							}
						}
					});
					break;
				case 'processing':
					uni.showModal({
						title: '完成订单',
						content: '确认已完成配送？',
						success: (res) => {
							if (res.confirm) {
								// 更新订单状态
								order.status = 'completed';
								order.statusText = '已完成';
								uni.showToast({
									title: '订单已完成',
									icon: 'success'
								});
							}
						}
					});
					break;
				case 'completed':
					// 已完成的订单才跳转到详情页
					uni.navigateTo({
						url: `/pages/order/orderDetail/orderDetail?orderNo=${order.orderNo}`,
						success: () => {
							const eventChannel = this.getOpenerEventChannel();
							eventChannel.emit('acceptOrderData', { order });
						},
						fail: (err) => {
							console.error('跳转失败：', err);
							uni.showToast({
								title: '跳转失败，请重试',
								icon: 'none'
							});
						}
					});
					break;
			}
		},
		// 刷新订单列表
		refreshOrderList() {
			// TODO: 调用获取订单列表的API
			console.log('刷新订单列表');
			// 模拟刷新
			uni.showLoading({
				title: '刷新中...'
			});
			setTimeout(() => {
				uni.hideLoading();
				uni.showToast({
					title: '刷新成功',
					icon: 'success'
				});
			}, 1000);
		}
	},
	onLoad() {
		// 监听订单列表刷新事件
		uni.$on('refreshOrderList', this.refreshOrderList);
	},
	onUnload() {
		// 移除事件监听
		uni.$off('refreshOrderList', this.refreshOrderList);
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

.order-status.pending {
	background-color: #ff9800;
}

.order-status.processing {
	background-color: #2196f3;
}

.order-status.completed {
	background-color: #4caf50;
}

.order-status.rewarding {
	background-color: #e91e63;
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

.fee {
	font-weight: 500;
	color: #333;
}

.fee.highlight {
	color: #ff9800;
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
	background-color: #fff;
}

.btn.pending, .btn.rewarding {
	color: #fff;
	background-color: #2196f3;
}

.btn.processing {
	color: #fff;
	background-color: #4caf50;
}

.btn.completed {
	color: #666;
	background-color: #f5f5f5;
}
</style>
