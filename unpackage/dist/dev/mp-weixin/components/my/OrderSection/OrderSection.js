"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "OrderSection",
  components: {},
  data() {
    return {};
  },
  methods: {
    navigateTo(url) {
      common_vendor.index.navigateTo({
        url,
        fail: (err) => {
          common_vendor.index.switchTab({
            url,
            fail: (err2) => {
              common_vendor.index.showToast({
                title: "页面跳转失败",
                icon: "none"
              });
            }
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
      type: "wallet",
      size: "24",
      color: "#9b59b6"
    }),
    b: common_vendor.p({
      type: "right",
      size: "16",
      color: "#999"
    }),
    c: common_vendor.o(($event) => $options.navigateTo("/pages/my/order/rateDetails")),
    d: common_vendor.p({
      type: "person",
      size: "24",
      color: "#3498db"
    }),
    e: common_vendor.p({
      type: "right",
      size: "16",
      color: "#999"
    }),
    f: common_vendor.o(($event) => $options.navigateTo("/pages/my/order/apply")),
    g: common_vendor.p({
      type: "notification",
      size: "24",
      color: "#e74c3c"
    }),
    h: common_vendor.p({
      type: "right",
      size: "16",
      color: "#999"
    }),
    i: common_vendor.o(($event) => $options.navigateTo("/pages/my/order/pushSettings")),
    j: common_vendor.p({
      type: "medal",
      size: "24",
      color: "#f1c40f"
    }),
    k: common_vendor.p({
      type: "right",
      size: "16",
      color: "#999"
    }),
    l: common_vendor.o(($event) => $options.navigateTo("/pages/my/order/ranking"))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/my/OrderSection/OrderSection.js.map
