<template>
	<view class="market-container">
		<!-- 搜索栏 -->
		<view class="search-bar">
			<view class="search-input">
				<uni-icons type="search" size="18" color="#666"></uni-icons>
				<input type="text" placeholder="搜索二手商品" v-model="searchText" @confirm="searchItems" />
			</view>
			<view class="filter-button" @click="toggleFilterPanel">
				<uni-icons type="bars" size="22" color="#4b7bec"></uni-icons>
			</view>
		</view>
		
		<!-- 分类菜单 -->
		<view class="category-scroll">
			<scroll-view scroll-x="true" class="scroll-view">
				<view class="category-list">
					<view 
						v-for="(category, index) in categories" 
						:key="index" 
						class="category-item"
						:class="{ active: selectedCategory === category }"
						@click="selectCategory(category)">
						{{ category }}
					</view>
				</view>
			</scroll-view>
		</view>
		
		<!-- 商品列表 -->
		<scroll-view scroll-y="true" class="items-scroll">
			<view class="items-container">
				<view 
					v-for="(item, index) in filteredItems" 
					:key="index" 
					class="item-card"
					@click="viewItemDetail(item.id)">
					<view class="item-image">
						<!-- 使用占位图 -->
						<image :src="getItemImage(item.category)" mode="aspectFill"></image>
						<view class="item-status" v-if="item.status === 'sold'">已售</view>
					</view>
					<view class="item-info">
						<view class="item-title">{{ item.title }}</view>
						<view class="item-meta">
							<view class="item-price">¥{{ item.price }}</view>
							<view class="item-time">{{ item.publishTime }}</view>
						</view>
						<view class="item-desc">{{ item.description }}</view>
						<view class="item-footer">
							<view class="seller-info">
								<view class="seller-avatar"></view>
								<text class="seller-name">{{ item.seller.name }}</text>
							</view>
							<view class="item-likes">
								<uni-icons type="heart" size="14" color="#999"></uni-icons>
								<text>{{ item.likes }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="loading-more" v-if="isLoading">加载中...</view>
			<view class="no-more" v-if="noMoreItems">没有更多了</view>
		</scroll-view>
		
		<!-- 悬浮按钮 -->
		<view class="fab-button" @click="publishItem">
			<uni-icons type="plus" size="24" color="#fff"></uni-icons>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			searchText: '',
			selectedCategory: '全部',
			categories: ['全部', '数码', '图书', '服装', '家电', '运动', '日用', '其他'],
			isLoading: false,
			noMoreItems: false,
			currentPage: 1,
			items: [
				{
					id: 1,
					title: 'iPad 2020 128G',
					description: '95新，无划痕，配件齐全，仅当地交易',
					price: '2199',
					category: '数码',
					status: 'available',
					publishTime: '1小时前',
					likes: 12,
					seller: {
						id: 101,
						name: '林小明'
					}
				},
				{
					id: 2,
					title: '高等数学第七版',
					description: '同济大学高数教材，笔记很全，有习题解析',
					price: '35',
					category: '图书',
					status: 'available',
					publishTime: '3小时前',
					likes: 5,
					seller: {
						id: 102,
						name: '张文学'
					}
				},
				{
					id: 3,
					title: 'Nike 运动套装',
					description: 'L码，穿过几次，无破损，9成新',
					price: '169',
					category: '服装',
					status: 'available',
					publishTime: '昨天',
					likes: 8,
					seller: {
						id: 103,
						name: '李运动'
					}
				},
				{
					id: 4,
					title: '小米台灯',
					description: '大学生护眼灯，可调亮度，USB供电',
					price: '89',
					category: '日用',
					status: 'sold',
					publishTime: '3天前',
					likes: 20,
					seller: {
						id: 104,
						name: '陈小米'
					}
				},
				{
					id: 5,
					title: '无线蓝牙耳机',
					description: '苹果华为小米通用，电池续航好',
					price: '129',
					category: '数码',
					status: 'available',
					publishTime: '4天前',
					likes: 15,
					seller: {
						id: 105,
						name: '王数码'
					}
				},
				{
					id: 6,
					title: '迷你小冰箱',
					description: '宿舍用小冰箱，低噪音，节能',
					price: '399',
					category: '家电',
					status: 'available',
					publishTime: '5天前',
					likes: 25,
					seller: {
						id: 106,
						name: '赵电器'
					}
				}
			]
		};
	},
	computed: {
		filteredItems() {
			let result = this.items;
			
			// 按分类筛选
			if (this.selectedCategory !== '全部') {
				result = result.filter(item => item.category === this.selectedCategory);
			}
			
			// 按搜索文本筛选
			if (this.searchText.trim() !== '') {
				const searchLower = this.searchText.toLowerCase().trim();
				result = result.filter(item => 
					item.title.toLowerCase().includes(searchLower) ||
					item.description.toLowerCase().includes(searchLower)
				);
			}
			
			return result;
		}
	},
	methods: {
		searchItems() {
			// 搜索逻辑
			console.log('搜索:', this.searchText);
		},
		toggleFilterPanel() {
			// 显示筛选面板
			uni.showToast({
				title: '筛选功能开发中',
				icon: 'none'
			});
		},
		selectCategory(category) {
			this.selectedCategory = category;
		},
		loadMoreItems() {
			if (this.isLoading || this.noMoreItems) return;
			
			this.isLoading = true;
			
			// 模拟加载更多
			setTimeout(() => {
				this.isLoading = false;
				
				// 假设没有更多数据了
				if (this.currentPage >= 2) {
					this.noMoreItems = true;
				} else {
					this.currentPage++;
					// 这里可以添加更多商品数据
				}
			}, 1000);
		},
		viewItemDetail(id) {
			// 暂时显示提示
			uni.showToast({
				title: '商品详情页开发中',
				icon: 'none'
			});
			// uni.navigateTo({
			// 	url: `/pages/index_secondHandMarket/item_detail/item_detail?id=${id}`
			// });
		},
		publishItem() {
			// 暂时显示提示
			uni.showToast({
				title: '发布功能开发中',
				icon: 'none'
			});
			// uni.navigateTo({
			// 	url: '/pages/index_secondHandMarket/publish_item/publish_item'
			// });
		},
		getItemImage(category) {
			// 提供默认图片，基于分类返回不同的占位图
			switch(category) {
				case '数码': return '/static/placeholder_digital.png';
				case '图书': return '/static/placeholder_book.png';
				case '服装': return '/static/placeholder_clothes.png';
				case '家电': return '/static/placeholder_appliance.png';
				case '运动': return '/static/placeholder_sports.png';
				case '日用': return '/static/placeholder_daily.png';
				default: return '/static/placeholder_common.png';
			}
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
	height: 100%;
	padding: 0;
}

.market-container {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	width: 100%;
	position: relative;
}

/* 搜索栏 */
.search-bar {
	display: flex;
	align-items: center;
	padding: 20rpx 30rpx;
	background-color: #fff;
	border-bottom: 1rpx solid #eee;
	width: 100%;
	box-sizing: border-box;
}

.search-input {
	flex: 1;
	height: 70rpx;
	background-color: #f0f2f5;
	border-radius: 35rpx;
	display: flex;
	align-items: center;
	padding: 0 20rpx;
}

.search-input input {
	flex: 1;
	height: 100%;
	margin-left: 10rpx;
	font-size: 28rpx;
}

.filter-button {
	width: 80rpx;
	height: 70rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-left: 20rpx;
}

/* 分类菜单 */
.category-scroll {
	background-color: #fff;
	padding: 0 0 10rpx 0;
	border-bottom: 1rpx solid #eee;
	width: 100%;
}

.scroll-view {
	white-space: nowrap;
	width: 100%;
}

.category-list {
	display: inline-flex;
	padding: 0 20rpx;
}

.category-item {
	display: inline-block;
	padding: 10rpx 30rpx;
	margin-right: 20rpx;
	font-size: 28rpx;
	color: #666;
	position: relative;
	transition: all 0.3s;
}

.category-item.active {
	color: #4b7bec;
	font-weight: bold;
}

.category-item.active::after {
	content: '';
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 40rpx;
	height: 4rpx;
	background-color: #4b7bec;
	border-radius: 2rpx;
}

/* 商品列表 */
.items-scroll {
	flex: 1;
	padding: 20rpx;
	height: calc(100vh - 180rpx); /* 调整高度，减去头部高度 */
	box-sizing: border-box;
}

.items-container {
	display: flex;
	flex-direction: column;
	gap: 20rpx;
}

.item-card {
	background-color: #fff;
	border-radius: 12rpx;
	overflow: hidden;
	box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.05);
}

.item-image {
	width: 100%;
	height: 300rpx;
	position: relative;
	background-color: #f0f2f5;
}

.item-image image {
	width: 100%;
	height: 100%;
}

.item-status {
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	background-color: rgba(0, 0, 0, 0.5);
	color: #fff;
	padding: 6rpx 20rpx;
	border-radius: 30rpx;
	font-size: 24rpx;
}

.item-info {
	padding: 20rpx;
}

.item-title {
	font-size: 32rpx;
	font-weight: bold;
	margin-bottom: 10rpx;
	color: #333;
}

.item-meta {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10rpx;
}

.item-price {
	font-size: 36rpx;
	font-weight: bold;
	color: #ff6b6b;
}

.item-time {
	font-size: 24rpx;
	color: #999;
	line-height: 48rpx;
}

.item-desc {
	font-size: 26rpx;
	color: #666;
	margin-bottom: 16rpx;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}

.item-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 20rpx;
	padding-top: 20rpx;
	border-top: 1rpx solid #f0f2f5;
}

.seller-info {
	display: flex;
	align-items: center;
}

.seller-avatar {
	width: 40rpx;
	height: 40rpx;
	border-radius: 50%;
	margin-right: 10rpx;
	background-color: #e0e0e0;
}

.seller-name {
	font-size: 24rpx;
	color: #666;
}

.item-likes {
	display: flex;
	align-items: center;
	gap: 8rpx;
	font-size: 24rpx;
	color: #999;
}

/* 加载更多 */
.loading-more, .no-more {
	text-align: center;
	padding: 30rpx 0;
	font-size: 24rpx;
	color: #999;
}

/* 发布按钮 */
.fab-button {
	position: fixed;
	right: 40rpx;
	bottom: 100rpx;
	width: 100rpx;
	height: 100rpx;
	border-radius: 50%;
	background: linear-gradient(135deg, #4b7bec, #3867d6);
	display: flex;
	align-items: center;
	justify-content: center;
	box-shadow: 0 6rpx 20rpx rgba(75, 123, 236, 0.4);
	z-index: 999;
}
</style>
