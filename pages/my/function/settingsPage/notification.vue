<template>
    <view class="settings-page">
        <!-- 通知总开关 -->
        <view class="info-card">
            <view class="card-header">
                <uni-icons type="notification" size="20" color="#e67e22"></uni-icons>
                <text class="header-title">通知管理</text>
            </view>
            <view class="list-item">
                <view class="item-left">
                    <text class="item-label">接收通知</text>
                    <text class="item-desc">关闭后将不会收到任何通知</text>
                </view>
                <switch :checked="notificationEnabled" @change="toggleNotification" color="#3498db" />
            </view>
        </view>

        <!-- 通知类型设置 -->
        <view class="settings-list" v-show="notificationEnabled">
            <view class="list-header">
                <uni-icons type="list" size="20" color="#3498db"></uni-icons>
                <text class="header-title">通知类型</text>
            </view>
            
            <view class="list-item">
                <view class="item-left">
                    <text class="item-label">订单通知</text>
                    <text class="item-desc">新订单、订单状态变更提醒</text>
                </view>
                <switch :checked="orderNotice" @change="toggleOrderNotice" color="#3498db" />
            </view>

            <view class="list-item">
                <view class="item-left">
                    <text class="item-label">系统通知</text>
                    <text class="item-desc">系统维护、版本更新提醒</text>
                </view>
                <switch :checked="systemNotice" @change="toggleSystemNotice" color="#3498db" />
            </view>

            <view class="list-item">
                <view class="item-left">
                    <text class="item-label">活动通知</text>
                    <text class="item-desc">优惠活动、新功能提醒</text>
                </view>
                <switch :checked="activityNotice" @change="toggleActivityNotice" color="#3498db" />
            </view>
        </view>

        <!-- 提醒方式设置 -->
        <view class="settings-list" v-show="notificationEnabled">
            <view class="list-header">
                <uni-icons type="sound" size="20" color="#2ecc71"></uni-icons>
                <text class="header-title">提醒方式</text>
            </view>
            
            <view class="list-item">
                <view class="item-left">
                    <text class="item-label">声音提醒</text>
                    <text class="item-desc">收到通知时播放提示音</text>
                </view>
                <switch :checked="soundEnabled" @change="toggleSound" color="#3498db" />
            </view>

            <view class="list-item">
                <view class="item-left">
                    <text class="item-label">震动提醒</text>
                    <text class="item-desc">收到通知时手机震动</text>
                </view>
                <switch :checked="vibrationEnabled" @change="toggleVibration" color="#3498db" />
            </view>
        </view>

        <!-- 提示信息 -->
        <view class="security-tips" v-show="!notificationEnabled">
            <uni-icons type="info" size="14" color="#e67e22"></uni-icons>
            <text class="tips-text">通知功能已关闭，您可能会错过重要信息</text>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const notificationEnabled = ref(true)
const orderNotice = ref(true)
const systemNotice = ref(true)
const activityNotice = ref(true)
const soundEnabled = ref(true)
const vibrationEnabled = ref(true)

const showToast = (title, type = 'none') => {
    uni.showToast({
        title,
        icon: type,
        duration: 2000
    })
}

const toggleNotification = (e) => {
    notificationEnabled.value = e.detail.value
    showToast(notificationEnabled.value ? '已开启通知' : '已关闭通知')
}

const toggleOrderNotice = (e) => {
    orderNotice.value = e.detail.value
    showToast(orderNotice.value ? '已开启订单通知' : '已关闭订单通知')
}

const toggleSystemNotice = (e) => {
    systemNotice.value = e.detail.value
    showToast(systemNotice.value ? '已开启系统通知' : '已关闭系统通知')
}

const toggleActivityNotice = (e) => {
    activityNotice.value = e.detail.value
    showToast(activityNotice.value ? '已开启活动通知' : '已关闭活动通知')
}

const toggleSound = (e) => {
    soundEnabled.value = e.detail.value
    showToast(soundEnabled.value ? '已开启声音提醒' : '已关闭声音提醒')
    // 测试声音
    if (soundEnabled.value) {
        uni.vibrateShort({
            success: function () {
                console.log('声音测试成功')
            }
        })
    }
}

const toggleVibration = (e) => {
    vibrationEnabled.value = e.detail.value
    showToast(vibrationEnabled.value ? '已开启震动提醒' : '已关闭震动提醒')
    // 测试震动
    if (vibrationEnabled.value) {
        uni.vibrateShort({
            success: function () {
                console.log('震动测试成功')
            }
        })
    }
}
</script>

<style>
.settings-page {
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 20rpx;
}

.info-card, .settings-list {
    background-color: #fff;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
    overflow: hidden;
    transform: translateZ(0);
}

.card-header, .list-header {
    display: flex;
    align-items: center;
    gap: 16rpx;
    padding: 24rpx 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    background: linear-gradient(to right, #f8f9fa, #fff);
}

.header-title {
    font-size: 28rpx;
    color: #2c3e50;
    font-weight: 600;
    text-transform: none;
}

.list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    transition: background-color 0.3s ease;
}

.list-item:last-child {
    border-bottom: none;
}

.list-item:active {
    background-color: #f8f9fa;
}

.item-left {
    display: flex;
    flex-direction: column;
    gap: 8rpx;
}

.item-label {
    font-size: 28rpx;
    color: #2c3e50;
    font-weight: 500;
}

.item-desc {
    font-size: 24rpx;
    color: #95a5a6;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
}

.security-tips {
    display: flex;
    align-items: center;
    gap: 12rpx;
    margin: 30rpx 20rpx;
    padding: 20rpx;
    background-color: rgba(230,126,34,0.1);
    border-radius: 12rpx;
    transform: translateZ(0);
}

.tips-text {
    font-size: 24rpx;
    color: #e67e22;
    line-height: 1.5;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
}

/* 添加switch样式优化 */
switch {
    transform: scale(0.9);
}

switch::before {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif;
}
</style>
