<template>
	<view class="edit-container">
		<view class="form-group">
			<text class="form-label">订单类型</text>
			<view class="type-selector">
				<view 
					class="type-item" 
					v-for="(type, index) in orderTypes" 
					:key="index"
					:class="{ active: formData.type === type }"
					@click="formData.type = type"
				>
					<text>{{ type }}</text>
				</view>
			</view>
		</view>
		
		<view class="form-group">
			<text class="form-label">配送地点</text>
			<input type="text" class="form-input" v-model="formData.location" placeholder="请输入配送地点" />
		</view>
		
		<view class="form-group">
			<text class="form-label">联系方式</text>
			<input type="text" class="form-input" v-model="formData.contact" placeholder="请输入联系方式" />
		</view>
		
		<view class="form-group">
			<text class="form-label">委托内容</text>
			<textarea class="form-textarea" v-model="formData.description" placeholder="请详细描述委托内容"></textarea>
		</view>
		
		<view class="form-group">
			<text class="form-label">配送费用</text>
			<input type="digit" class="form-input" v-model="formData.fee" placeholder="请输入配送费用" />
		</view>
		
		<view class="form-group">
			<text class="form-label">追加金额</text>
			<input type="digit" class="form-input" v-model="formData.extraFee" placeholder="可选，如需加急可追加金额" />
		</view>
		
		<view class="btn-group">
			<button class="cancel-btn" @click="goBack">取消</button>
			<button class="save-btn" @click="saveOrder">保存修改</button>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue'
	
	const orderTypes = ['快递代取', '食堂打包', '校园跑腿']
	
	const formData = ref({
		id: '',
		type: '快递代取',
		location: '',
		contact: '',
		description: '',
		fee: '',
		extraFee: '0',
		status: '待接单'
	})
	
	onMounted(() => {
		const eventChannel = getOpenerEventChannel()
		const pages = getCurrentPages()
		const currentPage = pages[pages.length - 1]
		const id = currentPage.options?.id
		
		if (id) {
			// 模拟从后端获取数据
			uni.showLoading({
				title: '加载中'
			})
			
			// 模拟数据加载
			setTimeout(() => {
				// 这里模拟获取的订单数据
				formData.value = {
					id: id,
					type: '快递代取',
					location: '第一教学楼',
					contact: '138****1234',
					description: '快递在菜鸟驿站，取件码12345',
					fee: '5.00',
					extraFee: '0.00',
					status: '待接单'
				}
				
				uni.hideLoading()
			}, 500)
		}
	})
	
	const saveOrder = () => {
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
		
		// 保存数据
		uni.showLoading({
			title: '保存中'
		})
		
		// 模拟保存过程
		setTimeout(() => {
			uni.hideLoading()
			uni.showToast({
				title: '保存成功',
				icon: 'success'
			})
			
			// 返回上一页
			setTimeout(() => {
				uni.navigateBack()
			}, 1500)
		}, 1000)
	}
	
	const goBack = () => {
		uni.navigateBack()
	}
</script>

<style>
	.edit-container {
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
	
	.btn-group {
		display: flex;
		gap: 30rpx;
		margin-top: 50rpx;
	}
	
	.cancel-btn, .save-btn {
		flex: 1;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 45rpx;
		font-size: 30rpx;
	}
	
	.cancel-btn {
		background-color: #f8f8f8;
		color: #666;
		border: 2rpx solid #ddd;
	}
	
	.save-btn {
		background-color: #3498db;
		color: #fff;
	}
</style>
