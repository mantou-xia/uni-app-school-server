<template>
	<view class="circle-container">
		<!-- 使用自定义搜索组件，添加输入和搜索事件，指定搜索类型 -->
		<custom-search 
			type="find"
			@input="handleSearchInput" 
			@search="handleSearch"
		></custom-search>
		<custom-hot-list></custom-hot-list>
		<custom-orders></custom-orders>
		<ren-customer-navigator></ren-customer-navigator>

		<!-- 使用CustomAdd组件 -->
		<custom-add @create-post="handleCreatePost"></custom-add>
	</view>
</template>

<script>
import { ref } from 'vue'
import CustomSearch from '@/components/common/CustomSearch/CustomSearch.vue';
import CustomHotList from '@/components/circle/CustomHotList/CustomHotList.vue';
import CustomOrders from '@/components/circle/CustomOrders/CustomOrders.vue';
import CustomAdd from '@/components/circle/CustomAdd/CustomAdd.vue';
import RenCustomerNavigator from '@/components/ren-customer-navigator/ren-customer-navigator.vue';

export default {
	components: {
		CustomSearch,
		CustomHotList,
		CustomOrders,
		CustomAdd,
		RenCustomerNavigator
	},
	setup() {
		// 搜索关键词
		const searchKeyword = ref('')

		// 处理搜索输入事件
		const handleSearchInput = (searchData) => {
			const { keyword, type } = searchData
			searchKeyword.value = keyword
			console.log(`正在${type === 'shopping' ? '商城' : '发现'}搜索:`, keyword)
		}

		// 处理搜索确认事件
		const handleSearch = (searchData) => {
			const { keyword, type } = searchData

			// 根据搜索类型执行不同的搜索逻辑
			if (type === 'shopping') {
				// 商城搜索逻辑
				uni.showModal({
					title: '商城搜索',
					content: `您在商城搜索：${keyword}`,
					showCancel: false,
					confirmText: '确定'
				});
			} else {
				// 发现页搜索逻辑
				uni.showModal({
					title: '发现搜索',
					content: `您在发现页搜索：${keyword}`,
					showCancel: false,
					confirmText: '确定'
				});
			}
		}

		// 处理创建帖子
		const handleCreatePost = () => {
			// 可以添加额外的自定义逻辑
			console.log('准备创建帖子');
		}

		return {
			searchKeyword,
			handleSearchInput,
			handleSearch,
			handleCreatePost
		}
	}
}
</script>

<style lang="scss">
custom-search {
	margin-top: 55rpx;
}

.circle-container {
	position: relative;
	height: 100%;
}
</style>
