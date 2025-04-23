"use strict";
const common_vendor = require("../../common/vendor.js");
const CustomSearch = () => "../../components/common/CustomSearch/CustomSearch.js";
const CustomHotList = () => "../../components/circle/CustomHotList/CustomHotList.js";
const CustomOrders = () => "../../components/circle/CustomOrders/CustomOrders.js";
const CustomAdd = () => "../../components/circle/CustomAdd/CustomAdd.js";
const RenCustomerNavigator = () => "../../components/ren-customer-navigator/ren-customer-navigator.js";
const _sfc_main = {
  components: {
    CustomSearch,
    CustomHotList,
    CustomOrders,
    CustomAdd,
    RenCustomerNavigator
  },
  setup() {
    const searchKeyword = common_vendor.ref("");
    const handleSearchInput = (searchData) => {
      const { keyword, type } = searchData;
      searchKeyword.value = keyword;
      common_vendor.index.__f__("log", "at pages/circle/circle.vue:42", `正在${type === "shopping" ? "商城" : "发现"}搜索:`, keyword);
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
    const handleCreatePost = () => {
      common_vendor.index.__f__("log", "at pages/circle/circle.vue:72", "准备创建帖子");
    };
    return {
      searchKeyword,
      handleSearchInput,
      handleSearch,
      handleCreatePost
    };
  }
};
if (!Array) {
  const _component_custom_search = common_vendor.resolveComponent("custom-search");
  const _component_custom_hot_list = common_vendor.resolveComponent("custom-hot-list");
  const _component_custom_orders = common_vendor.resolveComponent("custom-orders");
  const _easycom_ren_customer_navigator2 = common_vendor.resolveComponent("ren-customer-navigator");
  const _component_custom_add = common_vendor.resolveComponent("custom-add");
  (_component_custom_search + _component_custom_hot_list + _component_custom_orders + _easycom_ren_customer_navigator2 + _component_custom_add)();
}
const _easycom_ren_customer_navigator = () => "../../components/ren-customer-navigator/ren-customer-navigator.js";
if (!Math) {
  _easycom_ren_customer_navigator();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o($setup.handleSearchInput),
    b: common_vendor.o($setup.handleSearch),
    c: common_vendor.p({
      type: "find"
    }),
    d: common_vendor.o($setup.handleCreatePost)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/circle/circle.js.map
