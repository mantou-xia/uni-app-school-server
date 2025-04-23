<template>
	<view v-if="effectivePostData" class="post-content-container">
		<!-- 发帖人信息 -->
		<view class="poster-info">
			<image :src="effectivePostData.avatar" class="poster-avatar"></image>
			<view class="poster-details">
				<text class="poster-nickname">{{ effectivePostData.nickname }}</text>
			</view>
		</view>

		<!-- 帖子内容 -->
		<text class="post-title">{{ effectivePostData.title || '无标题' }}</text>
		<text class="post-text">{{ effectivePostData.content }}</text>

		<!-- 图片 -->
		<view class="post-images" v-if="effectivePostData.images && effectivePostData.images.length > 0">
			<image v-for="(image, index) in effectivePostData.images" :key="index" :src="image" class="image-item">
			</image>
		</view>

		<text class="post-tag" v-bind:class="getTagClass(effectivePostData.tag)">{{ effectivePostData.tag || '无类型'
		}}</text>
		<text class="post-time">{{ effectivePostData.time }}</text>
		<!-- 新增互动区域 -->
		<view class="interaction-container">
			<view class="clickable-area like-area" @click="handleLike">
				<text class="iconfont" v-bind:class="isLiked ? 'icon-icon-copy' : 'icon-icon'"></text>
				<text class="count-text">{{ likeCount }}</text>  <!-- 动态点赞数 -->
			</view>
			<view class="divider"></view> <!-- 添加分隔线 -->
			<view class="clickable-area share-area" @click="handleShare">
				<text class="iconfont icon-qufenxiang"></text>
				<text class="count-text">0</text> <!-- 示例转发数 -->
			</view>
		</view>

	</view>
	<view v-else class="no-data">
		<text>无帖子数据</text>
	</view>
</template>

<script>
export default {
	name: "CustomPostContent",
	props: {
		postData: {
			type: Object,
			default: () => ({})  // 默认空对象
		}
	},
	data() {
		return {
			simulatedPostData: {
				title: '示例帖子标题',
				content: '这是一条模拟帖子内容，用于测试组件显示。',
				tag: '求助',
				images: ['https://picsum.photos/200/300', 'https://picsum.photos/200/300'],
				avatar: 'https://picsum.photos/50/50',
				nickname: '模拟用户',
				time: '2023-10-01 12:00'
			},
			isLiked: false,  // 点赞状态
			likeCount: 1  // 初始点赞数
		};
	},
	computed: {
		effectivePostData() {
			return Object.keys(this.postData).length > 0 ? this.postData : this.simulatedPostData;
		}
	},
	mounted() {
		if (this.effectivePostData && this.effectivePostData.content) {
			console.log('组件已挂载，数据加载:', this.effectivePostData);
		}
	},
	methods: {
		handleLike() {
			if (this.isLiked) {
				this.isLiked = false;
				this.likeCount--;
			} else {
				this.isLiked = true;
				this.likeCount++;
			}
		},
		handleShare() {
			console.log('转发功能触发');
			// 这里可以添加实际转发逻辑，如使用 uni.share
		},
		getTagClass(tag) {
			const map = {
				'求助': 'help',
				'吐槽': 'complain',
				'推荐': 'recommend',
				'避雷': 'warning',
				'竞赛': 'competition',
				'其他': 'other'
			};
			return 'category-' + (map[tag] || 'other');  // 默认使用 'other' 类
		}
	}
}
</script>

<style lang="scss">
.post-content-container {
	padding: 10rpx;
	background-color: #fff;
	border-radius: 25rpx;
	margin: 10rpx 0;

}

.poster-info {
	display: flex;
	align-items: center;
	gap: 10rpx;
	margin-bottom: 40rpx;
}

.poster-avatar {
	width: 75rpx;
	height: 75rpx;
	border-radius: 50%;
}

.poster-nickname {
	font-size: 42rpx;
	font-weight: bold;
	color: #74879a;
	margin-left: 20rpx;
}

.post-time {
	font-size: 30rpx;
	color: #888888;
	margin-left: 10rpx;
}

.post-title {
	font-size: 48rpx;
	font-weight: bold;
	color: #000000;
	margin-top: 45rpx;
	margin: 10rpx 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	display: block;
}

.post-text {
	font-size: 39rpx;
	color: #000000;
	line-height: 1.6;
	margin: 15rpx 0;
}

.post-tag {
	font-size: 36rpx;
	color: #ffffff; // 假设标签文本为白色以在背景上突出
	padding: 5rpx 10rpx; // 添加一些填充以显示背景
	margin-right: 10rpx;

	border-radius: 15rpx;
}

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

.post-images {
	display: flex;
	flex-direction: column;
	gap: 10rpx;
}

.image-item {
	width: 100%;
	height: auto;
	border-radius: 5rpx;
	margin-bottom: 10rpx;
}

.interaction-container {
	display: flex;
	justify-content: space-between; // 横向排列并占满宽度
	width: 100%;
	margin-top: 20rpx;
}

.clickable-area {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1; // 每个区域平分宽度
}

.iconfont {
	font-size: 64rpx; // 缩小至原大小的 0.8 倍
	cursor: pointer;
}

.count-text {
	font-size: 45rpx; // 缩小至原大小的 0.8 倍
	color: black;
	margin-top: 5rpx;
}

.divider {
	width: 1rpx; // 细线宽度
	height: 60rpx; // 增加高度以使细线变长
	background-color: #000000; // 黑色细线
	margin: auto 10rpx; // 自动垂直居中，并添加水平间距
}

.no-data {
	padding: 10rpx;
	color: #888888;
}
</style>