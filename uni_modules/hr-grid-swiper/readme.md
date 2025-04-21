#### 概述

`hr-grid-swiper` 组件是一个自定义的轮播组件，专为展示网格布局而设计。适用于产品列表、画廊展示或任何需要网格布局与滑动功能结合的场景。

#### 特性

- 根据输入数据动态生成轮播项。
- 支持配置每个轮播项内的行和列以实现网格布局。
- 可自定义项目的宽高比和项目间隙。
- 完全响应式，根据容器宽度自适应。
- 自动计算每个项目的尺寸，确保布局的一致性。
- 支持自定义指示器样式和位置。
- 支持点击事件，可以获取当前点击项目的详细信息。

#### 组件属性

| 属性名                  | 类型   | 默认值 | 说明                                   |
| ----------------------- | ------ | ------ | -------------------------------------- |
| gridData                | Array  | []     | 网格数据数组，用于生成轮播的内容。     |
| columns                 | Number | 4      | 每个轮播项中的列数。                   |
| rows                    | Number | 2      | 每个轮播项中的行数。                   |
| aspectRatio             | Number | 1      | 项目的宽高比。                         |
| gap                     | Number | 5      | 项目之间的间隙（单位为像素）。         |
| indicatorBarHeight      | Number | 4      | 指示条的高度（单位为像素）。           |
| indicatorBarWidth       | Number | 60     | 指示条的总宽度（单位为像素）。         |
| indicatorBarMarginTop   | Number | 4      | 指示条与上方内容的距离（单位为像素）。 |
| indicatorBackground     | String | "#ccc" | 指示条的背景颜色。                     |
| indicatorDotRadius      | Number | 4      | 活动指示点的圆角大小（单位为像素）。   |
| indicatorDotActiveColor | String | "#000" | 活动指示点的颜色。                     |

#### 插槽

- **默认插槽**：用于自定义每个轮播项的内容。传入的插槽属性 `item` 代表当前元素的数据。
- **indicator-bar**：用于自定义指示条的整体样式和布局。
- **indicator-dot**：用于自定义指示条上活动指示点的样式。

#### 事件

- **item-click**：点击轮播项时触发。事件数据包括 `item`（当前点击的项目数据）和 `index`（当前项目的索引）。

#### 示例代码

```vue
<template>
  <view class="content">
    <view class="text-area">
      <hr-grid-swiper :grid-data="gridData" :columns="4" :rows="2">
        <template #default="{ item, gridWidth, gridHeight }">
          <view
            class="entry-item"
            :style="{ width: gridWidth, height: gridHeight }"
          >
            <i class="iconfont ly-gouwu entry-item-icon" />
            <view class="slot-text">{{ item.label }}</view>
          </view>
        </template>
      </hr-grid-swiper>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      gridData: [
        {
          name: "shoppingMall",
          label: "购物商场",
          icon: "icon-shopping-mall",
        },
        {
          name: "indoorPlayground",
          label: "室内游乐场",
          icon: "icon-indoor-playground",
        },
        {
          name: "outdoorActivities",
          label: "户外活动",
          icon: "icon-outdoor-activities",
        },
        {
          name: "zoo",
          label: "动植物园",
          icon: "icon-zoo",
        },
        {
          name: "aquarium",
          label: "水族馆",
          icon: "icon-aquarium",
        },
        {
          name: "themePark",
          label: "主题公园",
          icon: "icon-theme-park",
        },
        {
          name: "museum",
          label: "博物馆",
          icon: "icon-museum",
        },
        {
          name: "aquarium",
          label: "水族馆",
          icon: "icon-aquarium",
        },
        {
          name: "themePark",
          label: "主题公园",
          icon: "icon-theme-park",
        },
        {
          name: "museum",
          label: "博物馆",
          icon: "icon-museum",
        },
        {
          name: "aquarium",
          label: "水族馆",
          icon: "icon-aquarium",
        },
        {
          name: "themePark",
          label: "主题公园",
          icon: "icon-theme-park",
        },
        {
          name: "museum",
          label: "博物馆",
          icon: "icon-museum",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-area {
  width: 100vw;
}

.entry-item {
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}
.entry-item-icon {
  font-size: 28px;
  margin-bottom: 6px;
}
.slot-text {
  font-size: 14px;
}
</style>
```
