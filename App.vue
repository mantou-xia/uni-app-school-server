<script>
import goToPage from '@/static/utils/goToPage.js'
export default {
	onLaunch: function () {
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style>
@import '@/static/font/iconfont.css';

/*每个页面公共css */
/* 全部页面的padding */
page {
	padding: 20rpx;
	box-sizing: border-box;
}

/* 容器通用样式 */
.container {
	width: 100%;
	padding: 20rpx;
	box-sizing: border-box;
}
</style>
