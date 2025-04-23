<template>
    <view class="settings">
        <view class="settings-group">
            <view class="settings-item" @click="navigateTo('/pages/my/function/settingsPage/notification')">
                <view class="item-left">
                    <uni-icons type="notification" size="20" color="#e67e22"></uni-icons>
                    <text class="item-label">消息通知</text>
                </view>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
            <view class="settings-item">
                <view class="item-left">
                    <uni-icons type="sound" size="20" color="#9b59b6"></uni-icons>
                    <text class="item-label">声音开关</text>
                </view>
                <switch :checked="soundEnabled" @change="toggleSound" color="#3498db" />
            </view>
        </view>

        <view class="settings-group">
            <view class="settings-item" @click="navigateTo('/pages/my/function/settingsPage/privacy')">
                <view class="item-left">
                    <uni-icons type="locked" size="20" color="#2ecc71"></uni-icons>
                    <text class="item-label">隐私设置</text>
                </view>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
            <view class="settings-item" @click="clearCache">
                <view class="item-left">
                    <uni-icons type="trash" size="20" color="#e74c3c"></uni-icons>
                    <text class="item-label">清除缓存</text>
                </view>
                <text class="cache-size">{{cacheSize}}</text>
            </view>
        </view>

        <view class="settings-group">
            <view class="settings-item" @click="checkUpdate">
                <view class="item-left">
                    <uni-icons type="refresh" size="20" color="#1abc9c"></uni-icons>
                    <text class="item-label">检查更新</text>
                </view>
                <text class="version">当前版本 1.0.0</text>
            </view>
        </view>

        <button class="logout-btn" @click="logout">
            <text>退出登录</text>
        </button>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const soundEnabled = ref(true)
const cacheSize = ref('23.5MB')

const navigateTo = (url) => {
    uni.navigateTo({ url })
}

const toggleSound = (e) => {
    soundEnabled.value = e.detail.value
    uni.showToast({
        title: soundEnabled.value ? '声音已开启' : '声音已关闭',
        icon: 'none'
    })
}

const clearCache = () => {
    uni.showModal({
        title: '清除缓存',
        content: '确定要清除缓存数据吗？清除后将无法恢复',
        confirmColor: '#3498db',
        success: (res) => {
            if (res.confirm) {
                uni.showLoading({
                    title: '清理中'
                })
                setTimeout(() => {
                    uni.hideLoading()
                    uni.showToast({
                        title: '清理完成',
                        icon: 'success'
                    })
                    cacheSize.value = '0B'
                }, 1500)
            }
        }
    })
}

const checkUpdate = () => {
    uni.showLoading({
        title: '检查更新中'
    })
    setTimeout(() => {
        uni.hideLoading()
        uni.showModal({
            title: '版本信息',
            content: '当前已是最新版本 1.0.0',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#3498db'
        })
    }, 1500)
}

const logout = () => {
    uni.showModal({
        title: '退出登录',
        content: '确定要退出当前账号吗？',
        confirmColor: '#e74c3c',
        success: (res) => {
            if (res.confirm) {
                uni.showLoading({
                    title: '退出中'
                })
                setTimeout(() => {
                    uni.hideLoading()
                    uni.reLaunch({
                        url: '/pages/index/index'
                    })
                }, 1000)
            }
        }
    })
}
</script>

<style>
.settings {
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 20rpx;
}

.settings-group {
    background-color: #fff;
    border-radius: 16rpx;
    margin-bottom: 20rpx;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
}

.settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    border-bottom: 1rpx solid #f0f0f0;
    transition: all 0.3s ease;
}

.settings-item:active {
    background-color: #f8f9fa;
}

.settings-item:last-child {
    border-bottom: none;
}

.item-left {
    display: flex;
    align-items: center;
    gap: 20rpx;
}

.item-label {
    font-size: 28rpx;
    color: #2c3e50;
    font-weight: 500;
}

.cache-size, .version {
    font-size: 26rpx;
    color: #95a5a6;
}

.logout-btn {
    width: 90%;
    height: 88rpx;
    line-height: 88rpx;
    background: linear-gradient(135deg, #ff6b6b, #e74c3c);
    color: #fff;
    border-radius: 44rpx;
    font-size: 32rpx;
    margin: 60rpx auto;
    font-weight: 500;
    letter-spacing: 2rpx;
    box-shadow: 0 4rpx 12rpx rgba(231,76,60,0.2);
    transition: all 0.3s ease;
}

.logout-btn:active {
    transform: scale(0.98);
    box-shadow: 0 2rpx 8rpx rgba(231,76,60,0.15);
}
</style> 