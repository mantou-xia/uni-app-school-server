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
      type: "checkmarkempty",
      size: "20",
      color: "#07c160"
    }),
    b: common_vendor.p({
      type: "checkmarkempty",
      size: "20",
      color: "#07c160"
    }),
    c: common_vendor.p({
      type: "checkmarkempty",
      size: "20",
      color: "#07c160"
    }),
    d: common_vendor.p({
      type: "locked",
      size: "24",
      color: "#3498db"
    }),
    e: common_vendor.p({
      type: "staff",
      size: "24",
      color: "#3498db"
    }),
    f: common_vendor.p({
      type: "eye",
      size: "24",
      color: "#3498db"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/bottom/aboutpage/privacy.js.map
