"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      orderId: null
    };
  },
  onLoad(options) {
    this.orderId = options.id;
    common_vendor.index.__f__("log", "at pages/index_campusErrand/order_detail/order_detail.vue:16", "Order ID:", this.orderId);
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.orderId)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index_campusErrand/order_detail/order_detail.js.map
