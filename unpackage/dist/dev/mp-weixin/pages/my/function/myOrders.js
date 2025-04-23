"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "myOrders",
  setup(__props) {
    const tabs = ["全部", "待付款", "进行中", "已完成", "已取消"];
    const currentTab = common_vendor.ref(0);
    const orders = common_vendor.ref([
      {
        id: "DD20240301001",
        type: "快递代取",
        status: "待付款",
        time: "2024-03-01 14:30",
        fee: "3.00",
        canCancel: true,
        canPay: true
      },
      {
        id: "DD20240301002",
        type: "食堂打包",
        status: "进行中",
        time: "2024-03-01 12:00",
        fee: "5.00",
        canCancel: false,
        canPay: false
      }
    ]);
    const switchTab = (index) => {
      currentTab.value = index;
    };
    const swiperChange = (e) => {
      currentTab.value = e.detail.current;
    };
    const cancelOrder = (orderId) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要取消该订单吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/my/function/myOrders.vue:91", "用户点击确定，取消订单：", orderId);
          }
        }
      });
    };
    const payOrder = (orderId) => {
      common_vendor.index.showLoading({
        title: "正在支付"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "支付成功",
          icon: "success"
        });
      }, 1500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: index,
            c: common_vendor.n(currentTab.value === index ? "active" : ""),
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        b: common_vendor.f(tabs, (tab, index, i0) => {
          return {
            a: common_vendor.f(orders.value, (order, idx, i1) => {
              return common_vendor.e({
                a: common_vendor.t(order.type),
                b: common_vendor.t(order.status),
                c: common_vendor.t(order.id),
                d: common_vendor.t(order.time),
                e: common_vendor.t(order.fee),
                f: order.canCancel
              }, order.canCancel ? {
                g: common_vendor.o(($event) => cancelOrder(order.id), idx)
              } : {}, {
                h: order.canPay
              }, order.canPay ? {
                i: common_vendor.o(($event) => payOrder(order.id), idx)
              } : {}, {
                j: idx
              });
            }),
            b: index
          };
        }),
        c: currentTab.value,
        d: common_vendor.o(swiperChange)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/myOrders.js.map
