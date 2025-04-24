"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {};
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      type: "notification-filled",
      size: "32",
      color: "#e74c3c"
    }),
    b: common_vendor.p({
      type: "info-filled",
      size: "24",
      color: "#3498db"
    }),
    c: common_vendor.p({
      type: "circle",
      size: "18",
      color: "#3498db"
    }),
    d: common_vendor.p({
      type: "circle",
      size: "18",
      color: "#3498db"
    }),
    e: common_vendor.p({
      type: "circle",
      size: "18",
      color: "#3498db"
    }),
    f: common_vendor.p({
      type: "circle",
      size: "18",
      color: "#3498db"
    }),
    g: common_vendor.p({
      type: "warning-filled",
      size: "24",
      color: "#e74c3c"
    }),
    h: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#fff"
    }),
    i: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#fff"
    }),
    j: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#fff"
    }),
    k: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#fff"
    }),
    l: common_vendor.p({
      type: "shield-filled",
      size: "24",
      color: "#f1c40f"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/bottom/aboutpage/disclaimer.js.map
