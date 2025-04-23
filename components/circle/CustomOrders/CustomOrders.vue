<template>
	<view class="custom-orders-container">
		<scroll-view class="orders-scroll-view" scroll-x="true" enable-flex show-scrollbar="false">
			<view v-for="(category, index) in categories" :key="index" class="order-item"
				:class="{ 'active': currentCategory === category.value }" @click="selectCategory(category.value)">
				<view class="order-item-content">
					<text class="order-item-text">{{ category.label }}</text>
				</view>
			</view>
		</scroll-view>

		<!-- 分类内容展示区域 -->
		<view class="category-content" :class="`content-${currentCategory}`">
			<view class="content-header">
				<text class="iconfont" :class="getCurrentCategoryIcon"></text>
				<text class="category-title">{{ getCurrentCategoryLabel }}</text>
			</view>
			<view class="content-body">
				<!-- 加载中状态 -->
				<view v-if="isLoading" class="loading">
					<text>加载中...</text>
				</view>
				
				<!-- 帖子列表 -->
				<view v-else-if="postList.length > 0" class="post-list">
					<view v-for="(post, index) in postList" :key="index" class="post-card" @click="showItemDetail(post)">
						<view class="post-header">
							<image :src="post.avatar" class="post-avatar"></image>
							<view class="post-user-info">
								<text class="post-username">{{ post.username }}</text>
								<text class="post-time">{{ post.time }}</text>
							</view>
							<view 
								class="post-category-tag" 
								:class="`category-${post.category}`"
							>
								{{ getCategoryLabel(post.category) }}
							</view>
						</view>
						<view class="post-content">
							<text>{{ post.content }}</text>
						</view>
						<view class="post-footer">
							<view class="post-actions">
								<view class="like-container" @click.stop="toggleLike(post)">
									<text 
										class="iconfont" 
										:class="getLikeIcon(post)"
									></text>
									<text class="like-count">{{ post.likes }}</text>
								</view>
								<text class="iconfont icon-pinglun">{{ post.comments }}</text>
							</view>
						</view>
					</view>
				</view>
				
				<!-- 空状态 -->
				<text v-else class="placeholder">{{ getCategoryPlaceholder }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: "CustomOrders",
	data() {
		return {
			// 分类数据
			categories: [
				{ label: '全部', value: 'all' },
				{ label: '求助', value: 'help' },
				{ label: '吐槽', value: 'complain' },
				{ label: '推荐', value: 'recommend' },
				{ label: '避雷', value: 'warning' },
				{ label: '竞赛', value: 'competition' },
				{ label: '其他', value: 'other' }
			],
			// 当前选中的分类
			currentCategory: 'all',
			// 帖子列表
			postList: [],
			// 加载状态
			isLoading: false,
			// 分页参数
			page: 1,
			pageSize: 10,
			avatarCache: {}, // 头像缓存
			likeClickTimestamps: {} // 记录点赞点击时间戳
		};
	},
	computed: {
		// 获取当前分类的图标
		getCurrentCategoryIcon() {
			return this.getCategoryIcon(this.currentCategory);
		},

		// 获取当前分类的标签
		getCurrentCategoryLabel() {
			const currentCategory = this.categories.find(
				category => category.value === this.currentCategory
			);
			return currentCategory ? currentCategory.label : '全部';
		},

		// 获取分类占位符
		getCategoryPlaceholder() {
			const placeholders = {
				'all': '查看所有内容',
				'help': '需要帮助？快来发布你的求助信息',
				'complain': '吐槽一下，分享你的不开心',
				'recommend': '推荐好物、好店、好服务',
				'warning': '避开坑，分享你的踩坑经历',
				'competition': '竞赛信息汇总，机会不容错过',
				'other': '其他有趣的内容'
			};
			return placeholders[this.currentCategory] || '暂无内容';
		}
	},
	methods: {
		// 选择分类
		selectCategory(category) {
			this.currentCategory = category;
			// 重新加载该分类的帖子
			this.fetchPosts();
			// 触发分类变更事件，父组件可以监听
			this.$emit('category-change', category);
		},

		// 获取分类图标
		getCategoryIcon(category) {
			const icons = {
				'all': 'icon-all',
				'help': 'icon-qiuzhu',
				'complain': 'icon--complain',
				'recommend': 'icon-recommend',
				'warning': 'icon--warning',
				'competition': 'icon-jingsaixitong',
				'other': 'icon-other'
			};
			return icons[category] || 'icon-all';
		},

		// 获取分类标签
		getCategoryLabel(category) {
			const categoryLabels = {
				'all': '全部',
				'help': '求助',
				'complain': '吐槽',
				'recommend': '推荐',
				'warning': '避雷',
				'competition': '竞赛',
				'other': '其他'
			};
			return categoryLabels[category] || category;
		},

		// 获取帖子列表
		async fetchPosts() {
			// 开始加载
			this.isLoading = true;
			this.postList = []; // 清空当前列表

			try {
				// 模拟网络请求，实际项目中替换为真实的API调用
				const response = await this.mockFetchPosts();
				
				// 更新帖子列表
				this.postList = response.data;
			} catch (error) {
				// 处理错误
				uni.showToast({
					title: '加载失败，请重试',
					icon: 'none'
				});
				console.error('获取帖子列表失败:', error);
			} finally {
				// 结束加载
				this.isLoading = false;
			}
		},

		// 生成随机头像的方法
		generateRandomAvatar(userId) {
			// 如果已经缓存，直接返回缓存的头像
			if (this.avatarCache[userId]) {
				return this.avatarCache[userId]
			}

			// 随机头像生成逻辑
			const avatarStyles = [
				`https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}&background=%23f0f0f0`,
				`https://api.dicebear.com/7.x/bottts/svg?seed=${userId}&background=%23f0f0f0`,
				`https://api.dicebear.com/7.x/identicon/svg?seed=${userId}&background=%23f0f0f0`
			]

			// 随机选择一个头像样式
			const randomAvatar = avatarStyles[Math.floor(Math.random() * avatarStyles.length)]
			
			// 缓存头像
			this.avatarCache[userId] = randomAvatar
			
			return randomAvatar
		},

		// 修改 mockFetchPosts 方法以使用随机头像
		async mockFetchPosts() {
			// 根据当前分类返回不同的帖子列表
			const postsByCategory = {
				'all': [
					{ 
						id: 1, 
						username: '用户1', 
						content: '这是全部分类的第一条动态',
						time: '刚刚',
						likes: 10,
						comments: 2,
						category: 'help',
						isLiked: false,
						avatar: this.generateRandomAvatar('user1')
					},
					{ 
						id: 2, 
						username: '用户2', 
						content: '这是全部分类的第二条动态',
						time: '1小时前',
						likes: 5,
						comments: 1,
						category: 'recommend',
						isLiked: false,
						avatar: this.generateRandomAvatar('user2')
					}
				],
				'help': [
					{ 
						id: 3, 
						username: '求助用户', 
						content: '求推荐校园兼职',
						time: '30分钟前',
						likes: 15,
						comments: 5,
						category: 'help',
						isLiked: false,
						avatar: this.generateRandomAvatar('help_user')
					}
				],
				'complain': [
					{ 
						id: 4, 
						username: '吐槽王', 
						content: '食堂今天的饭真难吃',
						time: '2小时前',
						likes: 8,
						comments: 3,
						category: 'complain',
						isLiked: false,
						avatar: this.generateRandomAvatar('complain_user')
					}
				],
				'recommend': [
					{ 
						id: 5, 
						username: '推荐达人', 
						content: '超好用的学习App推荐',
						time: '昨天',
						likes: 20,
						comments: 7,
						category: 'recommend',
						isLiked: false,
						avatar: this.generateRandomAvatar('recommend_user')
					}
				],
				'warning': [
					{ 
						id: 6, 
						username: '避雷专家', 
						content: '警惕校园二手交易骗局',
						time: '3天前',
						likes: 30,
						comments: 10,
						category: 'warning',
						isLiked: false,
						avatar: this.generateRandomAvatar('warning_user')
					}
				],
				'competition': [
					{ 
						id: 7, 
						username: '竞赛小能手', 
						content: '分享一个编程比赛',
						time: '1周前',
						likes: 12,
						comments: 4,
						category: 'competition',
						isLiked: false,
						avatar: this.generateRandomAvatar('competition_user')
					}
				],
				'other': [
					{ 
						id: 8, 
						username: '其他用户', 
						content: '随便聊聊天',
						time: '刚刚',
						likes: 3,
						comments: 1,
						category: 'other',
						isLiked: false,
						avatar: this.generateRandomAvatar('other_user')
					}
				]
			};

			// 返回当前分类的帖子，如果没有则返回空数组
			return { 
				data: postsByCategory[this.currentCategory] || []
			};
		},

		// 点赞方法
		toggleLike(post) {
			// 切换点赞状态
			if (!post.isLiked) {
				// 点赞：增加点赞数
				post.likes += 1;
				post.isLiked = true;
			} else {
				// 取消点赞：减少点赞数
				post.likes = Math.max(0, post.likes - 1);
				post.isLiked = false;
			}
		},

		// 获取点赞图标
		getLikeIcon(post) {
			return post.isLiked ? 'icon-icon-copy' : 'icon-icon';
		},

		// 检查是否已点赞
		isLiked(post) {
			return !!this.likedPosts[post.id];
		},

		// 获取点赞数量
		getLikeCount(post) {
			return post.likes;
		},

		showItemDetail(post) {
			if (post && post.id) {
				uni.navigateTo({ url: '/pages/post/postview/postview?id=' + post.id });
			}
		}
	},
	// 页面加载时获取初始帖子列表
	created() {
		this.fetchPosts();
	}
}
</script>

<style lang="scss">
page {
	min-height: 30rpx;
	background: linear-gradient(to right, #f5f7fa, #f5f7fa);
}

.custom-orders-container {
	width: 100%;
	background: linear-gradient(to right, #f5f7fa, #f5f7fa);
	padding: 20rpx 0;
	overflow: hidden;
	position: relative;
}

.orders-scroll-view {
	white-space: nowrap;
	width: 100%;
	display: flex;
	padding: 0;
	overflow-x: scroll;
	-webkit-overflow-scrolling: touch;
	scrollbar-width: none;
	-ms-overflow-style: none;

	&::-webkit-scrollbar {
		display: none;
	}
}

.order-item {
	display: inline-block;
	margin: 0 10rpx;
	border-radius: 30rpx;
	background-color: #f0f0f0;
	transition: all 0.3s ease;
	box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.08);
	min-width: 120rpx;
	height: 60rpx;
	text-align: center;
	flex-shrink: 0;

	.order-item-content {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx 30rpx;

		.order-item-text {
			font-size: 25rpx;
			color: #666;
			text-align: center;
			transition: color 0.3s ease;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			max-width: 100%;
		}
	}

	// 选中状态
	&.active {
		background: linear-gradient(135deg, #4a90e2, #6fb1ff);
		box-shadow: 0 6rpx 10rpx rgba(74, 144, 226, 0.3);
		transform: scale(1.05);

		.order-item-content {
			.order-item-text {
				color: white;
				font-weight: bold;
			}
		}
	}

}

// 分类内容展示区域
.category-content {
	padding: 0 0 20rpx 0;
	margin: 0 20rpx;
	padding-left: 20rpx;
	min-height: 120rpx;
	display: flex;
	flex-direction: column;
	transition: all 0.3s ease;
	position: relative;
	z-index: 10;
	background: transparent;

	.content-header {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		margin-bottom: 10rpx;

		.iconfont {
			font-size: 40rpx;
			margin-right: 10rpx;
		}

		.category-title {
			font-size: 32rpx;
			font-weight: bold;
		}
	}

	.content-body {
		.loading {
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #999;
			font-size: 28rpx;
		}

		.post-list {
			width: 100%;
			display: flex;
			flex-direction: column;
			gap: 20rpx;
			padding: 0 10rpx;
		}

		.post-card {
			width: calc(100% - 100rpx);
			margin: 0 auto;
			max-width: 600rpx;
			background-color: white;
			border-radius: 20rpx;
			padding: 20rpx;
			box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.1);

			.post-header {
				display: flex;
				align-items: center;
				margin-bottom: 15rpx;
				position: relative;

				.post-category-tag {
					position: absolute;
					top: 0;
					right: 0;
					font-size: 22rpx;
					padding: 2rpx 10rpx;
					border-radius: 15rpx;
					color: white;
					opacity: 0.9;
				}

				// 不同分类的标签颜色
				.category-help {
					background-color: #27ae60;
				}

				.category-complain {
					background-color: #e74c3c;
				}

				.category-recommend {
					background-color: #f39c12;
				}

				.category-warning {
					background-color: #d35400;
				}

				.category-competition {
					background-color: #8e44ad;
				}

				.category-other {
					background-color: #34495e;
				}

				.post-avatar {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					margin-right: 15rpx;
				}

				.post-user-info {
					display: flex;
					flex-direction: column;

					.post-username {
						font-weight: bold;
						font-size: 28rpx;
					}

					.post-time {
						color: #999;
						font-size: 24rpx;
					}
				}
			}

			.post-content {
				margin-bottom: 15rpx;
				font-size: 30rpx;
				color: #333;
			}

			.post-footer {
				display: flex;
				justify-content: flex-end;

				.post-actions {
					display: flex;
					align-items: center;
					gap: 20rpx;

					.like-container {
						display: flex;
						align-items: center;
						gap: 5rpx;

						.iconfont {
							display: flex;
							align-items: center;
							color: #666;
							font-size: 28rpx;

							&::before {
								margin-right: 5rpx;
							}
						}

						.like-count {
							font-size: 24rpx;
							color: #666;
						}

						// 点赞状态的样式
						.icon-icon-copy {
							color: #ff4d4f; // 点赞后的红色
						}
					}

					.iconfont {
						display: flex;
						align-items: center;
						color: #666;
						font-size: 28rpx;

						&::before {
							margin-right: 5rpx;
						}
					}
				}
			}
		}

		.placeholder {
			color: #999;
			font-size: 28rpx;
			text-align: center;
			width: 100%;
		}
	}

	// 不同分类的背景色和文字颜色
	&.content-all {
		background-color: #e6f2ff;
		color: #4a90e2;
	}

	&.content-help {
		background-color: #e8f5e9;
		color: #27ae60;
	}

	&.content-complain {
		background-color: #ffebee;
		color: #e74c3c;
	}

	&.content-recommend {
		background-color: #fff3e0;
		color: #f39c12;
	}

	&.content-warning {
		background-color: #fff0f0;
		color: #d35400;
	}

	&.content-competition {
		background-color: #f3e5f5;
		color: #8e44ad;
	}

	&.content-other {
		background-color: #f5f5f5;
		color: #34495e;
	}
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
	page {
		background: linear-gradient(to right, #2c2c2c, #2c2c2c);
	}

	.custom-orders-container {
		background: linear-gradient(to right, #2c2c2c, #2c2c2c);
	}

	.order-item {
		background-color: #444;

		.order-item-content {
			.order-item-text {
				color: #d0d0d0;
			}
		}

		&.active {
			background: linear-gradient(135deg, #3a80d2, #5aa3ff);
			box-shadow: 0 6rpx 10rpx rgba(58, 128, 210, 0.3);

			.order-item-content {
				.order-item-text {
					color: white;
				}
			}
		}
	}

	.category-content {
		background-color: #3a3a3a !important;

		&:hover {
			background-color: #505050;
		}
	}

	.content-body {
		.post-card {
			background-color: #2c2c2c;
			box-shadow: 0 4rpx 6rpx rgba(255, 255, 255, 0.1);

			.post-content {
				color: #ddd;
			}

			.post-footer {
				.post-actions {

					// 添加一些常用图标的样式（假设使用 iconfont）
					.iconfont {
						&.icon-all {
							color: #4a90e2;
						}

						&.icon-help {
							color: #27ae60;
						}

						&.icon-complain {
							color: #e74c3c;
						}

						&.icon-recommend {
							color: #f39c12;
						}

						&.icon-warning {
							color: #d35400;
						}

						&.icon-competition {
							color: #8e44ad;
						}

						&.icon-other {
							color: #34495e;
						}
					}
				}
			}
		}
	}
}
</style>