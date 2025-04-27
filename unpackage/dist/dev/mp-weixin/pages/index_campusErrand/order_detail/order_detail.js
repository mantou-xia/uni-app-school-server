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
        { id: 1, title: "取外卖", category: "代取", date: "2023-10-01", timeInterval: "10:00 - 12:00", publishTime: "09-30 20:00", remarks: "请尽快取货", type: "today", region: ["东苑"], fee: "8", startPoint: "东苑1号宿舍楼", endPoint: "东苑食堂" },
        { id: 2, title: "送文件", category: "代送", date: "2023-10-01", timeInterval: "14:00 - 16:00", publishTime: "10-01 09:00", remarks: "小心 fragile", type: "today", region: ["中苑"], fee: "10", startPoint: "行政楼", endPoint: "中苑3栋" },
        { id: 3, title: "早八高数", category: "代课", date: "2023-10-02", timeInterval: "09:00 - 11:00", publishTime: "10-02 18:00", remarks: "不点名速来，请签到拍照课件", type: "scheduled", region: ["西苑"], fee: "50", startPoint: "教学楼B302", endPoint: null },
        { id: 4, title: "其他任务", category: "其他", date: "2023-10-03", timeInterval: "15:00 - 17:00", publishTime: "10-03 12:00", remarks: "常规杂务", type: "scheduled", region: ["东苑", "中苑"], fee: "15", startPoint: "学生活动中心", endPoint: "图书馆" },
        { id: 5, title: "代取快递", category: "代取", date: "2023-10-01", timeInterval: "11:00 - 12:00", publishTime: "09-30 21:00", remarks: "请尽快取件", type: "today", region: ["东苑", "西苑"], fee: "12", startPoint: "菜鸟驿站", endPoint: "西苑2栋" },
        { id: 6, title: "送书籍", category: "代送", date: "2023-10-01", timeInterval: "13:00 - 15:00", publishTime: "10-01 08:00", remarks: "小心书籍", type: "today", region: ["中苑"], fee: "9", startPoint: "图书馆", endPoint: "中苑1号楼" },
        { id: 7, title: "代课", category: "代课", date: "2023-10-02", timeInterval: "08:00 - 10:00", publishTime: "10-02 07:00", remarks: "请准时到达，完成签到并拍课件", type: "scheduled", region: ["东苑", "西苑"], fee: "40", startPoint: "教学楼A405", endPoint: null },
        { id: 8, title: "送文件", category: "代送", date: "2023-10-03", timeInterval: "10:00 - 12:00", publishTime: "10-02 09:00", remarks: "请小心", type: "scheduled", region: ["中苑"], fee: "11", startPoint: "办公楼", endPoint: "中苑食堂" },
        { id: 9, title: "代取水", category: "代取", date: "2023-10-01", timeInterval: "09:00 - 10:00", publishTime: "09-30 22:00", remarks: "请尽快取水", type: "today", region: ["东苑", "中苑", "西苑"], fee: "5", startPoint: "超市", endPoint: "实验室" },
        { id: 10, title: "代送快递", category: "代送", date: "2023-10-02", timeInterval: "14:00 - 16:00", publishTime: "10-01 10:00", remarks: "请小心", type: "scheduled", region: ["西苑"], fee: "13", startPoint: "西苑5栋", endPoint: "快递站" },
        { id: 11, title: "代课", category: "代课", date: "2023-10-03", timeInterval: "15:00 - 17:00", publishTime: "10-02 11:00", remarks: "请准时到达，记笔记并拍照课件", type: "scheduled", region: ["东苑"], fee: "45", startPoint: "教学楼C201", endPoint: null }
      ];
      this.order = orders.find((order) => order.id === parseInt(id)) || {};
    },
    goBack() {
      common_vendor.index.navigateBack();
    },
    acceptOrder() {
      common_vendor.index.showModal({
        title: "接单确认",
        content: `确认接此订单？酬劳：¥${this.order.fee}`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "接单成功",
              icon: "success"
            });
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 1500);
          }
        }
      });
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
    },
    getCategoryClass(category) {
      switch (category) {
        case "代取":
          return "fetch";
        case "代送":
          return "delivery";
        case "代课":
          return "class";
        default:
          return "other";
      }
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
    a: common_vendor.t($data.order.title || "订单详情"),
    b: common_vendor.t($data.order.category || "未分类"),
    c: common_vendor.t($data.order.date),
    d: common_vendor.t($data.order.timeInterval),
    e: common_vendor.t($data.order.fee || "0"),
    f: common_vendor.n("theme-" + $options.getCategoryClass($data.order.category)),
    g: common_vendor.t($data.orderId),
    h: common_vendor.t($data.order.date || "未定义"),
    i: common_vendor.t($data.order.timeInterval || "未定义"),
    j: common_vendor.t($data.order.region && Array.isArray($data.order.region) && $data.order.region.length > 0 ? $data.order.region.join(", ") : "未定义"),
    k: common_vendor.t($data.order.publishTime || "未定义"),
    l: $data.order.category === "代课"
  }, $data.order.category === "代课" ? {
    m: common_vendor.t($data.order.startPoint || "未指定")
  } : {
    n: common_vendor.t($data.order.startPoint || "未指定"),
    o: common_vendor.t($data.order.endPoint || "未指定")
  }, {
    p: common_vendor.t($data.order.remarks || "无备注信息"),
    q: common_vendor.p({
      type: "plusempty",
      size: "24",
      color: "#fff"
    }),
    r: common_vendor.o((...args) => $options.acceptOrder && $options.acceptOrder(...args)),
    s: common_vendor.n("theme-" + $options.getCategoryClass($data.order.category))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index_campusErrand/order_detail/order_detail.js.map
