"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "transactions",
  setup(__props) {
    const tabs = ["全部", "收入", "支出"];
    const currentTab = common_vendor.ref(0);
    const isRefreshing = common_vendor.ref(false);
    const hasMore = common_vendor.ref(true);
    const page = common_vendor.ref(1);
    const allTransactions = common_vendor.ref([
      {
        type: "接单收入",
        amount: 15,
        time: "2024-03-01 15:30",
        status: "已完成",
        orderNo: "T20240301153000",
        detail: "校园跑腿订单"
      },
      {
        type: "提现",
        amount: -50,
        time: "2024-03-01 14:20",
        status: "处理中",
        orderNo: "W20240301142000",
        detail: "提现到微信零钱"
      },
      {
        type: "接单收入",
        amount: 12,
        time: "2024-03-01 12:45",
        status: "已完成",
        orderNo: "T20240301124500",
        detail: "校园跑腿订单"
      },
      {
        type: "充值",
        amount: 100,
        time: "2024-03-01 10:30",
        status: "已完成",
        orderNo: "R20240301103000",
        detail: "微信支付充值"
      }
    ]);
    const currentList = common_vendor.computed(() => {
      if (currentTab.value === 0)
        return allTransactions.value;
      if (currentTab.value === 1)
        return allTransactions.value.filter((t) => t.amount > 0);
      return allTransactions.value.filter((t) => t.amount < 0);
    });
    const switchTab = (index) => {
      currentTab.value = index;
      page.value = 1;
      hasMore.value = true;
    };
    const getStatusColor = (status) => {
      switch (status) {
        case "已完成":
          return "#2ecc71";
        case "处理中":
          return "#f1c40f";
        case "已取消":
          return "#e74c3c";
        default:
          return "#999";
      }
    };
    const onRefresh = () => {
      isRefreshing.value = true;
      setTimeout(() => {
        isRefreshing.value = false;
        common_vendor.index.showToast({
          title: "刷新成功",
          icon: "success"
        });
      }, 1e3);
    };
    const loadMore = () => {
      if (!hasMore.value)
        return;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      setTimeout(() => {
        hasMore.value = false;
        common_vendor.index.hideLoading();
      }, 1e3);
    };
    const showDetail = (item) => {
      common_vendor.index.showModal({
        title: "交易详情",
        content: `订单号：${item.orderNo}
类型：${item.type}
金额：${item.amount}
时间：${item.time}
状态：${item.status}
说明：${item.detail}`,
        showCancel: false
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(tabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: index,
            c: common_vendor.n(currentTab.value === index ? "active" : ""),
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        b: !currentList.value.length
      }, !currentList.value.length ? {
        c: common_assets._imports_0
      } : common_vendor.e({
        d: common_vendor.f(currentList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.type),
            b: common_vendor.t(item.amount > 0 ? "+" : ""),
            c: common_vendor.t(item.amount),
            d: common_vendor.n(item.amount > 0 ? "income" : "expense"),
            e: common_vendor.t(item.time),
            f: common_vendor.t(item.status),
            g: getStatusColor(item.status),
            h: index,
            i: common_vendor.o(($event) => showDetail(item), index)
          };
        }),
        e: hasMore.value
      }, hasMore.value ? {
        f: common_vendor.p({
          type: "spinner-cycle",
          size: "20",
          color: "#999"
        })
      } : {}), {
        g: common_vendor.o(onRefresh),
        h: isRefreshing.value,
        i: common_vendor.o(loadMore)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/function/myWalletPage/transactions.js.map
