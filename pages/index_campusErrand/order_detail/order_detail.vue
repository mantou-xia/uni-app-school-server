<template>
	<view class="detail-page">
		<text>订单详情 - ID: {{ orderId }}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderId: null
			};
		},
		onLoad(options) {
			this.orderId = options.id;
			console.log('Order ID:', this.orderId);
		}
	}
</script>

<style lang="scss">
.detail-page {
	padding: 20rpx;
	font-size: 16px;
	color: #333;
}
</style>
