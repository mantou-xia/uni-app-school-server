<template>
    <view class="accept">
        <view class="header">
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
        </view>

        <scroll-view scroll-y class="content">
            <view class="empty" v-if="!orderList.length">
                <image src="/static/logo.png" mode="aspectFit" class="empty-img"></image>
                <text class="empty-text">暂无相关订单</text>
            </view>
            <view v-else class="order-list">
                <view class="order-item" v-for="(item, index) in orderList" :key="index">
                    <view class="order-header">
                        <text class="order-type">{{item.type}}</text>
                        <text class="order-status" :class="item.status">{{item.statusText}}</text>
                    </view>
                    <view class="order-content">
                        <view class="info-item">
                            <text class="label">取件地点：</text>
                            <text class="value">{{item.pickupAddress}}</text>
                        </view>
                        <view class="info-item">
                            <text class="label">送达地点：</text>
                            <text class="value">{{item.deliveryAddress}}</text>
                        </view>
                        <view class="info-item">
                            <text class="label">配送费用：</text>
                            <text class="value price">¥{{item.fee}}</text>
                        </view>
                        <view class="info-item">
                            <text class="label">订单时间：</text>
                            <text class="value">{{item.time}}</text>
                        </view>
                    </view>
                    <view class="order-footer">
                        <button 
                            class="btn" 
                            size="mini" 
                            v-if="item.status === 'accepted'"
                            @click="contactUser(item)"
                        >联系下单人</button>
                        <button 
                            class="btn primary" 
                            size="mini"
                            v-if="item.status === 'accepted'"
                            @click="completeOrder(item)"
                        >完成订单</button>
                    </view>
                </view>
            </view>
        </scroll-view>

        <view class="float-btn" @click="goToAccept">
            <uni-icons type="search" size="20" color="#fff"></uni-icons>
            <text class="btn-text">接单大厅</text>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const tabs = ['全部', '进行中', '已完成']
const currentTab = ref(0)

const orderList = ref([
    {
        type: '快递代取',
        status: 'accepted',
        statusText: '进行中',
        pickupAddress: '菜鸟驿站',
        deliveryAddress: '学生宿舍8栋',
        fee: '5.00',
        time: '2024-03-10 14:30'
    },
    {
        type: '食堂打饭',
        status: 'completed',
        statusText: '已完成',
        pickupAddress: '第一食堂',
        deliveryAddress: '图书馆',
        fee: '8.00',
        time: '2024-03-10 12:00'
    }
])

const switchTab = (index) => {
    currentTab.value = index
    // TODO: 根据状态筛选订单
}

const contactUser = (order) => {
    // TODO: 实现联系用户功能
    uni.makePhoneCall({
        phoneNumber: '10000000000'
    })
}

const completeOrder = (order) => {
    uni.showModal({
        title: '提示',
        content: '确认已完成配送？',
        success: (res) => {
            if (res.confirm) {
                // TODO: 调用完成订单接口
                uni.showToast({
                    title: '订单已完成',
                    icon: 'success'
                })
            }
        }
    })
}

const goToAccept = () => {
    uni.navigateTo({
        url: '/pages/order/list'
    })
}
</script>

<style>
.accept {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f5f5;
}

.header {
    background-color: #fff;
    border-bottom: 1px solid #eee;
}

.tabs {
    display: flex;
    padding: 0 10px;
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

.content {
    flex: 1;
    padding: 15px;
}

.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 100px;
}

.empty-img {
    width: 120px;
    height: 120px;
    margin-bottom: 15px;
}

.empty-text {
    font-size: 14px;
    color: #999;
}

.order-list {
    padding-bottom: 80px;
}

.order-item {
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
}

.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.order-type {
    font-size: 16px;
    font-weight: bold;
    color: #333;
}

.order-status {
    font-size: 14px;
}

.order-status.accepted {
    color: #3498db;
}

.order-status.completed {
    color: #27ae60;
}

.order-content {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
    padding: 10px 0;
}

.info-item {
    display: flex;
    margin-bottom: 8px;
}

.info-item:last-child {
    margin-bottom: 0;
}

.label {
    font-size: 14px;
    color: #666;
    width: 80px;
}

.value {
    font-size: 14px;
    color: #333;
    flex: 1;
}

.value.price {
    color: #e74c3c;
    font-weight: bold;
}

.order-footer {
    display: flex;
    justify-content: flex-end;
    padding-top: 10px;
}

.btn {
    margin-left: 10px;
    font-size: 12px;
}

.btn.primary {
    background-color: #3498db;
    color: #fff;
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