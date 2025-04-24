"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      distance: "",
      totalFee: 0,
      baseFee: 3,
      // 基础配送费
      extraFeePerKm: 1,
      // 每公里额外费用
      baseDistance: 1
      // 基础距离（公里）
    };
  },
  methods: {
    calculateFee() {
      if (!this.distance) {
        this.totalFee = 0;
        return;
      }
      const distance = parseFloat(this.distance);
      if (distance <= this.baseDistance) {
        this.totalFee = this.baseFee;
      } else {
        const extraDistance = distance - this.baseDistance;
        this.totalFee = this.baseFee + extraDistance * this.extraFeePerKm;
      }
      this.totalFee = parseFloat(this.totalFee.toFixed(2));
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
  return common_vendor.e({
    a: common_vendor.p({
      type: "wallet",
      size: "24",
      color: "#3498db"
    }),
    b: common_vendor.p({
      type: "location",
      size: "24",
      color: "#e74c3c"
    }),
    c: common_vendor.p({
      type: "calculator",
      size: "24",
      color: "#2ecc71"
    }),
    d: common_vendor.o([($event) => $data.distance = $event.detail.value, (...args) => $options.calculateFee && $options.calculateFee(...args)]),
    e: $data.distance,
    f: $data.totalFee > 0
  }, $data.totalFee > 0 ? {
    g: common_vendor.t($data.totalFee)
  } : {}, {
    h: common_vendor.p({
      type: "info",
      size: "24",
      color: "#f1c40f"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/order/rateDetails.js.map
