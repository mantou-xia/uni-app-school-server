<!-- 模板区域：定义组件的视图结构 -->
<template>
	<!-- 使用view标签作为容器，适配小程序和H5 -->
	<view class="custom-placeholder-screen">
		<!-- 内容居中容器 -->
		<view class="placeholder-content">
			<!-- 可选的图标 -->
			<view class="placeholder-icon">
				<uni-icons type="info-filled" size="50" color="#bfbfbf"></uni-icons>
			</view>
			
			<!-- 标题 -->
			<text v-if="title" class="placeholder-title">{{ title }}</text>
			
			<!-- 主要文本内容 -->
			<text class="placeholder-text">{{ text }}</text>
			
			<!-- 副标题或描述 -->
			<text v-if="description" class="placeholder-description">{{ description }}</text>
			
			<!-- 可选的操作按钮 -->
			<view v-if="showAction" class="placeholder-action">
				<button type="default" @click="onActionClick">{{ actionText }}</button>
			</view>
		</view>
	</view>
</template>

<!-- 脚本区域：定义组件的逻辑和行为 -->
<script>
	export default {
		// 组件名称，用于调试和Vue DevTools识别
		name: "CustomPlaceholder",
		
		// 小程序特有的组件选项，解决一些渲染和样式问题
		options: {
			// 虚拟宿主，帮助组件在小程序环境中正确渲染
			virtualHost: true
		},
		data() {
			return {
			};
		},
		mounted() {
			// 控制台日志，用于调试
			console.log('占位组件')
		},
		// 接收外部传入的文本
		props: {
			text: {
				type: String,
				default: '暂无数据'
			},
			// 是否显示操作按钮
			showAction: {
				type: Boolean,
				default: false
			},
			// 操作按钮文字
			actionText: {
				type: String,
				default: '重新加载'
			}
		},
		// 监听外部传入文本的变化
		watch: {
			text: {
				immediate: true,
				handler(newVal) {
					this.placeholderText = newVal
				}
			}
		},
		// 方法
		methods: {
			// 点击操作按钮触发的事件
			onActionClick() {
				// 触发外部的重新加载事件
				this.$emit('reload')
			}
		}
	}
</script>

<style lang="scss" scoped>
	// 可以在这里添加组件的样式
	// 使用scss语言，提供更强大的样式编写能力
	.custom-placeholder-screen {
		/* 占满整个屏幕 */
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		
		/* 使用弹性布局完全居中 */
		display: flex;
		justify-content: center;
		align-items: center;
		
		/* 背景颜色，半透明 */
		background-color: rgba(245, 245, 245, 0.9);
		
		/* 层级要高，确保覆盖其他内容 */
		z-index: 9999;
	}

	.placeholder-content {
		/* 弹性垂直布局 */
		display: flex;
		flex-direction: column;
		align-items: center;
		
		/* 最大宽度 */
		max-width: 80%;
		
		/* 文本居中 */
		text-align: center;
	}

	.placeholder-icon {
		/* 图标间距 */
		margin-bottom: 20rpx;
	}

	.placeholder-text {
		/* 字体大小 */
		font-size: 32rpx;
		
		/* 文字颜色 */
		color: #666666;
		
		/* 文字粗细 */
		font-weight: 400;
		
		/* 间距 */
		margin: 20rpx 0;
	}

	.placeholder-action {
		/* 操作按钮间距 */
		margin-top: 30rpx;
	}

	/* 适配深色模式 */
	@media (prefers-color-scheme: dark) {
		.custom-placeholder-screen {
			background-color: rgba(50, 50, 50, 0.9);
		}
		
		.placeholder-text {
			color: #cccccc;
		}
	}
</style>