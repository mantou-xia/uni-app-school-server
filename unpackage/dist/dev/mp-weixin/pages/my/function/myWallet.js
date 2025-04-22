"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "myWallet",
  setup(__props) {
    const transactions = common_vendor.ref([
      {
        type: "接单收入",
        time: "2024-03-01 15:30",
        amount: 15
      },
      {
        type: "提现",
        time: "2024-03-01 14:20",
        amount: -50
      },
      {
        type: "接单收入",
        time: "2024-03-01 12:45",
        amount: 12
      },
      {
        type: "充值",
        time: "2024-03-01 10:30",
        amount: 100
      }
    ]);
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({ url });
    };
    const showHelp = () => {
      common_vendor.index.showModal({
        title: "钱包使用帮助",
        content: "1. 余额可用于接单收入和支付\n2. 每笔提现最低1元\n3. 充值实时到账\n4. 如有问题请联系客服",
        showCancel: false
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => navigateTo("/pages/my/function/wallet/recharge")),
        b: common_vendor.o(($event) => navigateTo("/pages/my/function/wallet/withdraw")),
        c: common_vendor.o(($event) => navigateTo("/pages/my/function/wallet/transactions")),
        d: common_vendor.f(transactions.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.type),
            b: common_vendor.t(item.time),
            c: common_vendor.t(item.amount > 0 ? "+" : ""),
            d: common_vendor.t(item.amount),
            e: common_vendor.n(item.amount > 0 ? "income" : "expense"),
            f: index
          };
        }),
        e: common_vendor.p({
          type: "card",
          size: "24",
          color: "#3498db"
        }),
        f: common_vendor.o(($event) => navigateTo("/pages/my/function/wallet/bank-cards")),
        g: common_vendor.p({
          type: "list",
          size: "24",
          color: "#e74c3c"
        }),
        h: common_vendor.o(($event) => navigateTo("/pages/my/function/wallet/bills")),
        i: common_vendor.p({
          type: "locked",
          size: "24",
          color: "#2ecc71"
        }),
        j: common_vendor.o(($event) => navigateTo("/pages/my/function/wallet/security")),
        k: common_vendor.p({
          type: "help",
          size: "24",
          color: "#f1c40f"
        }),
        l: common_vendor.o(showHelp)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/myWallet.js.map
