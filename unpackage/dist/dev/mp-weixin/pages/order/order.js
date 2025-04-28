"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const renCustomerNavigator = () => "../../components/ren-customer-navigator/ren-customer-navigator.js";
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      tabs: [
        { name: "我的发布" },
        { name: "我的接单" }
      ],
      // 所有订单数据
      allOrders: [
        {
          id: 100007,
          user_id: 1001,
          rider_id: 2004,
          category: "校园跑腿",
          fee: "6.00",
          tip: "4.00",
          title: "帮取材料",
          date: "2024-04-24 14:25:18",
          deadline: "2024-04-24 16:25:00",
          finish_time: "2024-04-24 15:30:22",
          time_interval: "2小时内",
          remarks: "材料在老师办公室，已经打包好了",
          region: "学校",
          pickupAddress: "教师办公楼-A302",
          deliveryAddress: "实验楼-B505",
          contact: "139****2468",
          status: "completed",
          statusText: "已完成",
          items: "实验材料 1包",
          orderNo: "100250424142518600678",
          time: "2024-04-24 14:25:18",
          create_time: "2024-04-24 14:25:18",
          modify_time: "2024-04-24 15:30:22",
          isMyPublish: true,
          isMyAccept: false
        },
        {
          id: 100008,
          user_id: 1002,
          rider_id: 2001,
          category: "快递代取",
          fee: "4.50",
          tip: "1.50",
          title: "取邮政快递",
          date: "2024-04-23 10:15:44",
          deadline: "2024-04-23 12:15:00",
          finish_time: "2024-04-23 11:20:35",
          time_interval: "2小时内",
          remarks: "小件快递，取件码8765",
          region: "学校",
          pickupAddress: "邮政快递点",
          deliveryAddress: "教学楼-C栋302",
          contact: "136****1357",
          status: "completed",
          statusText: "已完成",
          items: "快递包裹 1个",
          orderNo: "100250423101544600679",
          time: "2024-04-23 10:15:44",
          create_time: "2024-04-23 10:15:44",
          modify_time: "2024-04-23 11:20:35",
          isMyPublish: false,
          isMyAccept: true
        },
        {
          id: 100009,
          user_id: 1001,
          rider_id: 2005,
          category: "食堂打饭",
          fee: "5.50",
          tip: "2.00",
          title: "午餐打包",
          date: "2024-04-22 11:45:38",
          deadline: "2024-04-22 12:45:00",
          finish_time: "2024-04-22 12:30:15",
          time_interval: "1小时内",
          remarks: "要辣，多加点菜",
          region: "学校",
          pickupAddress: "第一食堂-1楼",
          deliveryAddress: "实验楼-A208",
          contact: "138****2468",
          status: "completed",
          statusText: "已完成",
          items: "回锅肉饭 1份, 饮料 1瓶",
          orderNo: "100250422114538600680",
          time: "2024-04-22 11:45:38",
          create_time: "2024-04-22 11:45:38",
          modify_time: "2024-04-22 12:30:15",
          isMyPublish: true,
          isMyAccept: false
        },
        {
          id: 100010,
          user_id: 1003,
          rider_id: 2001,
          category: "代跑腿",
          fee: "7.00",
          tip: "3.00",
          title: "取打印材料",
          date: "2024-04-21 15:20:33",
          deadline: "2024-04-21 17:20:00",
          finish_time: "2024-04-21 16:15:42",
          time_interval: "2小时内",
          remarks: "彩印，A4纸，双面打印",
          region: "学校",
          pickupAddress: "图书馆-打印店",
          deliveryAddress: "学生宿舍6栋-B402",
          contact: "185****7890",
          status: "completed",
          statusText: "已完成",
          items: "打印资料 30页",
          orderNo: "100250421152033600681",
          time: "2024-04-21 15:20:33",
          create_time: "2024-04-21 15:20:33",
          modify_time: "2024-04-21 16:15:42",
          isMyPublish: false,
          isMyAccept: true
        }
      ]
    };
  },
  computed: {
    // 根据当前选中的标签筛选订单
    currentOrders() {
      switch (this.currentTab) {
        case 0:
          return this.allOrders.filter((order) => order.isMyPublish && order.status === "completed");
        case 1:
          return this.allOrders.filter((order) => order.isMyAccept && order.status === "completed");
        default:
          return [];
      }
    }
  },
  methods: {
    changeTab(index) {
      this.currentTab = index;
    },
    // 获取状态文本
    getStatusText(status) {
      const statusMap = {
        "pending": "待帮助",
        "processing": "正在帮助",
        "completed": "已完成",
        "rewarding": "正在悬赏"
      };
      return statusMap[status] || "未知状态";
    },
    getOrderIcon(type) {
      switch (type) {
        case "快递代取":
          return "paperplane";
        case "食堂打饭":
          return "shop";
        case "校园跑腿":
        case "代跑腿":
          return "person-filled";
        default:
          return "bars";
      }
    }
  },
  components: {
    renCustomerNavigator
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_ren_customer_navigator2 = common_vendor.resolveComponent("ren-customer-navigator");
  (_easycom_uni_icons2 + _easycom_ren_customer_navigator2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_ren_customer_navigator = () => "../../components/ren-customer-navigator/ren-customer-navigator.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_ren_customer_navigator)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.tabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: index,
        c: common_vendor.n($data.currentTab === index ? "active" : ""),
        d: common_vendor.o(($event) => $options.changeTab(index), index)
      };
    }),
    b: $options.currentOrders.length === 0
  }, $options.currentOrders.length === 0 ? {
    c: common_assets._imports_0
  } : {
    d: common_vendor.f($options.currentOrders, (order, index, i0) => {
      return common_vendor.e({
        a: "c3192cf2-0-" + i0,
        b: common_vendor.p({
          type: $options.getOrderIcon(order.category),
          size: "18",
          color: "#666"
        }),
        c: common_vendor.t(order.category),
        d: common_vendor.t($options.getStatusText(order.status)),
        e: common_vendor.n(order.status),
        f: common_vendor.t(order.pickupAddress),
        g: common_vendor.t(order.deliveryAddress),
        h: order.items
      }, order.items ? {
        i: common_vendor.t(order.items)
      } : {}, {
        j: common_vendor.t(order.fee),
        k: order.tip > 0
      }, order.tip > 0 ? {
        l: common_vendor.t(order.tip)
      } : {}, {
        m: common_vendor.t((Number(order.fee) + Number(order.tip || 0)).toFixed(2)),
        n: common_vendor.t(order.orderNo),
        o: common_vendor.t(order.time),
        p: common_vendor.t(order.time),
        q: index
      });
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/order.js.map
