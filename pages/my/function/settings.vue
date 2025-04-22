<template>
    <!-- 代写路径 如下-->
    <view class="settings">
        <view class="settings-group">
            <view class="settings-item" @click="navigateTo('/pages/my/function/settings/account')">
                <text class="item-label">账号与安全</text>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
            <view class="settings-item" @click="navigateTo('/pages/my/function/settings/notification')">
                <text class="item-label">消息通知</text>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
            <view class="settings-item">
                <text class="item-label">声音开关</text>
                <switch :checked="soundEnabled" @change="toggleSound" color="#3498db" />
            </view>
        </view>

        <view class="settings-group">
            <view class="settings-item" @click="navigateTo('/pages/my/function/settings/privacy')">
                <text class="item-label">隐私设置</text>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
            <view class="settings-item" @click="clearCache">
                <text class="item-label">清除缓存</text>
                <text class="cache-size">{{cacheSize}}</text>
            </view>
        </view>

        <view class="settings-group">
            <view class="settings-item" @click="checkUpdate">
                <text class="item-label">检查更新</text>
                <text class="version">当前版本 1.0.0</text>
            </view>
        </view>

        <button class="logout-btn" @click="logout">退出登录</button>
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
}

const clearCache = () => {
    uni.showModal({
        title: '提示',
        content: '确定要清除缓存吗？',
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
        title: '检查更新'
    })
    setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
            title: '已是最新版本',
            icon: 'none'
        })
    }, 1500)
}

const logout = () => {
    uni.showModal({
        title: '提示',
        content: '确定要退出登录吗？',
        success: (res) => {
            if (res.confirm) {
                uni.reLaunch({
                    url: '/pages/login/login'
                })
            }
        }
    })
}
</script>

<style>
.settings {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 10px;
}

.settings-group {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 10px;
}

.settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
}

.settings-item:last-child {
    border-bottom: none;
}

.item-label {
    font-size: 15px;
    color: #333;
}

.cache-size, .version {
    font-size: 14px;
    color: #999;
}

.logout-btn {
    width: 90%;
    height: 44px;
    background-color: #fff;
    color: #e74c3c;
    border-radius: 22px;
    font-size: 16px;
    margin: 30px auto;
}
</style> 