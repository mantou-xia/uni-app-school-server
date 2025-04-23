<template>
    <view class="push-settings">
        <view class="settings-card">
            <view class="settings-item">
                <text class="item-label">接单状态</text>
                <switch :checked="isAvailable" @change="toggleAvailable" color="#3cc51f" />
            </view>
            
            <view class="settings-item">
                <text class="item-label">接单范围</text>
                <view class="range-value">{{orderRange}}km</view>
            </view>
            <slider :value="orderRange" :min="1" :max="5" :step="0.5" @change="changeRange" show-value />
            
            <view class="settings-item">
                <text class="item-label">订单类型</text>
            </view>
            <view class="type-grid">
                <view 
                    v-for="(type, index) in orderTypes" 
                    :key="index"
                    :class="['type-item', type.selected ? 'selected' : '']"
                    @click="toggleType(index)"
                >
                    {{type.name}}
                </view>
            </view>
        </view>

        <view class="notice-card">
            <text class="notice-title">温馨提示</text>
            <text class="notice-text">1. 关闭接单状态后将不再收到新订单推送</text>
            <text class="notice-text">2. 接单范围建议设置在2-3公里以获得更好的接单体验</text>
            <text class="notice-text">3. 可以选择多个订单类型</text>
        </view>
    </view>
</template>

<script setup>
import { ref } from 'vue'

const isAvailable = ref(true)
const orderRange = ref(3)
const orderTypes = ref([
    { name: '快递代取', selected: true },
    { name: '食堂打包', selected: true },
    { name: '超市代购', selected: false },
    { name: '文印服务', selected: false }
])

const toggleAvailable = (e) => {
    isAvailable.value = e.detail.value
}

const changeRange = (e) => {
    orderRange.value = e.detail.value
}

const toggleType = (index) => {
    orderTypes.value[index].selected = !orderTypes.value[index].selected
}
</script>

<style>
.push-settings {
    padding: 20px;
    background-color: #f5f5f5;
}

.settings-card {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 15px;
}

.settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.item-label {
    font-size: 16px;
    color: #333;
}

.range-value {
    font-size: 16px;
    color: #3cc51f;
}

.type-grid {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -5px;
}

.type-item {
    width: calc(50% - 10px);
    margin: 5px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    border-radius: 4px;
    font-size: 14px;
    color: #666;
}

.type-item.selected {
    background-color: #e8f5e9;
    color: #3cc51f;
}

.notice-card {
    background-color: #ffffff;
    border-radius: 8px;
    padding: 15px;
}

.notice-title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
}

.notice-text {
    font-size: 14px;
    color: #666;
    line-height: 1.6;
    display: block;
}
</style> 