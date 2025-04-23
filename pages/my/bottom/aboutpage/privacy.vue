<template>
	<view class="privacy-container">
		<view class="header">
			<view class="header-title">隐私政策</view>
			<view class="header-desc">最后更新：2025年8月</view>
		</view>
		<view class="content">
			<view class="section">
				<view class="section-title">
					<text class="number">01</text>
					<text class="title">信息收集</text>
				</view>
				<view class="section-content">
					<view class="highlight-box">
						<text class="highlight-text">我们重视您的隐私保护，致力于保护您的个人信息安全。</text>
					</view>
					<view class="list-item">
						<text class="dot"></text>
						<text>账户信息（用户名、手机号等）</text>
					</view>
					<view class="list-item">
						<text class="dot"></text>
						<text>订单及交易信息</text>
					</view>
					<view class="list-item">
						<text class="dot"></text>
						<text>位置及设备信息</text>
					</view>
				</view>
			</view>

			<view class="section">
				<view class="section-title">
					<text class="number">02</text>
					<text class="title">信息使用</text>
				</view>
				<view class="section-content">
					<view class="card">
						<view class="card-item">
							<uni-icons type="checkmarkempty" size="20" color="#07c160"></uni-icons>
							<text>提供和改进服务</text>
						</view>
						<view class="card-item">
							<uni-icons type="checkmarkempty" size="20" color="#07c160"></uni-icons>
							<text>订单处理与配送</text>
						</view>
						<view class="card-item">
							<uni-icons type="checkmarkempty" size="20" color="#07c160"></uni-icons>
							<text>客户支持服务</text>
						</view>
					</view>
				</view>
			</view>

			<view class="section">
				<view class="section-title">
					<text class="number">03</text>
					<text class="title">信息保护</text>
				</view>
				<view class="section-content">
					<view class="security-box">
						<view class="security-item">
							<view class="icon-bg">
								<uni-icons type="locked" size="24" color="#3498db"></uni-icons>
							</view>
							<text class="security-text">数据加密存储</text>
						</view>
						<view class="security-item">
							<view class="icon-bg">
								<uni-icons type="staff" size="24" color="#3498db"></uni-icons>
							</view>
							<text class="security-text">访问权限控制</text>
						</view>
						<view class="security-item">
							<view class="icon-bg">
								<uni-icons type="eye" size="24" color="#3498db"></uni-icons>
							</view>
							<text class="security-text">安全监控机制</text>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		}
	}
</script>

<style>
.privacy-container {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding-bottom: 40rpx;
}

.header {
	background: linear-gradient(135deg, #3498db, #2980b9);
	padding: 40rpx 30rpx;
	color: #fff;
}

.header-title {
	font-size: 36rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
}

.header-desc {
	font-size: 24rpx;
	opacity: 0.8;
}

.content {
	padding: 30rpx;
}

.section {
	background: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.section-title {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
}

.number {
	font-size: 40rpx;
	font-weight: bold;
	color: #3498db;
	margin-right: 20rpx;
}

.title {
	font-size: 32rpx;
	font-weight: bold;
	color: #2c3e50;
}

.highlight-box {
	background: rgba(52,152,219,0.1);
	padding: 20rpx;
	border-radius: 8rpx;
	margin-bottom: 30rpx;
}

.highlight-text {
	color: #3498db;
	font-size: 28rpx;
	line-height: 1.6;
}

.list-item {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}

.dot {
	width: 8rpx;
	height: 8rpx;
	background-color: #3498db;
	border-radius: 50%;
	margin-right: 20rpx;
}

.card {
	background: #f8f9fa;
	border-radius: 12rpx;
	padding: 20rpx;
}

.card-item {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}

.card-item:last-child {
	margin-bottom: 0;
}

.card-item text {
	margin-left: 10rpx;
	font-size: 28rpx;
	color: #34495e;
}

.security-box {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
	margin-top: 20rpx;
}

.security-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 20rpx;
	flex: 1;
}

.icon-bg {
	width: 80rpx;
	height: 80rpx;
	background: rgba(52,152,219,0.1);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 16rpx;
}

.security-text {
	font-size: 24rpx;
	color: #34495e;
	text-align: center;
}
</style>
