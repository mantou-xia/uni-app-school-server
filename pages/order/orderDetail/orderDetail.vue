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

			<view class="order-type">
				<text>快递类型：{{orderInfo.expressType}}</text>
				<text>快递数量：{{orderInfo.expressCount}}个</text>
				<text>备注：{{orderInfo.remark}}</text>
				<text>期望送达：{{orderInfo.expectedDelivery}}</text>
			</view>

			<view class="location-info">
				<view class="location start">
					<text class="tag">起</text>
					<text class="address">快递点-科技园快递点（南信一号楼数学楼东侧店）</text>
				</view>
				<view class="location end">
					<text class="tag">终</text>
					<text class="address">男生宿舍-学生公寓2栋-2单元2-304d</text>
				</view>
			</view>

			<view class="price">
				<text>金额 ¥3</text>
			</view>
		</view>

		<!-- 接单人信息 -->
		<view class="rider-info">
			<view class="rider-title">接单人</view>
			<view class="rider-content">
				<image class="avatar" src="/static/logo.png"></image>
				<text class="name">用户</text>
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
			<text class="order-time">支付时间：{{orderInfo.payTime}}</text>
			<text class="accept-time">接单时间：{{orderInfo.acceptTime}}</text>
			<text class="contact">联系管理员：联系校区管理员</text>
			<button class="history-btn" @click="goToHistory">前往订单池</button>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			countdown: '1天20时56分14秒',
			orderInfo: {
				orderNo: '100250425143509600672',
				payTime: '2025-04-25 14:35:24',
				acceptTime: '2025-04-25 14:39:25',
				type: '快递代取',
				status: 'pending', // 可能的状态: pending(待接单), processing(配送中), completed(已完成), rewarding(悬赏中)
				expressType: '中件',
				expressCount: 1,
				remark: '一件衣服',
				expectedDelivery: '尽快送达',
				pickupAddress: '快递点-科技园快递点（南信一号楼数学楼东侧店）',
				deliveryAddress: '男生宿舍-学生公寓2栋-2单元2-304d',
				fee: '3.00'
			}
		}
	},
	computed: {
		getStatusText() {
			const statusMap = {
				'pending': '待帮助',
				'processing': '正在帮助',
				'completed': '已帮助',
				'rewarding': '悬赏中'
			};
			return statusMap[this.orderInfo.status] || '未知状态';
		}
	},
	onLoad(options) {
		// 获取路由参数
		const { orderNo } = options;
		const eventChannel = this.getOpenerEventChannel();
		// 监听acceptOrderData事件,接收上一页面传递的数据
		eventChannel.on('acceptOrderData', ({ order }) => {
			this.orderInfo = order;
			// 开始倒计时
			this.startCountdown();
		});
	},
	methods: {
		startCountdown() {
			// 计算倒计时
			const now = new Date();
			const acceptTime = new Date(this.orderInfo.acceptTime);
			const diff = acceptTime.getTime() - now.getTime();
			
			if (diff > 0) {
				const days = Math.floor(diff / (1000 * 60 * 60 * 24));
				const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
				const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
				const seconds = Math.floor((diff % (1000 * 60)) / 1000);
				
				this.countdown = `${days}天${hours}时${minutes}分${seconds}秒`;
				
				// 更新倒计时
				setTimeout(this.startCountdown, 1000);
			} else {
				this.countdown = '已过期';
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
	background-color: #000000;
	padding-bottom: 40rpx;
}

.top-tip {
	display: flex;
	align-items: center;
	gap: 10rpx;
	padding: 20rpx;
	background-color: rgba(0, 0, 0, 0.8);
	color: #fff;
	font-size: 24rpx;
}

.status-card {
	margin: 20rpx;
	background-color: #1c1c1e;
	border-radius: 20rpx;
	padding: 30rpx;
	color: #fff;
}

.countdown {
	font-size: 28rpx;
	color: #fff;
	margin-bottom: 30rpx;
}

.order-info {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
}

.avatar {
	width: 80rpx;
	height: 80rpx;
	border-radius: 40rpx;
	margin-right: 20rpx;
}

.title {
	font-size: 32rpx;
	font-weight: 500;
	flex: 1;
}

.status-btn {
	padding: 10rpx 30rpx;
	border-radius: 30rpx;
	font-size: 26rpx;
	background-color: #ff9800;
	color: #fff;
}

.status-btn.pending {
	background-color: #ff9800;
	color: #fff;
}

.status-btn.processing {
	background-color: #2196f3;
	color: #fff;
}

.status-btn.completed {
	background-color: #4caf50;
	color: #fff;
}

.status-btn.rewarding {
	background-color: #e91e63;
	color: #fff;
}

.order-type {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
	font-size: 28rpx;
	margin-bottom: 30rpx;
}

.location-info {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
	margin-bottom: 30rpx;
}

.location {
	display: flex;
	align-items: flex-start;
	gap: 20rpx;
}

.tag {
	width: 40rpx;
	height: 40rpx;
	line-height: 40rpx;
	text-align: center;
	border-radius: 20rpx;
	font-size: 24rpx;
}

.start .tag {
	background-color: #4cd964;
}

.end .tag {
	background-color: #007aff;
}

.address {
	flex: 1;
	font-size: 28rpx;
	line-height: 1.4;
}

.price {
	font-size: 32rpx;
	font-weight: 500;
}

.rider-info {
	margin: 20rpx;
	background-color: #1c1c1e;
	border-radius: 20rpx;
	padding: 30rpx;
	color: #fff;
}

.rider-title {
	font-size: 30rpx;
	margin-bottom: 20rpx;
}

.rider-content {
	display: flex;
	align-items: center;
}

.rider-content .name {
	flex: 1;
	font-size: 28rpx;
}

.contact-btns {
	display: flex;
	gap: 20rpx;
}

.contact-btn {
	display: flex;
	align-items: center;
	gap: 10rpx;
	padding: 10rpx 30rpx;
	border-radius: 30rpx;
	font-size: 26rpx;
	background-color: #007aff;
	color: #fff;
}

.contact-btn.chat {
	background-color: #007aff;
}

.contact-btn.phone {
	background-color: #007aff;
}

.order-details {
	margin: 20rpx;
	background-color: #1c1c1e;
	border-radius: 20rpx;
	padding: 30rpx;
	color: #fff;
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.order-details text {
	font-size: 28rpx;
	color: #8e8e93;
}

.history-btn {
	margin-top: 20rpx;
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	background-color: #1c1c1e;
	color: #fff;
	border-radius: 40rpx;
	font-size: 28rpx;
}
</style> 