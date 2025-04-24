<template>
	<view>
		<CustomPostContent v-if="id" :post-id="id" @onShare="onShareTriggered" ref="customPostContent" />
		<CustomPostComment />
		<CustomAdd />
	</view>
</template>

<script>
	import CustomAdd from '@/components/circle/CustomAdd/CustomAdd.vue';
	import CustomPostContent from '@/components/circle/post/CustomPostContent/CustomPostContent.vue';
	import CustomPostComment from '@/components/circle/post/CustomPostComment/CustomPostComment.vue';
	export default {
		components: {
			CustomAdd,
			CustomPostContent,
			CustomPostComment
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
		},
		methods: {
			onShareTriggered(data) {
				console.log('wx 对象可用吗？', typeof wx);
				if (data) {
					console.log('开始分享');
					if (typeof wx !== 'undefined' && wx.showShareMenu) {
						console.log('showShareMenu 可用吗？', wx.showShareMenu);
						wx.showShareMenu({
							withShareTicket: true,
							menus: ['shareAppMessage', 'shareTimeline']
						});
					} else {
						console.error('wx 未定义，无法分享');
						uni.showToast({ title: '微信环境不可用', icon: 'error' });
					}
				} else {
					console.error('No data provided for sharing');
					uni.showToast({ title: '分享数据缺失', icon: 'error' });
				}
			},
			onShareAppMessage() {
				const postData = this.$refs.customPostContent ? this.$refs.customPostContent.effectivePostData : {};
				return {
					title: postData.title || '分享帖子',
					path: `/pages/post/postview/postview?id=${this.id}`,  // Ensure id is defined
					imageUrl: postData.images && postData.images.length > 0 ? postData.images[0] : '',
					success: (res) => {
						console.log('分享成功', res);
						uni.showToast({ title: '分享成功', icon: 'success' });
						if (this.$refs.customPostContent) {
							this.$refs.customPostContent.shareCount++;  // Update share count in child component
						}
					},
					fail: (err) => {
						console.error('分享失败', err);
						uni.showToast({ title: '分享失败', icon: 'error' });
					}
				};
			}
		}
	}
</script>

<style lang="scss">
page {
	background-color: #f9f9f9;
}
</style>
