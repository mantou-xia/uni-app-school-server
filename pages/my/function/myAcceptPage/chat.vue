<template>
    <view class="chat-container">
        <view class="chat-header">
            <view class="chat-info">
                <text class="title">客服中心</text>
                <text class="subtitle">订单号: {{orderNo}}</text>
            </view>
        </view>
        
        <scroll-view 
            scroll-y 
            class="chat-content" 
            :scroll-top="scrollTop"
            @scrolltoupper="loadMoreMessages"
        >
            <view class="chat-time">{{currentDate}}</view>
            
            <view class="message-list">
                <view class="message-item" v-for="(item, index) in messages" :key="index">
                    <view :class="['message', item.sender === 'user' ? 'user' : 'service']">
                        <image 
                            v-if="item.sender !== 'user'" 
                            class="avatar" 
                            src="/static/logo.png" 
                            mode="aspectFill">
                        </image>
                        <view class="message-content">
                            <text>{{item.content}}</text>
                        </view>
                        <image 
                            v-if="item.sender === 'user'" 
                            class="avatar" 
                            src="/static/logo.png" 
                            mode="aspectFill">
                        </image>
                    </view>
                </view>
            </view>
        </scroll-view>
        
        <view class="chat-input">
            <textarea 
                class="input" 
                v-model="messageText" 
                placeholder="请输入消息..." 
                auto-height 
                maxlength="500"
                @keypress="onKeypress"
            ></textarea>
            <button class="send-btn" @click="sendMessage">发送</button>
        </view>
    </view>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

// 获取路由参数
const orderNo = ref('');
onLoad((option) => {
    if (option.orderNo) {
        orderNo.value = option.orderNo;
        // 可以在这里根据订单号加载历史消息
        loadChatHistory(option.orderNo);
    }
});

const scrollTop = ref(0);
const messageText = ref('');
const messages = ref([
    {
        sender: 'service',
        content: '您好，我是客服小助手，很高兴为您服务！',
        time: new Date()
    }
]);

// 获取当前日期
const currentDate = new Date().toLocaleDateString();

// 加载历史消息
const loadChatHistory = (orderNo) => {
    // 这里可以调用API获取历史聊天记录
    console.log('加载订单', orderNo, '的历史消息');
    
    // 模拟一些示例消息
    setTimeout(() => {
        messages.value.push({
            sender: 'service',
            content: `已收到您关于订单 ${orderNo} 的咨询请求，请问有什么可以帮助您的？`,
            time: new Date()
        });
    }, 1000);
};

// 发送消息
const sendMessage = () => {
    if (!messageText.value.trim()) return;
    
    // 添加用户消息
    messages.value.push({
        sender: 'user',
        content: messageText.value,
        time: new Date()
    });
    
    // 清空输入框
    messageText.value = '';
    
    // 滚动到底部
    scrollToBottom();
    
    // 模拟客服回复
    setTimeout(() => {
        messages.value.push({
            sender: 'service',
            content: '我们已收到您的消息，正在处理中，请稍候...',
            time: new Date()
        });
        scrollToBottom();
    }, 1000);
};

// 滚动到底部
const scrollToBottom = () => {
    nextTick(() => {
        // 使用一个很大的值确保滚动到底部
        scrollTop.value = 99999;
    });
};

// 加载更多历史消息
const loadMoreMessages = () => {
    console.log('加载更多历史消息');
    // 实际应用中这里可以加载更早的聊天记录
};

// 键盘事件处理
const onKeypress = (e) => {
    // 如果是回车键且没有按住shift，发送消息
    if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
};

// 页面加载完成后滚动到底部
onMounted(() => {
    scrollToBottom();
});
</script>

<style>
.chat-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f5f5;
}

.chat-header {
    background-color: #fff;
    padding: 20rpx 30rpx;
    border-bottom: 1px solid #eee;
    box-shadow: 0 2rpx 6rpx rgba(0, 0, 0, 0.05);
}

.chat-info {
    display: flex;
    flex-direction: column;
}

.chat-info .title {
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
}

.chat-info .subtitle {
    font-size: 24rpx;
    color: #999;
    margin-top: 6rpx;
}

.chat-content {
    flex: 1;
    padding: 30rpx;
}

.chat-time {
    text-align: center;
    font-size: 24rpx;
    color: #999;
    padding: 20rpx 0;
}

.message-list {
    display: flex;
    flex-direction: column;
    gap: 30rpx;
}

.message {
    display: flex;
    margin-bottom: 20rpx;
}

.message.service {
    justify-content: flex-start;
}

.message.user {
    justify-content: flex-end;
}

.message .avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    background-color: #eee;
}

.message-content {
    max-width: 70%;
    padding: 20rpx 30rpx;
    border-radius: 12rpx;
    margin: 0 20rpx;
    word-break: break-word;
}

.message.service .message-content {
    background-color: #fff;
    color: #333;
}

.message.user .message-content {
    background-color: #2196f3;
    color: #fff;
}

.chat-input {
    background-color: #fff;
    border-top: 1px solid #eee;
    padding: 20rpx;
    display: flex;
    align-items: flex-end;
}

.input {
    flex: 1;
    background-color: #f5f5f5;
    border-radius: 8rpx;
    padding: 16rpx;
    font-size: 28rpx;
    min-height: 80rpx;
    max-height: 240rpx;
}

.send-btn {
    background-color: #2196f3;
    color: #fff;
    border-radius: 8rpx;
    margin-left: 20rpx;
    padding: 0 30rpx;
    height: 80rpx;
    line-height: 80rpx;
    font-size: 28rpx;
}
</style>
