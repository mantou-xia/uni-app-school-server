"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_ren_customer_navigator2 = common_vendor.resolveComponent("ren-customer-navigator");
  _easycom_ren_customer_navigator2();
}
const _easycom_ren_customer_navigator = () => "../../components/ren-customer-navigator/ren-customer-navigator.js";
if (!Math) {
  (CustomSearch + CustomHotList + CustomOrders + _easycom_ren_customer_navigator)();
}
const CustomSearch = () => "../../components/common/CustomSearch/CustomSearch.js";
const CustomHotList = () => "../../components/circle/CustomHotList/CustomHotList.js";
const CustomOrders = () => "../../components/circle/CustomOrders/CustomOrders.js";
const _sfc_main = {
  __name: "circle",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    const handleSearchInput = (searchData) => {
      const { keyword, type } = searchData;
      searchKeyword.value = keyword;
      common_vendor.index.__f__("log", "at pages/circle/circle.vue:27", `正在${type === "shopping" ? "商城" : "发现"}搜索:`, keyword);
    };
    const handleSearch = (searchData) => {
      const { keyword, type } = searchData;
      if (type === "shopping") {
        common_vendor.index.showModal({
          title: "商城搜索",
          content: `您在商城搜索：${keyword}`,
          showCancel: false,
          confirmText: "确定"
        });
      } else {
        common_vendor.index.showModal({
          title: "发现搜索",
          content: `您在发现页搜索：${keyword}`,
          showCancel: false,
          confirmText: "确定"
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(handleSearchInput),
        b: common_vendor.o(handleSearch),
        c: common_vendor.p({
          type: "find"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/circle/circle.js.map
