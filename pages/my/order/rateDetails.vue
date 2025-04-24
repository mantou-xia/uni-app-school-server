<template>
    <view class="rate-details">
        <!-- 顶部标题区域 -->
        <view class="header">
            <view class="header-title">费率明细</view>
            <view class="header-desc">配送费用说明</view>
        </view>

        <!-- 费率卡片区域 -->
        <view class="content">
            <view class="rate-card">
                <view class="card-header">
                    <uni-icons type="wallet" size="24" color="#3498db"></uni-icons>
                    <text class="rate-title">基础配送费</text>
                </view>
                <view class="rate-content">
                    <text class="rate-value">¥3.00</text>
                    <text class="rate-desc">起步价（1公里内）</text>
                </view>
                <view class="rate-tag">基础费率</view>
            </view>
            
            <view class="rate-card">
                <view class="card-header">
                    <uni-icons type="location" size="24" color="#e74c3c"></uni-icons>
                    <text class="rate-title">距离附加费</text>
                </view>
                <view class="rate-content">
                    <text class="rate-value">¥1.00<text class="unit">/km</text></text>
                    <text class="rate-desc">超出1公里后每公里加收</text>
                </view>
                <view class="rate-tag">距离费率</view>
            </view>

            <!-- 费用计算器 -->
            <view class="calculator-card">
                <view class="card-header">
                    <uni-icons type="calculator" size="24" color="#2ecc71"></uni-icons>
                    <text class="rate-title">费用计算器</text>
                </view>
                <view class="calculator-content">
                    <view class="input-group">
                        <text class="input-label">配送距离</text>
                        <input 
                            type="digit" 
                            v-model="distance" 
                            class="input-field" 
                            placeholder="请输入配送距离(km)"
                            @input="calculateFee"
                        />
                    </view>
                    <view class="result-group" v-if="totalFee > 0">
                        <text class="result-label">预估费用</text>
                        <text class="result-value">¥{{ totalFee }}</text>
                    </view>
                </view>
            </view>

            <!-- 费用说明 -->
            <view class="notice-card">
                <view class="card-header">
                    <uni-icons type="info" size="24" color="#f1c40f"></uni-icons>
                    <text class="notice-title">费用说明</text>
                </view>
                <view class="notice-content">
                    <view class="notice-item">
                        <view class="dot"></view>
                        <text>实际费用根据订单距离计算</text>
                    </view>
                    <view class="notice-item">
                        <view class="dot"></view>
                        <text>特殊天气可能会有额外加价</text>
                    </view>
                    <view class="notice-item">
                        <view class="dot"></view>
                        <text>节假日可能会有浮动调整</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            distance: '',
            totalFee: 0,
            baseFee: 3.00,  // 基础配送费
            extraFeePerKm: 1.00,  // 每公里额外费用
            baseDistance: 1  // 基础距离（公里）
        }
    },
    methods: {
        calculateFee() {
            if (!this.distance) {
                this.totalFee = 0;
                return;
            }
            const distance = parseFloat(this.distance);
            if (distance <= this.baseDistance) {
                this.totalFee = this.baseFee;
            } else {
                const extraDistance = distance - this.baseDistance;
                this.totalFee = this.baseFee + (extraDistance * this.extraFeePerKm);
            }
            // 保留两位小数
            this.totalFee = parseFloat(this.totalFee.toFixed(2));
        }
    }
}
</script>

<style>
.rate-details {
    min-height: 100vh;
    background-color: #f8f9fa;
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

.rate-card, .calculator-card, .notice-card {
    background-color: #ffffff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
    position: relative;
    box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
}

.card-header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
}

.rate-title, .notice-title {
    font-size: 32rpx;
    color: #2c3e50;
    font-weight: bold;
    margin-left: 15rpx;
}

.rate-content {
    padding: 10rpx 0;
}

.rate-value {
    font-size: 48rpx;
    color: #3498db;
    font-weight: bold;
    margin-bottom: 10rpx;
    display: block;
}

.unit {
    font-size: 28rpx;
    color: #7f8c8d;
    margin-left: 5rpx;
}

.rate-desc {
    font-size: 26rpx;
    color: #7f8c8d;
}

.rate-tag {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    background: rgba(52,152,219,0.1);
    color: #3498db;
    padding: 8rpx 16rpx;
    border-radius: 20rpx;
    font-size: 24rpx;
}

.calculator-content {
    background: #f8f9fa;
    border-radius: 12rpx;
    padding: 20rpx;
}

.input-group {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
}

.input-label {
    font-size: 28rpx;
    color: #2c3e50;
    margin-right: 20rpx;
    min-width: 120rpx;
}

.input-field {
    flex: 1;
    height: 70rpx;
    background: #fff;
    border-radius: 8rpx;
    padding: 0 20rpx;
    font-size: 28rpx;
    border: 2rpx solid #e0e0e0;
}

.result-group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20rpx;
    padding-top: 20rpx;
    border-top: 2rpx solid #e0e0e0;
}

.result-label {
    font-size: 28rpx;
    color: #2c3e50;
}

.result-value {
    font-size: 36rpx;
    color: #e74c3c;
    font-weight: bold;
}

.notice-content {
    padding: 10rpx 0;
}

.notice-item {
    display: flex;
    align-items: center;
    margin-bottom: 15rpx;
}

.dot {
    width: 12rpx;
    height: 12rpx;
    background: #3498db;
    border-radius: 50%;
    margin-right: 15rpx;
}

.notice-item text {
    font-size: 26rpx;
    color: #34495e;
    line-height: 1.6;
}
</style> 