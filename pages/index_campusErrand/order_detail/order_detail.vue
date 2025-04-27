<template>
	<view class="detail-page">
		<!-- 顶部信息区 -->
		<view class="header-section" :class="'theme-' + getCategoryClass(order.category)">
			<view class="header-content">
				<view class="header-title">{{ order.title || '订单详情' }}</view>
				<view class="header-meta">
					<view class="category-tag">{{ order.category || '未分类' }}</view>
					<view class="date-time">{{ order.date }} {{ order.timeInterval }}</view>
				</view>
				<view class="fee-tag">
					<text class="fee-amount">￥{{ order.fee || '0' }}</text>
				</view>
			</view>
		</view>

		<!-- 订单信息区 -->
		<view class="content-section">
			<!-- 基本信息 -->
			<view class="section">
				<view class="section-title">基本信息</view>
				<view class="info-grid">
					<view class="info-item">
						<text class="info-label">订单ID</text>
						<text class="info-value">{{ orderId }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">服务日期</text>
						<text class="info-value">{{ order.date || '未定义' }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">服务时间</text>
						<text class="info-value">{{ order.timeInterval || '未定义' }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">服务区域</text>
						<text class="info-value">{{ order.region && Array.isArray(order.region) && order.region.length >
							0 ? order.region.join(', ') : '未定义' }}</text>
					</view>
					<view class="info-item">
						<text class="info-label">发布时间</text>
						<text class="info-value">{{ order.publishTime || '未定义' }}</text>
					</view>
				</view>
			</view>

			<!-- 位置信息 -->
			<view class="section">
				<view class="section-title">位置信息</view>

				<!-- 代课类型 -->
				<view class="location-info" v-if="order.category === '代课'">
					<view class="location-row">
						<view class="location-dot dot-blue"></view>
						<view class="location-desc">
							<text class="location-label">上课地点</text>
							<text class="location-value">{{ order.startPoint || '未指定' }}</text>
						</view>
					</view>
				</view>

				<!-- 其他类型 -->
				<view class="location-info" v-else>
					<view class="location-row">
						<view class="location-dot dot-blue"></view>
						<view class="location-desc">
							<text class="location-label">起始位置</text>
							<text class="location-value">{{ order.startPoint || '未指定' }}</text>
						</view>
					</view>

					<view class="location-line"></view>

					<view class="location-row">
						<view class="location-dot dot-red"></view>
						<view class="location-desc">
							<text class="location-label">终点位置</text>
							<text class="location-value">{{ order.endPoint || '未指定' }}</text>
						</view>
					</view>
				</view>
			</view>

			<!-- 备注信息 -->
			<view class="section">
				<view class="section-title">备注信息</view>
				<view class="remark-content">
					<text class="remark-text">{{ order.remarks || '无备注信息' }}</text>
				</view>
			</view>
		</view>

		<!-- 底部操作区 -->
		<view class="footer-section" :class="'theme-' + getCategoryClass(order.category)">
			<button class="action-btn" @click="acceptOrder">
				<view class="btn-icon">
					<uni-icons type="plusempty" size="24" color="#fff"></uni-icons>
				</view>
				<text class="btn-text">立即接单</text>
			</button>
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
			// 更新示例数据，包含所有新的字段
			const orders = [
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
			];
			this.order = orders.find(order => order.id === parseInt(id)) || {};
		},
		goBack() {
			uni.navigateBack(); // 返回上一页
		},
		acceptOrder() {
			uni.showModal({
				title: '接单确认',
				content: `确认接此订单？酬劳：¥${this.order.fee}`,
				success: (res) => {
					if (res.confirm) {
						uni.showToast({
							title: '接单成功',
							icon: 'success'
						});
						// 可以在这里添加接单后的逻辑
						setTimeout(() => {
							uni.navigateBack();
						}, 1500);
					}
				}
			});
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
		}
	}
}
</script>

<style lang="scss">
page {
	padding: 0;
	height: 100%;
	overflow: hidden;
}

/* 全局样式 */
.detail-page {
	min-height: 100vh;
	height: 100vh;
	background-color: #f8f9fa;
	display: flex;
	flex-direction: column;
	overflow: hidden;
}

/* 顶部区域 */
.header-section {
	padding: 40rpx 40rpx 80rpx;
	background: linear-gradient(135deg, #4b7bec, #3867d6);
	color: #fff;
	border-radius: 0 0 30rpx 30rpx;
	box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.1);
	flex-shrink: 0;
}

.theme-fetch {
	background: linear-gradient(135deg, #ff6b6b, #ee5253);
}

.theme-delivery {
	background: linear-gradient(135deg, #40c463, #2ecc71);
}

.theme-class {
	background: linear-gradient(135deg, #4b7bec, #3867d6);
}

.theme-other {
	background: linear-gradient(135deg, #a4a4a4, #777777);
}

.header-content {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.header-title {
	font-size: 40rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.header-meta {
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 26rpx;
	opacity: 0.9;
}

.category-tag {
	background-color: rgba(255, 255, 255, 0.2);
	padding: 6rpx 20rpx;
	border-radius: 10rpx;
	backdrop-filter: blur(5px);
}

.date-time {
	color: rgba(255, 255, 255, 0.9);
}

.fee-tag {
	margin-top: 20rpx;
	background-color: rgba(255, 255, 255, 0.2);
	padding: 10rpx 30rpx;
	border-radius: 10rpx;
	backdrop-filter: blur(5px);
	align-self: flex-start;
}

.fee-amount {
	font-size: 48rpx;
	font-weight: bold;
}

/* 内容区域 */
.content-section {
	flex: 1;
	padding: 40rpx;
	transform: translateY(-40rpx);
	overflow: hidden;
	margin-top: 20rpx;
}

.section {
	background-color: #fff;
	border-radius: 20rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.section-title {
	font-size: 30rpx;
	font-weight: bold;
	color: #333;
	margin-bottom: 20rpx;
	position: relative;
	padding-left: 20rpx;
}

.section-title::before {
	content: '';
	position: absolute;
	left: 0;
	top: 50%;
	transform: translateY(-50%);
	width: 6rpx;
	height: 30rpx;
	background-color: #4b7bec;
	border-radius: 3rpx;
}

.theme-fetch .section-title::before {
	background-color: #ff6b6b;
}

.theme-delivery .section-title::before {
	background-color: #40c463;
}

.theme-class .section-title::before {
	background-color: #4b7bec;
}

.info-grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20rpx;
}

.info-item {
	display: flex;
	flex-direction: column;
}

.info-label {
	font-size: 24rpx;
	color: #999;
	margin-bottom: 8rpx;
}

.info-value {
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

/* 位置信息 */
.location-info {
	position: relative;
}

.location-row {
	display: flex;
	align-items: center;
	padding: 15rpx 0;
}

.location-dot {
	width: 20rpx;
	height: 20rpx;
	border-radius: 50%;
	margin-right: 20rpx;
}

.dot-blue {
	background-color: #4b7bec;
}

.dot-red {
	background-color: #ff6b6b;
}

.location-line {
	position: absolute;
	left: 10rpx;
	top: 30rpx;
	width: 2rpx;
	height: calc(100% - 60rpx);
	background-color: #e6e6e6;
}

.location-desc {
	display: flex;
	flex-direction: column;
}

.location-label {
	font-size: 24rpx;
	color: #999;
	margin-bottom: 5rpx;
}

.location-value {
	font-size: 28rpx;
	color: #333;
}

/* 备注信息 */
.remark-content {
	background-color: #f8f9fa;
	padding: 20rpx;
	border-radius: 10rpx;
}

.remark-text {
	font-size: 28rpx;
	color: #666;
	line-height: 1.6;
}

/* 底部区域 */
.footer-section {
	background-color: #f8f9fa;
	border-top: 1rpx solid #f0f0f0;
	flex-shrink: 0;
}

.action-btn {
	color: #fff;
	height: 90rpx;
	border-radius: 45rpx;
	font-size: 32rpx;
	font-weight: bold;
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 6rpx 20rpx rgba(75, 123, 236, 0.4);
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
}

.action-btn::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
	transform: translateX(-100%);
}

.action-btn:active {
	transform: scale(0.98);
	box-shadow: 0 3rpx 10rpx rgba(75, 123, 236, 0.3);
}

.action-btn:active::after {
	transform: translateX(100%);
	transition: transform 0.5s ease;
}

.btn-icon {
	margin-right: 10rpx;
}

.btn-text {
	letter-spacing: 4rpx;
}

.theme-fetch .action-btn {
	background: linear-gradient(135deg, #ff6b6b, #ee5253);
	box-shadow: 0 6rpx 20rpx rgba(255, 107, 107, 0.4);
}

.theme-delivery .action-btn {
	background: linear-gradient(135deg, #40c463, #2ecc71);
	box-shadow: 0 6rpx 20rpx rgba(64, 196, 99, 0.4);
}

.theme-class .action-btn {
	background: linear-gradient(135deg, #4b7bec, #3867d6);
	box-shadow: 0 6rpx 20rpx rgba(75, 123, 236, 0.4);
}

.theme-other .action-btn {
	background: linear-gradient(135deg, #a4a4a4, #777777);
	box-shadow: 0 6rpx 20rpx rgba(164, 164, 164, 0.4);
}
</style>
