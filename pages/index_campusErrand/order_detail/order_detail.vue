<template>
	<view class="detail-page">
		<text class="order-title">订单详情 - ID: {{ orderId }}</text>
		<view class="order-info">
			<text>分类: {{ order.category || '未定义' }}</text>
			<text>日期: {{ order.date || '未定义' }}</text>
			<text>时间: {{ order.timeInterval || '未定义' }}</text>
			<text>地区: {{ order.region && Array.isArray(order.region) && order.region.length > 0 ? order.region.join(', ') : '未定义' }}</text>
			<text>发布: {{ order.publishTime || '未定义' }}</text>
			<text>备注: {{ order.remarks || '未定义' }}</text>
		</view>
		<view class="order-footer">
			<text class="detail-text" @click="goBack">返回列表</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId: null,
				order: {} // 用于存储订单详细信息
			};
		},
		onLoad(options) {
			this.orderId = options.id;
			this.fetchOrderDetails(this.orderId);
		},
		methods: {
			fetchOrderDetails(id) {
				// 假设您有一个方法来获取订单详细信息
				const orders = [
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
				];
				this.order = orders.find(order => order.id === parseInt(id)) || {};
			},
			goBack() {
				uni.navigateBack(); // 返回上一页
			}
		}
	}
</script>

<style lang="scss">
.detail-page {
	padding: 20rpx;
	font-size: 16px;
	color: #333;
}

.order-info {
	margin-top: 10rpx;
}

.order-title {
	font-size: 20px;
	font-weight: bold;
}

.order-footer {
	margin-top: 20rpx;
}

.detail-text {
	color: #4b7bec;
	font-size: 14px;
	font-weight: bold;
	cursor: pointer;
}
</style>
