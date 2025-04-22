<template>
    <view class="coupon">
        <view class="tabs">
            <view 
                v-for="(tab, index) in tabs" 
                :key="index"
                :class="['tab-item', currentTab === index ? 'active' : '']"
                @click="switchTab(index)"
            >
                {{tab}}
            </view>
        </view>

        <swiper class="swiper" :current="currentTab" @change="swiperChange">
            <swiper-item v-for="(tab, index) in tabs" :key="index">
                <scroll-view scroll-y class="coupon-list">
                    <view class="empty" v-if="!coupons[index].length">
                        <image class="empty-icon" src="/static/logo.png" mode="aspectFit"></image>
                        <text class="empty-text">暂无优惠券</text>
                    </view>
                    <view 
                        v-else
                        class="coupon-item"
                        v-for="(item, idx) in coupons[index]"
                        :key="idx"
                    >
                        <view class="coupon-left">
                            <view class="amount">
                                <text class="symbol">¥</text>
                                <text class="number">{{item.amount}}</text>
                            </view>
                            <text class="condition">满{{item.condition}}可用</text>
                        </view>
                        <view class="coupon-right">
                            <text class="title">{{item.title}}</text>
                            <text class="date">有效期至：{{item.expireDate}}</text>
                            <text class="desc">{{item.desc}}</text>
                            <view class="btn-wrapper">
                                <button 
                                    class="use-btn" 
                                    size="mini"
                                    v-if="index === 0"
                                    @click="useCoupon(item)"
                                >立即使用</button>
                                <text v-else-if="index === 1" class="status used">已使用</text>
                                <text v-else class="status expired">已过期</text>
                            </view>
                        </view>
                        <view class="coupon-circle top"></view>
                        <view class="coupon-circle bottom"></view>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>

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
            desc: '已用于订单：DD20240228001'
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

const switchTab = (index) => {
    currentTab.value = index
}

const swiperChange = (e) => {
    currentTab.value = e.detail.current
}

const useCoupon = (coupon) => {
    uni.navigateTo({
        url: '/pages/order/create'
    })
}

const showExchange = () => {
    uni.showModal({
        title: '兑换优惠券',
        placeholderText: '请输入兑换码',
        editable: true,
        success: (res) => {
            if (res.confirm && res.content) {
                uni.showLoading({
                    title: '兑换中'
                })
                setTimeout(() => {
                    uni.hideLoading()
                    uni.showToast({
                        title: '兑换成功',
                        icon: 'success'
                    })
                }, 1500)
            }
        }
    })
}
</script>

<style>
.coupon {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f5f5;
}

.tabs {
    display: flex;
    background-color: #fff;
    padding: 0 10px;
    border-bottom: 1px solid #f0f0f0;
}

.tab-item {
    flex: 1;
    text-align: center;
    padding: 15px 0;
    font-size: 14px;
    color: #666;
    position: relative;
}

.tab-item.active {
    color: #3498db;
}

.tab-item.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 2px;
    background-color: #3498db;
}

.swiper {
    flex: 1;
    height: 0;
}

.coupon-list {
    height: 100%;
    padding: 15px;
}

.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 100px;
}

.empty-icon {
    width: 100px;
    height: 100px;
    margin-bottom: 15px;
}

.empty-text {
    font-size: 14px;
    color: #999;
}

.coupon-item {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
    display: flex;
    position: relative;
    overflow: hidden;
}

.coupon-left {
    width: 120px;
    background-color: #3498db;
    padding: 20px 15px;
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
    font-size: 16px;
}

.number {
    font-size: 32px;
    font-weight: bold;
    margin-left: 2px;
}

.condition {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.9);
    margin-top: 5px;
}

.coupon-right {
    flex: 1;
    padding: 15px;
    position: relative;
}

.title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-bottom: 8px;
    display: block;
}

.date {
    font-size: 12px;
    color: #999;
    margin-bottom: 5px;
    display: block;
}

.desc {
    font-size: 12px;
    color: #666;
    display: block;
}

.btn-wrapper {
    position: absolute;
    right: 15px;
    bottom: 15px;
}

.use-btn {
    background-color: #3498db;
    color: #fff;
}

.status {
    font-size: 12px;
}

.status.used {
    color: #999;
}

.status.expired {
    color: #e74c3c;
}

.coupon-circle {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: #f5f5f5;
    border-radius: 50%;
    left: 110px;
}

.coupon-circle.top {
    top: -10px;
}

.coupon-circle.bottom {
    bottom: -10px;
}

.float-btn {
    position: fixed;
    right: 20px;
    bottom: 30px;
    background-color: #3498db;
    color: #fff;
    border-radius: 20px;
    padding: 8px 15px;
    display: flex;
    align-items: center;
    box-shadow: 0 2px 8px rgba(52, 152, 219, 0.3);
}

.btn-text {
    font-size: 14px;
    margin-left: 5px;
}
</style> 