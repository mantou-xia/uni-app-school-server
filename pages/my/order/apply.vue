<template>
    <view class="apply">
        <!-- 顶部进度指示器 -->
        <view class="progress-bar">
            <view 
                v-for="(step, index) in steps" 
                :key="index" 
                class="step"
                :class="{ 'active': currentStep >= index, 'completed': currentStep > index }"
            >
                <view class="step-dot">
                    <uni-icons 
                        v-if="currentStep > index"
                        type="checkmarkempty" 
                        size="14" 
                        color="#fff"
                    ></uni-icons>
                    <text v-else>{{ index + 1 }}</text>
                </view>
                <text class="step-text">{{ step }}</text>
                <view class="step-line" v-if="index < steps.length - 1"></view>
            </view>
        </view>

        <!-- 基本信息表单 -->
        <swiper class="form-swiper" :current="currentStep" @change="handleSwiperChange">
            <swiper-item>
                <scroll-view scroll-y="true" class="form-scroll">
                    <view class="form-group">
                        <view class="group-title">
                            <uni-icons type="person" size="20" color="#3498db"></uni-icons>
                            <text>基本信息</text>
                        </view>
                        <view class="form-item">
                            <text class="label required">姓名</text>
                            <input 
                                type="text"
                                v-model="form.name"
                                placeholder="请输入真实姓名"
                                class="input"
                            />
                        </view>
                        <view class="form-item">
                            <text class="label required">学号</text>
                            <input 
                                type="text"
                                v-model="form.studentId"
                                placeholder="请输入学号"
                                class="input"
                                @blur="validateStudentId"
                            />
                        </view>
                        <view class="form-item">
                            <text class="label required">手机号</text>
                            <input 
                                type="number"
                                v-model="form.phone"
                                placeholder="请输入手机号"
                                class="input"
                                @blur="validatePhone"
                            />
                            <view class="verify-btn" @click="sendVerifyCode" v-if="!countdown">
                                获取验证码
                            </view>
                            <view class="verify-btn disabled" v-else>
                                {{ countdown }}s
                            </view>
                        </view>
                        <view class="form-item" v-if="showVerifyCode">
                            <text class="label required">验证码</text>
                            <input 
                                type="number"
                                v-model="form.verifyCode"
                                placeholder="请输入验证码"
                                class="input"
                                maxlength="6"
                            />
                        </view>
                        <view class="form-item">
                            <text class="label required">身份证号</text>
                            <input 
                                type="idcard"
                                v-model="form.idCard"
                                placeholder="请输入身份证号"
                                class="input"
                                @blur="validateIdCard"
                            />
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>

            <!-- 证件上传页 -->
            <swiper-item>
                <scroll-view scroll-y="true" class="form-scroll">
                    <view class="upload-group">
                        <view class="group-title">
                            <uni-icons type="camera" size="20" color="#3498db"></uni-icons>
                            <text>证件照片</text>
                        </view>
                        <view class="upload-tips">请上传清晰的证件照片，确保信息完整可见</view>
                        <view class="upload-list">
                            <view class="upload-item">
                                <image 
                                    v-if="form.idCardFront"
                                    :src="form.idCardFront"
                                    mode="aspectFill"
                                    class="preview"
                                    @click="previewImage('idCardFront')"
                                ></image>
                                <view v-else class="upload-btn" @click="uploadImage('idCardFront')">
                                    <uni-icons type="camera" size="24" color="#999"></uni-icons>
                                    <text class="upload-text">身份证正面</text>
                                    <text class="upload-desc">请上传正面照片</text>
                                </view>
                                <view class="upload-mask" v-if="form.idCardFront" @click="uploadImage('idCardFront')">
                                    <text>重新上传</text>
                                </view>
                            </view>
                            <view class="upload-item">
                                <image 
                                    v-if="form.idCardBack"
                                    :src="form.idCardBack"
                                    mode="aspectFill"
                                    class="preview"
                                    @click="previewImage('idCardBack')"
                                ></image>
                                <view v-else class="upload-btn" @click="uploadImage('idCardBack')">
                                    <uni-icons type="camera" size="24" color="#999"></uni-icons>
                                    <text class="upload-text">身份证反面</text>
                                    <text class="upload-desc">请上传反面照片</text>
                                </view>
                                <view class="upload-mask" v-if="form.idCardBack" @click="uploadImage('idCardBack')">
                                    <text>重新上传</text>
                                </view>
                            </view>
                            <view class="upload-item">
                                <image 
                                    v-if="form.studentCard"
                                    :src="form.studentCard"
                                    mode="aspectFill"
                                    class="preview"
                                    @click="previewImage('studentCard')"
                                ></image>
                                <view v-else class="upload-btn" @click="uploadImage('studentCard')">
                                    <uni-icons type="camera" size="24" color="#999"></uni-icons>
                                    <text class="upload-text">学生证照片</text>
                                    <text class="upload-desc">请上传个人信息页</text>
                                </view>
                                <view class="upload-mask" v-if="form.studentCard" @click="uploadImage('studentCard')">
                                    <text>重新上传</text>
                                </view>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>

            <!-- 校园跑守则页 -->
            <swiper-item>
                <scroll-view scroll-y="true" class="form-scroll">
                    <view class="rules-group">
                        <view class="group-title">
                            <uni-icons type="info" size="20" color="#3498db"></uni-icons>
                            <text>校园跑守则</text>
                        </view>
                        <view class="rules-tips">请仔细阅读以下守则，同意后即可成为校园跑骑手</view>
                        
                        <view class="rules-list">
                            <view class="rules-item" v-for="(rule, index) in rules" :key="index">
                                <view class="rule-header">
                                    <view class="rule-icon">
                                        <uni-icons :type="rule.icon" size="24" color="#3498db"></uni-icons>
                                    </view>
                                    <text class="rule-title">{{rule.title}}</text>
                                </view>
                                <text class="rule-content">{{rule.content}}</text>
                            </view>
                        </view>

                        <view class="rules-agreement">
                            <checkbox 
                                :checked="form.rulesAgreement"
                                @click="form.rulesAgreement = !form.rulesAgreement"
                                color="#3498db"
                            ></checkbox>
                            <text class="agreement-text">我已仔细阅读并同意遵守以上校园跑守则</text>
                        </view>
                    </view>
                </scroll-view>
            </swiper-item>
        </swiper>

        <!-- 底部操作区 -->
        <view class="bottom-bar">
            <view class="agreement" v-if="currentStep === 2">
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
            <view class="btn-group">
                <button 
                    class="prev-btn" 
                    v-if="currentStep > 0"
                    @click="prevStep"
                >上一步</button>
                <button 
                    class="next-btn"
                    :class="{ 'disabled': !canGoNext }"
                    :disabled="!canGoNext"
                    @click="nextStep"
                >{{ currentStep === 2 ? '提交申请' : '下一步' }}</button>
            </view>
        </view>

        <!-- 提示弹窗 -->
        <uni-popup ref="messagePopup" type="message">
            <uni-popup-message 
                :type="messageType" 
                :message="messageContent"
                :duration="2000"
            ></uni-popup-message>
        </uni-popup>
    </view>
</template>

<script>
export default {
    data() {
        return {
            steps: ['基本信息', '证件上传', '校园跑守则'],
            currentStep: 0,
            form: {
                name: '',
                studentId: '',
                phone: '',
                verifyCode: '',
                idCard: '',
                idCardFront: '',
                idCardBack: '',
                studentCard: '',
                agreement: false,
                rulesAgreement: false
            },
            countdown: 0,
            showVerifyCode: false,
            messageType: 'success',
            messageContent: '',
            rules: [
                {
                    title: '安全第一',
                    content: '严格遵守交通规则，确保自身和他人安全。配送过程中必须佩戴头盔，遵守交通信号。',
                    icon: 'safety'
                },
                {
                    title: '准时送达',
                    content: '在承诺的配送时间内完成订单。如遇特殊情况，及时与用户沟通，说明情况。',
                    icon: 'clock'
                },
                {
                    title: '服务态度',
                    content: '保持友善、礼貌的服务态度。与用户、商家沟通时使用文明用语。',
                    icon: 'smile'
                },
                {
                    title: '卫生保障',
                    content: '保持个人卫生，确保送餐箱清洁。食品配送过程中确保包装完整。',
                    icon: 'medal'
                },
                {
                    title: '隐私保护',
                    content: '严格保护用户隐私信息，不得泄露或不当使用用户信息。',
                    icon: 'lock'
                }
            ]
        }
    },
    computed: {
        canGoNext() {
            if (this.currentStep === 0) {
                return this.form.name && 
                    this.form.studentId && 
                    this.form.phone && 
                    this.form.verifyCode &&
                    this.form.idCard
            } else if (this.currentStep === 1) {
                return this.form.idCardFront && 
                    this.form.idCardBack && 
                    this.form.studentCard
            } else {
                return this.form.rulesAgreement && this.form.agreement
            }
        }
    },
    methods: {
        handleSwiperChange(e) {
            this.currentStep = e.detail.current
        },
        validateStudentId() {
            // 学号验证逻辑
            if (this.form.studentId && !/^\d{8,12}$/.test(this.form.studentId)) {
                this.showMessage('请输入正确的学号', 'error')
            }
        },
        validatePhone() {
            // 手机号验证逻辑
            if (this.form.phone && !/^1[3-9]\d{9}$/.test(this.form.phone)) {
                this.showMessage('请输入正确的手机号', 'error')
            } else if (this.form.phone) {
                this.showVerifyCode = true
            }
        },
        validateIdCard() {
            // 身份证号验证逻辑
            if (this.form.idCard && !/^\d{17}[\dX]$/.test(this.form.idCard)) {
                this.showMessage('请输入正确的身份证号', 'error')
            }
        },
        sendVerifyCode() {
            if (!this.form.phone || !/^1[3-9]\d{9}$/.test(this.form.phone)) {
                this.showMessage('请先输入正确的手机号', 'error')
                return
            }
            this.countdown = 60
            const timer = setInterval(() => {
                this.countdown--
                if (this.countdown === 0) {
                    clearInterval(timer)
                }
            }, 1000)
            // TODO: 发送验证码
            this.showMessage('验证码已发送', 'success')
        },
        uploadImage(type) {
            uni.chooseImage({
                count: 1,
                success: (res) => {
                    // TODO: 上传图片到服务器
                    this.form[type] = res.tempFilePaths[0]
                    this.showMessage('上传成功', 'success')
                }
            })
        },
        previewImage(type) {
            uni.previewImage({
                urls: [this.form[type]]
            })
        },
        prevStep() {
            if (this.currentStep > 0) {
                this.currentStep--
            }
        },
        nextStep() {
            if (!this.canGoNext) return
            
            if (this.currentStep < 2) {
                this.currentStep++
            } else {
                this.submit()
            }
        },
        showAgreement() {
            uni.navigateTo({
                url: '/pages/my/order/orderpage/agreement'
            })
        },
        showMessage(content, type = 'success') {
            this.messageType = type
            this.messageContent = content
            this.$refs.messagePopup.open()
        },
        submit() {
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
                
                setTimeout(() => {
                    uni.navigateBack()
                }, 1500)
            }, 2000)
        }
    }
}
</script>

<style>
.apply {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f8f9fa;
    padding-bottom: 220rpx;
}

.progress-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30rpx;
    background: #fff;
    margin-bottom: 20rpx;
}

.step {
    display: flex;
    align-items: center;
    flex: 1;
    position: relative;
}

.step-dot {
    width: 40rpx;
    height: 40rpx;
    border-radius: 50%;
    background: #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #999;
    font-size: 24rpx;
    transition: all 0.3s;
}

.step.active .step-dot,
.step.completed .step-dot {
    background: #3498db;
    color: #fff;
}

.step-text {
    font-size: 24rpx;
    color: #999;
    margin-left: 10rpx;
}

.step.active .step-text,
.step.completed .step-text {
    color: #3498db;
}

.step-line {
    flex: 1;
    height: 2rpx;
    background: #e8e8e8;
    margin: 0 10rpx;
}

.step.completed .step-line {
    background: #3498db;
}

.form-swiper {
    flex: 1;
    height: 0;
}

.form-scroll {
    height: 100%;
    padding-bottom: 40rpx;
}

.form-group,
.upload-group,
.rules-group {
    background-color: #fff;
    border-radius: 16rpx;
    padding: 30rpx;
    margin: 20rpx;
}

.group-title {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    font-size: 32rpx;
    color: #333;
    font-weight: bold;
}

.group-title uni-icons {
    margin-right: 10rpx;
}

.form-item {
    display: flex;
    align-items: center;
    padding: 20rpx 0;
    border-bottom: 1rpx solid #eee;
}

.form-item:last-child {
    border-bottom: none;
}

.label {
    width: 160rpx;
    font-size: 28rpx;
    color: #333;
}

.required::before {
    content: '*';
    color: #ff4d4f;
    margin-right: 4rpx;
}

.input {
    flex: 1;
    font-size: 28rpx;
    color: #333;
}

.verify-btn {
    padding: 10rpx 20rpx;
    background: #3498db;
    color: #fff;
    font-size: 24rpx;
    border-radius: 8rpx;
    margin-left: 20rpx;
}

.verify-btn.disabled {
    background: #e8e8e8;
    color: #999;
}

.upload-tips {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 30rpx;
}

.upload-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20rpx;
}

.upload-item {
    position: relative;
    aspect-ratio: 1.6;
    border-radius: 8rpx;
    overflow: hidden;
}

.upload-btn {
    width: 100%;
    height: 100%;
    background-color: #f8f9fa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.upload-text {
    font-size: 28rpx;
    color: #666;
    margin-top: 10rpx;
}

.upload-desc {
    font-size: 24rpx;
    color: #999;
    margin-top: 6rpx;
}

.preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.upload-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 28rpx;
    opacity: 0;
    transition: opacity 0.3s;
}

.upload-item:hover .upload-mask {
    opacity: 1;
}

.rules-tips {
    font-size: 24rpx;
    color: #999;
    margin-bottom: 30rpx;
}

.rules-list {
    display: flex;
    flex-direction: column;
    gap: 30rpx;
}

.rules-item {
    background: #f8f9fa;
    border-radius: 12rpx;
    padding: 20rpx;
}

.rule-header {
    display: flex;
    align-items: center;
    margin-bottom: 16rpx;
}

.rule-icon {
    width: 48rpx;
    height: 48rpx;
    background: rgba(52,152,219,0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 16rpx;
}

.rule-title {
    font-size: 28rpx;
    color: #333;
    font-weight: bold;
}

.rule-content {
    font-size: 26rpx;
    color: #666;
    line-height: 1.6;
}

.rules-agreement {
    margin-top: 40rpx;
    display: flex;
    align-items: center;
    justify-content: center;
}

.agreement {
    display: flex;
    align-items: center;
    margin-bottom: 30rpx;
    padding: 0 20rpx;
}

.agreement-text {
    font-size: 24rpx;
    color: #666;
    margin-left: 10rpx;
}

.link {
    color: #3498db;
}

.bottom-bar {
    background: #fff;
    padding: 30rpx 40rpx 50rpx;
    box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
}

.btn-group {
    display: flex;
    gap: 30rpx;
    padding: 0 30rpx;
}

.prev-btn,
.next-btn {
    flex: 1;
    height: 88rpx;
    line-height: 88rpx;
    text-align: center;
    border-radius: 44rpx;
    font-size: 32rpx;
    transition: all 0.3s;
}

.prev-btn {
    background: #f8f9fa;
    color: #666;
    border: 2rpx solid #e8e8e8;
}

.next-btn {
    background: linear-gradient(to right, #3498db, #2980b9);
    color: #fff;
    box-shadow: 0 4rpx 12rpx rgba(52,152,219,0.3);
}

.next-btn.disabled {
    opacity: 0.6;
    box-shadow: none;
}
</style> 