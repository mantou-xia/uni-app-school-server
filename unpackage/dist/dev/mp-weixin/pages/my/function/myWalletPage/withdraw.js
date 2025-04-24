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
const balance = 128.5;
const _sfc_main = {
  __name: "withdraw",
  setup(__props) {
    const amount = common_vendor.ref("");
    const selectedMethod = common_vendor.ref(null);
    const withdrawMethods = [
      {
        name: "微信零钱",
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
      return num && num >= 1 && num <= balance;
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
      if (parseFloat(value) > balance) {
        value = balance.toString();
      }
      amount.value = value;
    };
    const withdrawAll = () => {
      amount.value = balance.toString();
    };
    const selectMethod = (index) => {
      selectedMethod.value = index;
    };
    const handleWithdraw = () => {
      if (!isValidAmount.value) {
        common_vendor.index.showToast({
          title: "请输入有效金额",
          icon: "none"
        });
        return;
      }
      if (selectedMethod.value === null) {
        common_vendor.index.showToast({
          title: "请选择提现方式",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showModal({
        title: "确认提现",
        content: `确定要提现${amount.value}元吗？`,
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "处理中"
            });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "提现申请已提交",
                icon: "success",
                duration: 2e3,
                success: () => {
                  setTimeout(() => {
                    common_vendor.index.navigateBack();
                  }, 2e3);
                }
              });
            }, 1500);
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o([($event) => amount.value = $event.detail.value, handleAmountInput]),
        b: amount.value,
        c: common_vendor.o(withdrawAll),
        d: common_vendor.f(withdrawMethods, (method, index, i0) => {
          return {
            a: "4dbd1c4b-0-" + i0,
            b: common_vendor.p({
              type: method.icon,
              size: "24",
              color: method.color
            }),
            c: common_vendor.t(method.name),
            d: "4dbd1c4b-1-" + i0,
            e: common_vendor.p({
              type: selectedMethod.value === index ? "checkbox-filled" : "circle",
              size: "20",
              color: selectedMethod.value === index ? "#3498db" : "#ddd"
            }),
            f: index,
            g: common_vendor.n(selectedMethod.value === index ? "active" : ""),
            h: common_vendor.o(($event) => selectMethod(index), index)
          };
        }),
        e: !isValidAmount.value || selectedMethod.value === null,
        f: common_vendor.o(handleWithdraw)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/function/myWalletPage/withdraw.js.map
