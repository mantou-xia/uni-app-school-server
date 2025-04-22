"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "BottomSection",
  components: {},
  data() {
    return {};
  },
  methods: {
    navigateTo(url) {
      common_vendor.index.navigateTo({
        url,
        fail: (err) => {
          common_vendor.index.__f__("error", "at components/my/BottomSection/BottomSection.vue:42", "跳转失败：", err);
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
      type: "headphones",
      size: "24",
      color: "#27ae60"
    }),
    b: common_vendor.p({
      type: "right",
      size: "16",
      color: "#999"
    }),
    c: common_vendor.o(($event) => $options.navigateTo("/pages/my/bottom/campusService")),
    d: common_vendor.p({
      type: "info",
      size: "24",
      color: "#34495e"
    }),
    e: common_vendor.p({
      type: "right",
      size: "16",
      color: "#999"
    }),
    f: common_vendor.o(($event) => $options.navigateTo("/pages/my/bottom/about"))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/my/BottomSection/BottomSection.js.map
