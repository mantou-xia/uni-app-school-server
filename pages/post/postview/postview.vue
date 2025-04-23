<template>
	<view>
		<CustomPostContent v-if="id" :post-id="id" />
		<CustomAdd />
	</view>
</template>

<script>
	import CustomAdd from '@/components/circle/CustomAdd/CustomAdd.vue';
	import CustomPostContent from '@/components/circle/post/CustomPostContent/CustomPostContent.vue';
	export default {
		components: {
			CustomAdd,
			CustomPostContent
		},
		data() {
			return {
				id: 1  // 默认值
			};
		},
		onLoad(options) {
			if (options.id) {
				this.id = options.id;
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #f9f9f9;
}
</style>
