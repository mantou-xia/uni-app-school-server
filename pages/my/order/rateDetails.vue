<template>
    <view class="rate-details">
        <view class="rate-card">
            <view class="rate-title">基础配送费</view>
            <view class="rate-content">
                <text class="rate-value">¥3.00</text>
                <text class="rate-desc">起步价（1公里内）</text>
            </view>
        </view>
        
        <view class="rate-card">
            <view class="rate-title">距离附加费</view>
            <view class="rate-content">
                <text class="rate-value">¥1.00/km</text>
                <text class="rate-desc">超出1公里后每公里加收</text>
            </view>
        </view>

        <view class="rate-notice">
            <text class="notice-title">费用说明：</text>
            <text class="notice-item">1. 实际费用根据订单距离计算</text>
            <text class="notice-item">2. 特殊天气可能会有额外加价</text>
            <text class="notice-item">3. 节假日可能会有浮动调整</text>
        </view>
    </view>
</template>

<script setup>

</script>

<style>
.rate-details {
    padding: 20px;
    background-color: #f5f5f5;
}

.rate-card {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
}

.rate-title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-bottom: 10px;
}

.rate-content {
    display: flex;
    flex-direction: column;
}

.rate-value {
    font-size: 24px;
    color: #e74c3c;
    margin-bottom: 5px;
}

.rate-desc {
    font-size: 14px;
    color: #666;
}

.rate-notice {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 15px;
}

.notice-title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
}

.notice-item {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    display: block;
}
</style> 