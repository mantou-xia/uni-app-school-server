<template>
    <view class="verify-container">
        <view class="verify-form">
            <view class="form-item">
                <text class="label">真实姓名</text>
                <input 
                    type="text" 
                    v-model="formData.realName" 
                    placeholder="请输入真实姓名"
                    class="input"
                />
            </view>
            
            <view class="form-item">
                <text class="label">身份证号</text>
                <input 
                    type="idcard" 
                    v-model="formData.idCard" 
                    placeholder="请输入18位身份证号"
                    class="input"
                    maxlength="18"
                />
            </view>

            <view class="form-item">
                <text class="label">学生证照片</text>
                <view class="upload-box" @click="chooseImage('studentCard')" v-if="!formData.studentCardImage">
                    <uni-icons type="camera" size="24" color="#999"></uni-icons>
                    <text class="upload-text">上传学生证照片</text>
                </view>
                <view class="image-preview" v-else>
                    <image :src="formData.studentCardImage" mode="aspectFill"></image>
                    <view class="delete-btn" @click.stop="deleteImage('studentCard')">
                        <uni-icons type="trash" size="20" color="#fff"></uni-icons>
                    </view>
                </view>
            </view>

            <view class="form-item">
                <text class="label">手持身份证照片</text>
                <view class="upload-box" @click="chooseImage('idCardHold')" v-if="!formData.idCardHoldImage">
                    <uni-icons type="camera" size="24" color="#999"></uni-icons>
                    <text class="upload-text">上传手持身份证照片</text>
                </view>
                <view class="image-preview" v-else>
                    <image :src="formData.idCardHoldImage" mode="aspectFill"></image>
                    <view class="delete-btn" @click.stop="deleteImage('idCardHold')">
                        <uni-icons type="trash" size="20" color="#fff"></uni-icons>
                    </view>
                </view>
            </view>

            <view class="tips">
                <text class="tips-title">温馨提示：</text>
                <text class="tips-content">1. 请确保上传的证件照片清晰完整</text>
                <text class="tips-content">2. 手持身份证照片需要本人面部和身份证同框</text>
                <text class="tips-content">3. 所有信息仅用于实名认证，我们将严格保密</text>
            </view>

            <button class="submit-btn" @click="submitVerify" :disabled="!isFormValid">
                提交认证
            </button>
        </view>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const formData = ref({
    realName: '',
    idCard: '',
    studentCardImage: '',
    idCardHoldImage: ''
})

// 表单验证
const isFormValid = computed(() => {
    return formData.value.realName && 
           formData.value.idCard && 
           formData.value.studentCardImage && 
           formData.value.idCardHoldImage &&
           formData.value.idCard.length === 18
})

// 选择图片
const chooseImage = (type) => {
    uni.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: (res) => {
            const tempFilePath = res.tempFilePaths[0]
            if (type === 'studentCard') {
                formData.value.studentCardImage = tempFilePath
            } else {
                formData.value.idCardHoldImage = tempFilePath
            }
        }
    })
}

// 删除图片
const deleteImage = (type) => {
    if (type === 'studentCard') {
        formData.value.studentCardImage = ''
    } else {
        formData.value.idCardHoldImage = ''
    }
}

// 提交认证
const submitVerify = () => {
    if (!isFormValid.value) {
        uni.showToast({
            title: '请完善所有信息',
            icon: 'none'
        })
        return
    }

    uni.showLoading({
        title: '提交中'
    })

    // 这里模拟上传图片和提交认证信息的过程
    setTimeout(() => {
        uni.hideLoading()
        
        // 保存认证状态
        uni.setStorageSync('userVerifyStatus', {
            isVerified: true,
            verifyTime: new Date().getTime()
        })
        
        uni.showToast({
            title: '认证成功',
            icon: 'success'
        })
        
        // 延迟返回上一页
        setTimeout(() => {
            uni.navigateBack()
        }, 1500)
    }, 2000)
}
</script>

<style>
.verify-container {
    min-height: 100vh;
    background-color: #f8f9fa;
    padding: 30rpx;
}

.verify-form {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.05);
}

.form-item {
    margin-bottom: 40rpx;
}

.label {
    display: block;
    font-size: 28rpx;
    color: #333;
    margin-bottom: 20rpx;
    font-weight: 500;
}

.input {
    width: 100%;
    height: 88rpx;
    background-color: #f8f9fa;
    border-radius: 12rpx;
    padding: 0 30rpx;
    font-size: 28rpx;
    color: #333;
}

.upload-box {
    width: 100%;
    height: 300rpx;
    background-color: #f8f9fa;
    border-radius: 12rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20rpx;
}

.upload-text {
    font-size: 28rpx;
    color: #999;
}

.image-preview {
    width: 100%;
    height: 300rpx;
    position: relative;
    border-radius: 12rpx;
    overflow: hidden;
}

.image-preview image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.delete-btn {
    position: absolute;
    top: 20rpx;
    right: 20rpx;
    width: 60rpx;
    height: 60rpx;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 30rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.tips {
    margin: 40rpx 0;
    padding: 20rpx;
    background-color: #fff7e6;
    border-radius: 12rpx;
}

.tips-title {
    display: block;
    font-size: 28rpx;
    color: #f39c12;
    margin-bottom: 16rpx;
    font-weight: 500;
}

.tips-content {
    display: block;
    font-size: 24rpx;
    color: #666;
    line-height: 1.6;
    margin-bottom: 8rpx;
}

.submit-btn {
    width: 100%;
    height: 88rpx;
    line-height: 88rpx;
    background: linear-gradient(135deg, #3498db, #2980b9);
    color: #fff;
    border-radius: 44rpx;
    font-size: 32rpx;
    margin-top: 60rpx;
    font-weight: 500;
    letter-spacing: 2rpx;
}

.submit-btn[disabled] {
    background: linear-gradient(135deg, #bdc3c7, #95a5a6);
    opacity: 0.8;
}

.submit-btn:active {
    transform: scale(0.98);
}
</style> 