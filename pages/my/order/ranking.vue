<template>
    <view class="ranking">
        <!-- 顶部切换器 -->
        <view class="tab-header">
            <view 
                v-for="(tab, index) in tabs" 
                :key="index"
                class="tab-item"
                :class="{ active: currentTab === index }"
                @click="switchTab(index)"
            >
                <text>{{ tab.name }}</text>
                <text class="tab-desc">{{ tab.desc }}</text>
            </view>
        </view>

        <!-- 前三名展示区 -->
        <view class="top-three">
            <view class="rank-item rank-second" :class="{ 'animate-in': showAnimation }">
                <view class="crown silver"></view>
                <image class="avatar" :src="rankList[1]?.avatar || '/static/logo.png'" mode="aspectFill"></image>
                <view class="rank-info">
                    <text class="nickname">{{ rankList[1]?.name || '虚位以待' }}</text>
                    <text class="count">{{ rankList[1]?.count || 0 }}单</text>
                    <text class="earnings">￥{{ rankList[1]?.earnings || 0 }}</text>
                </view>
                <text class="rank-num">2</text>
            </view>
            <view class="rank-item rank-first" :class="{ 'animate-in': showAnimation }">
                <view class="crown gold"></view>
                <image class="avatar" :src="rankList[0]?.avatar || '/static/logo.png'" mode="aspectFill"></image>
                <view class="rank-info">
                    <text class="nickname">{{ rankList[0]?.name || '虚位以待' }}</text>
                    <text class="count">{{ rankList[0]?.count || 0 }}单</text>
                    <text class="earnings">￥{{ rankList[0]?.earnings || 0 }}</text>
                </view>
                <text class="rank-num">1</text>
            </view>
            <view class="rank-item rank-third" :class="{ 'animate-in': showAnimation }">
                <view class="crown bronze"></view>
                <image class="avatar" :src="rankList[2]?.avatar || '/static/logo.png'" mode="aspectFill"></image>
                <view class="rank-info">
                    <text class="nickname">{{ rankList[2]?.name || '虚位以待' }}</text>
                    <text class="count">{{ rankList[2]?.count || 0 }}单</text>
                    <text class="earnings">￥{{ rankList[2]?.earnings || 0 }}</text>
                </view>
                <text class="rank-num">3</text>
            </view>
        </view>

        <!-- 排行榜列表 -->
        <view class="rank-list">
            <view class="list-header">
                <text>排名</text>
                <text>骑手</text>
                <text>接单数</text>
                <text>收入</text>
            </view>
            <scroll-view scroll-y="true" class="list-content">
                <view 
                    class="list-item" 
                    v-for="(item, index) in rankList.slice(3)" 
                    :key="index"
                    :class="{ 'highlight': item.id === myInfo.id }"
                >
                    <text class="list-rank">{{index + 4}}</text>
                    <view class="user-info">
                        <image class="list-avatar" :src="item.avatar" mode="aspectFill"></image>
                        <text class="list-nickname">{{item.name}}</text>
                    </view>
                    <text class="list-count">{{item.count}}单</text>
                    <text class="list-earnings">￥{{item.earnings}}</text>
                </view>
            </scroll-view>
        </view>

        <!-- 我的排名信息 -->
        <view class="my-rank">
            <view class="my-rank-info">
                <image class="my-avatar" :src="myInfo.avatar" mode="aspectFill"></image>
                <view class="my-info">
                    <view class="my-basic-info">
                        <text class="my-name">{{myInfo.name}}</text>
                        <text class="my-rank-tag">第 <text class="my-rank-num">{{myInfo.rank}}</text> 名</text>
                    </view>
                    <view class="my-stats">
                        <view class="stat-item">
                            <text class="stat-label">完成订单</text>
                            <text class="stat-value">{{myInfo.count}}单</text>
                        </view>
                        <view class="stat-item">
                            <text class="stat-label">总收入</text>
                            <text class="stat-value">￥{{myInfo.earnings}}</text>
                        </view>
                        <view class="stat-item">
                            <text class="stat-label">好评率</text>
                            <text class="stat-value">{{myInfo.rating}}%</text>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            currentTab: 0,
            showAnimation: false,
            tabs: [
                { name: '日榜', desc: '今日数据' },
                { name: '周榜', desc: '本周数据' },
                { name: '月榜', desc: '本月数据' }
            ],
            rankList: [
                { id: 1, name: '李四', count: 108, earnings: 1280, avatar: '/static/logo.png', rating: 98 },
                { id: 2, name: '张三', count: 92, earnings: 1080, avatar: '/static/logo.png', rating: 96 },
                { id: 3, name: '王五', count: 87, earnings: 960, avatar: '/static/logo.png', rating: 95 },
                { id: 4, name: '赵六', count: 82, earnings: 920, avatar: '/static/logo.png', rating: 94 },
                { id: 5, name: '钱七', count: 76, earnings: 850, avatar: '/static/logo.png', rating: 93 },
                { id: 6, name: '孙八', count: 71, earnings: 780, avatar: '/static/logo.png', rating: 92 },
                { id: 7, name: '周九', count: 68, earnings: 720, avatar: '/static/logo.png', rating: 91 },
                { id: 8, name: '吴十', count: 65, earnings: 680, avatar: '/static/logo.png', rating: 90 }
            ],
            myInfo: {
                id: 5,
                name: '我的昵称',
                rank: 16,
                count: 45,
                earnings: 520,
                avatar: '/static/logo.png',
                rating: 95
            }
        }
    },
    mounted() {
        // 添加入场动画
        setTimeout(() => {
            this.showAnimation = true
        }, 300)
    },
    methods: {
        switchTab(index) {
            if (this.currentTab === index) return
            this.currentTab = index
            // 这里可以添加切换数据的逻辑
            uni.showLoading({
                title: '加载中'
            })
            setTimeout(() => {
                uni.hideLoading()
            }, 500)
        }
    }
}
</script>

<style>
.ranking {
    background-color: #f8f9fa;
    min-height: 100vh;
    padding-bottom: 180rpx;
}

.tab-header {
    display: flex;
    background: #fff;
    padding: 20rpx;
    border-bottom: 1rpx solid #eee;
}

.tab-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20rpx 0;
    position: relative;
}

.tab-item.active {
    color: #3498db;
}

.tab-item.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    width: 40rpx;
    height: 4rpx;
    background: #3498db;
    border-radius: 2rpx;
}

.tab-desc {
    font-size: 24rpx;
    color: #999;
    margin-top: 6rpx;
}

.top-three {
    background: linear-gradient(180deg, #3498db, #2980b9);
    padding: 80rpx 40rpx 60rpx;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.rank-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0 20rpx;
    opacity: 0;
    transform: translateY(30rpx);
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.5s ease-out;
}

.rank-first {
    margin-top: -40rpx;
}

.crown {
    width: 60rpx;
    height: 60rpx;
    position: absolute;
    top: -40rpx;
    background-size: contain;
    background-repeat: no-repeat;
}

.gold {
    background-image: linear-gradient(45deg, #FFD700, #FFA500);
}

.silver {
    background-image: linear-gradient(45deg, #C0C0C0, #A9A9A9);
}

.bronze {
    background-image: linear-gradient(45deg, #CD7F32, #8B4513);
}

.avatar {
    width: 120rpx;
    height: 120rpx;
    border-radius: 50%;
    border: 4rpx solid #fff;
    box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.1);
}

.rank-first .avatar {
    width: 160rpx;
    height: 160rpx;
}

.rank-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 16rpx;
}

.nickname {
    font-size: 28rpx;
    color: #fff;
    font-weight: bold;
}

.count {
    font-size: 24rpx;
    color: rgba(255,255,255,0.9);
    margin-top: 8rpx;
}

.earnings {
    font-size: 24rpx;
    color: #FFD700;
    margin-top: 4rpx;
}

.rank-num {
    position: absolute;
    top: -20rpx;
    width: 48rpx;
    height: 48rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 28rpx;
    font-weight: bold;
    box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.1);
}

.rank-first .rank-num {
    background-color: #f1c40f;
}

.rank-second .rank-num {
    background-color: #bdc3c7;
}

.rank-third .rank-num {
    background-color: #d35400;
}

.rank-list {
    background-color: #fff;
    margin: 20rpx;
    border-radius: 16rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 10rpx rgba(0,0,0,0.05);
}

.list-header {
    display: flex;
    padding: 20rpx;
    background: #f8f9fa;
    font-size: 24rpx;
    color: #666;
}

.list-header text {
    flex: 1;
    text-align: center;
}

.list-content {
    max-height: 600rpx;
}

.list-item {
    display: flex;
    align-items: center;
    padding: 20rpx;
    border-bottom: 1rpx solid #f0f0f0;
}

.list-item.highlight {
    background-color: rgba(52,152,219,0.1);
}

.list-rank {
    width: 60rpx;
    color: #666;
    font-size: 28rpx;
    text-align: center;
}

.user-info {
    flex: 1;
    display: flex;
    align-items: center;
}

.list-avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 50%;
    margin-right: 20rpx;
}

.list-nickname {
    font-size: 28rpx;
    color: #333;
}

.list-count, .list-earnings {
    flex: 1;
    text-align: center;
    font-size: 28rpx;
    color: #666;
}

.my-rank {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 30rpx;
    box-shadow: 0 -4rpx 10rpx rgba(0,0,0,0.05);
}

.my-rank-info {
    display: flex;
    align-items: center;
}

.my-avatar {
    width: 100rpx;
    height: 100rpx;
    border-radius: 50%;
    margin-right: 20rpx;
}

.my-info {
    flex: 1;
}

.my-basic-info {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;
}

.my-name {
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
    margin-right: 20rpx;
}

.my-rank-tag {
    background: rgba(52,152,219,0.1);
    color: #3498db;
    padding: 4rpx 16rpx;
    border-radius: 20rpx;
    font-size: 24rpx;
}

.my-rank-num {
    font-weight: bold;
    font-size: 28rpx;
}

.my-stats {
    display: flex;
    justify-content: space-between;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-label {
    font-size: 24rpx;
    color: #666;
    margin-bottom: 4rpx;
}

.stat-value {
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
}
</style> 