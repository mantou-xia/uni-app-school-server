<template>
	<view class="create-post-container">
		<view class="post-header">
			<text class="page-title">发布帖子</text>
		</view>
		
		<view class="post-form">
			<!-- 标题输入 -->
			<view class="form-item">
				<text class="form-label">帖子标题</text>
				<input 
					class="form-input" 
					type="text" 
					placeholder="请输入帖子标题（必填）"
					:value="postData.title"
					@input="handleTitleInput"
					maxlength="50"
				/>
				<text class="input-limit">{{ postData.title.length }}/50</text>
			</view>

			<!-- 内容输入 -->
			<view class="form-item">
				<text class="form-label">帖子内容</text>
				<textarea 
					class="form-textarea" 
					placeholder="请输入帖子内容（选填）"
					:value="postData.content"
					@input="handleContentInput"
					maxlength="500"
				></textarea>
				<text class="input-limit">{{ postData.content.length }}/500</text>
			</view>

			<!-- 标签选择 -->
			<view class="form-item">
				<text class="form-label">选择标签</text>
				<view class="tag-container">
					<view 
						v-for="tag in availableTags" 
						:key="tag"
						class="tag-item"
						:class="{ 'tag-selected': postData.tag === tag }"
						@click="toggleTag(tag)"
					>
						{{ tag }}
					</view>
				</view>
			</view>

			<!-- 图片上传 -->
			<view class="form-item">
				<text class="form-label">上传图片</text>
				<view class="upload-container">
					<view 
						v-for="(image, index) in postData.images" 
						:key="index" 
						class="uploaded-image"
					>
						<image :src="image" mode="aspectFill"></image>
						<text 
							class="delete-image" 
							@click="deleteImage(index)"
						>×</text>
					</view>
					<view 
						v-if="postData.images.length < 9" 
						class="upload-button" 
						@click="chooseImage"
					>
						<text class="iconfont icon-add"></text>
					</view>
				</view>
				<text class="upload-tip">最多可上传9张图片</text>
			</view>

			<!-- 发布按钮 -->
			<button 
				class="submit-btn" 
				type="primary" 
				@click="submitPost"
				:disabled="!isSubmitEnabled"
			>
				发布帖子
			</button>
		</view>
	</view>
</template>

<script>
import { goToPage } from '@/static/utils/goToPage.js';

export default {
	// 页面名称
	name: 'CreatePostPage',

	// 页面数据
	data() {
		return {
			postData: {
				title: '',
				content: '',
				tag: '',
				images: []
			},
			availableTags: ['求助', '吐槽', '推荐', '避雷', '竞赛', '其他']
		}
	},

	computed: {
		isSubmitEnabled() {
			return this.postData.title.trim() !== '';
		}
	},

	// 页面方法
	methods: {
		// 处理标题输入
		handleTitleInput(e) {
			this.postData.title = e.detail.value || e.target.value;
		},

		// 处理内容输入
		handleContentInput(e) {
			this.postData.content = e.detail.value || e.target.value;
		},

		// 切换标签
		toggleTag(tag) {
			this.postData.tag = this.postData.tag === tag ? '' : tag;
		},

		// 选择图片
		chooseImage() {
			uni.chooseImage({
				count: 9 - this.postData.images.length,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.postData.images = [
						...this.postData.images, 
						...res.tempFilePaths
					];
				}
			});
		},

		// 删除图片
		deleteImage(index) {
			this.postData.images.splice(index, 1);
		},

		// 提交帖子
		submitPost() {
			// 检查标题是否为空
			if (!this.postData.title.trim()) {
				uni.showToast({
					title: '请输入帖子标题',
					icon: 'none'
				});
				return;
			}

			// 提交帖子的逻辑
			uni.showModal({
				title: '确认发布',
				content: '是否确定发布这篇帖子？',
				success: (res) => {
					if (res.confirm) {
						// 这里添加实际的发布逻辑，如调用后端接口
						this.uploadPostData();
					}
				}
			});
		},

		// 上传帖子数据
		uploadPostData() {
			// 模拟上传数据
			uni.showLoading({ title: '正在发布...' });
			
			// 实际应用中，这里应该是调用后端API上传数据
			setTimeout(() => {
				uni.hideLoading();
				uni.showToast({
					title: '帖子发布成功',
					icon: 'success',
					duration: 2000,
					success: () => {
						console.log('尝试跳转到圈子页面');
						uni.switchTab({ url: '/pages/circle/circle' });
					},
					fail: (err) => {
						console.error('Toast 失败:', err);
					}
				});
			}, 1500);
		}
	},

	// 页面生命周期钩子
	onLoad(options) {
		// 页面加载时的逻辑
		console.log('创建帖子页面加载', options);
	},

	onShow() {
		// 页面显示时的逻辑
		console.log('创建帖子页面显示');
	},

	// 为了确保依赖分析，添加额外标识
	__uniPageId: 'create-post-page',
	__pageModule: true
}

// 为小程序环境添加兼容处理
if (typeof wx !== 'undefined') {
	const pageConfig = {
		data: {
			postData: {
				title: '',
				content: '',
				tag: '',
				images: []
			},
			availableTags: ['求助', '吐槽', '推荐', '避雷', '竞赛', '其他']
		},
		onLoad(options) {
			console.log('页面加载', options);
		},
		onShow() {
			console.log('页面显示');
		},
		handleTitleInput(e) {
			this.setData({
				'postData.title': e.detail.value
			});
		},
		handleContentInput(e) {
			this.setData({
				'postData.content': e.detail.value
			});
		},
		toggleTag(tag) {
			this.setData({
				'postData.tag': this.data.postData.tag === tag ? '' : tag
			});
		},
		chooseImage() {
			wx.chooseImage({
				count: 9 - this.data.postData.images.length,
				sizeType: ['original', 'compressed'],
				sourceType: ['album', 'camera'],
				success: (res) => {
					this.setData({
						'postData.images': [...this.data.postData.images, ...res.tempFilePaths]
					});
				}
			});
		},
		deleteImage(index) {
			this.setData({
				'postData.images': this.data.postData.images.filter((_, i) => i !== index)
			});
		},
		submitPost() {
			const postTitle = this.data.postData.title;
			
			if (!postTitle || !postTitle.trim()) {
				wx.showToast({
					title: '请输入帖子标题',
					icon: 'none'
				});
				return;
			}

			wx.showModal({
				title: '确认发布',
				content: '是否确定发布这篇帖子？',
				success: (res) => {
					if (res.confirm) {
						wx.showToast({
							title: '帖子发布成功',
							icon: 'success',
							duration: 2000,
							success: () => {
								console.log('尝试跳转到圈子页面');
								uni.switchTab({ url: '/pages/circle/circle' });
							},
							fail: (err) => {
								console.error('Toast 失败:', err);
							}
						});
					}
				}
			});
		}
	};

	Page(pageConfig);
}
</script>

<style lang="scss">
.create-post-container {
	background-color: #f5f5f5;
	min-height: 100vh;
	padding: 30rpx;
}

.post-header {
	text-align: center;
	margin-bottom: 40rpx;
}

.page-title {
	font-size: 48rpx;
	font-weight: bold;
	color: #333;
}

.post-form {
	background-color: white;
	border-radius: 20rpx;
	padding: 40rpx;
	box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.1);
}

.form-item {
	margin-bottom: 30rpx;
	position: relative;
}

.form-label {
	display: block;
	font-size: 32rpx;
	color: #666;
	margin-bottom: 15rpx;
}

.form-input, .form-textarea {
	width: 100%;
	background-color: #f9f9f9;
	border: 1rpx solid #e0e0e0;
	border-radius: 12rpx;
	padding: 20rpx 0 20rpx 20rpx;
	font-size: 32rpx;
}

.form-textarea {
	min-height: 200rpx;
}

.input-limit {
	position: absolute;
	right: 10rpx;
	bottom: -25rpx;
	font-size: 24rpx;
	color: #999;
}

.tag-container {
	display: flex;
	flex-wrap: wrap;
	gap: 15rpx;
}

.tag-item {
	background-color: #f0f0f0;
	color: #666;
	padding: 10rpx 20rpx;
	border-radius: 30rpx;
	font-size: 28rpx;
	transition: all 0.3s ease;
}

.tag-selected {
	background-color: #4a90e2;
	color: white;
}

.upload-container {
	display: flex;
	flex-wrap: wrap;
	gap: 15rpx;
}

.uploaded-image {
	position: relative;
	width: 200rpx;
	height: 200rpx;
	border-radius: 12rpx;
	overflow: hidden;
}

.uploaded-image image {
	width: 100%;
	height: 100%;
}

.delete-image {
	position: absolute;
	top: 5rpx;
	right: 5rpx;
	background-color: rgba(0,0,0,0.5);
	color: white;
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 30rpx;
}

.upload-button {
	width: 200rpx;
	height: 200rpx;
	background-color: #f0f0f0;
	border-radius: 12rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}

.upload-button .iconfont {
	font-size: 80rpx;
	color: #999;
}

.upload-tip {
	display: block;
	margin-top: 15rpx;
	font-size: 24rpx;
	color: #999;
	text-align: center;
}

.submit-btn {
	width: 100%;
	margin-top: 40rpx;
	background-color: #4a90e2;
	color: white;
	border-radius: 12rpx;
	font-size: 36rpx;
	padding: 20rpx 0;
}

.submit-btn:disabled {
	background-color: #b0b0b0;
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
	.create-post-container {
		background-color: #1a1a1a;
	}

	.page-title {
		color: #f0f0f0;
	}

	.post-form {
		background-color: #2a2a2a;
	}

	.form-label {
		color: #d0d0d0;
	}

	.form-input, .form-textarea {
		background-color: #3a3a3a;
		border-color: #4a4a4a;
		color: #f0f0f0;
	}

	.tag-item {
		background-color: #3a3a3a;
		color: #d0d0d0;
	}

	.tag-selected {
		background-color: #3a80d2;
	}

	.upload-button {
		background-color: #3a3a3a;
	}
}
</style>
