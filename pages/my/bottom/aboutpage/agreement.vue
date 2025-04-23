<template>
	<view class="agreement-container">
		<view class="header">
			<view class="header-title">用户协议</view>
			<view class="header-desc">请仔细阅读以下条款</view>
		</view>
		
		<view class="content">
			<view class="intro-card">
				<uni-icons type="info" size="32" color="#3498db"></uni-icons>
				<text class="intro-text">本协议是您与我们之间关于使用本服务所订立的协议。使用我们的服务即表示您同意本协议的全部条款。</text>
			</view>

			<view class="section">
				<view class="section-header">
					<view class="section-title">
						<text class="title-number">1</text>
						<text class="title-text">服务内容</text>
					</view>
					<view class="divider"></view>
				</view>
				<view class="service-grid">
					<view class="service-item">
						<uni-icons type="running" size="24" color="#e74c3c"></uni-icons>
						<text>校园跑腿</text>
					</view>
					<view class="service-item">
						<uni-icons type="shop" size="24" color="#2ecc71"></uni-icons>
						<text>商品配送</text>
					</view>
					<view class="service-item">
						<uni-icons type="info" size="24" color="#f1c40f"></uni-icons>
						<text>信息服务</text>
					</view>
					<view class="service-item">
						<uni-icons type="help" size="24" color="#9b59b6"></uni-icons>
						<text>其他服务</text>
					</view>
				</view>
			</view>

			<view class="section">
				<view class="section-header">
					<view class="section-title">
						<text class="title-number">2</text>
						<text class="title-text">用户义务</text>
					</view>
					<view class="divider"></view>
				</view>
				<view class="obligation-list">
					<view class="obligation-item">
						<view class="item-dot"></view>
						<text class="item-text">遵守相关法律法规</text>
					</view>
					<view class="obligation-item">
						<view class="item-dot"></view>
						<text class="item-text">提供真实有效的信息</text>
					</view>
					<view class="obligation-item">
						<view class="item-dot"></view>
						<text class="item-text">妥善保管账号信息</text>
					</view>
					<view class="obligation-item">
						<view class="item-dot"></view>
						<text class="item-text">遵守平台规则</text>
					</view>
				</view>
			</view>

			<view class="section">
				<view class="section-header">
					<view class="section-title">
						<text class="title-number">3</text>
						<text class="title-text">服务规则</text>
					</view>
					<view class="divider"></view>
				</view>
				<view class="rules-container">
					<view class="rule-card">
						<view class="rule-icon cancel-icon">
							<uni-icons type="closeempty" size="20" color="#e74c3c"></uni-icons>
						</view>
						<text class="rule-title">订单取消</text>
						<text class="rule-desc">订单确认后不可随意取消</text>
					</view>
					<view class="rule-card">
						<view class="rule-icon delivery-icon">
							<uni-icons type="car" size="20" color="#2ecc71"></uni-icons>
						</view>
						<text class="rule-title">安全配送</text>
						<text class="rule-desc">保证配送安全和及时</text>
					</view>
					<view class="rule-card">
						<view class="rule-icon privacy-icon">
							<uni-icons type="locked" size="20" color="#f1c40f"></uni-icons>
						</view>
						<text class="rule-title">隐私保护</text>
						<text class="rule-desc">严格保护用户隐私</text>
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
.agreement-container {
	min-height: 100vh;
	background-color: #f8f9fa;
	padding-bottom: 40rpx;
}

.header {
	background: linear-gradient(135deg, #2ecc71, #27ae60);
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

.intro-card {
	background: #fff;
	border-radius: 16rpx;
	padding: 30rpx;
	margin-bottom: 30rpx;
	display: flex;
	align-items: center;
	box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.intro-text {
	margin-left: 20rpx;
	font-size: 28rpx;
	color: #34495e;
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
	margin-bottom: 30rpx;
}

.section-title {
	display: flex;
	align-items: center;
	margin-bottom: 15rpx;
}

.title-number {
	width: 40rpx;
	height: 40rpx;
	background: #2ecc71;
	color: #fff;
	border-radius: 20rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	margin-right: 15rpx;
}

.title-text {
	font-size: 32rpx;
	font-weight: bold;
	color: #2c3e50;
}

.divider {
	height: 2rpx;
	background: linear-gradient(to right, #2ecc71, transparent);
	margin-top: 15rpx;
}

.service-grid {
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 20rpx;
}

.service-item {
	background: #f8f9fa;
	padding: 20rpx;
	border-radius: 12rpx;
	display: flex;
	align-items: center;
}

.service-item text {
	margin-left: 10rpx;
	font-size: 28rpx;
	color: #34495e;
}

.obligation-list {
	padding: 10rpx 0;
}

.obligation-item {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
}

.item-dot {
	width: 12rpx;
	height: 12rpx;
	background: #2ecc71;
	border-radius: 50%;
	margin-right: 15rpx;
}

.item-text {
	font-size: 28rpx;
	color: #34495e;
}

.rules-container {
	display: flex;
	justify-content: space-between;
	gap: 20rpx;
	padding: 20rpx 0;
}

.rule-card {
	flex: 1;
	background: #f8f9fa;
	padding: 30rpx 20rpx;
	border-radius: 12rpx;
	display: flex;
	flex-direction: column;
	align-items: center;
	text-align: center;
}

.rule-icon {
	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 16rpx;
}

.cancel-icon {
	background-color: rgba(231, 76, 60, 0.1);
}

.delivery-icon {
	background-color: rgba(46, 204, 113, 0.1);
}

.privacy-icon {
	background-color: rgba(241, 196, 15, 0.1);
}

.rule-title {
	font-size: 28rpx;
	color: #2c3e50;
	font-weight: bold;
	margin-bottom: 8rpx;
}

.rule-desc {
	font-size: 24rpx;
	color: #7f8c8d;
	line-height: 1.4;
}
</style>
