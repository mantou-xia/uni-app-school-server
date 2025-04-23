<template>
	<view class="custom-add-button" @click="handleCreatePost">
		<text class="iconfont icon-add"></text>
	</view>
</template>

<script>
// 引入 goToPage 方法
import { goToPage } from '@/static/utils/goToPage.js';

export default {
	name: 'CustomAdd',
	// 明确定义组件选项
	options: {
		virtualHost: true
	},
	// 定义属性
	props: {
		type: {
			type: String,
			default: 'default'
		}
	},
	// 使用 methods 定义方法
	methods: {
		handleCreatePost() {
			// 触发父组件事件
			this.$emit('create-post', this.type);

			// 显示发帖确认弹窗
			uni.showModal({
				title: '发布帖子',
				content: '即将打开发帖页面',
				showCancel: true,
				confirmText: '确定',
				cancelText: '取消',
				success: (res) => {
					if (res.confirm) {
						// 使用 goToPage 方法跳转
						goToPage('/pages/post/create/create');
					}
				}
			});
		}
	},
	// 为小程序环境添加兼容性处理
	created() {
		// 小程序环境下的初始化逻辑
		if (typeof wx !== 'undefined') {
			this.handleCreatePostMp = this.handleCreatePost;
		}
	}
}

// 为小程序环境添加 Component 构造器定义
if (typeof wx !== 'undefined') {
	Component({
		options: {
			virtualHost: true,
			styleIsolation: 'apply-shared'
		},
		properties: {
			type: {
				type: String,
				value: 'default'
			}
		},
		methods: {
			handleCreatePost() {
				// 触发自定义事件
				this.triggerEvent('create-post', {
					type: this.data.type
				});

				// 显示发帖确认弹窗
				wx.showModal({
					title: '发布帖子',
					content: '即将打开发帖页面',
					showCancel: true,
					confirmText: '确定',
					cancelText: '取消',
					success: (res) => {
						if (res.confirm) {
							// 跳转到发帖页面
							wx.navigateTo({
								url: '/pages/post/create/create'
							});
						}
					}
				});
			}
		}
	});
}
</script>

<style lang="scss">
.custom-add-button {
	position: fixed;
	bottom: 100rpx;
	right: 30rpx;
	width: 100rpx;
	height: 100rpx;
	background-color: #4a90e2;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	box-shadow: 0 4rpx 10rpx rgba(74, 144, 226, 0.5);
	z-index: 99;
	transition: all 0.3s ease;

	.iconfont {
		color: white;
		font-size: 50rpx;
	}

	&:active {
		transform: scale(0.95);
		box-shadow: 0 2rpx 6rpx rgba(74, 144, 226, 0.3);
	}

	// 深色模式适配
	@media (prefers-color-scheme: dark) {
		background-color: #3a80d2;
		box-shadow: 0 4rpx 10rpx rgba(58, 128, 210, 0.5);

		&:active {
			background-color: #2f6fb0;
		}
	}
}
</style>