<template>
	<view class="publish-container">
		<view class="form-group">
			<text class="form-label">订单类型 <text class="required">*</text></text>
			<view class="type-selector">
				<view class="type-item" v-for="(type, index) in orderTypes" :key="index"
					:class="{ active: formData.type === type }" @click="formData.type = type">
					<text>{{ type }}</text>
				</view>
			</view>
		</view>
		
		<view class="form-group">
			<text class="form-label">配送地点 <text class="required">*</text></text>
			<input type="text" class="form-input" v-model="formData.location" placeholder="请输入配送地点" />
		</view>
		
		<view class="form-group">
			<text class="form-label">联系方式 <text class="required">*</text></text>
			<input type="text" class="form-input" v-model="formData.contact" placeholder="请输入联系方式" />
		</view>
		
		<view class="form-group">
			<text class="form-label">委托内容 <text class="required">*</text></text>
			<textarea class="form-textarea" v-model="formData.description" placeholder="请详细描述委托内容，方便骑手了解任务"></textarea>
		</view>
		
		<view class="form-group">
			<text class="form-label">配送费用 <text class="required">*</text></text>
			<input type="digit" class="form-input" v-model="formData.fee" placeholder="请输入配送费用" />
		</view>
		
		<view class="form-group">
			<text class="form-label">追加金额</text>
			<input type="digit" class="form-input" v-model="formData.extraFee" placeholder="可选，如需加急可追加金额" />
			<text class="tip-text">* 追加金额可提高接单优先级</text>
		</view>
		
		<view class="publish-tips">
			<text class="tips-title">发布须知：</text>
			<text class="tips-item">1. 请确保信息真实有效；</text>
			<text class="tips-item">2. 禁止发布违规内容；</text>
			<text class="tips-item">3. 发布后可在"我的发布"中查看；</text>
			<text class="tips-item">4. 系统将收取5%服务费。</text>
		</view>
		
		<button class="publish-btn" @click="publishOrder">立即发布</button>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	
	const orderTypes = ['快递代取', '食堂打包', '校园跑腿']
	
	const formData = ref({
		type: '快递代取',
		location: '',
		contact: '',
		description: '',
		fee: '',
		extraFee: '0',
	})
	
	const publishOrder = () => {
		// 表单验证
		if (!formData.value.location) {
			return uni.showToast({
				title: '请输入配送地点',
				icon: 'none'
			})
		}
		
		if (!formData.value.contact) {
			return uni.showToast({
				title: '请输入联系方式',
				icon: 'none'
			})
		}
		
		if (!formData.value.description) {
			return uni.showToast({
				title: '请输入委托内容',
				icon: 'none'
			})
		}
		
		if (!formData.value.fee) {
			return uni.showToast({
				title: '请输入配送费用',
				icon: 'none'
			})
		}
		
		// 发布订单
		uni.showLoading({
			title: '发布中'
		})
		
		// 模拟发布过程
		setTimeout(() => {
			uni.hideLoading()
			
			uni.showModal({
				title: '发布成功',
				content: '您的订单已成功发布，可在"我的发布"中查看',
				showCancel: false,
				success: () => {
					// 返回上一页
					uni.navigateBack()
				}
			})
		}, 1500)
	}
</script>

<style>
	.publish-container {
		padding: 30rpx;
		background-color: #f8f8f8;
		min-height: 100vh;
	}
	
	.form-group {
		margin-bottom: 30rpx;
	}
	
	.form-label {
		display: block;
		font-size: 28rpx;
		color: #333;
		margin-bottom: 16rpx;
		font-weight: 500;
	}
	
	.required {
		color: #e74c3c;
	}
	
	.form-input {
		width: 100%;
		height: 90rpx;
		background-color: #fff;
		border-radius: 8rpx;
		padding: 0 20rpx;
		font-size: 28rpx;
		box-sizing: border-box;
	}
	
	.form-textarea {
		width: 100%;
		height: 200rpx;
		background-color: #fff;
		border-radius: 8rpx;
		padding: 20rpx;
		font-size: 28rpx;
		box-sizing: border-box;
	}
	
	.tip-text {
		font-size: 24rpx;
		color: #999;
		margin-top: 12rpx;
		display: block;
	}
	
	.type-selector {
		display: flex;
		flex-wrap: wrap;
		gap: 20rpx;
	}
	
	.type-item {
		padding: 16rpx 30rpx;
		background-color: #fff;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #666;
	}
	
	.type-item.active {
		background-color: #3498db;
		color: #fff;
	}
	
	.publish-tips {
		background-color: #fff;
		border-radius: 8rpx;
		padding: 20rpx;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
	}
	
	.tips-title {
		font-size: 28rpx;
		color: #333;
		font-weight: 500;
		display: block;
		margin-bottom: 16rpx;
	}
	
	.tips-item {
		font-size: 26rpx;
		color: #666;
		line-height: 1.6;
		display: block;
	}
	
	.publish-btn {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		background-color: #3498db;
		color: #fff;
		font-size: 32rpx;
		border-radius: 45rpx;
		margin-top: 30rpx;
	}
</style>