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
  __name: "bills",
  setup(__props) {
    common_vendor.onMounted(() => {
      initData();
    });
    const initData = () => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 500);
    };
    const now = /* @__PURE__ */ new Date();
    const currentYear = common_vendor.ref(now.getFullYear());
    const currentMonth = common_vendor.ref(now.getMonth() + 1);
    const isRefreshing = common_vendor.ref(false);
    const hasMore = common_vendor.ref(true);
    const page = common_vendor.ref(1);
    const bills = common_vendor.ref([
      {
        type: "接单收入",
        amount: 15,
        time: "2024-03-01 15:30:00",
        status: "已完成",
        orderNo: "T20240301153000",
        detail: "校园跑腿订单"
      },
      {
        type: "提现",
        amount: -50,
        time: "2024-03-01 14:20:00",
        status: "处理中",
        orderNo: "W20240301142000",
        detail: "提现到微信零钱"
      },
      {
        type: "接单收入",
        amount: 12,
        time: "2024-03-01 12:45:00",
        status: "已完成",
        orderNo: "T20240301124500",
        detail: "校园跑腿订单"
      },
      {
        type: "充值",
        amount: 100,
        time: "2024-03-01 10:30:00",
        status: "已完成",
        orderNo: "R20240301103000",
        detail: "微信支付充值"
      }
    ]);
    const currentBills = common_vendor.computed(() => {
      return bills.value.filter((bill) => {
        const date = new Date(bill.time);
        return date.getFullYear() === currentYear.value && date.getMonth() + 1 === currentMonth.value;
      });
    });
    const groupedBills = common_vendor.computed(() => {
      const groups = {};
      currentBills.value.forEach((bill) => {
        const date = bill.time.split(" ")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(bill);
      });
      return groups;
    });
    const monthlyIncome = common_vendor.computed(() => {
      return currentBills.value.filter((bill) => bill.amount > 0).reduce((sum, bill) => sum + bill.amount, 0).toFixed(2);
    });
    const monthlyExpense = common_vendor.computed(() => {
      return currentBills.value.filter((bill) => bill.amount < 0).reduce((sum, bill) => sum + Math.abs(bill.amount), 0).toFixed(2);
    });
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    };
    const formatTime = (timeStr) => {
      return timeStr.split(" ")[1].substring(0, 5);
    };
    const prevMonth = () => {
      if (currentMonth.value === 1) {
        currentYear.value--;
        currentMonth.value = 12;
      } else {
        currentMonth.value--;
      }
      resetList();
    };
    const nextMonth = () => {
      if (currentMonth.value === 12) {
        currentYear.value++;
        currentMonth.value = 1;
      } else {
        currentMonth.value++;
      }
      resetList();
    };
    const resetList = () => {
      page.value = 1;
      hasMore.value = true;
    };
    const getDayIncome = (dayBills) => {
      return dayBills.filter((bill) => bill.amount > 0).reduce((sum, bill) => sum + bill.amount, 0).toFixed(2);
    };
    const getDayExpense = (dayBills) => {
      return dayBills.filter((bill) => bill.amount < 0).reduce((sum, bill) => sum + Math.abs(bill.amount), 0).toFixed(2);
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
        title: "账单详情",
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
        a: common_vendor.t(currentYear.value),
        b: common_vendor.t(currentMonth.value),
        c: common_vendor.o(prevMonth),
        d: common_vendor.p({
          type: "left",
          size: "20",
          color: "#666"
        }),
        e: common_vendor.o(nextMonth),
        f: common_vendor.p({
          type: "right",
          size: "20",
          color: "#666"
        }),
        g: common_vendor.t(monthlyIncome.value),
        h: common_vendor.t(monthlyExpense.value),
        i: currentBills.value.length
      }, currentBills.value.length ? common_vendor.e({
        j: common_vendor.f(groupedBills.value, (group, date, i0) => {
          return {
            a: common_vendor.t(formatDate(date)),
            b: common_vendor.t(getDayIncome(group)),
            c: common_vendor.t(getDayExpense(group)),
            d: common_vendor.f(group, (item, index, i1) => {
              return {
                a: common_vendor.t(item.type),
                b: common_vendor.t(item.amount > 0 ? "+" : ""),
                c: common_vendor.t(item.amount),
                d: common_vendor.n(item.amount > 0 ? "income" : "expense"),
                e: common_vendor.t(formatTime(item.time)),
                f: common_vendor.t(item.status),
                g: getStatusColor(item.status),
                h: index,
                i: common_vendor.o(($event) => showDetail(item), index)
              };
            }),
            e: date
          };
        }),
        k: hasMore.value
      }, hasMore.value ? {
        l: common_vendor.p({
          type: "spinner-cycle",
          size: "20",
          color: "#999"
        })
      } : {}) : {
        m: common_assets._imports_0
      }, {
        n: common_vendor.o(onRefresh),
        o: isRefreshing.value,
        p: common_vendor.o(loadMore)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/function/myWalletPage/bills.js.map
