<template>
	<view class="comment-container">
		<view v-for="(comment, index) in comments" :key="index" class="comment-item">
			<image :src="comment.avatar" class="comment-avatar"></image>
			<view class="comment-details">
				<text class="comment-nickname">{{ comment.nickname }}</text>
				<text v-if="comment.role" class="role-text" v-bind:class="getRoleClass(comment.role)">{{ comment.role }}</text>
				<text class="comment-content">{{ comment.content }}</text>
				<view class="comment-actions">
					<text class="iconfont" :class="comment.isLiked ? 'icon-icon-copy' : 'icon-icon'"
						@click="toggleLike(index)">
						<text>{{ comment.likeCount }}</text>
					</text>
					<text class="reply-button" @click="addComment(index)">回复</text>
					<text class="comment-time">{{ comment.time }}</text>
				</view>
			</view>
		</view>
		<!-- 美化并固定添加评论区 -->
		<view class="new-comment-fixed">
			<text class="iconfont icon-bianxie"></text>
			<input v-model="newCommentContent" placeholder="友善评论，传递温暖" />
			<text @click="submitComment" class="submit-text">发表</text>
		</view>
	</view>
</template>

<script>
export default {
	name: "CustomPostComment",
	data() {
		return {
			comments: [
				{
					avatar: 'https://picsum.photos/50/50',
					nickname: '用户1',
					content: '这是一条示例评论内容。',
					time: '2024-10-01 12:00',
					likeCount: 0,
					isLiked: false,
					role: '大一'
				},
				{
					avatar: 'https://picsum.photos/50/51',
					nickname: '用户2',
					content: '另一条虚拟评论，感觉不错！',
					time: '2024-10-02 14:30',
					likeCount: 2,
					isLiked: false,
					role: '大二'
				}
				// 可以添加更多虚拟评论
			],
			newCommentContent: ''  // 用于新评论输入
		};
	},
	methods: {
		toggleLike(index) {
			this.comments[index].isLiked = !this.comments[index].isLiked;
			if (this.comments[index].isLiked) {
				this.comments[index].likeCount++;
			} else {
				this.comments[index].likeCount--;
			}
		},
		addComment(index) {
			uni.showModal({
				content: '回复功能：这是一条模拟回复。实际实现可连接后端。',
				showCancel: false
			});
			// 在实际项目中，这里可以打开输入框或发送请求
		},
		submitComment() {
			if (this.newCommentContent.trim() !== '') {
				this.comments.push({
					avatar: 'https://picsum.photos/50/52',  // 虚拟头像
					nickname: '匿名用户',
					content: this.newCommentContent,
					time: new Date().toISOString().slice(0, 19).replace('T', ' '),  // 当前时间
					likeCount: 0,
					isLiked: false,
					role: '其他'
				});
				this.newCommentContent = '';  // 清空输入
				uni.showToast({ title: '评论提交成功', icon: 'success' });
			} else {
				uni.showToast({ title: '评论内容不能为空', icon: 'error' });
			}
		},
		getRoleClass(role) {
			const roleMap = {
				'大一': 'freshman',
				'大二': 'sophomore',
				'大三': 'junior',
				'大四': 'senior',
				'研究生': 'graduate',
				'博士生': 'doctoral'
			};
			return 'role-' + (roleMap[role] || 'other');
		}
	}
}
</script>

<style lang="scss">
.comment-container {
	padding: 20rpx;
	background-color: #f9f9f9;
	padding-bottom: 60rpx;
}

.comment-item {
	display: flex;
	margin-bottom: 20rpx;
	background-color: #fff;
	border-radius: 10rpx;
	padding: 15rpx;
}

.comment-avatar {
	width: 50rpx;
	height: 50rpx;
	border-radius: 50%;
	margin-right: 10rpx;
}

.comment-details {
	flex: 1;
}

.comment-nickname {
	font-weight: bold;
	font-size: 32rpx;
}

.role-text {
	font-size: 20rpx;
	padding: 5rpx 10rpx;
	border-radius: 40rpx;
	color: #ffffff;
	margin-left: 20rpx;

}

.role-freshman { background-color: #27ae60; }
.role-sophomore { background-color: #2ecc71; }
.role-junior { background-color: #f1c40f; }
.role-senior { background-color: #e67e22; }
.role-graduate { background-color: #3498db; }
.role-doctoral { background-color: #9b59b6; }
.role-other { background-color: #95a5a6; }

.comment-time {
	font-size: 24rpx;
	color: #888;
	margin-top: 10rpx;
}

.comment-content {
	display: block;
	font-size: 28rpx;
	margin: 10rpx 0;
}

.iconfont {
	margin-right: 10rpx;
	text {
		margin-left: 10rpx;
	}
}

.comment-actions {
	display: flex;
	gap: 20rpx;
	margin-top: 10rpx;
}

.like-button,
.reply-button {
	font-size: 26rpx;
	color: #007AFF;
	cursor: pointer;
	margin-top: 5rpx;
}

.new-comment-fixed {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	gap: 10rpx;
	padding: 15rpx 20rpx;
	background-color: #ffffff;
	box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.1);
	border-top: 1rpx solid #ddd;
	z-index: 1000;
}

.iconfont.icon-bianxie {
	font-size: 50rpx;
	color: #007AFF;
	margin-right: 10rpx;
	position: absolute;
	left: 30rpx;
}

input {
	flex: 1;
	padding: 15rpx;
	border: 1rpx solid #ddd;
	border-radius: 30rpx;
	background-color: #f0f0f0;
	padding-left: 80rpx;
}

.submit-text {
	padding: 15rpx 30rpx;
	color: #007AFF;
	font-size: 30rpx;
	font-weight: bold;
	text-decoration: none;
}
</style>