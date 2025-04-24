<template>
    <view class="my-container">
      	<UserCard/>
		<FunctionSection/>
        <OrderSection/>
       <BottomSection/>
        <ren-customer-navigator></ren-customer-navigator>
    </view>
</template>

<script >
	import BottomSection from '@/components/my/BottomSection/BottomSection.vue';
	import FunctionSection from '@/components/my/FunctionSection/FunctionSection.vue';
	import OrderSection from '@/components/my/OrderSection/OrderSection.vue';
	import UserCard from '@/components/my/UserCard/UserCard.vue';
// const navigateTo = (url) => {
//     uni.navigateTo({
//         url: url
//     });
// }
export default {
		data() {
			return {
			}
		},
		components: {
			BottomSection,
			FunctionSection,
			OrderSection,
			UserCard
		},
		methods: {
			goToVerify() {
				if (!this.userInfo) {
					uni.showToast({
						title: '请先登录',
						icon: 'none'
					})
					return
				}
				
				if (this.userInfo.isVerified) {
					uni.showToast({
						title: '您已完成实名认证',
						icon: 'none'
					})
					return
				}
				
				uni.navigateTo({
					url: '/pages/my/verify/verify'
				})
			}
		}
	}
</script>

<style>
.my-container {
    min-height: 100vh;
    background-color: #f5f5f5;
}

.user-info {
    display: flex;
    align-items: center;
    padding: 20rpx;
}

.avatar-box {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20rpx;
}

.avatar {
    width: 100%;
    height: 100%;
}

.info-content {
    flex: 1;
}

.nickname {
    font-size: 32rpx;
    font-weight: bold;
}

.verify-status {
    display: flex;
    align-items: center;
    gap: 8rpx;
    margin-top: 8rpx;
}

.status-text {
    font-size: 24rpx;
    color: #ff6b6b;
}

.status-text.verified {
    color: #2ecc71;
}

</style>