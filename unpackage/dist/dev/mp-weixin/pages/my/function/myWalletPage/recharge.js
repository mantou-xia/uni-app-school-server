"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "recharge",
  setup(__props) {
    const amount = common_vendor.ref("");
    const selectedPayment = common_vendor.ref(null);
    const quickAmounts = [10, 20, 50, 100, 200, 500];
    const paymentMethods = [
      {
        name: "微信支付",
        icon: "weixin",
        color: "#2ecc71"
      },
      {
        name: "支付宝",
        icon: "wallet",
        color: "#3498db"
      }
    ];
    const isValidAmount = common_vendor.computed(() => {
      const num = parseFloat(amount.value);
      return num && num >= 1;
    });
    const handleAmountInput = (e) => {
      let value = e.detail.value;
      value = value.replace(/[^\d.]/g, "");
      if (value.split(".").length > 2) {
        value = value.slice(0, value.lastIndexOf("."));
      }
      if (value.includes(".")) {
        const [integer, decimal] = value.split(".");
        value = `${integer}.${decimal.slice(0, 2)}`;
      }
      amount.value = value;
    };
    const selectAmount = (value) => {
      amount.value = value.toString();
    };
    const selectPayment = (index) => {
      selectedPayment.value = index;
    };
    const handleRecharge = () => {
      if (!isValidAmount.value) {
        common_vendor.index.showToast({
          title: "请输入有效金额",
          icon: "none"
        });
        return;
      }
      if (selectedPayment.value === null) {
        common_vendor.index.showToast({
          title: "请选择支付方式",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "处理中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "充值成功",
          icon: "success",
          duration: 2e3,
          success: () => {
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 2e3);
          }
        });
      }, 1500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o([($event) => amount.value = $event.detail.value, handleAmountInput]),
        b: amount.value,
        c: common_vendor.f(quickAmounts, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.n(amount.value === item ? "active" : ""),
            d: common_vendor.o(($event) => selectAmount(item), index)
          };
        }),
        d: common_vendor.f(paymentMethods, (method, index, i0) => {
          return {
            a: "6c6d7968-0-" + i0,
            b: common_vendor.p({
              type: method.icon,
              size: "24",
              color: method.color
            }),
            c: common_vendor.t(method.name),
            d: "6c6d7968-1-" + i0,
            e: common_vendor.p({
              type: selectedPayment.value === index ? "checkbox-filled" : "circle",
              size: "20",
              color: selectedPayment.value === index ? "#3498db" : "#ddd"
            }),
            f: index,
            g: common_vendor.n(selectedPayment.value === index ? "active" : ""),
            h: common_vendor.o(($event) => selectPayment(index), index)
          };
        }),
        e: common_vendor.n(isValidAmount.value && selectedPayment.value !== null ? "active" : ""),
        f: !isValidAmount.value || selectedPayment.value === null,
        g: common_vendor.o(handleRecharge)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/function/myWalletPage/recharge.js.map
