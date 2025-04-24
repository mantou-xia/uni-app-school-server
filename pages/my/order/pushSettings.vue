<template>
    <view class="push-settings">
        <!-- 顶部状态卡片 -->
        <view class="status-card" :class="{ 'status-active': isAvailable }">
            <view class="status-header">
                <view class="status-info">
                    <text class="status-title">{{ isAvailable ? '正在接单中' : '已暂停接单' }}</text>
                    <text class="status-desc">{{ isAvailable ? '您可以正常接收订单' : '暂时无法接收新订单' }}</text>
                </view>
                <switch :checked="isAvailable" @change="toggleAvailable" color="#3cc51f" />
            </view>
            <view class="status-stats">
                <view class="stat-item">
                    <text class="stat-value">{{ todayOrders }}</text>
                    <text class="stat-label">今日接单</text>
                </view>
                <view class="stat-item">
                    <text class="stat-value">{{ totalEarnings }}</text>
                    <text class="stat-label">今日收入</text>
                </view>
                <view class="stat-item">
                    <text class="stat-value">{{ onlineHours }}h</text>
                    <text class="stat-label">在线时长</text>
                </view>
            </view>
        </view>

        <!-- 设置卡片 -->
        <view class="settings-card">
            <view class="card-title">
                <text class="title-text">接单设置</text>
                <text class="title-desc">合理设置可提高接单效率</text>
            </view>
            
            <!-- 接单范围设置 -->
            <view class="settings-item">
                <view class="item-header">
                    <text class="item-label">接单范围</text>
                    <text class="item-value">{{orderRange}}km</text>
                </view>
                <slider 
                    :value="orderRange" 
                    :min="1" 
                    :max="5" 
                    :step="0.5" 
                    @change="changeRange" 
                    show-value
                    :activeColor="'#3cc51f'"
                    :backgroundColor="'#e8e8e8'"
                    :blockSize="24"
                />
                <view class="range-tips">
                    <text>1km</text>
                    <text>建议: 2-3km</text>
                    <text>5km</text>
                </view>
            </view>
            
            <!-- 订单类型设置 -->
            <view class="settings-item">
                <view class="item-header">
                    <text class="item-label">订单类型</text>
                    <text class="selected-count">已选 {{selectedTypeCount}}/{{orderTypes.length}}</text>
                </view>
                <view class="type-grid">
                    <view 
                        v-for="(type, index) in orderTypes" 
                        :key="index"
                        :class="['type-item', type.selected ? 'selected' : '']"
                        @click="toggleType(index)"
                    >
                        <view class="type-icon" :class="type.selected ? 'selected' : ''">
                            <uni-icons :type="type.icon" size="30" :color="type.selected ? '#3cc51f' : '#666'"></uni-icons>
                        </view>
                        <view class="type-info">
                            <text class="type-name">{{type.name}}</text>
                            <text class="type-desc">{{type.desc}}</text>
                        </view>
                        <text class="type-tag" v-if="type.tag">{{type.tag}}</text>
                    </view>
                </view>
            </view>

            <!-- 时间段设置 -->
            <view class="settings-item">
                <view class="item-header">
                    <text class="item-label">接单时段</text>
                    <text class="time-status">{{ isCustomTime ? '自定义' : '全天' }}</text>
                </view>
                <view class="time-slots">
                    <view 
                        v-for="(slot, index) in timeSlots" 
                        :key="index"
                        :class="['time-slot', slot.active ? 'active' : '']"
                        @click="toggleTimeSlot(index)"
                    >
                        {{slot.time}}
                    </view>
                </view>
            </view>
        </view>

        <!-- 提示卡片 -->
        <view class="notice-card">
            <view class="notice-header">
                <text class="notice-icon">📢</text>
                <text class="notice-title">温馨提示</text>
            </view>
            <view class="notice-list">
                <view class="notice-item" v-for="(tip, index) in noticeTips" :key="index">
                    <text class="notice-dot"></text>
                    <text class="notice-text">{{tip}}</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            isAvailable: true,
            orderRange: 3,
            isCustomTime: false,
            todayOrders: 12,
            totalEarnings: '58.50',
            onlineHours: 4.5,
            orderTypes: [
                { 
                    name: '快递代取', 
                    desc: '校内各快递点取件',
                    selected: true,
                    icon: 'gift',
                    tag: '热门'
                },
                { 
                    name: '食堂打包', 
                    desc: '校内食堂餐品打包',
                    selected: true,
                    icon: 'shop'
                },
                { 
                    name: '超市代购', 
                    desc: '校内超市商品代购',
                    selected: false,
                    icon: 'cart'
                },
                { 
                    name: '文印服务', 
                    desc: '文档打印装订等',
                    selected: false,
                    icon: 'paperplane',
                    tag: '新增'
                }
            ],
            timeSlots: [
                { time: '早市 6:00-10:00', active: true },
                { time: '午市 10:00-14:00', active: true },
                { time: '下午 14:00-17:00', active: true },
                { time: '晚市 17:00-22:00', active: true }
            ],
            noticeTips: [
                '关闭接单状态后将不再收到新订单推送',
                '接单范围建议设置在2-3公里以获得更好的接单体验',
                '可以选择多个订单类型，增加接单机会',
                '建议根据自己的时间合理设置接单时段'
            ]
        }
    },
    computed: {
        selectedTypeCount() {
            return this.orderTypes.filter(type => type.selected).length
        }
    },
    methods: {
        toggleAvailable(e) {
            this.isAvailable = e.detail.value
            // 可以添加状态切换的提示
            uni.showToast({
                title: this.isAvailable ? '已开启接单' : '已暂停接单',
                icon: 'none'
            })
        },
        changeRange(e) {
            this.orderRange = e.detail.value
        },
        toggleType(index) {
            this.orderTypes[index].selected = !this.orderTypes[index].selected
        },
        toggleTimeSlot(index) {
            this.timeSlots[index].active = !this.timeSlots[index].active
            this.isCustomTime = !this.timeSlots.every(slot => slot.active)
        }
    }
}
</script>

<style>
.push-settings {
    padding: 30rpx;
    background-color: #f8f9fa;
    min-height: 100vh;
}

.status-card {
    background: linear-gradient(to right, #ff6b6b, #ff8787);
    border-radius: 24rpx;
    padding: 40rpx 30rpx;
    color: #fff;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(255, 107, 107, 0.2);
}

.status-card.status-active {
    background: linear-gradient(to right, #3cc51f, #4cd964);
    box-shadow: 0 4rpx 20rpx rgba(60, 197, 31, 0.2);
}

.status-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40rpx;
}

.status-title {
    font-size: 36rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
    display: block;
}

.status-desc {
    font-size: 24rpx;
    opacity: 0.9;
}

.status-stats {
    display: flex;
    justify-content: space-between;
    border-top: 2rpx solid rgba(255, 255, 255, 0.2);
    padding-top: 30rpx;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-value {
    font-size: 32rpx;
    font-weight: bold;
    margin-bottom: 8rpx;
}

.stat-label {
    font-size: 24rpx;
    opacity: 0.9;
}

.settings-card {
    background-color: #ffffff;
    border-radius: 24rpx;
    padding: 40rpx 30rpx;
    margin-bottom: 30rpx;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.05);
}

.card-title {
    margin-bottom: 40rpx;
}

.title-text {
    font-size: 32rpx;
    font-weight: bold;
    color: #333;
    margin-bottom: 8rpx;
    display: block;
}

.title-desc {
    font-size: 24rpx;
    color: #999;
}

.settings-item {
    margin-bottom: 40rpx;
}

.settings-item:last-child {
    margin-bottom: 0;
}

.item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rpx;
}

.item-label {
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
}

.item-value {
    font-size: 28rpx;
    color: #3cc51f;
    font-weight: bold;
}

.selected-count {
    font-size: 24rpx;
    color: #999;
}

.range-tips {
    display: flex;
    justify-content: space-between;
    font-size: 24rpx;
    color: #999;
    margin-top: 10rpx;
}

.type-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
}

.type-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 20rpx;
    background-color: #f8f9fa;
    border-radius: 16rpx;
    transition: all 0.3s;
}

.type-item.selected {
    background-color: #e8f5e9;
    border: 2rpx solid #3cc51f;
}

.type-icon {
    width: 80rpx;
    height: 80rpx;
    background: rgba(0,0,0,0.04);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20rpx;
    transition: all 0.3s;
}

.type-icon.selected {
    background: rgba(60,197,31,0.1);
}

.type-info {
    flex: 1;
}

.type-name {
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
    margin-bottom: 4rpx;
    display: block;
}

.type-desc {
    font-size: 24rpx;
    color: #999;
}

.type-tag {
    position: absolute;
    top: -10rpx;
    right: -10rpx;
    background: #ff6b6b;
    color: #fff;
    font-size: 20rpx;
    padding: 4rpx 12rpx;
    border-radius: 20rpx;
}

.time-slots {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20rpx;
}

.time-slot {
    padding: 20rpx;
    text-align: center;
    background: #f8f9fa;
    border-radius: 16rpx;
    font-size: 24rpx;
    color: #666;
    transition: all 0.3s;
}

.time-slot.active {
    background: #e8f5e9;
    color: #3cc51f;
}

.time-status {
    font-size: 24rpx;
    color: #3cc51f;
}

.notice-card {
    background-color: #fff8e1;
    border-radius: 24rpx;
    padding: 30rpx;
}

.notice-header {
    display: flex;
    align-items: center;
    margin-bottom: 20rpx;
}

.notice-icon {
    font-size: 36rpx;
    margin-right: 10rpx;
}

.notice-title {
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
}

.notice-list {
    display: flex;
    flex-direction: column;
    gap: 16rpx;
}

.notice-item {
    display: flex;
    align-items: flex-start;
}

.notice-dot {
    width: 12rpx;
    height: 12rpx;
    background: #ffd54f;
    border-radius: 50%;
    margin: 12rpx 16rpx 0 0;
}

.notice-text {
    flex: 1;
    font-size: 24rpx;
    color: #666;
    line-height: 1.6;
}
</style> 