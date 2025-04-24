<template>
    <view class="agreement-page">
        <!-- 顶部标题 -->
        <view class="header">
            <text class="title">骑手服务协议</text>
            <text class="subtitle">请仔细阅读以下协议内容</text>
        </view>

        <!-- 协议内容 -->
        <scroll-view scroll-y="true" class="content">
            <!-- 前言 -->
            <view class="section">
                <view class="section-title">前言</view>
                <view class="section-content">
                    欢迎您成为校园跑骑手！在您开始使用校园跑骑手服务之前，请您务必仔细阅读并充分理解本协议的所有内容。
                </view>
            </view>

            <!-- 定义 -->
            <view class="section">
                <view class="section-title">一、定义</view>
                <view class="section-content">
                    <view class="item">1.1 校园跑骑手：指通过本平台提供校园内配送服务的注册用户。</view>
                    <view class="item">1.2 配送服务：指在校园内进行的快递代取、食堂打包、超市代购等服务。</view>
                </view>
            </view>

            <!-- 骑手资格 -->
            <view class="section">
                <view class="section-title">二、骑手资格</view>
                <view class="section-content">
                    <view class="item">2.1 年满18周岁的在校学生。</view>
                    <view class="item">2.2 具有完全民事行为能力。</view>
                    <view class="item">2.3 身体健康，具备完成配送服务的能力。</view>
                    <view class="item">2.4 遵守校园规章制度，无不良记录。</view>
                </view>
            </view>

            <!-- 服务规范 -->
            <view class="section">
                <view class="section-title">三、服务规范</view>
                <view class="section-content">
                    <view class="item">3.1 准时取件和送达</view>
                    <view class="sub-item">- 在承诺的时间内完成配送任务</view>
                    <view class="sub-item">- 如遇特殊情况需及时告知用户</view>
                    
                    <view class="item">3.2 服务态度</view>
                    <view class="sub-item">- 保持礼貌友善的服务态度</view>
                    <view class="sub-item">- 着装整洁，举止得体</view>
                    
                    <view class="item">3.3 安全要求</view>
                    <view class="sub-item">- 严格遵守交通规则</view>
                    <view class="sub-item">- 确保物品安全完整</view>
                </view>
            </view>

            <!-- 收入与结算 -->
            <view class="section">
                <view class="section-title">四、收入与结算</view>
                <view class="section-content">
                    <view class="item">4.1 配送费用按照平台规则结算。</view>
                    <view class="item">4.2 收入将定期结算至骑手绑定的账户。</view>
                </view>
            </view>

            <!-- 违约责任 -->
            <view class="section">
                <view class="section-title">五、违约责任</view>
                <view class="section-content">
                    <view class="item">5.1 出现违规行为将受到相应处罚。</view>
                    <view class="item">5.2 造成用户损失需承担赔偿责任。</view>
                </view>
            </view>

            <!-- 协议终止 -->
            <view class="section">
                <view class="section-title">六、协议终止</view>
                <view class="section-content">
                    <view class="item">6.1 骑手可随时申请终止本协议。</view>
                    <view class="item">6.2 平台在特定情况下可终止协议。</view>
                </view>
            </view>
        </scroll-view>

        <!-- 底部按钮 -->
        <view class="footer">
            <button class="confirm-btn" @click="goBack">我已阅读并同意</button>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        goBack() {
            uni.navigateBack()
        }
    }
}
</script>

<style>
.agreement-page {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f8f9fa;
}

.header {
    background: linear-gradient(135deg, #34495e, #2c3e50);
    padding: 40rpx 30rpx;
    color: #fff;
    position: relative;
    overflow: hidden;
}

.header::after {
    content: '';
    position: absolute;
    right: -20rpx;
    top: -20rpx;
    width: 160rpx;
    height: 160rpx;
    background: rgba(255,255,255,0.1);
    border-radius: 50%;
}

.title {
    font-size: 40rpx;
    font-weight: 600;
    margin-bottom: 16rpx;
    display: block;
    letter-spacing: 2rpx;
}

.subtitle {
    font-size: 26rpx;
    opacity: 0.9;
    letter-spacing: 1rpx;
}

.content {
    flex: 1;
    padding: 30rpx;
}

.section {
    background: #fff;
    border-radius: 20rpx;
    padding: 30rpx;
    margin-bottom: 24rpx;
    box-shadow: 0 2rpx 12rpx rgba(0,0,0,0.05);
    transition: all 0.3s ease;
}

.section:hover {
    transform: translateY(-2rpx);
    box-shadow: 0 4rpx 16rpx rgba(0,0,0,0.08);
}

.section-title {
    font-size: 32rpx;
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 24rpx;
    position: relative;
    padding-left: 24rpx;
    display: flex;
    align-items: center;
}

.section-title::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6rpx;
    height: 32rpx;
    background: #34495e;
    border-radius: 3rpx;
}

.section-content {
    color: #5d6d7e;
    line-height: 1.8;
    font-size: 28rpx;
}

.item {
    margin-bottom: 20rpx;
    position: relative;
    padding-left: 30rpx;
}

.item::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #34495e;
}

.sub-item {
    margin-left: 50rpx;
    margin-bottom: 16rpx;
    color: #7f8c8d;
    font-size: 26rpx;
    position: relative;
}

.sub-item::before {
    content: '-';
    position: absolute;
    left: -20rpx;
}

.footer {
    padding: 30rpx;
    background: #fff;
    box-shadow: 0 -4rpx 16rpx rgba(0,0,0,0.05);
}

.confirm-btn {
    height: 88rpx;
    line-height: 88rpx;
    background: linear-gradient(135deg, #34495e, #2c3e50);
    color: #fff;
    font-size: 32rpx;
    border-radius: 44rpx;
    box-shadow: 0 4rpx 12rpx rgba(52,73,94,0.2);
    letter-spacing: 2rpx;
    transition: all 0.3s ease;
}

.confirm-btn:active {
    transform: scale(0.98);
    box-shadow: 0 2rpx 8rpx rgba(52,73,94,0.15);
}
</style>
