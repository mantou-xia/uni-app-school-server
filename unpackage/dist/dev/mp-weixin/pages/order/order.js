"use strict";
const common_vendor = require("../../common/vendor.js");
const renCustomerNavigator = () => "../../components/ren-customer-navigator/ren-customer-navigator.js";
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      tabs: [
        { name: "全部订单" },
        { name: "我的订单" },
        { name: "我的接单" },
        { name: "正在悬赏" }
      ],
      // 所有订单数据
      allOrders: [
        {
          type: "快递代取",
          status: "pending",
          statusText: "待帮助",
          expressType: "中件",
          expressCount: 1,
          remark: "一件衣服",
          expectedDelivery: "尽快送达",
          pickupAddress: "快递点-科技园快递点（南信一号楼数学楼东侧店）",
          deliveryAddress: "男生宿舍-学生公寓2栋-2单元2-304d",
          fee: "3.00",
          tip: "0.00",
          time: "2024-03-10 14:30",
          orderNo: "100250425143509600672",
          payTime: "2025-04-25 14:35:24",
          acceptTime: "2025-04-25 14:39:25"
        },
        {
          type: "快递代取",
          status: "processing",
          statusText: "正在帮助",
          pickupAddress: "快递点-菜鸟驿站（3号柜台）",
          deliveryAddress: "学生宿舍8栋-B305",
          items: "快递包裹 1件",
          fee: "3.00",
          tip: "2.00",
          time: "2024-03-10 12:00",
          orderNo: "100250425143509600673"
        },
        {
          type: "食堂打饭",
          status: "completed",
          statusText: "已帮助",
          pickupAddress: "第一食堂-2楼",
          deliveryAddress: "图书馆-3楼自习室",
          items: "黄焖鸡米饭 1份",
          fee: "3.00",
          tip: "1.00",
          time: "2024-03-10 15:30",
          orderNo: "100250425143509600674"
        },
        {
          type: "快递代取",
          status: "rewarding",
          statusText: "正在悬赏",
          pickupAddress: "快递点-京东快递站点",
          deliveryAddress: "教学楼-A栋201",
          items: "大件快递 1个",
          fee: "5.00",
          tip: "3.00",
          time: "2024-03-10 16:20",
          orderNo: "100250425143509600675"
        },
        {
          type: "校园跑腿",
          status: "pending",
          statusText: "待帮助",
          pickupAddress: "图书馆-1楼打印店",
          deliveryAddress: "教学楼-C栋405",
          items: "打印资料 20页",
          fee: "2.00",
          tip: "1.00",
          time: "2024-03-10 17:00",
          orderNo: "100250425143509600676",
          remark: "双面打印，彩印"
        },
        {
          type: "食堂打饭",
          status: "rewarding",
          statusText: "正在悬赏",
          pickupAddress: "第二食堂-1楼",
          deliveryAddress: "实验楼-B区203",
          items: "麻辣香锅套餐 1份",
          fee: "4.00",
          tip: "5.00",
          time: "2024-03-10 11:30",
          orderNo: "100250425143509600677",
          remark: "不要太辣，多加青菜"
        },
        {
          type: "校园跑腿",
          status: "processing",
          statusText: "正在帮助",
          pickupAddress: "校医院",
          deliveryAddress: "女生宿舍-6栋-504",
          items: "药品",
          fee: "5.00",
          tip: "3.00",
          time: "2024-03-10 09:15",
          orderNo: "100250425143509600678",
          remark: "帮取感冒药，已开好处方"
        },
        {
          type: "快递代取",
          status: "completed",
          statusText: "已帮助",
          pickupAddress: "快递点-顺丰快递点（西门店）",
          deliveryAddress: "教师公寓-3号楼-502",
          items: "快递包裹 2件",
          fee: "6.00",
          tip: "2.00",
          time: "2024-03-10 08:30",
          orderNo: "100250425143509600679",
          remark: "易碎物品，请小心搬运"
        },
        {
          type: "食堂打饭",
          status: "processing",
          statusText: "正在帮助",
          pickupAddress: "第三食堂-3楼",
          deliveryAddress: "体育馆-羽毛球场",
          items: "水饺 2份，可乐 1瓶",
          fee: "3.50",
          tip: "2.50",
          time: "2024-03-10 18:45",
          orderNo: "100250425143509600680",
          remark: "水饺要韭菜馅的"
        },
        {
          type: "校园跑腿",
          status: "rewarding",
          statusText: "正在悬赏",
          pickupAddress: "学生活动中心",
          deliveryAddress: "音乐厅",
          items: "乐器搬运",
          fee: "10.00",
          tip: "8.00",
          time: "2024-03-10 13:20",
          orderNo: "100250425143509600681",
          remark: "小提琴一个，需要小心搬运"
        }
      ]
    };
  },
  computed: {
    // 根据当前选中的标签筛选订单
    currentOrders() {
      switch (this.currentTab) {
        case 1:
          return this.allOrders.filter((order) => order.status === "pending" || order.status === "processing");
        case 2:
          return this.allOrders.filter((order) => order.status === "processing" || order.status === "completed");
        case 3:
          return this.allOrders.filter((order) => order.status === "rewarding");
        default:
          return this.allOrders;
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
        "completed": "已帮助",
        "rewarding": "正在悬赏"
      };
      return statusMap[status] || "未知状态";
    },
    // 跳转到订单详情
    goToOrderDetail(order) {
      common_vendor.index.navigateTo({
        url: `/pages/order/orderDetail/orderDetail?orderNo=${order.orderNo}`,
        success: () => {
          const eventChannel = this.getOpenerEventChannel();
          eventChannel.emit("acceptOrderData", { order });
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/order/order.vue:267", "跳转失败：", err);
          common_vendor.index.showToast({
            title: "跳转失败，请重试",
            icon: "none"
          });
        }
      });
    },
    getOrderIcon(type) {
      switch (type) {
        case "快递代取":
          return "paperplane";
        case "食堂打饭":
          return "shop";
        case "校园跑腿":
          return "person-filled";
        default:
          return "bars";
      }
    },
    getActionText(status) {
      switch (status) {
        case "pending":
          return "接单";
        case "processing":
          return "完成";
        case "rewarding":
          return "抢单";
        case "completed":
          return "查看";
        default:
          return "查看";
      }
    },
    handleOrderAction(order) {
      switch (order.status) {
        case "pending":
        case "rewarding":
          common_vendor.index.showModal({
            title: "接单确认",
            content: "确认接此订单吗？",
            success: (res) => {
              if (res.confirm) {
                order.status = "processing";
                order.statusText = "配送中";
                common_vendor.index.showToast({
                  title: "接单成功",
                  icon: "success"
                });
              }
            }
          });
          break;
        case "processing":
          common_vendor.index.showModal({
            title: "完成订单",
            content: "确认已完成配送？",
            success: (res) => {
              if (res.confirm) {
                order.status = "completed";
                order.statusText = "已完成";
                common_vendor.index.showToast({
                  title: "订单已完成",
                  icon: "success"
                });
              }
            }
          });
          break;
        case "completed":
          common_vendor.index.navigateTo({
            url: `/pages/order/orderDetail/orderDetail?orderNo=${order.orderNo}`,
            success: () => {
              const eventChannel = this.getOpenerEventChannel();
              eventChannel.emit("acceptOrderData", { order });
            },
            fail: (err) => {
              common_vendor.index.__f__("error", "at pages/order/order.vue:347", "跳转失败：", err);
              common_vendor.index.showToast({
                title: "跳转失败，请重试",
                icon: "none"
              });
            }
          });
          break;
      }
    },
    // 刷新订单列表
    refreshOrderList() {
      common_vendor.index.__f__("log", "at pages/order/order.vue:360", "刷新订单列表");
      common_vendor.index.showLoading({
        title: "刷新中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "刷新成功",
          icon: "success"
        });
      }, 1e3);
    }
  },
  onLoad() {
    common_vendor.index.$on("refreshOrderList", this.refreshOrderList);
  },
  onUnload() {
    common_vendor.index.$off("refreshOrderList", this.refreshOrderList);
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
  return {
    a: common_vendor.f($data.tabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: index,
        c: common_vendor.n($data.currentTab === index ? "active" : ""),
        d: common_vendor.o(($event) => $options.changeTab(index), index)
      };
    }),
    b: common_vendor.f($options.currentOrders, (order, index, i0) => {
      return common_vendor.e({
        a: "2beac40b-0-" + i0,
        b: common_vendor.p({
          type: $options.getOrderIcon(order.type),
          size: "18",
          color: "#666"
        }),
        c: common_vendor.t(order.type),
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
        m: common_vendor.t(order.time),
        n: common_vendor.t($options.getActionText(order.status)),
        o: common_vendor.n(order.status),
        p: common_vendor.o(($event) => $options.handleOrderAction(order), index),
        q: index,
        r: common_vendor.o(($event) => $options.goToOrderDetail(order), index)
      });
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/order/order.js.map
