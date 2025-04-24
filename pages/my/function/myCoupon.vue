<template>
    <view class="coupon">
        <!-- 顶部统计 -->
        <view class="coupon-header">
            <view class="header-stats">
                <view class="stat-item">
                    <text class="stat-num">{{coupons[0].length}}</text>
                    <text class="stat-label">可用优惠券</text>
                </view>
                <view class="stat-item">
                    <text class="stat-num">{{getTotalSaving()}}</text>
                    <text class="stat-label">总优惠金额(元)</text>
                </view>
            </view>
        </view>

        <!-- 标签页 -->
        <view class="tabs">
            <view 
                v-for="(tab, index) in tabs" 
                :key="index"
                :class="['tab-item', currentTab === index ? 'active' : '']"
                @click="switchTab(index)"
            >
                <text class="tab-text">{{tab}}</text>
                <text class="tab-count" v-if="coupons[index].length">({{coupons[index].length}})</text>
            </view>
        </view>

        <swiper class="swiper" :current="currentTab" @change="swiperChange">
            <swiper-item v-for="(tab, index) in tabs" :key="index">
                <scroll-view scroll-y class="coupon-list" :refresher-enabled="true" @refresherrefresh="onRefresh" :refresher-triggered="isRefreshing">
                    <view class="empty" v-if="!coupons[index].length">
                        <image class="empty-icon" src="/static/empty-coupon.png" mode="aspectFit"></image>
                        <text class="empty-text">{{getEmptyText(index)}}</text>
                        <button class="empty-btn" v-if="index === 0" @click="navigateToTask">去赚优惠券</button>
                    </view>
                    <view 
                        v-else
                        class="coupon-item"
                        v-for="(item, idx) in coupons[index]"
                        :key="idx"
                        :class="{'expired': index === 2}"
                    >
                        <view class="coupon-left">
                            <view class="amount">
                                <text class="symbol">¥</text>
                                <text class="number">{{item.amount}}</text>
                            </view>
                            <text class="condition">满{{item.condition}}可用</text>
                        </view>
                        <view class="coupon-right">
                            <view class="coupon-info">
                                <text class="title">{{item.title}}</text>
                                <text class="date">{{getDateText(item, index)}}</text>
                                <text class="desc">{{item.desc}}</text>
                            </view>
                            <view class="btn-wrapper">
                                <button 
                                    class="use-btn" 
                                    size="mini"
                                    v-if="index === 0"
                                    @click="useCoupon(item)"
                                >立即使用</button>
                                <view v-else-if="index === 1" class="status-tag used">
                                    <uni-icons type="checkmarkempty" size="12" color="#999"></uni-icons>
                                    <text>已使用</text>
                                </view>
                                <view v-else class="status-tag expired">
                                    <uni-icons type="closeempty" size="12" color="#e74c3c"></uni-icons>
                                    <text>已过期</text>
                                </view>
                            </view>
                        </view>
                        <view class="coupon-circle top"></view>
                        <view class="coupon-circle bottom"></view>
                        <view class="coupon-dash"></view>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>

        <!-- 兑换按钮 -->
        <view class="float-btn" @click="showExchange">
            <uni-icons type="plus" size="20" color="#fff"></uni-icons>
            <text class="btn-text">兑换优惠券</text>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ['可使用', '已使用', '已过期']
const currentTab = ref(0)
const isRefreshing = ref(false)

const coupons = ref([
    // 可使用
    [
        {
            amount: 5,
            condition: 20,
            title: '新人专享券',
            expireDate: '2024-03-31',
            desc: '仅限跑腿订单使用'
        },
        {
            amount: 10,
            condition: 50,
            title: '满减优惠券',
            expireDate: '2024-03-15',
            desc: '限时优惠，全场通用'
        }
    ],
    // 已使用
    [
        {
            amount: 3,
            condition: 15,
            title: '跑腿专享券',
            expireDate: '2024-02-28',
            desc: '已用于订单：DD20240228001',
            usedTime: '2024-02-28 15:30'
        }
    ],
    // 已过期
    [
        {
            amount: 8,
            condition: 40,
            title: '新年优惠券',
            expireDate: '2024-02-15',
            desc: '春节活动专享'
        }
    ]
])

const getTotalSaving = () => {
    return coupons.value[0].reduce((total, coupon) => total + coupon.amount, 0)
}

const getEmptyText = (index) => {
    const texts = [
        '暂无可用优惠券',
        '暂无已使用的优惠券',
        '暂无已过期的优惠券'
    ]
    return texts[index]
}

const getDateText = (item, index) => {
    if (index === 1) {
        return `使用时间：${item.usedTime}`
    } else {
        return `有效期至：${item.expireDate}`
    }
}

const switchTab = (index) => {
    currentTab.value = index
}

const swiperChange = (e) => {
    currentTab.value = e.detail.current
}

const useCoupon = (coupon) => {
    uni.navigateTo({
        url: `/pages/order/create?couponAmount=${coupon.amount}&couponCondition=${coupon.condition}`
    })
}

const showExchange = () => {
    uni.showModal({
        title: '兑换优惠券',
        placeholderText: '请输入兑换码',
        editable: true,
        success: (res) => {
            if (res.confirm && res.content) {
                exchangeCoupon(res.content)
            }
        }
    })
}

const exchangeCoupon = (code) => {
    uni.showLoading({
        title: '兑换中'
    })
    setTimeout(() => {
        uni.hideLoading()
        if (code === 'TEST123') {
            const newCoupon = {
                amount: 15,
                condition: 60,
                title: '兑换优惠券',
                expireDate: '2024-04-30',
                desc: '限时兑换专享'
            }
            coupons.value[0].unshift(newCoupon)
            uni.showToast({
                title: '兑换成功',
                icon: 'success'
            })
        } else {
            uni.showToast({
                title: '兑换码无效',
                icon: 'error'
            })
        }
    }, 1500)
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

const navigateToTask = () => {
    uni.navigateTo({
        url: '/pages/task/index'
    })
}
</script>

<style>
.coupon {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f8f9fa;
}

.coupon-header {
    background: linear-gradient(135deg, #3498db, #2980b9);
    padding: 30rpx 40rpx;
    color: #fff;
}

.header-stats {
    display: flex;
    justify-content: space-around;
    margin-top: 20rpx;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-num {
    font-size: 40rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
}

.stat-label {
    font-size: 24rpx;
    opacity: 0.9;
}

.tabs {
    display: flex;
    background-color: #fff;
    padding: 0 20rpx;
    border-bottom: 1rpx solid #f0f0f0;
    position: relative;
    z-index: 1;
}

.tab-item {
    flex: 1;
    text-align: center;
    padding: 30rpx 0;
    font-size: 28rpx;
    color: #666;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tab-text {
    margin-right: 8rpx;
}

.tab-count {
    font-size: 24rpx;
    color: #999;
}

.tab-item.active {
    color: #3498db;
    font-weight: 500;
}

.tab-item.active::after {
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

.swiper {
    flex: 1;
    height: 0;
}

.coupon-list {
    height: 100%;
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
    margin-bottom: 30rpx;
}

.empty-btn {
    background: #3498db;
    color: #fff;
    font-size: 28rpx;
    padding: 16rpx 40rpx;
    border-radius: 30rpx;
}

.coupon-item {
    background-color: #fff;
    border-radius: 16rpx;
    margin-bottom: 30rpx;
    display: flex;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.05);
}

.coupon-item.expired {
    opacity: 0.8;
}

.coupon-left {
    width: 220rpx;
    background: linear-gradient(135deg, #3498db, #2980b9);
    padding: 40rpx 30rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.amount {
    color: #fff;
    display: flex;
    align-items: baseline;
}

.symbol {
    font-size: 32rpx;
}

.number {
    font-size: 64rpx;
    font-weight: bold;
    margin-left: 4rpx;
}

.condition {
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 10rpx;
}

.coupon-right {
    flex: 1;
    padding: 30rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.coupon-info {
    flex: 1;
}

.title {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
    margin-bottom: 16rpx;
    display: block;
}

.date {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 10rpx;
    display: block;
}

.desc {
    font-size: 24rpx;
    color: #666;
    display: block;
}

.btn-wrapper {
    margin-top: 20rpx;
    display: flex;
    justify-content: flex-end;
}

.use-btn {
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: #fff;
    font-size: 24rpx;
    padding: 8rpx 30rpx;
    border-radius: 30rpx;
}

.status-tag {
    display: flex;
    align-items: center;
    font-size: 24rpx;
    padding: 8rpx 20rpx;
    border-radius: 24rpx;
}

.status-tag.used {
    background-color: #f8f9fa;
    color: #999;
}

.status-tag.expired {
    background-color: #fef0f0;
    color: #e74c3c;
}

.status-tag uni-icons {
    margin-right: 6rpx;
}

.coupon-circle {
    position: absolute;
    width: 32rpx;
    height: 32rpx;
    background-color: #f8f9fa;
    border-radius: 50%;
    left: 204rpx;
}

.coupon-circle.top {
    top: -16rpx;
}

.coupon-circle.bottom {
    bottom: -16rpx;
}

.coupon-dash {
    position: absolute;
    left: 220rpx;
    top: 0;
    bottom: 0;
    border-left: 2rpx dashed #f0f0f0;
}

.float-btn {
    position: fixed;
    right: 40rpx;
    bottom: 60rpx;
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: #fff;
    border-radius: 40rpx;
    padding: 20rpx 30rpx;
    display: flex;
    align-items: center;
    box-shadow: 0 4rpx 16rpx rgba(52,152,219,0.3);
}

.btn-text {
    font-size: 28rpx;
    margin-left: 10rpx;
}
</style> 