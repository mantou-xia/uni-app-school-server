<template>
    <view class="withdraw">
        <!-- 账户余额 -->
        <view class="balance-section">
            <text class="balance-label">可提现余额</text>
            <text class="balance-amount">¥128.50</text>
        </view>

        <!-- 提现金额输入 -->
        <view class="amount-section">
            <text class="section-title">提现金额</text>
            <view class="amount-input">
                <text class="currency">¥</text>
                <input 
                    type="digit"
                    v-model="amount"
                    placeholder="请输入提现金额"
                    @input="handleAmountInput"
                />
            </view>
            <text class="withdraw-all" @click="withdrawAll">全部提现</text>
        </view>

        <!-- 提现方式选择 -->
        <view class="withdraw-section">
            <text class="section-title">提现方式</text>
            <view class="withdraw-list">
                <view 
                    v-for="(method, index) in withdrawMethods"
                    :key="index"
                    :class="['withdraw-item', selectedMethod === index ? 'active' : '']"
                    @click="selectMethod(index)"
                >
                    <view class="method-info">
                        <uni-icons :type="method.icon" size="24" :color="method.color"></uni-icons>
                        <text class="method-name">{{method.name}}</text>
                    </view>
                    <uni-icons 
                        :type="selectedMethod === index ? 'checkbox-filled' : 'circle'"
                        size="20"
                        :color="selectedMethod === index ? '#3498db' : '#ddd'"
                    ></uni-icons>
                </view>
            </view>
        </view>

        <!-- 提现按钮 -->
        <button 
            class="withdraw-btn"
            :disabled="!isValidAmount || selectedMethod === null"
            @click="handleWithdraw"
        >
            确认提现
        </button>

        <!-- 提现说明 -->
        <view class="notice">
            <text class="notice-title">温馨提示：</text>
            <text class="notice-item">1. 单次提现金额不得低于1元</text>
            <text class="notice-item">2. 提现金额将在1-3个工作日内到账</text>
            <text class="notice-item">3. 如遇到问题请联系客服</text>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const balance = 128.50
const amount = ref('')
const selectedMethod = ref(null)

const withdrawMethods = [
    {
        name: '微信零钱',
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
    return num && num >= 1 && num <= balance
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
    // 限制不能超过余额
    if (parseFloat(value) > balance) {
        value = balance.toString()
    }
    amount.value = value
}

const withdrawAll = () => {
    amount.value = balance.toString()
}

const selectMethod = (index) => {
    selectedMethod.value = index
}

const handleWithdraw = () => {
    if (!isValidAmount.value) {
        uni.showToast({
            title: '请输入有效金额',
            icon: 'none'
        })
        return
    }
    if (selectedMethod.value === null) {
        uni.showToast({
            title: '请选择提现方式',
            icon: 'none'
        })
        return
    }

    uni.showModal({
        title: '确认提现',
        content: `确定要提现${amount.value}元吗？`,
        success: (res) => {
            if (res.confirm) {
                uni.showLoading({
                    title: '处理中'
                })
                
                // 模拟提现过程
                setTimeout(() => {
                    uni.hideLoading()
                    uni.showToast({
                        title: '提现申请已提交',
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
        }
    })
}
</script>

<style>
.withdraw {
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 30rpx;
}

.balance-section {
    background: linear-gradient(135deg, #3498db, #2980b9);
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    color: #fff;
}

.balance-label {
    font-size: 28rpx;
    opacity: 0.9;
    display: block;
    margin-bottom: 10rpx;
}

.balance-amount {
    font-size: 48rpx;
    font-weight: bold;
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
    position: relative;
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

.withdraw-all {
    position: absolute;
    right: 30rpx;
    top: 30rpx;
    font-size: 24rpx;
    color: #3498db;
}

.withdraw-section {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
}

.withdraw-list {
    display: flex;
    flex-direction: column;
    gap: 20rpx;
}

.withdraw-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20rpx;
    border-radius: 8rpx;
    background-color: #f8f9fa;
}

.withdraw-item.active {
    background-color: rgba(52, 152, 219, 0.1);
}

.method-info {
    display: flex;
    align-items: center;
    gap: 20rpx;
}

.method-name {
    font-size: 28rpx;
    color: #333;
}

.withdraw-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: #fff;
    font-size: 32rpx;
    border-radius: 44rpx;
    margin: 40rpx 0;
}

.withdraw-btn[disabled] {
    opacity: 0.6;
    background: linear-gradient(135deg, #bdc3c7, #95a5a6);
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
