<template>
    <view class="campus-service">
        <view class="service-header">
            <image class="service-banner" src="/static/logo.png" mode="aspectFill"></image>
            <view class="service-title">校区客服中心</view>
        </view>

        <view class="service-content">
            <view class="contact-section">
                <view class="section-title">联系方式</view>
                <view class="contact-item">
                    <uni-icons type="phone" size="20" color="#3498db"></uni-icons>
                    <text class="contact-text">客服电话：400-123-4567</text>
                    <button class="contact-btn" size="mini" @click="makePhoneCall">拨打</button>
                </view>
                <view class="contact-item">
                    <uni-icons type="weixin" size="20" color="#3498db"></uni-icons>
                    <text class="contact-text">微信客服：service_001</text>
                    <button class="contact-btn" size="mini" @click="copyWechat">复制</button>
                </view>
            </view>

            <view class="quick-problems">
                <view class="section-title">常见问题</view>
                <view class="problem-list">
                    <view class="problem-item" v-for="(item, index) in commonProblems" :key="index" @click="showAnswer(item)">
                        <text class="problem-text">{{item.question}}</text>
                        <uni-icons type="right" size="16" color="#999"></uni-icons>
                    </view>
                </view>
            </view>

            <view class="feedback-section">
                <view class="section-title">问题反馈</view>
                <view class="feedback-form">
                    <textarea 
                        class="feedback-input" 
                        v-model="feedbackContent"
                        placeholder="请描述您遇到的问题，我们会尽快处理..."
                        maxlength="500"
                    ></textarea>
                    <view class="feedback-footer">
                        <text class="word-count">{{feedbackContent.length}}/500</text>
                        <button class="submit-btn" size="mini" @click="submitFeedback">提交反馈</button>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const feedbackContent = ref('')

const commonProblems = ref([
    {
        question: '如何申请成为骑手？',
        answer: '点击"我的"-"申请骑手"，按要求填写信息并提交审核即可。'
    },
    {
        question: '订单配送费用如何计算？',
        answer: '基础配送费3元（1公里内），超出部分每公里增加1元。'
    },
    {
        question: '如何取消订单？',
        answer: '在订单未被接单前可以直接取消，接单后需要联系骑手协商取消。'
    },
    {
        question: '遇到配送延迟怎么办？',
        answer: '可以直接联系骑手了解情况，如有异常可联系客服处理。'
    }
])

const makePhoneCall = () => {
    uni.makePhoneCall({
        phoneNumber: '4001234567'
    })
}

const copyWechat = () => {
    uni.setClipboardData({
        data: 'service_001',
        success: () => {
            uni.showToast({
                title: '微信号已复制',
                icon: 'success'
            })
        }
    })
}

const showAnswer = (item) => {
    uni.showModal({
        title: item.question,
        content: item.answer,
        showCancel: false
    })
}

const submitFeedback = () => {
    if (!feedbackContent.value.trim()) {
        uni.showToast({
            title: '请输入反馈内容',
            icon: 'none'
        })
        return
    }

    uni.showLoading({
        title: '提交中'
    })

    setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
            title: '反馈已提交',
            icon: 'success'
        })
        feedbackContent.value = ''
    }, 1500)
}
</script>

<style>
.campus-service {
    min-height: 100vh;
    background-color: #f5f5f5;
}

.service-header {
    position: relative;
    height: 200px;
}

.service-banner {
    width: 100%;
    height: 100%;
}

.service-title {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    text-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.service-content {
    margin-top: -20px;
    border-radius: 20px 20px 0 0;
    background-color: #fff;
    padding: 20px;
    min-height: calc(100vh - 180px);
}

.section-title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-bottom: 15px;
}

.contact-section {
    margin-bottom: 20px;
}

.contact-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 8px;
    margin-bottom: 10px;
}

.contact-text {
    flex: 1;
    font-size: 14px;
    color: #333;
    margin-left: 10px;
}

.contact-btn {
    background-color: #3498db;
    color: #fff;
}

.problem-list {
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 5px 0;
}

.problem-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
}

.problem-item:last-child {
    border-bottom: none;
}

.problem-text {
    font-size: 14px;
    color: #333;
}

.feedback-section {
    margin-top: 20px;
}

.feedback-input {
    width: 100%;
    height: 150px;
    background-color: #f8f9fa;
    border-radius: 8px;
    padding: 10px;
    font-size: 14px;
}

.feedback-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
}

.word-count {
    font-size: 12px;
    color: #999;
}

.submit-btn {
    background-color: #3498db;
    color: #fff;
}
</style> 