"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_ren_customer_navigator2 = common_vendor.resolveComponent("ren-customer-navigator");
  _easycom_ren_customer_navigator2();
}
const _easycom_ren_customer_navigator = () => "../../components/ren-customer-navigator/ren-customer-navigator.js";
if (!Math) {
  (CustomSwiper + _easycom_ren_customer_navigator)();
}
const CustomSwiper = () => "../../components/index/CustomSwiper/CustomSwiper.js";
const title = "Hello World";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    common_vendor.ref(0);
    const banner = common_vendor.ref([
      {
        id: 1,
        url: "https://picsum.photos/seed/1/800/400"
      },
      {
        id: 2,
        url: "https://picsum.photos/seed/2/800/400"
      },
      {
        id: 3,
        url: "https://picsum.photos/seed/3/800/400"
      }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => banner.value = $event),
        b: common_vendor.p({
          bannerList: banner.value
        }),
        c: common_assets._imports_0,
        d: common_vendor.t(title)
      };
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
