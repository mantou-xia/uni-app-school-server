<template>
    <!-- 代写路径细节 如下 -->
    <view class="wallet">
        <!-- 余额卡片 -->
        <view class="balance-card">
            <view class="balance-header">
                <text class="balance-title">账户余额</text>
                <text class="balance-amount">¥128.50</text>
            </view>
            <view class="balance-actions">
                <button class="action-btn" @click="navigateTo('/pages/my/function/wallet/recharge')">充值</button>
                <button class="action-btn" @click="navigateTo('/pages/my/function/wallet/withdraw')">提现</button>
            </view>
        </view>

        <!-- 收支明细 -->
        <view class="transaction-section">
            <view class="section-header">
                <text class="section-title">收支明细</text>
                <text class="section-more" @click="navigateTo('/pages/my/function/wallet/transactions')">查看全部</text>
            </view>
            
            <view class="transaction-list">
                <view class="transaction-item" v-for="(item, index) in transactions" :key="index">
                    <view class="transaction-info">
                        <text class="transaction-type">{{item.type}}</text>
                        <text class="transaction-time">{{item.time}}</text>
                    </view>
                    <text :class="['transaction-amount', item.amount > 0 ? 'income' : 'expense']">
                        {{item.amount > 0 ? '+' : ''}}{{item.amount}}
                    </text>
                </view>
            </view>
        </view>

        <!-- 快捷功能 -->
        <view class="quick-actions">
            <view class="action-grid">
                <view class="grid-item" @click="navigateTo('/pages/my/function/wallet/bank-cards')">
                    <view class="icon-wrapper">
                        <uni-icons type="card" size="24" color="#3498db"></uni-icons>
                    </view>
                    <text class="grid-text">银行卡</text>
                </view>
                <view class="grid-item" @click="navigateTo('/pages/my/function/wallet/bills')">
                    <view class="icon-wrapper">
                        <uni-icons type="list" size="24" color="#e74c3c"></uni-icons>
                    </view>
                    <text class="grid-text">账单</text>
                </view>
                <view class="grid-item" @click="navigateTo('/pages/my/function/wallet/security')">
                    <view class="icon-wrapper">
                        <uni-icons type="locked" size="24" color="#2ecc71"></uni-icons>
                    </view>
                    <text class="grid-text">安全</text>
                </view>
                <view class="grid-item" @click="showHelp">
                    <view class="icon-wrapper">
                        <uni-icons type="help" size="24" color="#f1c40f"></uni-icons>
                    </view>
                    <text class="grid-text">帮助</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const transactions = ref([
    {
        type: '接单收入',
        time: '2024-03-01 15:30',
        amount: 15.00
    },
    {
        type: '提现',
        time: '2024-03-01 14:20',
        amount: -50.00
    },
    {
        type: '接单收入',
        time: '2024-03-01 12:45',
        amount: 12.00
    },
    {
        type: '充值',
        time: '2024-03-01 10:30',
        amount: 100.00
    }
])

const navigateTo = (url) => {
    uni.navigateTo({ url })
}

const showHelp = () => {
    uni.showModal({
        title: '钱包使用帮助',
        content: '1. 余额可用于接单收入和支付\n2. 每笔提现最低1元\n3. 充值实时到账\n4. 如有问题请联系客服',
        showCancel: false
    })
}
</script>

<style>
.wallet {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 15px;
}

.balance-card {
    background: linear-gradient(135deg, #3498db, #2980b9);
    border-radius: 12px;
    padding: 20px;
    color: #fff;
    margin-bottom: 15px;
}

.balance-header {
    margin-bottom: 20px;
}

.balance-title {
    font-size: 16px;
    opacity: 0.9;
    display: block;
    margin-bottom: 10px;
}

.balance-amount {
    font-size: 32px;
    font-weight: bold;
    display: block;
}

.balance-actions {
    display: flex;
    gap: 15px;
}

.action-btn {
    flex: 1;
    height: 40px;
    line-height: 40px;
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    color: #fff;
    font-size: 14px;
}

.transaction-section {
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
}

.section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.section-title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
}

.section-more {
    font-size: 14px;
    color: #999;
}

.transaction-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;
}

.transaction-item:last-child {
    border-bottom: none;
}

.transaction-info {
    flex: 1;
}

.transaction-type {
    font-size: 15px;
    color: #333;
    display: block;
    margin-bottom: 4px;
}

.transaction-time {
    font-size: 12px;
    color: #999;
}

.transaction-amount {
    font-size: 16px;
    font-weight: bold;
}

.transaction-amount.income {
    color: #2ecc71;
}

.transaction-amount.expense {
    color: #e74c3c;
}

.quick-actions {
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
}

.action-grid {
    display: flex;
    flex-wrap: wrap;
}

.grid-item {
    width: 25%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
}

.icon-wrapper {
    width: 45px;
    height: 45px;
    background-color: #f8f9fa;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
}

.grid-text {
    font-size: 12px;
    color: #666;
}
</style> 