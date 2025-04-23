<template>
    <view class="recharge">
        <!-- 充值金额输入 -->
        <view class="amount-section">
            <text class="section-title">充值金额</text>
            <view class="amount-input">
                <text class="currency">¥</text>
                <input 
                    type="digit"
                    v-model="amount"
                    placeholder="请输入充值金额"
                    @input="handleAmountInput"
                />
            </view>
        </view>

        <!-- 快捷金额选择 -->
        <view class="quick-amounts">
            <view 
                v-for="(item, index) in quickAmounts"
                :key="index"
                :class="['amount-item', amount === item ? 'active' : '']"
                @click="selectAmount(item)"
            >
                <text>{{item}}元</text>
            </view>
        </view>

        <!-- 支付方式选择 -->
        <view class="payment-section">
            <text class="section-title">支付方式</text>
            <view class="payment-list">
                <view 
                    v-for="(method, index) in paymentMethods"
                    :key="index"
                    :class="['payment-item', selectedPayment === index ? 'active' : '']"
                    @click="selectPayment(index)"
                >
                    <view class="payment-info">
                        <uni-icons :type="method.icon" size="24" :color="method.color"></uni-icons>
                        <text class="payment-name">{{method.name}}</text>
                    </view>
                    <uni-icons 
                        :type="selectedPayment === index ? 'checkbox-filled' : 'circle'"
                        size="20"
                        :color="selectedPayment === index ? '#3498db' : '#ddd'"
                    ></uni-icons>
                </view>
            </view>
        </view>

        <!-- 充值按钮 -->
        <button 
            :class="['recharge-btn', (isValidAmount && selectedPayment !== null) ? 'active' : '']"
            :disabled="!isValidAmount || selectedPayment === null"
            @click="handleRecharge"
        >
            立即充值
        </button>

        <!-- 充值说明 -->
        <view class="notice">
            <text class="notice-title">温馨提示：</text>
            <text class="notice-item">1. 单次充值金额不得低于1元</text>
            <text class="notice-item">2. 充值金额将实时到账</text>
            <text class="notice-item">3. 如遇到问题请联系客服</text>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const amount = ref('')
const selectedPayment = ref(null)
const quickAmounts = [10, 20, 50, 100, 200, 500]
const paymentMethods = [
    {
        name: '微信支付',
        icon: 'weixin',
        color: '#2ecc71'
    },
    {
        name: '支付宝',
        icon: 'wallet',
        color: '#3498db'
    }
]

const isValidAmount = computed(() => {
    const num = parseFloat(amount.value)
    return num && num >= 1
})

const handleAmountInput = (e) => {
    let value = e.detail.value
    // 限制只能输入数字和小数点
    value = value.replace(/[^\d.]/g, '')
    // 限制只能有一个小数点
    if (value.split('.').length > 2) {
        value = value.slice(0, value.lastIndexOf('.'))
    }
    // 限制小数点后两位
    if (value.includes('.')) {
        const [integer, decimal] = value.split('.')
        value = `${integer}.${decimal.slice(0, 2)}`
    }
    amount.value = value
}

const selectAmount = (value) => {
    amount.value = value.toString()
}

const selectPayment = (index) => {
    selectedPayment.value = index
}

const handleRecharge = () => {
    if (!isValidAmount.value) {
        uni.showToast({
            title: '请输入有效金额',
            icon: 'none'
        })
        return
    }
    if (selectedPayment.value === null) {
        uni.showToast({
            title: '请选择支付方式',
            icon: 'none'
        })
        return
    }

    uni.showLoading({
        title: '处理中'
    })

    // 模拟支付过程
    setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
            title: '充值成功',
            icon: 'success',
            duration: 2000,
            success: () => {
                setTimeout(() => {
                    uni.navigateBack()
                }, 2000)
            }
        })
    }, 1500)
}
</script>

<style>
.recharge {
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 30rpx;
}

.section-title {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 20rpx;
    display: block;
}

.amount-section {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
}

.amount-input {
    display: flex;
    align-items: center;
    border-bottom: 2rpx solid #f0f0f0;
    padding: 20rpx 0;
}

.currency {
    font-size: 40rpx;
    color: #333;
    margin-right: 20rpx;
}

.amount-input input {
    flex: 1;
    font-size: 40rpx;
    color: #333;
}

.quick-amounts {
    display: flex;
    flex-wrap: wrap;
    gap: 20rpx;
    margin-bottom: 30rpx;
}

.amount-item {
    width: calc((100% - 40rpx) / 3);
    height: 80rpx;
    background-color: #fff;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 28rpx;
    color: #333;
    border: 2rpx solid #f0f0f0;
}

.amount-item.active {
    background-color: rgba(52, 152, 219, 0.1);
    border-color: #3498db;
    color: #3498db;
}

.payment-section {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
}

.payment-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.payment-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    border-radius: 8rpx;
    background-color: #f8f9fa;
}

.payment-item.active {
    background-color: rgba(52, 152, 219, 0.1);
}

.payment-info {
    display: flex;
    align-items: center;
    gap: 20rpx;
}

.payment-name {
    font-size: 28rpx;
    color: #333;
}

.recharge-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    font-size: 32rpx;
    border-radius: 44rpx;
    margin: 40rpx 0;
    background: #f5f5f5;
    color: #999;
    transition: all 0.3s ease;
}

.recharge-btn.active {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: #fff;
}

.recharge-btn[disabled] {
    opacity: 0.6;
    background: #f5f5f5;
    color: #999;
}

.notice {
    padding: 30rpx;
}

.notice-title {
    font-size: 24rpx;
    color: #666;
    margin-bottom: 10rpx;
    display: block;
}

.notice-item {
    font-size: 24rpx;
    color: #999;
    line-height: 1.6;
    display: block;
}
</style>
