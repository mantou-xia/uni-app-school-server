"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  // 组件名称，用于调试和Vue DevTools识别
  name: "CustomPlaceholder",
  // 小程序特有的组件选项，解决一些渲染和样式问题
  options: {
    // 虚拟宿主，帮助组件在小程序环境中正确渲染
    virtualHost: true
  },
  data() {
    return {};
  },
  mounted() {
    common_vendor.index.__f__("log", "at components/common/CustomPlaceholder/CustomPlaceholder.vue:46", "占位组件");
  },
  // 接收外部传入的文本
  props: {
    text: {
      type: String,
      default: "暂无数据"
    },
    // 是否显示操作按钮
    showAction: {
      type: Boolean,
      default: false
    },
    // 操作按钮文字
    actionText: {
      type: String,
      default: "重新加载"
    }
  },
  // 监听外部传入文本的变化
  watch: {
    text: {
      immediate: true,
      handler(newVal) {
        this.placeholderText = newVal;
      }
    }
  },
  // 方法
  methods: {
    // 点击操作按钮触发的事件
    onActionClick() {
      this.$emit("reload");
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "info-filled",
      size: "50",
      color: "#bfbfbf"
    }),
    b: _ctx.title
  }, _ctx.title ? {
    c: common_vendor.t(_ctx.title)
  } : {}, {
    d: common_vendor.t($props.text),
    e: _ctx.description
  }, _ctx.description ? {
    f: common_vendor.t(_ctx.description)
  } : {}, {
    g: $props.showAction
  }, $props.showAction ? {
    h: common_vendor.t($props.actionText),
    i: common_vendor.o((...args) => $options.onActionClick && $options.onActionClick(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-7ee7d1b4"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/common/CustomPlaceholder/CustomPlaceholder.js.map
