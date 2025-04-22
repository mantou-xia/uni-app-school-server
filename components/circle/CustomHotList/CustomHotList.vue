<template>
	<view class="hot-list-container">
		<view class="hot-list-title">
			<text class="iconfont icon-fire"></text>
			<text class="title-text">热门榜单</text>
		</view>

		<view class="hot-list">
			<view 
				v-for="(item, index) in displayedHotList" 
				:key="item.id" 
				class="hot-item"
				:class="{'top-three': index < 3}"
				@click="showItemDetail(item, index)"
			>
				<!-- 排名 -->
				<view class="item-rank">
					<text>{{ index + 1 }}</text>
				</view>

				<!-- 内容 -->
				<view class="item-content">
					<view class="content-text">{{ item.title }}</view>
					<view class="content-info">
						<text class="iconfont icon-like"></text>
						<text class="like-count">{{ item.likeCount }}</text>
					</view>
				</view>
			</view>

			<!-- 展开/收起按钮 -->
			<view 
				v-if="hotList.length > 3" 
				class="expand-btn" 
				@click="toggleExpand"
			>
				<text>{{ isExpanded ? '收起' : '查看更多' }}</text>
				<text class="iconfont" :class="isExpanded ? 'icon-up' : 'icon-down'"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "CustomHotList",
		data() {
			return {
				// 热榜数据（模拟数据）
				hotList: [
					{ id: 1, title: '校园最佳拍照地点大揭秘！', likeCount: 1256 },
					{ id: 2, title: '食堂新菜品，你最爱哪一款？', likeCount: 987 },
					{ id: 3, title: '学生会招新，快来一起创造精彩！', likeCount: 765 },
					{ id: 4, title: '图书馆自习攻略，拿走不谢', likeCount: 654 },
					{ id: 5, title: '校园兼职信息汇总', likeCount: 543 },
					{ id: 6, title: '社团活动预告', likeCount: 432 },
					{ id: 7, title: '学习方法分享', likeCount: 321 },
					{ id: 8, title: '校园安全提示', likeCount: 210 },
					{ id: 9, title: '心理健康小贴士', likeCount: 156 },
					{ id: 10, title: '运动健康指南', likeCount: 98 }
				],
				// 是否展开
				isExpanded: false
			};
		},
		computed: {
			// 根据展开状态显示的列表
			displayedHotList() {
				return this.isExpanded ? this.hotList : this.hotList.slice(0, 3);
			}
		},
		methods: {
			// 切换展开/收起
			toggleExpand() {
				this.isExpanded = !this.isExpanded;
			},

			// 显示详情模态框
			showItemDetail(item, index) {
				uni.showModal({
					title: `NO.${index + 1} ${item.title}`,
					content: '暂无详细内容',
					showCancel: true,
					cancelText: '关闭',
					confirmText: '查看详情',
					success: (res) => {
						if (res.confirm) {
							console.log('跳转页面');
						}
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.hot-list-container {
	background-color: #ffffff;
	border-radius: 20rpx;
	padding: 30rpx;
	margin: 20rpx;
	
	// 优化阴影和边框效果
	box-shadow: 
		0 8rpx 15rpx rgba(0, 0, 0, 0.05),
		0 4rpx 6rpx rgba(0, 0, 0, 0.03);
	border: 2rpx solid rgba(0, 0, 0, 0.05);
	transition: all 0.3s ease;

	&:hover {
		box-shadow: 
			0 12rpx 20rpx rgba(0, 0, 0, 0.08),
			0 6rpx 10rpx rgba(0, 0, 0, 0.05);
		transform: translateY(-5rpx);
	}
}

.hot-list-title {
	display: flex;
	align-items: center;
	margin-bottom: 20rpx;
	padding-bottom: 15rpx;
	border-bottom: 2rpx solid #f0f0f0;

	.icon-fire {
		color: #ff6b6b;
		font-size: 40rpx;
		margin-right: 15rpx;
		animation: fire-shake 1.5s infinite alternate;
	}

	.title-text {
		font-size: 36rpx;
		font-weight: bold;
		color: #333;
	}
}

.hot-list {
	.hot-item {
		display: flex;
		align-items: center;
		padding: 20rpx 10rpx;
		border-bottom: 1rpx solid #f0f0f0;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: rgba(74, 144, 226, 0.05);
		}

		&:last-child {
			border-bottom: none;
		}

		.item-rank {
			width: 60rpx;
			height: 60rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			margin-right: 20rpx;
			font-weight: bold;
			color: white;
			border-radius: 15rpx;
			box-shadow: 0 4rpx 6rpx rgba(0, 0, 0, 0.2);
		}

		.item-content {
			flex-grow: 1;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.content-text {
				font-size: 30rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				max-width: 500rpx;
			}

			.content-info {
				display: flex;
				align-items: center;
				color: #999;

				.icon-like {
					margin-right: 10rpx;
					color: #ff6b6b;
					animation: like-pulse 1s infinite alternate;
				}

				.like-count {
					font-size: 28rpx;
				}
			}
		}
	}

	// 前三名特殊样式
	.top-three {
		&:nth-child(1) {
			.item-rank {
				background: linear-gradient(135deg, #ff3333, #ff4d4d); // 第一名颜色
				color: white;
				box-shadow: 0 6rpx 12rpx rgba(255, 51, 51, 0.4);
			}

			.content-text {
				color: #ff3333;
				font-weight: bold;
			}
		}

		&:nth-child(2) {
			.item-rank {
				background: linear-gradient(135deg, #ff6600, #ff8533); // 第二名颜色
				color: white;
				box-shadow: 0 6rpx 12rpx rgba(255, 102, 0, 0.4);
			}

			.content-text {
				color: #ff6600;
				font-weight: bold;
			}
		}

		&:nth-child(3) {
			.item-rank {
				background: linear-gradient(135deg, #faa90e, #ffbf66); // 第三名颜色
				color: white;
				box-shadow: 0 6rpx 12rpx rgba(250, 169, 0, 0.4);
			}

			.content-text {
				color: #faa90e;
				font-weight: bold;
			}
		}
	}

	// 非前三名的样式
	.hot-item:not(.top-three) {
		.item-rank {
			background-color: #f0f0f0;
			color: #888;
		}

		.content-text {
			color: #666;
		}
	}
}

.expand-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20rpx 0;
	color: #4a90e2;
	font-size: 30rpx;
	transition: color 0.3s ease;

	&:hover {
		color: #3a80d2;
	}

	.iconfont {
		margin-left: 10rpx;
		transition: transform 0.3s ease;
	}
}

// 动画效果
@keyframes fire-shake {
	0% { transform: rotate(-5deg); }
	100% { transform: rotate(5deg); }
}

@keyframes like-pulse {
	0% { transform: scale(1); }
	100% { transform: scale(1.1); }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
	.hot-list-container {
		background-color: #2c2c2c;
		border-color: rgba(255, 255, 255, 0.1);
		box-shadow: 
			0 8rpx 15rpx rgba(0, 0, 0, 0.1),
			0 4rpx 6rpx rgba(0, 0, 0, 0.06);
	}

	.hot-list-title {
		border-bottom-color: #444;

		.title-text {
			color: #f0f0f0;
		}
	}

	.hot-list {
		.hot-item {
			border-bottom-color: #444;

			&:hover {
				background-color: rgba(74, 144, 226, 0.1);
			}

			.item-content {
				.content-text {
					color: #d0d0d0;
				}
			}
		}

		// 深色模式下的前三名样式
		.top-three {
			&:nth-child(1) {
				.item-rank {
					background: linear-gradient(135deg, #cc2929, #ff3333); // 深一点的第一名颜色
					color: white;
					box-shadow: 0 6rpx 12rpx rgba(255, 51, 51, 0.3);
				}

				.content-text {
					color: #ff3333;
				}
			}

			&:nth-child(2) {
				.item-rank {
					background: linear-gradient(135deg, #cc5200, #ff6600); // 深一点的第二名颜色
					color: white;
					box-shadow: 0 6rpx 12rpx rgba(255, 102, 0, 0.3);
				}

				.content-text {
					color: #ff6600;
				}
			}

			&:nth-child(3) {
				.item-rank {
					background: linear-gradient(135deg, #cc8b00, #faa90e); // 深一点的第三名颜色
					color: white;
					box-shadow: 0 6rpx 12rpx rgba(250, 169, 0, 0.3);
				}

				.content-text {
					color: #faa90e;
				}
			}
		}

		// 深色模式下非前三名的样式
		.hot-item:not(.top-three) {
			.item-rank {
				background-color: #444;
				color: #aaa;
			}

			.content-text {
				color: #999;
			}
		}
	}
}
</style>