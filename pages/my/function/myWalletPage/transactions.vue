<template>
    <view class="transactions">
        <!-- 筛选栏 -->
        <view class="filter-bar">
            <view 
                v-for="(tab, index) in tabs" 
                :key="index"
                :class="['filter-item', currentTab === index ? 'active' : '']"
                @click="switchTab(index)"
            >
                {{tab}}
            </view>
        </view>

        <!-- 交易列表 -->
        <scroll-view 
            scroll-y 
            class="transaction-list"
            :refresher-enabled="true"
            @refresherrefresh="onRefresh"
            :refresher-triggered="isRefreshing"
            @scrolltolower="loadMore"
        >
            <view class="empty" v-if="!currentList.length">
                <image class="empty-icon" src="/static/logo.png" mode="aspectFit"></image>
                <text class="empty-text">暂无交易记录</text>
            </view>
            
            <block v-else>
                <view 
                    class="transaction-item"
                    v-for="(item, index) in currentList"
                    :key="index"
                    @click="showDetail(item)"
                >
                    <view class="trans-info">
                        <view class="trans-main">
                            <text class="trans-type">{{item.type}}</text>
                            <text :class="['trans-amount', item.amount > 0 ? 'income' : 'expense']">
                                {{item.amount > 0 ? '+' : ''}}{{item.amount}}
                            </text>
                        </view>
                        <view class="trans-sub">
                            <text class="trans-time">{{item.time}}</text>
                            <text class="trans-status" :style="{color: getStatusColor(item.status)}">
                                {{item.status}}
                            </text>
                        </view>
                    </view>
                </view>

                <!-- 加载状态 -->
                <view class="loading-more" v-if="hasMore">
                    <uni-icons type="spinner-cycle" size="20" color="#999"></uni-icons>
                    <text>加载中...</text>
                </view>
                <view class="no-more" v-else>
                    <text>没有更多了</text>
                </view>
            </block>
        </scroll-view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = ['全部', '收入', '支出']
const currentTab = ref(0)
const isRefreshing = ref(false)
const hasMore = ref(true)
const page = ref(1)
const pageSize = 20

// 模拟交易数据
const allTransactions = ref([
    {
        type: '接单收入',
        amount: 15.00,
        time: '2024-03-01 15:30',
        status: '已完成',
        orderNo: 'T20240301153000',
        detail: '校园跑腿订单'
    },
    {
        type: '提现',
        amount: -50.00,
        time: '2024-03-01 14:20',
        status: '处理中',
        orderNo: 'W20240301142000',
        detail: '提现到微信零钱'
    },
    {
        type: '接单收入',
        amount: 12.00,
        time: '2024-03-01 12:45',
        status: '已完成',
        orderNo: 'T20240301124500',
        detail: '校园跑腿订单'
    },
    {
        type: '充值',
        amount: 100.00,
        time: '2024-03-01 10:30',
        status: '已完成',
        orderNo: 'R20240301103000',
        detail: '微信支付充值'
    }
])

const currentList = computed(() => {
    if (currentTab.value === 0) return allTransactions.value
    if (currentTab.value === 1) return allTransactions.value.filter(t => t.amount > 0)
    return allTransactions.value.filter(t => t.amount < 0)
})

const switchTab = (index) => {
    currentTab.value = index
    // 切换标签时重置分页
    page.value = 1
    hasMore.value = true
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
    // 模拟刷新
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
    
    // 模拟加载更多
    uni.showLoading({
        title: '加载中'
    })
    
    setTimeout(() => {
        // 模拟没有更多数据
        hasMore.value = false
        uni.hideLoading()
    }, 1000)
}

const showDetail = (item) => {
    uni.showModal({
        title: '交易详情',
        content: `订单号：${item.orderNo}\n类型：${item.type}\n金额：${item.amount}\n时间：${item.time}\n状态：${item.status}\n说明：${item.detail}`,
        showCancel: false
    })
}
</script>

<style>
.transactions {
    min-height: 100vh;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
}

.filter-bar {
    background-color: #fff;
    display: flex;
    padding: 20rpx 30rpx;
    border-bottom: 2rpx solid #f0f0f0;
    position: sticky;
    top: 0;
    z-index: 1;
}

.filter-item {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #666;
    position: relative;
    padding: 20rpx 0;
}

.filter-item.active {
    color: #3498db;
    font-weight: 500;
}

.filter-item.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 40rpx;
    height: 4rpx;
    background-color: #3498db;
    border-radius: 2rpx;
}

.transaction-list {
    flex: 1;
    height: 0;
    padding: 30rpx;
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

.transaction-item {
    background-color: #fff;
    border-radius: 12rpx;
    padding: 30rpx;
    margin-bottom: 20rpx;
}

.trans-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16rpx;
}

.trans-type {
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
}

.trans-amount {
    font-size: 32rpx;
    font-weight: bold;
}

.trans-amount.income {
    color: #2ecc71;
}

.trans-amount.expense {
    color: #e74c3c;
}

.trans-sub {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.trans-time {
    font-size: 24rpx;
    color: #999;
}

.trans-status {
    font-size: 24rpx;
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
