"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      orderId: null,
      order: {}
      // 用于存储订单详细信息
    };
  },
  onLoad(options) {
    this.orderId = options.id;
    this.fetchOrderDetails(this.orderId);
  },
  methods: {
    fetchOrderDetails(id) {
      const orders = [
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
      ];
      this.order = orders.find((order) => order.id === parseInt(id)) || {};
    },
    goBack() {
      common_vendor.index.navigateBack();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.orderId),
    b: common_vendor.t($data.order.category || "未定义"),
    c: common_vendor.t($data.order.date || "未定义"),
    d: common_vendor.t($data.order.timeInterval || "未定义"),
    e: common_vendor.t($data.order.region && Array.isArray($data.order.region) && $data.order.region.length > 0 ? $data.order.region.join(", ") : "未定义"),
    f: common_vendor.t($data.order.publishTime || "未定义"),
    g: common_vendor.t($data.order.remarks || "未定义"),
    h: common_vendor.o((...args) => $options.goBack && $options.goBack(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index_campusErrand/order_detail/order_detail.js.map
