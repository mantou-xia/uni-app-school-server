"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectedCategory: "全部",
      orders: [
        { id: 1, title: "取外卖", category: "代取", timeInterval: "10:00 - 12:00", publishTime: "09-30 20:00", remarks: "请尽快取货" },
        { id: 2, title: "送文件", category: "代送", timeInterval: "14:00 - 16:00", publishTime: "10-01 09:00", remarks: "小心 fragile" },
        { id: 3, title: "早八高数", category: "代课", timeInterval: "09:00 - 11:00", publishTime: "10-02 18:00", remarks: "不点名速来" },
        { id: 4, title: "其他任务", category: "其他", timeInterval: "15:00 - 17:00", publishTime: "10-03 12:00", remarks: "常规杂务" }
      ]
    };
  },
  computed: {
    filteredOrders() {
      switch (this.selectedCategory) {
        case "帮我取":
          return this.orders.filter((o) => o.category === "代取");
        case "帮我送":
          return this.orders.filter((o) => o.category === "代送");
        case "帮我水":
          return this.orders.filter((o) => o.category === "代课");
        default:
          return this.orders;
      }
    }
  },
  methods: {
    selectCategory(cat) {
      this.selectedCategory = cat;
    },
    acceptOrder(id) {
      common_vendor.index.navigateTo({ url: `/pages/index_campusErrand/order_detail/order_detail?id=${id}` });
    },
    getCategoryBgColor(category) {
      switch (category) {
        case "代取":
          return "#ff6b6b";
        case "代送":
          return "#40c463";
        case "代课":
          return "#4b7bec";
        default:
          return "#a4a4a4";
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.selectedCategory === "帮我取" ? 1 : "",
    b: common_vendor.o(($event) => $options.selectCategory("帮我取")),
    c: $data.selectedCategory === "帮我送" ? 1 : "",
    d: common_vendor.o(($event) => $options.selectCategory("帮我送")),
    e: $data.selectedCategory === "帮我水" ? 1 : "",
    f: common_vendor.o(($event) => $options.selectCategory("帮我水")),
    g: $data.selectedCategory === "全部" ? 1 : "",
    h: common_vendor.o(($event) => $options.selectCategory("全部")),
    i: common_vendor.f($options.filteredOrders, (order, index, i0) => {
      return {
        a: common_vendor.t(order.title),
        b: common_vendor.t(order.category),
        c: $options.getCategoryBgColor(order.category),
        d: common_vendor.t(order.timeInterval),
        e: common_vendor.t(order.publishTime),
        f: common_vendor.t(order.remarks),
        g: order.id,
        h: common_vendor.o(($event) => $options.acceptOrder(order.id), order.id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index_campusErrand/index_campusErrand.js.map
