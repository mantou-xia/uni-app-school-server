<template>
	<view class="custom-search">
		<view class="search-wrapper">
			<text class="search-icon iconfont icon-xinxichaxun"></text>
			<input 
				class="search-input" 
				type="text" 
				:placeholder="placeholder" 
				@input="handleInput"
				@confirm="handleSearch"
			/>
		</view>
	</view>
</template>

<script>
export default {
	name: "CustomSearch",

	// 小程序特有的组件选项
	options: {
		virtualHost: true
	},

	// 接收外部传入的属性
	props: {
		// 输入框占位符
		placeholder: {
			type: String,
			default: '请输入搜索内容'
		}
	},

	// 组件的响应式数据
	data() {
		return {
			// 搜索关键词
			searchKeyword: ''
		};
	},

	// 方法
	methods: {
		// 处理输入事件
		// 当用户在搜索框中输入内容时触发
		// @param {Event} e - 输入事件对象
		// @description 更新搜索关键词并向父组件发送输入事件
		handleInput(e) {
			// 从事件对象中获取输入的值
			this.searchKeyword = e.detail.value;
			
			// 触发自定义的input事件，将当前输入的关键词传递给父组件
			// 这允许父组件实时监听搜索框的输入变化
			this.$emit('input', this.searchKeyword);
		},

		// 处理搜索确认事件
		// 当用户按下回车键或触发搜索动作时调用
		// @description 向父组件发送搜索事件，传递当前搜索关键词
		handleSearch() {
			// 触发自定义的search事件，将当前搜索关键词传递给父组件
			// 父组件可以在这个事件中执行实际的搜索逻辑
			this.$emit('search', this.searchKeyword);
		}
	}
}
</script>

<style lang="scss" scoped>
.custom-search {
	/* 弹性布局 */
	display: flex;
	flex-direction: column;
	align-items: center;
	
	/* 内边距 */
	padding: 20rpx 10rpx;
}

.search-wrapper {
	position: relative;
	width: 95%;
}

.search-icon {
	position: absolute;
	left: 25rpx;
	top: 50%;
	transform: translateY(-50%);
	color: #999999;
	font-size: 35rpx;
	z-index: 2;
}

.search-input {
	/* 输入框样式 */
	width: 100%; 
	height: 90rpx; 
	background-color: #ffffff; // 白色背景
	border-radius: 45rpx;
	padding: 0 30rpx 0 65rpx;
	font-size: 28rpx;
	
	/* 更加明显的边框样式 */
	border: 2rpx solid #c0c0c0; // 稍微加粗边框，使用灰色
	box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, 0.08); // 稍微增强阴影
	transition: all 0.3s ease;
}

.search-input:focus {
	/* 获得焦点时的样式 */
	border-color: #4a90e2; // 聚焦时边框颜色
	box-shadow: 0 4rpx 12rpx rgba(74, 144, 226, 0.2); // 聚焦时阴影更明显
	outline: none; // 移除默认焦点轮廓
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
	.search-icon {
		color: #cccccc;
	}

	.search-input {
		background-color: #2c2c2c; // 稍微深一点的背景
		color: #f0f0f0;
		border-color: #505050; // 深色模式下的边框颜色
	}

	.search-input:focus {
		border-color: #4a90e2;
		box-shadow: 0 4rpx 12rpx rgba(74, 144, 226, 0.3);
	}
}
</style> 