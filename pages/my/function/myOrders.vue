<template>
    <!-- 待完善 -->
    <view class="my-publish">
        <view class="tabs">
            <view v-for="(tab, index) in tabs" :key="index" :class="['tab-item', currentTab === index ? 'active' : '']"
                @click="switchTab(index)">
                <text>{{tab.name}}</text>
                <text class="tab-badge" v-if="tab.count > 0">{{tab.count}}</text>
            </view>
        </view>

        <scroll-view scroll-y="true" class="publish-list" refresher-enabled="true" :refresher-triggered="isRefreshing"
            @refresherrefresh="onRefresh">
            <view class="empty" v-if="filteredPublishList.length === 0">
                <image src="/static/logo.png" mode="aspectFit" class="empty-img"></image>
                <text class="empty-text">暂无发布记录</text>
            </view>

            <view class="publish-item" v-for="(item, idx) in filteredPublishList" :key="item.id">
                <view class="publish-header">
                    <view class="publish-type">
                        <text>{{item.type}}</text>
                    </view>
                    <text class="publish-status" :class="getStatusClass(item.status)">{{item.status}}</text>
                </view>

                <view class="publish-content">
                    <view class="info-row">
                        <text class="info-label">配送地点：</text>
                        <text class="info-value">{{item.location}}</text>
                    </view>
                    <view class="info-row">
                        <text class="info-label">联系方式：</text>
                        <text class="info-value">{{item.contact}}</text>
                    </view>
                    <view class="info-row">
                        <text class="info-label">委托内容：</text>
                        <text class="info-value">{{item.description}}</text>
                    </view>
                    <view class="info-row">
                        <text class="info-label">配送费用：</text>
                        <text class="fee-value">¥{{item.fee}}</text>
                    </view>
                    <view class="info-row" v-if="item.extraFee > 0">
                        <text class="info-label">追加金额：</text>
                        <text class="extra-fee-value">+¥{{item.extraFee}}</text>
                    </view>
                    <view class="info-row">
                        <text class="info-label">发布时间：</text>
                        <text class="info-value">{{item.time}}</text>
                    </view>
                </view>

                <view class="publish-actions">
                    <button class="action-btn" size="mini" v-if="item.status === '待接单'"
                        @click="cancelPublish(item.id)">取消发布</button>
                    <button class="action-btn" size="mini" v-if="item.status === '进行中'"
                        @click="contactRider(item.id)">联系骑手</button>
                    <button class="action-btn primary" size="mini" v-if="item.status === '待接单'"
                        @click="editPublish(item.id)">修改信息</button>
                    <button class="action-btn primary" size="mini" v-if="item.status === '待接单'"
                        @click="republish(item.id)">重新发布</button>
                </view>
            </view>
        </scroll-view>

        <view class="publish-btn" @click="goToPublish">
            <uni-icons type="plusempty" size="24" color="#fff"></uni-icons>
            <text>发布订单</text>
        </view>
    </view>
</template>

<script setup>
    import {
        ref,
        computed
    } from 'vue'

    const currentTab = ref(0)
    const isRefreshing = ref(false)

    // 发布列表数据
    const publishList = ref([{
            id: 'FB20240310001',
            type: '快递代取',
            status: '待接单',
            location: '第一教学楼',
            contact: '138****1234',
            description: '快递在菜鸟驿站，取件码12345',
            fee: '5.00',
            extraFee: '0.00',
            time: '2024-03-10 14:30'
        },
        {
            id: 'FB20240310002',
            type: '食堂打包',
            status: '进行中',
            location: '学生宿舍8栋',
            contact: '159****5678',
            description: '一食堂二楼麻辣烫，中辣，加葱花',
            fee: '8.00',
            extraFee: '2.00',
            time: '2024-03-10 12:00'
        },
        {
            id: 'FB20240309001',
            type: '校园跑腿',
            status: '已完成',
            location: '图书馆',
            contact: '186****9012',
            description: '去打印店打印论文30页并装订',
            fee: '10.00',
            extraFee: '0.00',
            time: '2024-03-09 16:30'
        },
        {
            id: 'FB20240309002',
            type: '快递代取',
            status: '已取消',
            location: '研究生宿舍楼',
            contact: '139****3456',
            description: '顺丰快递，大件需要搬运',
            fee: '6.00',
            extraFee: '3.00',
            time: '2024-03-09 09:15'
        },
        {
            id: 'FB20240308001',
            type: '食堂打包',
            status: '待接单',
            location: '行政楼',
            contact: '158****7890',
            description: '二食堂一楼水煮鱼套餐，不要辣',
            fee: '7.50',
            extraFee: '0.00',
            time: '2024-03-08 18:00'
        },
        {
            id: 'FB20240308002',
            type: '校园跑腿',
            status: '已完成',
            location: '体育馆',
            contact: '187****1234',
            description: '从超市购买水和零食送到体育馆',
            fee: '12.00',
            extraFee: '5.00',
            time: '2024-03-08 15:20'
        },
        {
            id: 'FB20240307001',
            type: '快递代取',
            status: '已取消',
            location: '实验楼',
            contact: '135****5678',
            description: '京东快递，小件，易碎物品',
            fee: '4.50',
            extraFee: '0.00',
            time: '2024-03-07 11:40'
        },
        {
            id: 'FB20240307002',
            type: '食堂打包',
            status: '已完成',
            location: '学生活动中心',
            contact: '156****9012',
            description: '三食堂二楼黄焖鸡米饭加一瓶可乐',
            fee: '9.00',
            extraFee: '1.50',
            time: '2024-03-07 10:30'
        }
    ])

    // 按当前标签筛选的发布列表
    const filteredPublishList = computed(() => {
        const allItems = publishList.value
        switch (currentTab.value) {
            case 0: // 全部
                return allItems
            case 1: // 待接单
                return allItems.filter(item => item.status === '待接单')
            case 2: // 进行中
                return allItems.filter(item => item.status === '进行中')
            case 3: // 已完成
                return allItems.filter(item => item.status === '已完成')
            case 4: // 已取消
                return allItems.filter(item => item.status === '已取消')
            default:
                return allItems
        }
    })

    // 标签页数据
    const tabs = computed(() => {
        const allItems = publishList.value
        return [{
                name: '全部',
                count: allItems.length
            },
            {
                name: '待接单',
                count: allItems.filter(item => item.status === '待接单').length
            },
            {
                name: '进行中',
                count: allItems.filter(item => item.status === '进行中').length
            },
            {
                name: '已完成',
                count: allItems.filter(item => item.status === '已完成').length
            },
            {
                name: '已取消',
                count: allItems.filter(item => item.status === '已取消').length
            }
        ]
    })

    // 获取状态对应的样式类
    const getStatusClass = (status) => {
        const statusMap = {
            '待接单': 'waiting',
            '进行中': 'processing',
            '已完成': 'completed',
            '已取消': 'cancelled'
        }
        return statusMap[status] || ''
    }

    const switchTab = (index) => {
        currentTab.value = index
    }

    const onRefresh = () => {
        isRefreshing.value = true
        // 模拟刷新数据
        setTimeout(() => {
            isRefreshing.value = false
            uni.showToast({
                title: '刷新成功',
                icon: 'success'
            })
        }, 1000)
    }

    // 取消发布
    const cancelPublish = (id) => {
        uni.showModal({
            title: '取消发布',
            content: '确定要取消该发布吗？取消后不可恢复',
            success: (res) => {
                if (res.confirm) {
                    uni.showLoading({
                        title: '处理中'
                    })
                    setTimeout(() => {
                        const item = publishList.value.find(i => i.id === id)
                        if (item) {
                            item.status = '已取消'
                        }
                        uni.hideLoading()
                        uni.showToast({
                            title: '已取消',
                            icon: 'success'
                        })
                    }, 1000)
                }
            }
        })
    }

    // 联系骑手
    const contactRider = (id) => {
        uni.showActionSheet({
            itemList: ['拨打电话', '发送消息'],
            success: (res) => {
                if (res.tapIndex === 0) {
                    uni.makePhoneCall({
                        phoneNumber: '10000000000'
                    })
                } else {
                    uni.navigateTo({
                        url: '/pages/my/function/OrdersPage/chat'
                    })
                }
            }
        })
    }

    // 修改发布信息
    const editPublish = (id) => {
        uni.navigateTo({
            url: `/pages/my/function/OrdersPage/edit?id=${id}`
        })
    }

    // 重新发布
    const republish = (id) => {
        uni.showLoading({
            title: '处理中'
        })
        setTimeout(() => {
            uni.hideLoading()
            uni.showToast({
                title: '发布成功',
                icon: 'success'
            })
        }, 1000)
    }

    // 前往发布页面
    const goToPublish = () => {
        uni.navigateTo({
            url: '/pages/my/function/OrdersPage/publish'
        })
    }
</script>

<style>
    .my-publish {
        display: flex;
        flex-direction: column;
        height: 100vh;
        background-color: #f8f9fa;
        position: relative;
    }

    .tabs {
        display: flex;
        background-color: #fff;
        padding: 20rpx 30rpx;
        border-bottom: 2rpx solid #f0f0f0;
        position: sticky;
        top: 0;
        z-index: 1;
        box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
    }

    .tab-item {
        flex: 1;
        text-align: center;
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8rpx;
    }

    .tab-item text {
        font-size: 28rpx;
        color: #666;
        transition: all 0.3s ease;
    }

    .tab-badge {
        font-size: 20rpx;
        color: #999;
        background-color: #f5f5f5;
        padding: 2rpx 12rpx;
        border-radius: 20rpx;
    }

    .tab-item.active text {
        color: #3498db;
        font-weight: 500;
    }

    .tab-item.active .tab-badge {
        background-color: rgba(52, 152, 219, 0.1);
        color: #3498db;
    }

    .tab-item.active::after {
        content: '';
        position: absolute;
        bottom: -20rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 40rpx;
        height: 4rpx;
        background-color: #3498db;
        border-radius: 2rpx;
    }

    .publish-list {
        flex: 1;
        height: calc(100vh - 100rpx);
        padding: 30rpx;
        box-sizing: border-box;
        padding-bottom: 150rpx;
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

    .publish-item {
        background-color: #fff;
        border-radius: 16rpx;
        margin-bottom: 30rpx;
        padding: 30rpx;
        box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.04);
    }

    .publish-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 30rpx;
    }

    .publish-type {
        display: flex;
        align-items: center;
    }

    .publish-type text {
        font-size: 32rpx;
        color: #333;
        font-weight: 500;
    }

    .publish-status {
        font-size: 28rpx;
        padding: 4rpx 16rpx;
        border-radius: 24rpx;
    }

    .publish-status.waiting {
        color: #e67e22;
        background-color: rgba(230, 126, 34, 0.1);
    }

    .publish-status.processing {
        color: #3498db;
        background-color: rgba(52, 152, 219, 0.1);
    }

    .publish-status.completed {
        color: #2ecc71;
        background-color: rgba(46, 204, 113, 0.1);
    }

    .publish-status.cancelled {
        color: #95a5a6;
        background-color: rgba(149, 165, 166, 0.1);
    }

    .publish-content {
        padding: 20rpx 0;
        border-top: 2rpx solid #f5f5f5;
        border-bottom: 2rpx solid #f5f5f5;
    }

    .info-row {
        display: flex;
        margin-bottom: 20rpx;
        font-size: 28rpx;
        align-items: center;
    }

    .info-row:last-child {
        margin-bottom: 0;
    }

    .info-label {
        color: #999;
        width: 160rpx;
        flex-shrink: 0;
    }

    .info-value {
        color: #333;
        flex: 1;
        line-height: 1.4;
    }

    .fee-value {
        color: #e74c3c;
        font-size: 32rpx;
        font-weight: bold;
    }

    .extra-fee-value {
        color: #e67e22;
        font-size: 30rpx;
        font-weight: bold;
    }

    .publish-actions {
        display: flex;
        justify-content: flex-end;
        gap: 20rpx;
        margin-top: 30rpx;
        flex-wrap: wrap;
    }

    .action-btn {
        font-size: 24rpx;
        padding: 0 30rpx;
        height: 60rpx;
        line-height: 60rpx;
        border-radius: 30rpx;
        background-color: #f8f9fa;
        color: #666;
        margin: 0;
    }

    .action-btn.primary {
        background-color: #3498db;
        color: #fff;
    }

    .action-btn:active {
        transform: scale(0.98);
    }

    .publish-btn {
        position: fixed;
        bottom: 60rpx;
        left: 50%;
        transform: translateX(-50%);
        width: 300rpx;
        height: 90rpx;
        background-color: #3498db;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 45rpx;
        box-shadow: 0 4rpx 16rpx rgba(52, 152, 219, 0.3);
        z-index: 2;
    }

    .publish-btn text {
        font-size: 30rpx;
        margin-left: 12rpx;
    }

    .publish-btn:active {
        transform: translateX(-50%) scale(0.98);
    }
</style>