<template>
    <view class="about">
        <view class="logo-section">
            <image class="logo" src="/static/logo.png" mode="aspectFit"></image>
            <text class="app-name">校园跑腿</text>
            <text class="version">Version 1.0.0</text>
        </view>

        <view class="info-section">
            <view class="info-item" @click="copyAppId">
                <text class="item-label">应用ID</text>
                <text class="item-value">wx123456789</text>
            </view>
            <view class="info-item">
                <text class="item-label">系统平台</text>
                <text class="item-value">{{systemInfo.platform}}</text>
            </view>
            <view class="info-item">
                <text class="item-label">系统版本</text>
                <text class="item-value">{{systemInfo.system}}</text>
            </view>
        </view>

        <view class="link-section">
            <view class="link-item" @click="navigateTo('/pages/about/privacy')">
                <text class="link-text">隐私政策</text>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
            <view class="link-item" @click="navigateTo('/pages/about/agreement')">
                <text class="link-text">用户协议</text>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
            <view class="link-item" @click="navigateTo('/pages/about/disclaimer')">
                <text class="link-text">免责声明</text>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
        </view>

        <view class="contact-section">
            <text class="contact-title">联系我们</text>
            <text class="contact-item">邮箱：support@example.com</text>
            <text class="contact-item">电话：400-123-4567</text>
            <text class="contact-item">地址：江苏省南京市浦口区南京信息工程大学</text>
        </view>

        <view class="copyright">
            <text class="copyright-text">Copyright © 2024 校园跑腿</text>
            <text class="copyright-text">All Rights Reserved</text>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const systemInfo = ref({
    platform: '',
    system: ''
})

onMounted(() => {
    const info = uni.getSystemInfoSync()
    systemInfo.value = {
        platform: info.platform,
        system: info.system
    }
})

const navigateTo = (url) => {
    uni.navigateTo({ url })
}

const copyAppId = () => {
    uni.setClipboardData({
        data: 'wx123456789',
        success: () => {
            uni.showToast({
                title: 'AppID已复制',
                icon: 'success'
            })
        }
    })
}
</script>

<style>
.about {
    min-height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
}

.logo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
}

.logo {
    width: 80px;
    height: 80px;
    margin-bottom: 15px;
}

.app-name {
    font-size: 20px;
    color: #333;
    font-weight: bold;
    margin-bottom: 5px;
}

.version {
    font-size: 14px;
    color: #999;
}

.info-section {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
}

.info-item:last-child {
    border-bottom: none;
}

.item-label {
    font-size: 14px;
    color: #333;
}

.item-value {
    font-size: 14px;
    color: #999;
}

.link-section {
    background-color: #fff;
    border-radius: 8px;
    margin-bottom: 15px;
}

.link-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #f0f0f0;
}

.link-item:last-child {
    border-bottom: none;
}

.link-text {
    font-size: 14px;
    color: #333;
}

.contact-section {
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.contact-title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
}

.contact-item {
    font-size: 14px;
    color: #666;
    margin-bottom: 5px;
    display: block;
}

.copyright {
    text-align: center;
    padding: 20px 0;
}

.copyright-text {
    font-size: 12px;
    color: #999;
    display: block;
    line-height: 1.6;
}
</style> 