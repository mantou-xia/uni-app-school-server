<template>
	<view class="bulletin">
		<img class="bulletin-icon" src="/static/common/通知公告.png" alt="正在加载">
		<view class="bulletin-text-container">
			<text class="bulletin-text">{{ noticeContent }}</text>
		</view>
		<text class="more" @click="showFullNotice">更多</text>
	</view>
	
	<!-- 公告详情弹窗 -->
	<uni-popup ref="popup" type="dialog">
		<uni-popup-dialog 
			:title="'公告详情'" 
			:content="noticeContent" 
			:before-close="true"
			@close="closePopup"
			@confirm="closePopup"
		></uni-popup-dialog>
	</uni-popup>
</template>

<script>
	export default {
		name: "CustomNotice",
		props: {
			noticeContent: {
				type: String,
				default: '暂无公告内容'
			}
		},
		methods: {
			showFullNotice() {
				this.$refs.popup.open();
			},
			closePopup() {
				this.$refs.popup.close();
			}
		}
	}
</script>

<style lang="scss">
.bulletin {
	width: 690rpx; // 750rpx - 左右各30rpx的padding
	margin: 0 auto; // 居中
	padding: 20rpx 30rpx;
	
	// 背景色
	background-color: #ebf5ff;
	
	// 文字样式
	font-size: 28rpx;
	color: #333;
	line-height: 1.4;
	
	// 布局
	display: flex;
	align-items: center;
	justify-content: space-between;
	
	// 更多按钮样式
	.more {
		color: #999;
		font-size: 24rpx;
		margin-left: 20rpx;
		flex: none;
		cursor: pointer;
	}
	
	// 文字溢出容器
	.bulletin-text-container {
		flex: 1;
		overflow: hidden;
		margin-right: 20rpx;
	}

	// 文字溢出处理
	.bulletin-text {
		display: block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		width: 100%;
	}

	.bulletin-icon {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
		object-fit: contain;
		flex: none;
		border-radius: 50%; // 使图标变成圆形
		border: 2rpx solid #ebf5ff; // 可选：添加轻微边框
	}
}
</style>