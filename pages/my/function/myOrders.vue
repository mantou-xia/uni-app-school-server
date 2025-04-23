<template>
    <view class="my-orders">
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
                <scroll-view scroll-y class="order-list">
                    <view class="order-item" v-for="(order, idx) in orders" :key="idx">
                        <view class="order-header">
                            <text class="order-type">{{order.type}}</text>
                            <text class="order-status">{{order.status}}</text>
                        </view>
                        <view class="order-content">
                            <view class="order-info">
                                <text class="info-item">订单编号：{{order.id}}</text>
                                <text class="info-item">下单时间：{{order.time}}</text>
                                <text class="info-item">配送费用：¥{{order.fee}}</text>
                            </view>
                            <view class="order-actions">
                                <button 
                                    class="action-btn" 
                                    size="mini" 
                                    v-if="order.canCancel"
                                    @click="cancelOrder(order.id)"
                                >取消订单</button>
                                <button 
                                    class="action-btn primary" 
                                    size="mini"
                                    v-if="order.canPay"
                                    @click="payOrder(order.id)"
                                >立即支付</button>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ['全部', '待付款', '进行中', '已完成', '已取消']
const currentTab = ref(0)

const orders = ref([
    {
        id: 'DD20240301001',
        type: '快递代取',
        status: '待付款',
        time: '2024-03-01 14:30',
        fee: '3.00',
        canCancel: true,
        canPay: true
    },
    {
        id: 'DD20240301002',
        type: '食堂打包',
        status: '进行中',
        time: '2024-03-01 12:00',
        fee: '5.00',
        canCancel: false,
        canPay: false
    }
])

const switchTab = (index) => {
    currentTab.value = index
}

const swiperChange = (e) => {
    currentTab.value = e.detail.current
}

const cancelOrder = (orderId) => {
    uni.showModal({
        title: '提示',
        content: '确定要取消该订单吗？',
        success: (res) => {
            if (res.confirm) {
                console.log('用户点击确定，取消订单：', orderId)
            }
        }
    })
}

const payOrder = (orderId) => {
    uni.showLoading({
        title: '正在支付'
    })
    setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
            title: '支付成功',
            icon: 'success'
        })
    }, 1500)
}
</script>

<style>
.my-orders {
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

.order-list {
    height: 100%;
    padding: 10px;
}

.order-item {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 15px;
}

.order-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
}

.order-type {
    font-size: 16px;
    color: #333;
    font-weight: bold;
}

.order-status {
    font-size: 14px;
    color: #3498db;
}

.order-content {
    border-top: 1px solid #f0f0f0;
    padding-top: 10px;
}

.order-info {
    margin-bottom: 10px;
}

.info-item {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
    display: block;
}

.order-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

.action-btn {
    font-size: 12px;
    padding: 0 15px;
}

.action-btn.primary {
    background-color: #3498db;
    color: #fff;
}
</style> 