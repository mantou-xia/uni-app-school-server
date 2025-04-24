<template>
    <view class="settings-page">
        <!-- 隐私保护设置 -->
        <view class="info-card">
            <view class="card-header">
                <uni-icons type="locked" size="20" color="#2ecc71"></uni-icons>
                <text class="header-title">隐私保护</text>
            </view>
            
            <view class="list-item">
                <view class="item-left">
                    <text class="item-label">个人信息保护</text>
                    <text class="item-desc">控制个人信息的可见范围</text>
                </view>
                <switch :checked="privacyEnabled" @change="togglePrivacy" color="#3498db" />
            </view>
        </view>

        <!-- 数据收集设置 -->
        <view class="settings-list">
            <view class="list-header">
                <uni-icons type="eye" size="20" color="#3498db"></uni-icons>
                <text class="header-title">数据收集</text>
            </view>
            
            <view class="list-item">
                <view class="item-left">
                    <text class="item-label">位置信息</text>
                    <text class="item-desc">用于提供更准确的配送服务</text>
                </view>
                <switch :checked="locationEnabled" @change="toggleLocation" color="#3498db" />
            </view>

            <view class="list-item">
                <view class="item-left">
                    <text class="item-label">使用统计</text>
                    <text class="item-desc">帮助改进产品体验</text>
                </view>
                <switch :checked="analyticsEnabled" @change="toggleAnalytics" color="#3498db" />
            </view>

            <view class="list-item">
                <view class="item-left">
                    <text class="item-label">个性化推荐</text>
                    <text class="item-desc">基于使用习惯进行内容推荐</text>
                </view>
                <switch :checked="personalizationEnabled" @change="togglePersonalization" color="#3498db" />
            </view>
        </view>

        <!-- 数据管理 -->
        <view class="settings-list">
            <view class="list-header">
                <uni-icons type="gear" size="20" color="#9b59b6"></uni-icons>
                <text class="header-title">数据管理</text>
            </view>
            
            <view class="list-item" @click="handleExportData">
                <view class="item-left">
                    <text class="item-label">导出个人数据</text>
                    <text class="item-desc">下载您的个人数据副本</text>
                </view>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>

            <view class="list-item" @click="handleDeleteData">
                <view class="item-left">
                    <text class="item-label">删除账号数据</text>
                    <text class="item-desc">永久删除您的账号及相关数据</text>
                </view>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
        </view>

        <!-- 隐私政策链接 -->
        <view class="privacy-link" @click="viewPrivacyPolicy">
            <uni-icons type="help" size="14" color="#3498db"></uni-icons>
            <text class="link-text">查看完整隐私政策</text>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const privacyEnabled = ref(true)
const locationEnabled = ref(true)
const analyticsEnabled = ref(true)
const personalizationEnabled = ref(true)

const showToast = (title, type = 'none') => {
    uni.showToast({
        title,
        icon: type,
        duration: 2000
    })
}

const showModal = (title, content, confirmColor = '#3498db', success) => {
    uni.showModal({
        title,
        content,
        confirmColor,
        success
    })
}

const togglePrivacy = (e) => {
    privacyEnabled.value = e.detail.value
    showToast(privacyEnabled.value ? '已开启个人信息保护' : '已关闭个人信息保护')
}

const toggleLocation = (e) => {
    locationEnabled.value = e.detail.value
    if (locationEnabled.value) {
        uni.authorize({
            scope: 'scope.userLocation',
            success: () => {
                showToast('位置权限已开启', 'success')
            },
            fail: () => {
                locationEnabled.value = false
                showModal(
                    '开启位置权限',
                    '需要在系统设置中开启位置权限，是否前往设置？',
                    '#3498db',
                    (res) => {
                        if (res.confirm) {
                            uni.openSetting()
                        }
                    }
                )
            }
        })
    } else {
        showToast('已关闭位置权限')
    }
}

const toggleAnalytics = (e) => {
    analyticsEnabled.value = e.detail.value
    showToast(analyticsEnabled.value ? '已开启使用统计' : '已关闭使用统计')
}

const togglePersonalization = (e) => {
    personalizationEnabled.value = e.detail.value
    showToast(personalizationEnabled.value ? '已开启个性化推荐' : '已关闭个性化推荐')
}

const handleExportData = () => {
    showModal(
        '导出个人数据',
        '我们将为您生成个人数据副本，文件生成后将发送到您的邮箱，是否继续？',
        '#3498db',
        (res) => {
            if (res.confirm) {
                uni.showLoading({
                    title: '正在准备数据'
                })
                setTimeout(() => {
                    uni.hideLoading()
                    showToast('数据导出申请已提交，请注意查收邮件', 'success')
                }, 2000)
            }
        }
    )
}

const handleDeleteData = () => {
    showModal(
        '删除账号',
        '此操作将永久删除您的账号及所有相关数据，且无法恢复。删除前请确保已备份重要信息。',
        '#e74c3c',
        (res) => {
            if (res.confirm) {
                showModal(
                    '二次确认',
                    '请再次确认是否删除账号？删除后将无法找回任何数据。',
                    '#e74c3c',
                    (res) => {
                        if (res.confirm) {
                            uni.showLoading({
                                title: '正在处理'
                            })
                            setTimeout(() => {
                                uni.hideLoading()
                                showToast('账号已删除', 'success')
                                setTimeout(() => {
                                    uni.reLaunch({
                                        url: '/pages/index/index'
                                    })
                                }, 1500)
                            }, 2000)
                        }
                    }
                )
            }
        }
    )
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
    transition: all 0.3s ease;
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

.privacy-link {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8rpx;
    margin: 40rpx 0;
    padding: 20rpx;
    transition: opacity 0.3s ease;
}

.privacy-link:active {
    opacity: 0.7;
}

.link-text {
    font-size: 26rpx;
    color: #3498db;
    text-decoration: underline;
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
