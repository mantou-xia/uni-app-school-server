<template>
	<view class="disclaimer-container">
		<view class="header">
			<view class="header-title">免责声明</view>
			<view class="header-desc">请您仔细阅读以下声明内容</view>
		</view>

		<view class="content">
			<view class="notice-card">
				<uni-icons type="notification-filled" size="32" color="#e74c3c"></uni-icons>
				<text class="notice-text">本声明旨在明确平台与用户之间的权利义务关系，请您务必认真阅读、充分理解本声明。</text>
			</view>

			<view class="section">
				<view class="section-header">
					<uni-icons type="info-filled" size="24" color="#3498db"></uni-icons>
					<text class="section-title">服务说明</text>
				</view>
				<view class="info-list">
					<view class="info-item">
						<uni-icons type="circle" size="18" color="#3498db"></uni-icons>
						<text>本平台仅为信息发布平台</text>
					</view>
					<view class="info-item">
						<uni-icons type="circle" size="18" color="#3498db"></uni-icons>
						<text>不对第三方服务质量负责</text>
					</view>
					<view class="info-item">
						<uni-icons type="circle" size="18" color="#3498db"></uni-icons>
						<text>不承担交易风险</text>
					</view>
					<view class="info-item">
						<uni-icons type="circle" size="18" color="#3498db"></uni-icons>
						<text>不对信息真实性负责</text>
					</view>
				</view>
			</view>

			<view class="section warning-section">
				<view class="section-header">
					<uni-icons type="warning-filled" size="24" color="#e74c3c"></uni-icons>
					<text class="section-title">免责范围</text>
				</view>
				<view class="warning-list">
					<view class="warning-item">
						<view class="warning-icon">
							<uni-icons type="closeempty" size="20" color="#fff"></uni-icons>
						</view>
						<text class="warning-text">因不可抗力导致的服务中断</text>
					</view>
					<view class="warning-item">
						<view class="warning-icon">
							<uni-icons type="closeempty" size="20" color="#fff"></uni-icons>
						</view>
						<text class="warning-text">用户个人信息泄露</text>
					</view>
					<view class="warning-item">
						<view class="warning-icon">
							<uni-icons type="closeempty" size="20" color="#fff"></uni-icons>
						</view>
						<text class="warning-text">第三方侵权行为</text>
					</view>
					<view class="warning-item">
						<view class="warning-icon">
							<uni-icons type="closeempty" size="20" color="#fff"></uni-icons>
						</view>
						<text class="warning-text">用户违规操作造成的损失</text>
					</view>
				</view>
			</view>

			<view class="section">
				<view class="section-header">
					<uni-icons type="shield-filled" size="24" color="#f1c40f"></uni-icons>
					<text class="section-title">责任限制</text>
				</view>
				<view class="limit-cards">
					<view class="limit-card">
						<text class="limit-title">间接损失</text>
						<text class="limit-desc">平台不承担任何间接损失责任</text>
					</view>
					<view class="limit-card">
						<text class="limit-title">操作失误</text>
						<text class="limit-desc">不承担因用户操作失误造成的损失</text>
					</view>
					<view class="limit-card">
						<text class="limit-title">第三方</text>
						<text class="limit-desc">不承担因第三方原因造成的损失</text>
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
.disclaimer-container {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding-bottom: 40rpx;
}

.header {
	background: linear-gradient(135deg, #e74c3c, #c0392b);
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

.notice-card {
	background: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	display: flex;
	align-items: center;
	box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.notice-text {
	margin-left: 20rpx;
	font-size: 28rpx;
	color: #e74c3c;
	flex: 1;
	line-height: 1.6;
}

.section {
	background: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.section-header {
	display: flex;
	align-items: center;
	margin-bottom: 30rpx;
}

.section-title {
	font-size: 32rpx;
	font-weight: bold;
	color: #2c3e50;
	margin-left: 15rpx;
}

.info-list {
	padding: 0 15rpx;
}

.info-item {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}

.info-item text {
	margin-left: 15rpx;
	font-size: 28rpx;
	color: #34495e;
}

.warning-section {
	background: #fff5f5;
}

.warning-list {
	padding: 0 15rpx;
}

.warning-item {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}

.warning-icon {
	width: 36rpx;
	height: 36rpx;
	background: #e74c3c;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}

.warning-text {
	margin-left: 15rpx;
	font-size: 28rpx;
	color: #e74c3c;
}

.limit-cards {
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	gap: 20rpx;
}

.limit-card {
	background: #f8f9fa;
	padding: 20rpx;
	border-radius: 12rpx;
	text-align: center;
}

.limit-title {
	font-size: 28rpx;
	color: #2c3e50;
	font-weight: bold;
	margin-bottom: 10rpx;
	display: block;
}

.limit-desc {
	font-size: 24rpx;
	color: #7f8c8d;
	display: block;
}
</style>
