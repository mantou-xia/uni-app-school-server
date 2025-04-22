<template>
     <!-- 底部功能区 -->
     <view class="bottom-section">
            <view class="bottom-item" @click="navigateTo('/pages/my/bottom/campusService')">
                <view class="bottom-icon-wrapper">
                    <uni-icons type="headphones" size="24" color="#27ae60"></uni-icons>
                </view>
                <view class="bottom-info">
                    <text class="bottom-title">校区客服</text>
                    <text class="bottom-desc">联系校区专属客服</text>
                </view>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>

            <view class="bottom-item" @click="navigateTo('/pages/my/bottom/about')">
                <view class="bottom-icon-wrapper">
                    <uni-icons type="info" size="24" color="#34495e"></uni-icons>
                </view>
                <view class="bottom-info">
                    <text class="bottom-title">关于我们</text>
                    <text class="bottom-desc">了解更多信息</text>
                </view>
                <uni-icons type="right" size="16" color="#999"></uni-icons>
            </view>
        </view>
</template>
<script>
export default {
		name: "BottomSection",
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
/* 底部功能区样式 */
.bottom-section {
    background-color: #ffffff;
    margin-bottom: 10px;
    padding: 0 15px;
}

.bottom-item {
    display: flex;
    align-items: center;
    padding: 20px 10px;
    border-bottom: 1px solid #f0f0f0;
}

.bottom-item:last-child {
    border-bottom: none;
}

.bottom-icon-wrapper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f8f9fa;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
}

.bottom-info {
    flex: 1;
}

.bottom-title {
    font-size: 15px;
    color: #333;
    margin-bottom: 4px;
    display: block;
}

.bottom-desc {
    font-size: 12px;
    color: #999;
    display: block;
}
</style>