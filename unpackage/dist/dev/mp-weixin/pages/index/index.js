"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const CustomSwiper = () => "../../components/index/CustomSwiper/CustomSwiper.js";
const CustomNotice = () => "../../components/index/CustomNotice/CustomNotice.js";
const CustomGrid = () => "../../components/index/CustomGrid/CustomGrid.js";
const CustomSearch = () => "../../components/common/CustomSearch/CustomSearch.js";
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
      title: "Hello World",
      announcement: "欢迎使用校园服务平台，我们致力于为您提供最佳的服务体验！",
      searchKeyword: ""
      // 添加搜索关键词状态
    };
  },
  components: {
    CustomSwiper,
    CustomNotice,
    CustomGrid,
    CustomSearch
  },
  methods: {
    // 处理搜索输入事件
    handleSearchInput(keyword) {
      this.searchKeyword = keyword;
      common_vendor.index.__f__("log", "at pages/index/index.vue:58", "正在输入:", keyword);
    },
    // 处理搜索确认事件
    handleSearch(keyword) {
      common_vendor.index.showModal({
        title: "搜索提示",
        content: `您搜索的内容是：${keyword}`,
        showCancel: false,
        confirmText: "确定"
      });
    }
  }
};
if (!Array) {
  const _component_custom_swiper = common_vendor.resolveComponent("custom-swiper");
  const _component_custom_notice = common_vendor.resolveComponent("custom-notice");
  const _component_custom_grid = common_vendor.resolveComponent("custom-grid");
  const _component_custom_search = common_vendor.resolveComponent("custom-search");
  const _easycom_ren_customer_navigator2 = common_vendor.resolveComponent("ren-customer-navigator");
  (_component_custom_swiper + _component_custom_notice + _component_custom_grid + _component_custom_search + _easycom_ren_customer_navigator2)();
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
    c: common_vendor.p({
      ["notice-content"]: $data.announcement
    }),
    d: common_vendor.o($options.handleSearchInput),
    e: common_vendor.o($options.handleSearch),
    f: common_assets._imports_0,
    g: common_vendor.t($data.title)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
