<template>
    <view class="ranking">
        <view class="top-three">
            <view class="rank-item rank-second">
                <image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
                <text class="nickname">张三</text>
                <text class="count">92单</text>
                <text class="rank-num">2</text>
            </view>
            <view class="rank-item rank-first">
                <image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
                <text class="nickname">李四</text>
                <text class="count">108单</text>
                <text class="rank-num">1</text>
            </view>
            <view class="rank-item rank-third">
                <image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
                <text class="nickname">王五</text>
                <text class="count">87单</text>
                <text class="rank-num">3</text>
            </view>
        </view>

        <view class="rank-list">
            <view class="list-item" v-for="(item, index) in rankList" :key="index">
                <text class="list-rank">{{index + 4}}</text>
                <image class="list-avatar" src="/static/logo.png" mode="aspectFill"></image>
                <text class="list-nickname">{{item.name}}</text>
                <text class="list-count">{{item.count}}单</text>
            </view>
        </view>

        <view class="my-rank">
            <view class="my-rank-info">
                <text class="my-rank-text">我的排名：</text>
                <text class="my-rank-num">16</text>
                <text class="my-order-count">完成订单：45单</text>
            </view>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const rankList = ref([
    { name: '赵六', count: 82 },
    { name: '钱七', count: 76 },
    { name: '孙八', count: 71 },
    { name: '周九', count: 68 },
    { name: '吴十', count: 65 }
])
</script>

<style>
.ranking {
    background-color: #f5f5f5;
    min-height: 100vh;
}

.top-three {
    background: linear-gradient(180deg, #3498db, #f5f5f5);
    padding: 60px 20px 30px;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.rank-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0 10px;
}

.rank-first {
    margin-top: -30px;
}

.avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 2px solid #fff;
}

.rank-first .avatar {
    width: 80px;
    height: 80px;
}

.nickname {
    font-size: 14px;
    color: #333;
    margin-top: 8px;
}

.count {
    font-size: 12px;
    color: #666;
    margin-top: 4px;
}

.rank-num {
    position: absolute;
    top: -20px;
    width: 24px;
    height: 24px;
    background-color: #f1c40f;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
}

.rank-second .rank-num {
    background-color: #bdc3c7;
}

.rank-third .rank-num {
    background-color: #d35400;
}

.rank-list {
    background-color: #fff;
    margin: 10px;
    border-radius: 8px;
    padding: 10px;
}

.list-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #f0f0f0;
}

.list-item:last-child {
    border-bottom: none;
}

.list-rank {
    width: 30px;
    color: #666;
    font-size: 14px;
}

.list-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.list-nickname {
    flex: 1;
    font-size: 14px;
    color: #333;
}

.list-count {
    font-size: 14px;
    color: #666;
}

.my-rank {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding: 15px 20px;
    box-shadow: 0 -2px 10px rgba(0,0,0,0.05);
}

.my-rank-info {
    display: flex;
    align-items: center;
}

.my-rank-text {
    font-size: 14px;
    color: #666;
}

.my-rank-num {
    font-size: 20px;
    color: #3498db;
    font-weight: bold;
    margin: 0 10px;
}

.my-order-count {
    font-size: 14px;
    color: #666;
    margin-left: auto;
}
</style> 