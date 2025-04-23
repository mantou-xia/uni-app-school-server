<template>
    <view class="apply">
        <view class="form-group">
            <view class="form-item">
                <text class="label">姓名</text>
                <input 
                    type="text"
                    v-model="form.name"
                    placeholder="请输入真实姓名"
                    class="input"
                />
            </view>
            <view class="form-item">
                <text class="label">学号</text>
                <input 
                    type="text"
                    v-model="form.studentId"
                    placeholder="请输入学号"
                    class="input"
                />
            </view>
            <view class="form-item">
                <text class="label">手机号</text>
                <input 
                    type="number"
                    v-model="form.phone"
                    placeholder="请输入手机号"
                    class="input"
                />
            </view>
            <view class="form-item">
                <text class="label">身份证号</text>
                <input 
                    type="idcard"
                    v-model="form.idCard"
                    placeholder="请输入身份证号"
                    class="input"
                />
            </view>
        </view>

        <view class="upload-group">
            <view class="upload-title">证件照片</view>
            <view class="upload-list">
                <view class="upload-item">
                    <image 
                        v-if="form.idCardFront"
                        :src="form.idCardFront"
                        mode="aspectFill"
                        class="preview"
                    ></image>
                    <view v-else class="upload-btn" @click="uploadImage('idCardFront')">
                        <uni-icons type="camera" size="24" color="#999"></uni-icons>
                        <text class="upload-text">身份证正面</text>
                    </view>
                </view>
                <view class="upload-item">
                    <image 
                        v-if="form.idCardBack"
                        :src="form.idCardBack"
                        mode="aspectFill"
                        class="preview"
                    ></image>
                    <view v-else class="upload-btn" @click="uploadImage('idCardBack')">
                        <uni-icons type="camera" size="24" color="#999"></uni-icons>
                        <text class="upload-text">身份证反面</text>
                    </view>
                </view>
                <view class="upload-item">
                    <image 
                        v-if="form.studentCard"
                        :src="form.studentCard"
                        mode="aspectFill"
                        class="preview"
                    ></image>
                    <view v-else class="upload-btn" @click="uploadImage('studentCard')">
                        <uni-icons type="camera" size="24" color="#999"></uni-icons>
                        <text class="upload-text">学生证照片</text>
                    </view>
                </view>
            </view>
        </view>

        <view class="agreement">
            <checkbox 
                :checked="form.agreement"
                @click="form.agreement = !form.agreement"
                color="#3498db"
            ></checkbox>
            <text class="agreement-text">
                我已阅读并同意
                <text class="link" @click="showAgreement">《骑手服务协议》</text>
            </text>
        </view>

        <button 
            class="submit-btn"
            :disabled="!isValid"
            :class="{ disabled: !isValid }"
            @click="submit"
        >提交申请</button>
    </view>
</template>

<script setup>
import { ref, computed } from 'vue'

const form = ref({
    name: '',
    studentId: '',
    phone: '',
    idCard: '',
    idCardFront: '',
    idCardBack: '',
    studentCard: '',
    agreement: false
})

const isValid = computed(() => {
    return form.value.name &&
        form.value.studentId &&
        form.value.phone &&
        form.value.idCard &&
        form.value.idCardFront &&
        form.value.idCardBack &&
        form.value.studentCard &&
        form.value.agreement
})

const uploadImage = (type) => {
    uni.chooseImage({
        count: 1,
        success: (res) => {
            // TODO: 上传图片到服务器
            form.value[type] = res.tempFilePaths[0]
        }
    })
}

const showAgreement = () => {
    uni.navigateTo({
        url: '/pages/agreement/rider'
    })
}

const submit = () => {
    if (!isValid.value) return

    uni.showLoading({
        title: '提交中'
    })

    // TODO: 调用申请接口
    setTimeout(() => {
        uni.hideLoading()
        uni.showToast({
            title: '申请已提交',
            icon: 'success'
        })
        
        // 返回上一页
        setTimeout(() => {
            uni.navigateBack()
        }, 1500)
    }, 2000)
}
</script>

<style>
.apply {
    padding: 20px;
}

.form-group {
    background-color: #fff;
    border-radius: 8px;
    padding: 0 15px;
    margin-bottom: 20px;
}

.form-item {
    display: flex;
    align-items: center;
    padding: 15px 0;
    border-bottom: 1px solid #eee;
}

.form-item:last-child {
    border-bottom: none;
}

.label {
    width: 80px;
    font-size: 14px;
    color: #333;
}

.input {
    flex: 1;
    font-size: 14px;
}

.upload-group {
    background-color: #fff;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
}

.upload-title {
    font-size: 14px;
    color: #333;
    margin-bottom: 15px;
}

.upload-list {
    display: flex;
    justify-content: space-between;
}

.upload-item {
    width: 30%;
    aspect-ratio: 1.6;
    border-radius: 4px;
    overflow: hidden;
}

.upload-btn {
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.upload-text {
    font-size: 12px;
    color: #999;
    margin-top: 5px;
}

.preview {
    width: 100%;
    height: 100%;
}

.agreement {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
}

.agreement-text {
    font-size: 14px;
    color: #666;
    margin-left: 5px;
}

.link {
    color: #3498db;
}

.submit-btn {
    background-color: #3498db;
    color: #fff;
    border-radius: 4px;
}

.submit-btn.disabled {
    opacity: 0.6;
}
</style> 