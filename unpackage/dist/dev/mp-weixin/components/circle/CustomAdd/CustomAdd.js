"use strict";
const common_vendor = require("../../../common/vendor.js");
const static_utils_goToPage = require("../../../static/utils/goToPage.js");
const _sfc_main = {
  name: "CustomAdd",
  // 明确定义组件选项
  options: {
    virtualHost: true
  },
  // 定义属性
  props: {
    type: {
      type: String,
      default: "default"
    }
  },
  // 使用 methods 定义方法
  methods: {
    handleCreatePost() {
      this.$emit("create-post", this.type);
      common_vendor.index.showModal({
        title: "发布帖子",
        content: "即将打开发帖页面",
        showCancel: true,
        confirmText: "确定",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm) {
            static_utils_goToPage.goToPage("/pages/post/create/create");
          }
        }
      });
    }
  },
  // 为小程序环境添加兼容性处理
  created() {
    if (typeof common_vendor.wx$1 !== "undefined") {
      this.handleCreatePostMp = this.handleCreatePost;
    }
  }
};
if (typeof common_vendor.wx$1 !== "undefined") {
  Component({
    options: {
      virtualHost: true,
      styleIsolation: "apply-shared"
    },
    properties: {
      type: {
        type: String,
        value: "default"
      }
    },
    methods: {
      handleCreatePost() {
        this.triggerEvent("create-post", {
          type: this.data.type
        });
        common_vendor.wx$1.showModal({
          title: "发布帖子",
          content: "即将打开发帖页面",
          showCancel: true,
          confirmText: "确定",
          cancelText: "取消",
          success: (res) => {
            if (res.confirm) {
              common_vendor.wx$1.navigateTo({
                url: "/pages/post/create/create"
              });
            }
          }
        });
      }
    }
  });
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleCreatePost && $options.handleCreatePost(...args))
  };
}
const Component$1 = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component$1);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/circle/CustomAdd/CustomAdd.js.map
