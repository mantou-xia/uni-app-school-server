"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  options: {
    styleIsolation: "shared"
  },
  name: "lSwiper",
  model: {
    prop: "value",
    event: "input"
  },
  props: {
    // 图片数组
    banner: {
      type: Array,
      default: []
    },
    // 轮播图高度
    height: {
      type: Number,
      default: 240
    },
    // 当前轮播图
    value: {
      type: Number,
      default: 0
    },
    // 类型 卡片card 默认normal
    type: {
      type: String,
      default: "normal"
    },
    // 展示指示器
    indicatorDots: {
      type: Boolean,
      default: true
    },
    // 是否自动切换
    autoplay: {
      type: Boolean,
      default: true
    },
    // 自动切换时间间隔
    interval: {
      type: Number,
      default: 3e3
    },
    // 切换滑动动画时长
    duration: {
      type: Number,
      default: 300
    },
    // 是否采用衔接滑动，即播放到末尾后重新回到开头	
    circular: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    change(e) {
      this.$emit("input", e.detail.current);
    },
    clickItem() {
      this.$emit("clickItem", index);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.banner, (item, index2, i0) => {
      return {
        a: item,
        b: common_vendor.n($props.value != index2 ? "swiper-scsle" : ""),
        c: common_vendor.o(($event) => $options.clickItem(index2), index2),
        d: index2
      };
    }),
    b: $props.indicatorDots,
    c: $props.autoplay,
    d: $props.interval,
    e: $props.duration,
    f: $props.height + "rpx",
    g: $props.circular,
    h: $props.type == "card" ? "60rpx" : "0",
    i: $props.type == "card" ? "60rpx" : "0",
    j: common_vendor.o((...args) => $options.change && $options.change(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-bd372a20"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/l-swiper/components/l-swiper/l-swiper.js.map
