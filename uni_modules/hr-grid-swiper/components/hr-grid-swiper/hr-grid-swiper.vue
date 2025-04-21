<template>
  <view class="hr-grid-swiper-wrap">
    <swiper
      :style="{ height: swiperHeight + 'px' }"
      circular
      :indicator-dots="false"
      :autoplay="false"
      @change="onSwiperChange"
    >
      <swiper-item v-for="(group, index) in gridGroupList" :key="index">
        <view class="swiper-item-inner">
          <view
            v-for="(item, idx) in group"
            :key="idx"
            :style="itemStyles[idx]"
            class="item"
            @click="handleItemClick(idx, item)"
          >
            <slot
              :item="item"
              :gridWidth="itemStyles[idx].width"
              :gridHeight="itemStyles[idx].height"
            />
          </view>
        </view>
      </swiper-item>
    </swiper>
    <!-- 自定义指示条 -->
    <slot
      v-if="gridGroupList.length > 1"
      name="indicator-bar"
      :current="current"
      :total="gridGroupList.length"
    >
      <view
        class="custom-indicator-bar"
        :style="{
          margin: `${indicatorBarMarginTop}px auto`,
          width: indicatorBarWidth + 'px',
          height: indicatorBarHeight + 'px',
          backgroundColor: indicatorBackground,
        }"
      >
        <slot
          name="indicator-dot"
          :current="current"
          :total="gridGroupList.length"
        >
          <view class="indicator-slider" :style="dotStyle"></view>
        </slot>
      </view>
    </slot>
  </view>
</template>

<script>
export default {
  name: "hr-grid-swiper",
  props: {
    gridData: {
      type: Array,
      default: () => [],
    },
    columns: {
      type: Number,
      default: 4,
    },
    rows: {
      type: Number,
      default: 2,
    },
    aspectRatio: {
      type: Number,
      default: 1,
    },
    gap: {
      type: Number,
      default: 5,
    },
    indicatorBarHeight: {
      type: Number,
      default: 4,
    },
    indicatorBarWidth: {
      type: Number,
      default: 60,
    },
    // 新增属性用于设置指示器顶部的外边距
    indicatorBarMarginTop: {
      type: Number,
      default: 4,
    },
    indicatorBackground: {
      type: String,
      default: "#ccc",
    },
    indicatorDotRadius: {
      type: Number,
      default: 4,
    },
    indicatorDotActiveColor: {
      type: String,
      default: "#000",
    },
  },

  data() {
    return {
      containerWidth: 0,
      current: 0,
    };
  },
  emits: ["item-click"],
  computed: {
    itemWidth() {
      return (
        (this.containerWidth - this.gap * (this.columns - 1)) / this.columns
      );
    },
    swiperHeight() {
      const itemHeight = this.itemWidth / this.aspectRatio;
      return (itemHeight + this.gap) * this.rows - this.gap;
    },
    itemStyles() {
      return this.gridGroupList.flat().map((_, idx) => {
        const height = this.itemWidth / this.aspectRatio;
        const rightMargin =
          idx % this.columns === this.columns - 1 ? 0 : this.gap;
        const topMargin = Math.floor(idx / this.columns) === 0 ? 0 : this.gap;

        return {
          width: `${this.itemWidth}px`,
          height: `${height}px`,
          marginRight: `${rightMargin}px`,
          marginTop: `${topMargin}px`,
        };
      });
    },
    gridGroupList() {
      const itemsPerSwiperItem = this.columns * this.rows;
      return this.gridData.reduce((acc, item, idx) => {
        const chunkIndex = Math.floor(idx / itemsPerSwiperItem);
        if (!acc[chunkIndex]) {
          acc[chunkIndex] = [];
        }
        acc[chunkIndex].push(item);
        return acc;
      }, []);
    },
    dotStyle() {
      const sliderWidth = this.indicatorBarWidth / this.gridGroupList.length;
      return {
        width: `${sliderWidth}px`,
        height: `${this.indicatorBarHeight}px`,
        backgroundColor: this.indicatorDotActiveColor,
        boxShadow: "0 0 2px rgba(0,0,0,0.5)",
        borderRadius: `${this.indicatorDotRadius}px`,
        transform: `translateX(${this.current * sliderWidth}px)`,
        transition: "transform 0.5s ease",
      };
    },
  },
  methods: {
    fetchContainerWidth() {
      const query = uni.createSelectorQuery().in(this);
      query
        .select(".hr-grid-swiper-wrap")
        .boundingClientRect((rect) => {
          if (rect) {
            this.containerWidth = rect.width;
          }
        })
        .exec();
    },
    onSwiperChange(event) {
      this.current = event.detail.current;
    },
    handleItemClick(item, idx) {
      this.$emit("item-click", {
        index: idx,
        item,
      });
    },
  },
  mounted() {
    this.fetchContainerWidth();
  },
};
</script>

<style lang="scss">
.hr-grid-swiper-wrap {
  width: 100%;
}

.swiper-item-inner {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.item {
  box-sizing: border-box;
  display: block;
  position: relative;
  overflow: hidden;
}

.custom-indicator-bar {
  position: relative;
}

.indicator-slider {
  position: absolute;
}
</style>
