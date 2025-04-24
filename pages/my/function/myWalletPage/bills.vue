<template>
    <view class="bills">
        <!-- 月份选择器 -->
        <view class="month-picker">
            <view class="picker-header">
                <text class="current-month">{{currentYear}}年{{currentMonth}}月</text>
                <view class="month-actions">
                    <uni-icons type="left" size="20" color="#666" @click="prevMonth"></uni-icons>
                    <uni-icons type="right" size="20" color="#666" @click="nextMonth"></uni-icons>
                </view>
            </view>
        </view>

        <!-- 月度统计 -->
        <view class="month-stats">
            <view class="stat-item">
                <text class="stat-label">月收入</text>
                <text class="stat-value income">¥{{monthlyIncome}}</text>
            </view>
            <view class="stat-divider"></view>
            <view class="stat-item">
                <text class="stat-label">月支出</text>
                <text class="stat-value expense">¥{{monthlyExpense}}</text>
            </view>
        </view>

        <!-- 账单列表 -->
        <scroll-view 
            scroll-y 
            class="bill-list"
            :refresher-enabled="true"
            @refresherrefresh="onRefresh"
            :refresher-triggered="isRefreshing"
            @scrolltolower="loadMore"
        >
            <template v-if="currentBills.length">
                <view v-for="(group, date) in groupedBills" :key="date" class="date-group">
                    <view class="date-header">
                        <text class="date-text">{{formatDate(date)}}</text>
                        <view class="date-summary">
                            <text class="summary-text">收入 {{getDayIncome(group)}} 支出 {{getDayExpense(group)}}</text>
                        </view>
                    </view>
                    
                    <view 
                        v-for="(item, index) in group" 
                        :key="index"
                        class="bill-item"
                        @click="showDetail(item)"
                    >
                        <view class="bill-info">
                            <view class="bill-main">
                                <text class="bill-type">{{item.type}}</text>
                                <text :class="['bill-amount', item.amount > 0 ? 'income' : 'expense']">
                                    {{item.amount > 0 ? '+' : ''}}{{item.amount}}
                                </text>
                            </view>
                            <view class="bill-sub">
                                <text class="bill-time">{{formatTime(item.time)}}</text>
                                <text class="bill-status" :style="{color: getStatusColor(item.status)}">
                                    {{item.status}}
                                </text>
                            </view>
                        </view>
                    </view>
                </view>
                
                <view v-if="hasMore" class="loading-more">
                    <uni-icons type="spinner-cycle" size="20" color="#999"></uni-icons>
                    <text>加载中...</text>
                </view>
                <view v-else class="no-more">
                    <text>没有更多了</text>
                </view>
            </template>
            
            <template v-else>
                <view class="empty">
                    <image class="empty-icon" src="/static/logo.png" mode="aspectFit"></image>
                    <text class="empty-text">暂无账单记录</text>
                </view>
            </template>
        </scroll-view>
    </view>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 页面加载
onMounted(() => {
    // 初始化数据
    initData()
})

// 初始化数据
const initData = () => {
    uni.showLoading({
        title: '加载中'
    })
    
    // 模拟获取数据
    setTimeout(() => {
        uni.hideLoading()
    }, 500)
}

// 当前日期
const now = new Date()
const currentYear = ref(now.getFullYear())
const currentMonth = ref(now.getMonth() + 1)

// 页面状态
const isRefreshing = ref(false)
const hasMore = ref(true)
const page = ref(1)
const pageSize = 20

// 账单数据
const bills = ref([
    {
        type: '接单收入',
        amount: 15.00,
        time: '2024-03-01 15:30:00',
        status: '已完成',
        orderNo: 'T20240301153000',
        detail: '校园跑腿订单'
    },
    {
        type: '提现',
        amount: -50.00,
        time: '2024-03-01 14:20:00',
        status: '处理中',
        orderNo: 'W20240301142000',
        detail: '提现到微信零钱'
    },
    {
        type: '接单收入',
        amount: 12.00,
        time: '2024-03-01 12:45:00',
        status: '已完成',
        orderNo: 'T20240301124500',
        detail: '校园跑腿订单'
    },
    {
        type: '充值',
        amount: 100.00,
        time: '2024-03-01 10:30:00',
        status: '已完成',
        orderNo: 'R20240301103000',
        detail: '微信支付充值'
    }
])

// 计算属性
const currentBills = computed(() => {
    return bills.value.filter(bill => {
        const date = new Date(bill.time)
        return date.getFullYear() === currentYear.value && 
               date.getMonth() + 1 === currentMonth.value
    })
})

const groupedBills = computed(() => {
    const groups = {}
    currentBills.value.forEach(bill => {
        const date = bill.time.split(' ')[0]
        if (!groups[date]) {
            groups[date] = []
        }
        groups[date].push(bill)
    })
    return groups
})

const monthlyIncome = computed(() => {
    return currentBills.value
        .filter(bill => bill.amount > 0)
        .reduce((sum, bill) => sum + bill.amount, 0)
        .toFixed(2)
})

const monthlyExpense = computed(() => {
    return currentBills.value
        .filter(bill => bill.amount < 0)
        .reduce((sum, bill) => sum + Math.abs(bill.amount), 0)
        .toFixed(2)
})

// 方法
const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return `${date.getMonth() + 1}月${date.getDate()}日`
}

const formatTime = (timeStr) => {
    return timeStr.split(' ')[1].substring(0, 5)
}

const prevMonth = () => {
    if (currentMonth.value === 1) {
        currentYear.value--
        currentMonth.value = 12
    } else {
        currentMonth.value--
    }
    resetList()
}

const nextMonth = () => {
    if (currentMonth.value === 12) {
        currentYear.value++
        currentMonth.value = 1
    } else {
        currentMonth.value++
    }
    resetList()
}

const resetList = () => {
    page.value = 1
    hasMore.value = true
}

const getDayIncome = (dayBills) => {
    return dayBills
        .filter(bill => bill.amount > 0)
        .reduce((sum, bill) => sum + bill.amount, 0)
        .toFixed(2)
}

const getDayExpense = (dayBills) => {
    return dayBills
        .filter(bill => bill.amount < 0)
        .reduce((sum, bill) => sum + Math.abs(bill.amount), 0)
        .toFixed(2)
}

const getStatusColor = (status) => {
    switch (status) {
        case '已完成':
            return '#2ecc71'
        case '处理中':
            return '#f1c40f'
        case '已取消':
            return '#e74c3c'
        default:
            return '#999'
    }
}

const onRefresh = () => {
    isRefreshing.value = true
    setTimeout(() => {
        isRefreshing.value = false
        uni.showToast({
            title: '刷新成功',
            icon: 'success'
        })
    }, 1000)
}

const loadMore = () => {
    if (!hasMore.value) return
    
    uni.showLoading({
        title: '加载中'
    })
    
    setTimeout(() => {
        hasMore.value = false
        uni.hideLoading()
    }, 1000)
}

const showDetail = (item) => {
    uni.showModal({
        title: '账单详情',
        content: `订单号：${item.orderNo}\n类型：${item.type}\n金额：${item.amount}\n时间：${item.time}\n状态：${item.status}\n说明：${item.detail}`,
        showCancel: false
    })
}

// 返回上一页
const goBack = () => {
    uni.navigateBack()
}
</script>

<style>
.bills {
    min-height: 100vh;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
}

.month-picker {
    background-color: #fff;
    padding: 30rpx;
    border-bottom: 2rpx solid #f0f0f0;
}

.picker-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.current-month {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
}

.month-actions {
    display: flex;
    gap: 30rpx;
}

.month-stats {
    background-color: #fff;
    padding: 30rpx;
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
}

.stat-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-label {
    font-size: 28rpx;
    color: #666;
    margin-bottom: 10rpx;
}

.stat-value {
    font-size: 36rpx;
    font-weight: bold;
}

.stat-value.income {
    color: #2ecc71;
}

.stat-value.expense {
    color: #e74c3c;
}

.stat-divider {
    width: 2rpx;
    height: 50rpx;
    background-color: #f0f0f0;
}

.bill-list {
    flex: 1;
    height: 0;
    padding: 30rpx;
}

.date-group {
    margin-bottom: 30rpx;
}

.date-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
}

.date-text {
    font-size: 28rpx;
    color: #666;
}

.summary-text {
    font-size: 24rpx;
    color: #999;
}

.bill-item {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
}

.bill-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
}

.bill-type {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
}

.bill-amount {
    font-size: 32rpx;
    font-weight: bold;
}

.bill-amount.income {
    color: #2ecc71;
}

.bill-amount.expense {
    color: #e74c3c;
}

.bill-sub {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.bill-time {
    font-size: 24rpx;
    color: #999;
}

.bill-status {
    font-size: 24rpx;
}

.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 200rpx;
}

.empty-icon {
    width: 200rpx;
    height: 200rpx;
    margin-bottom: 30rpx;
}

.empty-text {
    font-size: 28rpx;
    color: #999;
}

.loading-more {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 30rpx 0;
    color: #999;
    font-size: 24rpx;
}

.loading-more uni-icons {
    margin-right: 10rpx;
    animation: rotate 1s linear infinite;
}

.no-more {
    text-align: center;
    padding: 30rpx 0;
    color: #999;
    font-size: 24rpx;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
</style>
