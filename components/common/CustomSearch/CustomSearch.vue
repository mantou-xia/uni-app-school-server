<template>
	<view class="custom-search">
		<!-- 搜索图标 -->
		<view class="search-wrapper">
			<text class="iconfont icon-xinxichaxun search-icon"></text>
			<!-- 添加搜索输入框 -->
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
		// 添加 behaviors 属性
		behaviors: ['wx://component-export'],

		// 导出组件实例
		export() {
			return this
		},

		name: "CustomSearch",

		// 小程序特有的组件选项
		options: {
			// 虚拟宿主，帮助组件在小程序环境中正确渲染
			virtualHost: true,
			// 添加 styleIsolation 以确保样式隔离
			styleIsolation: 'apply-shared'
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
			handleInput(e) {
				this.searchKeyword = e.detail.value;
				// 触发输入事件
				this.$emit('input', this.searchKeyword);
			},

			// 处理搜索确认事件
			handleSearch() {
				// 触发搜索事件
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
	padding: 20rpx;
	margin-top: -55rpx;
}

.search-wrapper {
	position: relative;
	width: 100vw;
}

.search-icon {
	position: absolute;
	left: 30rpx;
	top: 50%;
	transform: translateY(-50%);
	color: #999999;
	font-size: 64rpx;
	z-index: 999;
}

.search-input {
	/* 输入框样式 */
	margin: 0 auto;
	width: 90%; // 扩大宽度
	height: 90rpx; // 稍微增加高度 
	background-color: #fff;
	padding: 0 30rpx 0 105rpx; // 增加左侧内边距以容纳图标
	font-size: 28rpx;
	
	/* 输入框阴影 */
	box-shadow: 0 20rpx 4rpx rgba(0, 0, 0, 0.05);
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
	.search-icon {
		color: #cccccc;
	}

	.search-input {
		background-color: #444444;
		color: #f0f0f0;
	}
}
</style>