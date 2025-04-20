"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const CustomSwiper = () => "../../components/index/CustomSwiper/CustomSwiper.js";
const _sfc_main = {
  data() {
    return {
      banner: [
        {
          url: "https://picsum.photos/seed/1/800/400"
        },
        {
          url: "https://picsum.photos/seed/2/800/400"
        },
        {
          url: "https://picsum.photos/seed/3/800/400"
        }
      ],
      title: "Hello World"
    };
  },
  components: {
    CustomSwiper
  }
};
if (!Array) {
  const _component_custom_swiper = common_vendor.resolveComponent("custom-swiper");
  const _easycom_ren_customer_navigator2 = common_vendor.resolveComponent("ren-customer-navigator");
  (_component_custom_swiper + _easycom_ren_customer_navigator2)();
}
const _easycom_ren_customer_navigator = () => "../../components/ren-customer-navigator/ren-customer-navigator.js";
if (!Math) {
  _easycom_ren_customer_navigator();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $data.banner = $event),
    b: common_vendor.p({
      bannerList: $data.banner
    }),
    c: common_assets._imports_0,
    d: common_vendor.t($data.title)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
