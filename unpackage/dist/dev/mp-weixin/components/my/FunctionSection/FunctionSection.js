"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "FunctionSection",
  components: {},
  data() {
    return {};
  },
  methods: {
    navigateTo(url) {
      common_vendor.index.navigateTo({
        url,
        fail: (err) => {
          common_vendor.index.__f__("error", "at components/my/FunctionSection/FunctionSection.vue:59", "跳转失败：", err);
          common_vendor.index.showToast({
            title: "页面跳转失败",
            icon: "none"
          });
        }
      });
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
  return {
    a: common_vendor.p({
      type: "list",
      size: "24",
      color: "#3498db"
    }),
    b: common_vendor.o(($event) => $options.navigateTo("/pages/my/function/myOrders")),
    c: common_vendor.p({
      type: "paperplane",
      size: "24",
      color: "#e74c3c"
    }),
    d: common_vendor.o(($event) => $options.navigateTo("/pages/my/function/myPublish")),
    e: common_vendor.p({
      type: "hand-up",
      size: "24",
      color: "#2ecc71"
    }),
    f: common_vendor.o(($event) => $options.navigateTo("/pages/my/function/myAccept")),
    g: common_vendor.p({
      type: "wallet",
      size: "24",
      color: "#f1c40f"
    }),
    h: common_vendor.o(($event) => $options.navigateTo("/pages/my/function/myWallet")),
    i: common_vendor.p({
      type: "gift",
      size: "24",
      color: "#e67e22"
    }),
    j: common_vendor.o(($event) => $options.navigateTo("/pages/my/function/myCoupon")),
    k: common_vendor.p({
      type: "gear",
      size: "24",
      color: "#95a5a6"
    }),
    l: common_vendor.o(($event) => $options.navigateTo("/pages/my/function/settings"))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/my/FunctionSection/FunctionSection.js.map
