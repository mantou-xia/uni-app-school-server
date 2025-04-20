"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_ren_customer_navigator2 = common_vendor.resolveComponent("ren-customer-navigator");
  _easycom_ren_customer_navigator2();
}
const _easycom_ren_customer_navigator = () => "../../components/ren-customer-navigator/ren-customer-navigator.js";
if (!Math) {
  _easycom_ren_customer_navigator();
}
const title = "Hello World";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(title)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
