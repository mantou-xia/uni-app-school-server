<template>
    <!-- 功能菜单区域 -->
    <view class="function-section">
            <view class="function-grid">
                <view class="function-item" @click="navigateTo('/pages/my/function/myOrders')">
                    <view class="icon-wrapper">
                        <uni-icons type="list" size="24" color="#3498db"></uni-icons>
                    </view>
                    <text class="function-text">我的发布</text>
                </view>
                <!-- <view class="function-item" @click="navigateTo('/pages/my/function/myPublish')">
                    <view class="icon-wrapper">
                        <uni-icons type="paperplane" size="24" color="#e74c3c"></uni-icons>
                    </view>
                    <text class="function-text">我的发布</text>
                </view> -->
                <view class="function-item" @click="navigateTo('/pages/my/function/myAccept')">
                    <view class="icon-wrapper">
                        <uni-icons type="hand-up" size="24" color="#2ecc71"></uni-icons>
                    </view>
                    <text class="function-text">我的接单</text>
                </view>
                <view class="function-item" @click="navigateTo('/pages/my/function/myWallet')">
                    <view class="icon-wrapper">
                        <uni-icons type="wallet" size="24" color="#f1c40f"></uni-icons>
                    </view>
                    <text class="function-text">我的钱包</text>
                </view>
                <!-- <view class="function-item" @click="navigateTo('/pages/my/function/myCoupon')">
                    <view class="icon-wrapper">
                        <uni-icons type="gift" size="24" color="#e67e22"></uni-icons>
                    </view>
                    <text class="function-text">我的优惠券</text>
                </view> -->
                <view class="function-item" @click="navigateTo('/pages/my/function/settings')">
                    <view class="icon-wrapper">
                        <uni-icons type="gear" size="24" color="#95a5a6"></uni-icons>
                    </view>
                    <text class="function-text">设置</text>
                </view>
            </view>
        </view>
</template>
<script>
export default {
       name: "FunctionSection",
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
                        console.error('跳转失败：', err);
                        uni.showToast({
                            title: '页面跳转失败',
                            icon: 'none'
                        });
                    }
                });
            }
       }
   }
</script>

<style>
/* 功能区样式 */
.function-section {
    background-color: #ffffff;
    padding: 15px;
    margin-bottom: 10px;
}

.function-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.function-item {
    width: 33.33%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0;
}

.icon-wrapper {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 8px;
}

.function-text {
    font-size: 14px;
    color: #333;
}
</style>