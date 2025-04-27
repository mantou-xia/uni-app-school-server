"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      selectedCategory: "全部",
      currentFilter: "today",
      selectedRegion: [],
      orders: [
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
    },
    getOrderIcon(category) {
      switch (category) {
        case "代取":
          return "paperplane";
        case "代送":
          return "shop";
        case "代课":
          return "person-filled";
        default:
          return "bars";
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
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
      return common_vendor.e({
        a: "523f3026-0-" + i0,
        b: common_vendor.p({
          type: $options.getOrderIcon(order.category),
          size: "18",
          color: "#666"
        }),
        c: common_vendor.t(order.title),
        d: common_vendor.t(order.fee),
        e: common_vendor.n("fee-" + $options.getCategoryClass(order.category)),
        f: common_vendor.t(order.category),
        g: $options.getCategoryBgColor(order.category),
        h: common_vendor.t(order.date),
        i: common_vendor.n("location-" + $options.getCategoryClass(order.category)),
        j: common_vendor.t(order.timeInterval),
        k: common_vendor.n("location-" + $options.getCategoryClass(order.category)),
        l: order.category === "代课"
      }, order.category === "代课" ? {
        m: "523f3026-1-" + i0,
        n: common_vendor.p({
          type: "location-filled",
          size: "16",
          color: "#4b7bec"
        }),
        o: common_vendor.t(order.startPoint)
      } : {
        p: "523f3026-2-" + i0,
        q: common_vendor.p({
          type: "location-filled",
          size: "16",
          color: "#2196f3"
        }),
        r: common_vendor.t(order.startPoint),
        s: "523f3026-3-" + i0,
        t: common_vendor.p({
          type: "arrowthinright",
          size: "16",
          color: "#999"
        }),
        v: "523f3026-4-" + i0,
        w: common_vendor.p({
          type: "location",
          size: "16",
          color: "#ff4757"
        }),
        x: common_vendor.t(order.endPoint)
      }, {
        y: common_vendor.t(order.remarks),
        z: common_vendor.n("location-" + $options.getCategoryClass(order.category)),
        A: common_vendor.t(order.publishTime),
        B: common_vendor.n($options.getCategoryClass(order.category)),
        C: order.id,
        D: common_vendor.n("category-" + $options.getCategoryClass(order.category)),
        E: common_vendor.o(($event) => $options.acceptOrder(order.id), order.id)
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index_campusErrand/index_campusErrand.js.map
