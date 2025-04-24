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
      type: "info",
      size: "32",
      color: "#3498db"
    }),
    b: common_vendor.p({
      type: "running",
      size: "24",
      color: "#e74c3c"
    }),
    c: common_vendor.p({
      type: "shop",
      size: "24",
      color: "#2ecc71"
    }),
    d: common_vendor.p({
      type: "info",
      size: "24",
      color: "#f1c40f"
    }),
    e: common_vendor.p({
      type: "help",
      size: "24",
      color: "#9b59b6"
    }),
    f: common_vendor.p({
      type: "closeempty",
      size: "20",
      color: "#e74c3c"
    }),
    g: common_vendor.p({
      type: "car",
      size: "20",
      color: "#2ecc71"
    }),
    h: common_vendor.p({
      type: "locked",
      size: "20",
      color: "#f1c40f"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/bottom/aboutpage/agreement.js.map
