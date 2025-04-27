<template>
	<view class="order-detail">
		<!-- 顶部提示 -->
		<view class="top-tip">
			<uni-icons type="info" size="16"></uni-icons>
			<text>点击关注公众号，订单消息可及时提醒您~</text>
		</view>

		<!-- 订单状态卡片 -->
		<view class="status-card">
			<view class="countdown" v-if="orderInfo.status === 'processing'">
				将于 {{countdown}} 后自动确认
			</view>

			<view class="order-info">
				<image class="avatar" src="/static/logo.png"></image>
				<text class="title">{{orderInfo.type}}</text>
				<view class="status-btn" :class="orderInfo.status">{{getStatusText}}</view>
			</view>

			<view class="order-type" v-if="orderInfo.type === '快递代取'">
				<text v-if="orderInfo.expressType">快递类型：{{orderInfo.expressType}}</text>
				<text v-if="orderInfo.expressCount">快递数量：{{orderInfo.expressCount}}个</text>
				<text v-if="orderInfo.remark">备注：{{orderInfo.remark}}</text>
				<text v-if="orderInfo.expectedDelivery">期望送达：{{orderInfo.expectedDelivery}}</text>
			</view>
			
			<view class="order-type" v-else>
				<text v-if="orderInfo.items">物品信息：{{orderInfo.items}}</text>
				<text v-if="orderInfo.remark">备注：{{orderInfo.remark}}</text>
			</view>

			<view class="location-info">
				<view class="location start">
					<text class="tag">起</text>
					<text class="address">{{orderInfo.pickupAddress}}</text>
				</view>
				<view class="location end">
					<text class="tag">终</text>
					<text class="address">{{orderInfo.deliveryAddress}}</text>
				</view>
			</view>

			<view class="fee-section">
				<view class="price">
					<text>配送费 ¥{{orderInfo.fee}}</text>
				</view>
				<view class="price highlight" v-if="orderInfo.tip && orderInfo.tip !== '0.00'">
					<text>小费 +¥{{orderInfo.tip}}</text>
				</view>
			</view>
		</view>

		<!-- 接单人信息 -->
		<view class="rider-info" v-if="orderInfo.status === 'processing' || orderInfo.status === 'completed'">
			<view class="rider-title">接单人</view>
			<view class="rider-content">
				<image class="avatar" src="/static/logo.png"></image>
				<text class="name">配送员</text>
				<view class="contact-btns">
					<button class="contact-btn chat" @click="handleChat">
						<uni-icons type="chat" size="20"></uni-icons>
						私信
					</button>
					<button class="contact-btn phone" @click="handleCall">
						<uni-icons type="phone" size="20"></uni-icons>
						电话
					</button>
				</view>
			</view>
		</view>

		<!-- 订单信息 -->
		<view class="order-details">
			<text class="order-number">订单号：{{orderInfo.orderNo}}</text>
			<text class="order-time">下单时间：{{orderInfo.time}}</text>
			<text class="pay-time" v-if="orderInfo.payTime">支付时间：{{orderInfo.payTime}}</text>
			<text class="accept-time" v-if="orderInfo.acceptTime">接单时间：{{orderInfo.acceptTime}}</text>
			<text class="contact">联系管理员：联系校区管理员</text>
			<button class="history-btn" @click="goToHistory">返回订单列表</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			countdown: '',
			orderInfo: {
				orderNo: '',
				payTime: '',
				acceptTime: '',
				type: '',
				status: '',
				expressType: '',
				expressCount: 0,
				remark: '',
				expectedDelivery: '',
				pickupAddress: '',
				deliveryAddress: '',
				fee: '',
				tip: '',
				items: '',
				time: ''
			}
		}
	},
	computed: {
		getStatusText() {
			const statusMap = {
				'pending': '待帮助',
				'processing': '正在帮助',
				'completed': '已帮助',
				'rewarding': '正在悬赏'
			};
			return statusMap[this.orderInfo.status] || '未知状态';
		}
	},
	onLoad(options) {
		// 获取路由参数
		const { orderNo } = options;
		const eventChannel = this.getOpenerEventChannel();
		
		// 监听acceptOrderData事件,接收上一页面传递的数据
		eventChannel.on('acceptOrderData', (data) => {
			console.log('接收到的订单数据：', data);
			if (data && data.order) {
				// 将接收到的订单数据赋值给orderInfo
				this.orderInfo = { ...data.order };
				
				// 如果订单状态是processing，则开始倒计时
				if (this.orderInfo.status === 'processing' && this.orderInfo.acceptTime) {
					this.startCountdown();
				}
			} else {
				// 如果没有收到数据，显示提示
				uni.showToast({
					title: '订单数据加载失败',
					icon: 'none'
				});
				// 2秒后返回上一页
				setTimeout(() => {
					uni.navigateBack();
				}, 2000);
			}
		});
	},
	methods: {
		startCountdown() {
			if (!this.orderInfo.acceptTime) return;
			
			// 计算倒计时
			const now = new Date();
			const acceptTime = new Date(this.orderInfo.acceptTime);
			// 设置30分钟的配送时限
			const deliveryTime = new Date(acceptTime.getTime() + 30 * 60 * 1000);
			const diff = deliveryTime.getTime() - now.getTime();
			
			if (diff > 0) {
				const minutes = Math.floor(diff / (1000 * 60));
				const seconds = Math.floor((diff % (1000 * 60)) / 1000);
				
				this.countdown = `${minutes}分${seconds}秒`;
				
				// 更新倒计时
				setTimeout(this.startCountdown, 1000);
			} else {
				this.countdown = '配送时间已到';
			}
		},
		handleChat() {
			// 处理私信点击
			uni.showToast({
				title: '打开私信对话',
				icon: 'none'
			});
		},
		handleCall() {
			// 处理电话点击
			uni.makePhoneCall({
				phoneNumber: '10086', // 这里应该是实际的电话号码
				fail: () => {
					uni.showToast({
						title: '拨打电话失败',
						icon: 'none'
					});
				}
			});
		},
		goToHistory() {
			// 返回订单池
			if (getCurrentPages().length > 1) {
				// 如果有上一页,直接返回
				uni.navigateBack({
					delta: 1
				});
			} else {
				// 如果没有上一页,重新跳转到订单页面
				uni.switchTab({
					url: '/pages/order/order',
					success: () => {
						// 可以通过事件总线触发刷新订单列表
						uni.$emit('refreshOrderList');
					},
					fail: (err) => {
						console.error('跳转失败:', err);
						uni.showToast({
							title: '跳转失败,请重试',
							icon: 'none'
						});
					}
				});
			}
		}
	}
}
</script>

<style>
.order-detail {
	min-height: 100vh;
	background-color: #f8f9fd;
	padding-bottom: 40rpx;
}

.top-tip {
	display: flex;
	align-items: center;
	gap: 10rpx;
	padding: 24rpx 32rpx;
	background: linear-gradient(to right, #4a6fee, #5b7af9);
	color: #fff;
	font-size: 24rpx;
}

.status-card {
	margin: 24rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 32rpx;
	color: #333;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.countdown {
	text-align: center;
	padding: 16rpx;
	background: #e8f4ff;
	color: #4a6fee;
	border-radius: 8rpx;
	margin-bottom: 24rpx;
	font-size: 28rpx;
	font-weight: 500;
}

.order-info {
	display: flex;
	align-items: center;
	margin-bottom: 32rpx;
	padding-bottom: 24rpx;
	border-bottom: 2rpx solid #f5f6fa;
}

.avatar {
	width: 88rpx;
	height: 88rpx;
	border-radius: 44rpx;
	margin-right: 24rpx;
	box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.05);
}

.title {
	font-size: 32rpx;
	font-weight: 600;
	flex: 1;
	color: #333;
}

.status-btn {
	padding: 12rpx 32rpx;
	border-radius: 32rpx;
	font-size: 26rpx;
	font-weight: 500;
}

.status-btn.pending {
	background-color: #fff5e6;
	color: #ff9800;
}

.status-btn.processing {
	background-color: #e8f4ff;
	color: #4a6fee;
}

.status-btn.completed {
	background-color: #e8f5e9;
	color: #4caf50;
}

.status-btn.rewarding {
	background-color: #fce4ec;
	color: #e91e63;
}

.order-type {
	background-color: #f8f9fd;
	padding: 20rpx;
	border-radius: 12rpx;
	margin: 20rpx 0;
}

.order-type text {
	display: block;
	font-size: 28rpx;
	color: #666;
	line-height: 1.8;
}

.location-info {
	margin: 24rpx 0;
}

.location {
	padding: 16rpx 0;
}

.location .tag {
	min-width: 40rpx;
	height: 40rpx;
	line-height: 40rpx;
	text-align: center;
	border-radius: 8rpx;
	font-size: 24rpx;
	color: #fff;
	margin-right: 16rpx;
}

.location .address {
	flex: 1;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #333;
}

.start .tag {
	background: linear-gradient(135deg, #4caf50, #45a049);
}

.end .tag {
	background: linear-gradient(135deg, #4a6fee, #5b7af9);
}

.fee-section {
	margin-top: 24rpx;
	padding-top: 24rpx;
	border-top: 2rpx solid #f5f6fa;
}

.price {
	font-size: 32rpx;
	font-weight: 500;
	color: #333;
}

.price.highlight {
	color: #ff9800;
	font-size: 28rpx;
}

.rider-info {
	margin: 24rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 32rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.rider-title {
	font-size: 30rpx;
	margin-bottom: 24rpx;
	font-weight: 600;
	color: #333;
}

.rider-content {
	display: flex;
	align-items: center;
}

.rider-content .name {
	flex: 1;
	font-size: 28rpx;
	color: #333;
	font-weight: 500;
}

.contact-btns {
	display: flex;
	gap: 20rpx;
}

.contact-btn {
	display: flex;
	align-items: center;
	gap: 10rpx;
	padding: 12rpx 32rpx;
	border-radius: 32rpx;
	font-size: 26rpx;
}

.contact-btn.chat {
	background: linear-gradient(to right, #4a6fee, #5b7af9);
	color: #fff;
}

.contact-btn.phone {
	background: #e8f4ff;
	color: #4a6fee;
}

.order-details {
	margin: 24rpx;
	background-color: #ffffff;
	border-radius: 16rpx;
	padding: 32rpx;
	color: #333;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.order-details text {
	font-size: 28rpx;
	color: #666;
	line-height: 1.6;
}

.history-btn {
	margin-top: 32rpx;
	width: 100%;
	height: 88rpx;
	line-height: 88rpx;
	text-align: center;
	background: linear-gradient(to right, #4a6fee, #5b7af9);
	color: #fff;
	border-radius: 44rpx;
	font-size: 28rpx;
	font-weight: 500;
	box-shadow: 0 4rpx 12rpx rgba(74, 111, 238, 0.2);
}

.history-btn:active {
	transform: scale(0.98);
}
</style> 