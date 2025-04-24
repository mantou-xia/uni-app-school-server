"use strict";
const common_vendor = require("../../common/vendor.js");
const BottomSection = () => "../../components/my/BottomSection/BottomSection.js";
const FunctionSection = () => "../../components/my/FunctionSection/FunctionSection.js";
const OrderSection = () => "../../components/my/OrderSection/OrderSection.js";
const UserCard = () => "../../components/my/UserCard/UserCard.js";
const _sfc_main = {
  data() {
    return {};
  },
  components: {
    BottomSection,
    FunctionSection,
    OrderSection,
    UserCard
  },
  methods: {
    goToVerify() {
      if (!this.userInfo) {
        common_vendor.index.showToast({
          title: "请先登录",
          icon: "none"
        });
        return;
      }
      if (this.userInfo.isVerified) {
        common_vendor.index.showToast({
          title: "您已完成实名认证",
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({
        url: "/pages/my/verify/verify"
      });
    }
  }
};
if (!Array) {
  const _component_UserCard = common_vendor.resolveComponent("UserCard");
  const _component_FunctionSection = common_vendor.resolveComponent("FunctionSection");
  const _component_OrderSection = common_vendor.resolveComponent("OrderSection");
  const _component_BottomSection = common_vendor.resolveComponent("BottomSection");
  const _easycom_ren_customer_navigator2 = common_vendor.resolveComponent("ren-customer-navigator");
  (_component_UserCard + _component_FunctionSection + _component_OrderSection + _component_BottomSection + _easycom_ren_customer_navigator2)();
}
const _easycom_ren_customer_navigator = () => "../../components/ren-customer-navigator/ren-customer-navigator.js";
if (!Math) {
  _easycom_ren_customer_navigator();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/my/my.js.map
