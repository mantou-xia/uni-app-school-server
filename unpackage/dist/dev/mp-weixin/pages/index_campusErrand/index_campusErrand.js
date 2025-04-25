"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectedCategory: "全部",
      currentFilter: "today",
      selectedRegion: [],
      orders: [
        { id: 1, title: "取外卖", category: "代取", date: "2023-10-01", timeInterval: "10:00 - 12:00", publishTime: "09-30 20:00", remarks: "请尽快取货", type: "today", region: ["东苑"] },
        { id: 2, title: "送文件", category: "代送", date: "2023-10-01", timeInterval: "14:00 - 16:00", publishTime: "10-01 09:00", remarks: "小心 fragile", type: "today", region: ["中苑"] },
        { id: 3, title: "早八高数", category: "代课", date: "2023-10-02", timeInterval: "09:00 - 11:00", publishTime: "10-02 18:00", remarks: "不点名速来", type: "scheduled", region: ["西苑"] },
        { id: 4, title: "其他任务", category: "其他", date: "2023-10-03", timeInterval: "15:00 - 17:00", publishTime: "10-03 12:00", remarks: "常规杂务", type: "scheduled", region: ["东苑", "中苑"] },
        { id: 5, title: "代取快递", category: "代取", date: "2023-10-01", timeInterval: "11:00 - 12:00", publishTime: "09-30 21:00", remarks: "请尽快取件", type: "today", region: ["东苑", "西苑"] },
        { id: 6, title: "送书籍", category: "代送", date: "2023-10-01", timeInterval: "13:00 - 15:00", publishTime: "10-01 08:00", remarks: "小心书籍", type: "today", region: ["中苑"] },
        { id: 7, title: "代课", category: "代课", date: "2023-10-02", timeInterval: "08:00 - 10:00", publishTime: "10-02 07:00", remarks: "请准时到达", type: "scheduled", region: ["东苑", "西苑"] },
        { id: 8, title: "送文件", category: "代送", date: "2023-10-03", timeInterval: "10:00 - 12:00", publishTime: "10-02 09:00", remarks: "请小心", type: "scheduled", region: ["中苑"] },
        { id: 9, title: "代取水", category: "代取", date: "2023-10-01", timeInterval: "09:00 - 10:00", publishTime: "09-30 22:00", remarks: "请尽快取水", type: "today", region: ["东苑", "中苑", "西苑"] },
        { id: 10, title: "代送快递", category: "代送", date: "2023-10-02", timeInterval: "14:00 - 16:00", publishTime: "10-01 10:00", remarks: "请小心", type: "scheduled", region: ["西苑"] },
        { id: 11, title: "代课", category: "代课", date: "2023-10-03", timeInterval: "15:00 - 17:00", publishTime: "10-02 11:00", remarks: "请准时到达", type: "scheduled", region: ["东苑"] }
      ]
    };
  },
  computed: {
    filteredOrders() {
      let filteredByType = this.orders.filter((o) => {
        if (this.currentFilter === "today") {
          return o.type === "today";
        } else {
          return o.type === "scheduled";
        }
      });
      switch (this.selectedCategory) {
        case "帮我取":
          filteredByType = filteredByType.filter((o) => o.category === "代取");
          break;
        case "帮我送":
          filteredByType = filteredByType.filter((o) => o.category === "代送");
          break;
        case "帮我水":
          filteredByType = filteredByType.filter((o) => o.category === "代课");
          break;
      }
      if (this.selectedRegion.length > 0) {
        filteredByType = filteredByType.filter(
          (o) => o.region.some((r) => this.selectedRegion.includes(r))
        );
      }
      return filteredByType;
    }
  },
  methods: {
    selectCategory(cat) {
      this.selectedCategory = cat;
    },
    toggleRegion(region) {
      const index = this.selectedRegion.indexOf(region);
      if (index === -1) {
        this.selectedRegion.push(region);
      } else {
        this.selectedRegion.splice(index, 1);
      }
    },
    toggleOrders() {
      this.currentFilter = this.currentFilter === "today" ? "scheduled" : "today";
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
    a: common_vendor.t($data.selectedCategory),
    b: common_vendor.o(($event) => $options.selectCategory("帮我取")),
    c: common_vendor.o(($event) => $options.selectCategory("帮我送")),
    d: common_vendor.o(($event) => $options.selectCategory("帮我水")),
    e: common_vendor.o(($event) => $options.selectCategory("全部")),
    f: common_vendor.t($data.currentFilter === "today" ? "看今天" : "等预约"),
    g: common_vendor.o(($event) => $options.toggleOrders()),
    h: common_vendor.o(($event) => $options.toggleOrders()),
    i: common_vendor.t($data.selectedRegion.join(", ") || "请选择地区"),
    j: common_vendor.o(($event) => $options.toggleRegion("东苑")),
    k: common_vendor.o(($event) => $options.toggleRegion("中苑")),
    l: common_vendor.o(($event) => $options.toggleRegion("西苑")),
    m: common_vendor.f($options.filteredOrders, (order, index, i0) => {
      return {
        a: common_vendor.t(order.title),
        b: common_vendor.t(order.category),
        c: $options.getCategoryBgColor(order.category),
        d: common_vendor.t(order.date),
        e: common_vendor.t(order.timeInterval),
        f: common_vendor.t(order.region.join(", ")),
        g: common_vendor.t(order.publishTime),
        h: common_vendor.t(order.remarks),
        i: order.id,
        j: common_vendor.o(($event) => $options.acceptOrder(order.id), order.id)
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index_campusErrand/index_campusErrand.js.map
