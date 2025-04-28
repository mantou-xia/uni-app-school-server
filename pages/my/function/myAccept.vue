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
                    <text>{{tab.name}}</text>
                    <text class="tab-count" v-if="tab.count">({{tab.count}})</text>
                </view>
            </view>
        </view>

        <scroll-view 
            scroll-y 
            class="content" 
            :refresher-enabled="true"
            @refresherrefresh="onRefresh"
            :refresher-triggered="isRefreshing"
        >
            <view class="empty" v-if="!filteredOrders.length">
                <image src="/static/logo.png" mode="aspectFit" class="empty-img"></image>
                <text class="empty-text">暂无相关订单</text>
            </view>
            <view v-else class="order-list">
                <view class="order-item" v-for="(item, index) in filteredOrders" :key="index">
                    <view class="order-header">
                        <view class="order-type">
                            <uni-icons :type="getOrderIcon(item.category)" size="18" color="#666"></uni-icons>
                            <text>{{item.category}}</text>
                        </view>
                        <text class="order-status" :class="item.status">{{item.statusText}}</text>
                    </view>
                    
                    <view class="order-content">
                        <view class="info-row">
                            <view class="info-item location">
                                <text class="label">取件地点</text>
                                <text class="value">{{item.pickupAddress}}</text>
                            </view>
                            <view class="info-item location">
                                <text class="label">送达地点</text>
                                <text class="value">{{item.deliveryAddress}}</text>
                            </view>
                        </view>
                        
                        <view class="info-row" v-if="item.items">
                            <view class="info-item">
                                <text class="label">物品信息</text>
                                <text class="value">{{item.items}}</text>
                            </view>
                        </view>

                        <view class="info-row">
                            <view class="info-item">
                                <text class="label">委托人联系方式</text>
                                <text class="value">{{item.contact}}</text>
                            </view>
                        </view>

                        <view class="fee-section">
                            <view class="fee-item">
                                <text>基础配送费</text>
                                <text class="fee">¥{{item.baseFee}}</text>
                            </view>
                            <view class="fee-item" v-if="item.extraFee > 0">
                                <text>追加金额</text>
                                <text class="fee highlight">+¥{{item.extraFee}}</text>
                            </view>
                            <view class="fee-item total">
                                <text>总计</text>
                                <text class="fee">¥{{(Number(item.baseFee) + Number(item.extraFee)).toFixed(2)}}</text>
                            </view>
                        </view>

                        <view class="info-row">
                            <view class="info-item">
                                <text class="label">订单编号</text>
                                <text class="value">{{item.orderNo}}</text>
                            </view>
                            <view class="info-item">
                                <text class="label">下单时间</text>
                                <text class="value">{{item.time}}</text>
                            </view>
                        </view>
                    </view>

                    <view class="order-footer">
                        <button 
                            class="btn primary" 
                            size="mini"
                            v-if="item.status === 'accepted'"
                            @click="completeOrder(item)"
                        >完成配送</button>
                        <button 
                            class="btn service" 
                            size="mini"
                            @click="contactService(item)"
                        >联系客服</button>
                    </view>
                </view>
            </view>
        </scroll-view>

        <view class="float-btn" @click="goToAccept">
            <uni-icons type="plusempty" size="20" color="#fff"></uni-icons>
            <text class="btn-text">接单大厅</text>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const tabs = [
    { name: '全部', count: 0 },
    { name: '进行中', count: 0 },
    { name: '已完成', count: 0 }
]
const currentTab = ref(0)
const isRefreshing = ref(false)

const orderList = ref([
    {
        id: 200001,
        user_id: 1001,
        rider_id: 2001,
        category: '快递代取',
        fee: '5.00',
        tip: '2.00',
        title: '取快递包裹',
        date: '2024-04-10 14:30:22',
        deadline: '2024-04-10 17:30:00',
        finish_time: null,
        time_interval: '3小时内',
        remarks: '轻拿轻放，易碎物品',
        region: '学校',
        pickupAddress: '菜鸟驿站 (3号柜台)',
        deliveryAddress: '学生宿舍8栋 B305',
        contact: '张同学 13800138000',
        status: 'accepted',
        statusText: '进行中',
        items: '快递包裹 2件',
        baseFee: '5.00',
        extraFee: '2.00',
        orderNo: 'KD20240410143022',
        time: '2024-04-10 14:30',
        create_time: '2024-04-10 14:30:22',
        modify_time: '2024-04-10 14:35:10'
    },
    {
        id: 200002,
        user_id: 1002,
        rider_id: 2001,
        category: '食堂打饭',
        fee: '6.00',
        tip: '2.00',
        title: '午餐打包',
        date: '2024-04-10 12:00:12',
        deadline: '2024-04-10 13:00:00',
        finish_time: '2024-04-10 12:40:18',
        time_interval: '1小时内',
        remarks: '微辣，多加米饭',
        region: '学校',
        pickupAddress: '第一食堂 2楼',
        deliveryAddress: '图书馆 3楼自习室',
        contact: '李同学 13900139000',
        status: 'completed',
        statusText: '已完成',
        items: '黄焖鸡米饭 1份, 可乐 1瓶',
        baseFee: '6.00',
        extraFee: '2.00',
        orderNo: 'ST20240410120012',
        time: '2024-04-10 12:00',
        create_time: '2024-04-10 12:00:12',
        modify_time: '2024-04-10 12:40:18'
    },
    {
        id: 200003,
        user_id: 1003,
        rider_id: 2001,
        category: '代跑腿',
        fee: '8.00',
        tip: '5.00',
        title: '水果购买',
        date: '2024-04-10 15:30:44',
        deadline: '2024-04-10 17:30:00',
        finish_time: null,
        time_interval: '2小时内',
        remarks: '车厘子要新鲜的，橙子选大点的',
        region: '校外',
        pickupAddress: '校外 - 水果店',
        deliveryAddress: '学生宿舍 6栋 A404',
        contact: '王同学 13700137000',
        status: 'accepted',
        statusText: '进行中',
        items: '车厘子 2斤, 橙子 3个',
        baseFee: '8.00',
        extraFee: '5.00',
        orderNo: 'PT20240410153044',
        time: '2024-04-10 15:30',
        create_time: '2024-04-10 15:30:44',
        modify_time: '2024-04-10 15:40:22'
    },
    {
        id: 200004,
        user_id: 1004,
        rider_id: 2001,
        category: '快递代取',
        fee: '4.00',
        tip: '1.00',
        title: '京东快递取书',
        date: '2024-04-10 16:20:33',
        deadline: '2024-04-10 18:20:00',
        finish_time: '2024-04-10 17:15:42',
        time_interval: '2小时内',
        remarks: '三本教材，不要淋湿',
        region: '学校',
        pickupAddress: '京东快递站点',
        deliveryAddress: '教学楼 A栋 201',
        contact: '赵同学 13600136000',
        status: 'completed',
        statusText: '已完成',
        items: '图书 3本',
        baseFee: '4.00',
        extraFee: '1.00',
        orderNo: 'KD20240410162033',
        time: '2024-04-10 16:20',
        create_time: '2024-04-10 16:20:33',
        modify_time: '2024-04-10 17:15:42'
    }
])

// 根据当前选中的标签筛选订单
const filteredOrders = computed(() => {
    switch (currentTab.value) {
        case 1: // 进行中
            return orderList.value.filter(order => order.status === 'accepted')
        case 2: // 已完成
            return orderList.value.filter(order => order.status === 'completed')
        default: // 全部
            return orderList.value
    }
})

// 更新标签页数量
const updateTabCounts = () => {
    const counts = {
        all: orderList.value.length,
        active: orderList.value.filter(order => order.status === 'accepted').length,
        completed: orderList.value.filter(order => order.status === 'completed').length
    }
    
    tabs[0].count = counts.all
    tabs[1].count = counts.active
    tabs[2].count = counts.completed
}

// 切换标签页
const switchTab = (index) => {
    currentTab.value = index
    // 切换标签时显示加载动画
    uni.showLoading({
        title: '加载中'
    })
    setTimeout(() => {
        uni.hideLoading()
    }, 500)
}

// 下拉刷新
const onRefresh = () => {
    isRefreshing.value = true
    setTimeout(() => {
        updateTabCounts() // 刷新时更新数量统计
        isRefreshing.value = false
        uni.showToast({
            title: '刷新成功',
            icon: 'success'
        })
    }, 1000)
}

// 初始化
updateTabCounts()

const getOrderIcon = (type) => {
    switch (type) {
        case '快递代取':
            return 'paperplane'
        case '食堂打饭':
            return 'shop'
        case '代跑腿':
            return 'person-filled'
        default:
            return 'bars'
    }
}

const completeOrder = (order) => {
    uni.showModal({
        title: '完成订单',
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

const contactService = (order) => {
    uni.showModal({
        title: '联系客服',
        content: '是否进入在线客服聊天？',
        success: (res) => {
            if (res.confirm) {
                // 跳转到在线客服聊天页面
                uni.navigateTo({
                    url: `/pages/my/function/myAcceptPage/chat?orderNo=${order.orderNo}`,
                    success: () => {
                        console.log('跳转到客服聊天页面成功')
                    },
                    fail: (err) => {
                        console.error('跳转到客服聊天页面失败：', err)
                        uni.showToast({
                            title: '跳转失败，请重试',
                            icon: 'none'
                        })
                    }
                })
            }
        }
    })
}

const goToAccept = () => {
    // 检查用户是否已登录
    const token = uni.getStorageSync('token')
    // if (!token) {
    //     uni.showToast({
    //         title: '请先登录',
    //         icon: 'none'
    //     })
    //     setTimeout(() => {
    //         uni.switchTab({
    //             url: '/pages/my/my'
    //         })
    //     }, 1500)
    //     return
    // }

    // 检查用户是否已完成实名认证
    // const userInfo = uni.getStorageSync('userInfo')
    // if (!userInfo?.isVerified) {
    //     uni.showModal({
    //         title: '提示',
    //         content: '接单需要完成实名认证，是否前往认证？',
    //         success: (res) => {
    //             if (res.confirm) {
    //                 uni.switchTab({
    //                     url: '/pages/my/my'
    //                 })
    //             }
    //         }
    //     })
    //     return
    // }

    // 跳转到接单大厅
    uni.navigateTo({
        url: '/pages/index_campusErrand/index_campusErrand',//跳转购买页面
        success: () => {
            uni.showToast({
                title: '欢迎来到接单大厅',
                icon: 'none'
            })
        },
        fail: (err) => {
            console.error('跳转失败：', err)
            uni.showToast({
                title: '跳转失败，请重试',
                icon: 'none'
            })
        }
    })
}
</script>

<style>
.accept {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f8f9fa;
}

.header {
    background-color: #fff;
    padding: 10rpx 0;
    box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.tabs {
    display: flex;
    padding: 0 30rpx;
}

.tab-item {
    flex: 1;
    text-align: center;
    padding: 20rpx 0;
    font-size: 28rpx;
    color: #666;
    position: relative;
}

.tab-count {
    font-size: 24rpx;
    color: #999;
    margin-left: 4rpx;
}

.tab-item.active {
    color: #2196f3;
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
    background-color: #2196f3;
    border-radius: 2rpx;
}

.content {
    flex: 1;
    padding: 30rpx;
}

.empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding-top: 200rpx;
}

.empty-img {
    width: 240rpx;
    height: 240rpx;
    margin-bottom: 30rpx;
}

.empty-text {
    font-size: 28rpx;
    color: #999;
}

.order-list {
    padding-bottom: 120rpx;
}

.order-item {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
}

.order-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30rpx;
}

.order-type {
    display: flex;
    align-items: center;
    gap: 12rpx;
    font-size: 32rpx;
    font-weight: 500;
    color: #333;
}

.order-status {
    font-size: 28rpx;
    padding: 4rpx 16rpx;
    border-radius: 24rpx;
}

.order-status.accepted {
    color: #2196f3;
    background-color: rgba(33, 150, 243, 0.1);
}

.order-status.completed {
    color: #4caf50;
    background-color: rgba(76, 175, 80, 0.1);
}

.order-content {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
}

.info-row {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}

.info-item {
    display: flex;
    flex-direction: column;
    gap: 8rpx;
}

.info-item.location {
    position: relative;
    padding-left: 40rpx;
}

.info-item.location::before {
    content: '';
    position: absolute;
    left: 8rpx;
    top: 8rpx;
    width: 16rpx;
    height: 16rpx;
    border-radius: 50%;
    background-color: #2196f3;
}

.info-item.location:last-child::before {
    background-color: #4caf50;
}

.label {
    font-size: 24rpx;
    color: #999;
}

.value {
    font-size: 28rpx;
    color: #333;
}

.fee-section {
    background-color: #f8f9fa;
    border-radius: 12rpx;
    padding: 20rpx;
}

.fee-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26rpx;
    color: #666;
    margin-bottom: 12rpx;
}

.fee-item:last-child {
    margin-bottom: 0;
}

.fee-item.total {
    margin-top: 16rpx;
    padding-top: 16rpx;
    border-top: 2rpx solid #eee;
    font-weight: 500;
    color: #333;
}

.fee {
    font-weight: 500;
    color: #333;
}

.fee.highlight {
    color: #ff9800;
}

.order-footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 30rpx;
    padding-top: 30rpx;
    border-top: 2rpx solid #f5f5f5;
    gap: 20rpx;
}

.btn {
    font-size: 28rpx;
    padding: 12rpx 32rpx;
    border-radius: 32rpx;
}

.btn.primary {
    background-color: #2196f3;
    color: #fff;
}

.btn.service {
    background-color: #ff9800;
    color: #fff;
}

.float-btn {
    position: fixed;
    right: 40rpx;
    bottom: 60rpx;
    background: linear-gradient(135deg, #2196f3, #1976d2);
    color: #fff;
    border-radius: 36rpx;
    padding: 20rpx 32rpx;
    display: flex;
    align-items: center;
    gap: 12rpx;
    box-shadow: 0 4rpx 16rpx rgba(33, 150, 243, 0.3);
}

.btn-text {
    font-size: 28rpx;
}
</style> 