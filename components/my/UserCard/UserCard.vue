<template>
     <!-- 用户信息卡片 -->
     <view class="user-card">
            <view class="user-info">
                <image class="avatar" src="/static/logo.png" mode="aspectFill"></image>
                <view class="user-details">
                    <text class="username">憋佬仔</text>
                    <text class="phone">电话：138****8888</text>
                    <text class="school">学校：南京信息工程大学</text>
                </view>
            </view>
        </view>
</template>
<script>
export default {
       name: "UserCard",
       components: {
       },
       data() {
           return {
           };
       },
       methods: {
           
       }
   }
</script>

<style>
.user-card {
    background-color: #ffffff;
    padding: 20px;
    margin-bottom: 10px;
}

.user-info {
    display: flex;
    align-items: center;
}

.avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
}

.user-details {
    flex: 1;
}

.username {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    margin-bottom: 8px;
    display: block;
}

.phone, .school {
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
    display: block;
}
</style>