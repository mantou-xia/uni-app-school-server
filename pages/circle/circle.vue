<template>
	<view>
		<!-- 使用自定义搜索组件，添加输入和搜索事件，指定搜索类型 -->
		<custom-search 
			type="find"
			@input="handleSearchInput" 
			@search="handleSearch"
		></custom-search>
		<custom-hot-list></custom-hot-list>
		<custom-orders></custom-orders>
		<ren-customer-navigator></ren-customer-navigator>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import CustomSearch from '@/components/common/CustomSearch/CustomSearch.vue';
import CustomHotList from '@/components/circle/CustomHotList/CustomHotList.vue';
import CustomOrders from '@/components/circle/CustomOrders/CustomOrders.vue';
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
		// 可以添加跳转到商城搜索结果页的逻辑
		// uni.navigateTo({ url: `/pages/shopping/search?keyword=${keyword}` });
	} else {
		// 发现页搜索逻辑
		uni.showModal({
			title: '发现搜索',
			content: `您在发现页搜索：${keyword}`,
			showCancel: false,
			confirmText: '确定'
		});
		// 可以添加跳转到发现页搜索结果页的逻辑
		// uni.navigateTo({ url: `/pages/find/search?keyword=${keyword}` });
	}
}
</script>

<style>
custom-search {
	margin-top: 55rpx;
}
</style>
