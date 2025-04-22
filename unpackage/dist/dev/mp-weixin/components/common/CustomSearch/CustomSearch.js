"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  // 添加 behaviors 属性
  behaviors: ["wx://component-export"],
  // 导出组件实例
  export() {
    return this;
  },
  name: "CustomSearch",
  // 小程序特有的组件选项
  options: {
    // 虚拟宿主，帮助组件在小程序环境中正确渲染
    virtualHost: true,
    // 添加 styleIsolation 以确保样式隔离
    styleIsolation: "apply-shared"
  },
  // 接收外部传入的属性
  props: {
    // 输入框占位符
    placeholder: {
      type: String,
      default: "请输入搜索内容"
    },
    // 搜索类型
    type: {
      type: String,
      default: "find",
      // 默认为发现页搜索
      validator: (value) => ["shopping", "find"].includes(value)
    }
  },
  // 组件的响应式数据
  data() {
    return {
      // 搜索关键词
      searchKeyword: ""
    };
  },
  // 方法
  methods: {
    // 处理输入事件
    handleInput(e) {
      this.searchKeyword = e.detail.value;
      this.$emit("input", {
        keyword: this.searchKeyword,
        type: this.type
      });
    },
    // 处理搜索确认事件
    handleSearch() {
      this.$emit("search", {
        keyword: this.searchKeyword,
        type: this.type
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $props.placeholder,
    b: common_vendor.o((...args) => $options.handleInput && $options.handleInput(...args)),
    c: common_vendor.o((...args) => $options.handleSearch && $options.handleSearch(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-93553e88"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/common/CustomSearch/CustomSearch.js.map
