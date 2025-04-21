"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "hr-grid-swiper",
  props: {
    gridData: {
      type: Array,
      default: () => []
    },
    columns: {
      type: Number,
      default: 4
    },
    rows: {
      type: Number,
      default: 2
    },
    aspectRatio: {
      type: Number,
      default: 1
    },
    gap: {
      type: Number,
      default: 5
    },
    indicatorBarHeight: {
      type: Number,
      default: 4
    },
    indicatorBarWidth: {
      type: Number,
      default: 60
    },
    // 新增属性用于设置指示器顶部的外边距
    indicatorBarMarginTop: {
      type: Number,
      default: 4
    },
    indicatorBackground: {
      type: String,
      default: "#ccc"
    },
    indicatorDotRadius: {
      type: Number,
      default: 4
    },
    indicatorDotActiveColor: {
      type: String,
      default: "#000"
    }
  },
  data() {
    return {
      containerWidth: 0,
      current: 0
    };
  },
  emits: ["item-click"],
  computed: {
    itemWidth() {
      return (this.containerWidth - this.gap * (this.columns - 1)) / this.columns;
    },
    swiperHeight() {
      const itemHeight = this.itemWidth / this.aspectRatio;
      return (itemHeight + this.gap) * this.rows - this.gap;
    },
    itemStyles() {
      return this.gridGroupList.flat().map((_, idx) => {
        const height = this.itemWidth / this.aspectRatio;
        const rightMargin = idx % this.columns === this.columns - 1 ? 0 : this.gap;
        const topMargin = Math.floor(idx / this.columns) === 0 ? 0 : this.gap;
        return {
          width: `${this.itemWidth}px`,
          height: `${height}px`,
          marginRight: `${rightMargin}px`,
          marginTop: `${topMargin}px`
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
        transition: "transform 0.5s ease"
      };
    }
  },
  methods: {
    fetchContainerWidth() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".hr-grid-swiper-wrap").boundingClientRect((rect) => {
        if (rect) {
          this.containerWidth = rect.width;
        }
      }).exec();
    },
    onSwiperChange(event) {
      this.current = event.detail.current;
    },
    handleItemClick(item, idx) {
      this.$emit("item-click", {
        index: idx,
        item
      });
    }
  },
  mounted() {
    this.fetchContainerWidth();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($options.gridGroupList, (group, index, i0) => {
      return {
        a: common_vendor.f(group, (item, idx, i1) => {
          return {
            a: "d-" + i0 + "-" + i1,
            b: common_vendor.r("d", {
              item,
              gridWidth: $options.itemStyles[idx].width,
              gridHeight: $options.itemStyles[idx].height
            }, i0 + "-" + i1),
            c: idx,
            d: common_vendor.s($options.itemStyles[idx]),
            e: common_vendor.o(($event) => $options.handleItemClick(idx, item), idx)
          };
        }),
        b: index
      };
    }),
    b: $options.swiperHeight + "px",
    c: common_vendor.o((...args) => $options.onSwiperChange && $options.onSwiperChange(...args)),
    d: $options.gridGroupList.length > 1
  }, $options.gridGroupList.length > 1 ? {
    e: common_vendor.s($options.dotStyle),
    f: common_vendor.r("indicator-dot", {
      current: $data.current,
      total: $options.gridGroupList.length
    }),
    g: `${$props.indicatorBarMarginTop}px auto`,
    h: $props.indicatorBarWidth + "px",
    i: $props.indicatorBarHeight + "px",
    j: $props.indicatorBackground,
    k: common_vendor.r("indicator-bar", {
      current: $data.current,
      total: $options.gridGroupList.length
    })
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/hr-grid-swiper/components/hr-grid-swiper/hr-grid-swiper.js.map
