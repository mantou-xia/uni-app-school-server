<template>
     <!-- 接单功能区 -->
     <view class="order-section">
            <view class="section-title">
                <text>功能</text>
            </view>
            <view class="order-grid">
                <view class="order-item" @click="navigateTo('/pages/my/order/rateDetails')">
                    <view class="order-icon-wrapper">
                        <uni-icons type="wallet" size="24" color="#9b59b6"></uni-icons>
                    </view>
                    <view class="order-info">
                        <text class="order-title">费率明细</text>
                        <text class="order-desc">查看配送费用详情</text>
                    </view>
                    <uni-icons type="right" size="16" color="#999"></uni-icons>
                </view>

                <view class="order-item" @click="navigateTo('/pages/my/order/apply')">
                    <view class="order-icon-wrapper">
                        <uni-icons type="person" size="24" color="#3498db"></uni-icons>
                    </view>
                    <view class="order-info">
                        <text class="order-title">申请骑手</text>
                        <text class="order-desc">成为接单骑手</text>
                    </view>
                    <uni-icons type="right" size="16" color="#999"></uni-icons>
                </view>

                <view class="order-item" @click="navigateTo('/pages/my/order/pushSettings')">
                    <view class="order-icon-wrapper">
                        <uni-icons type="notification" size="24" color="#e74c3c"></uni-icons>
                    </view>
                    <view class="order-info">
                        <text class="order-title">订单推送</text>
                        <text class="order-desc">设置订单推送范围</text>
                    </view>
                    <uni-icons type="right" size="16" color="#999"></uni-icons>
                </view>

                <view class="order-item" @click="navigateTo('/pages/my/order/ranking')">
                    <view class="order-icon-wrapper">
                        <uni-icons type="medal" size="24" color="#f1c40f"></uni-icons>
                    </view>
                    <view class="order-info">
                        <text class="order-title">接单排行</text>
                        <text class="order-desc">查看接单排行榜</text>
                    </view>
                    <uni-icons type="right" size="16" color="#999"></uni-icons>
                </view>
            </view>
        </view>
</template>
<script>
export default {
       name: "OrderSection",
       components: {
       },
       data() {
           return {
           };
       },
       methods: {
            navigateTo(url) {
                // 使用uni-app的路由API进行页面跳转
                uni.navigateTo({
                    url: url,
                    fail: (err) => {
                        // 如果页面不存在，尝试使用switchTab（用于tabbar页面）
                        uni.switchTab({
                            url: url,
                            fail: (err) => {
                                uni.showToast({
                                    title: '页面跳转失败',
                                    icon: 'none'
                                });
                            }
                        });
                    }
                });
            }
       }
   }
</script>

<style>
/* 接单功能区样式 */
.order-section {
    background-color: #ffffff;
    margin-bottom: 10px;
    padding: 15px;
}

.section-title {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-bottom: 15px;
    padding-left: 10px;
    border-left: 4px solid #3498db;
}

.order-grid {
    display: flex;
    flex-direction: column;
}

.order-item {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    border-bottom: 1px solid #f0f0f0;
}

.order-item:last-child {
    border-bottom: none;
}

.order-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
}

.order-info {
    flex: 1;
}

.order-title {
    font-size: 15px;
    color: #333;
    margin-bottom: 4px;
    display: block;
}

.order-desc {
    font-size: 12px;
    color: #999;
    display: block;
}
</style>