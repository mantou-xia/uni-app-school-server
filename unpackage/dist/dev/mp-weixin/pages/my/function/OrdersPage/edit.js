"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  __name: "edit",
  setup(__props) {
    const orderTypes = ["快递代取", "食堂打包", "校园跑腿"];
    const formData = common_vendor.ref({
      id: "",
      type: "快递代取",
      location: "",
      contact: "",
      description: "",
      fee: "",
      extraFee: "0",
      status: "待接单"
    });
    common_vendor.onMounted(() => {
      var _a;
      getOpenerEventChannel();
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const id = (_a = currentPage.options) == null ? void 0 : _a.id;
      if (id) {
        common_vendor.index.showLoading({
          title: "加载中"
        });
        setTimeout(() => {
          formData.value = {
            id,
            type: "快递代取",
            location: "第一教学楼",
            contact: "138****1234",
            description: "快递在菜鸟驿站，取件码12345",
            fee: "5.00",
            extraFee: "0.00",
            status: "待接单"
          };
          common_vendor.index.hideLoading();
        }, 500);
      }
    });
    const saveOrder = () => {
      if (!formData.value.location) {
        return common_vendor.index.showToast({
          title: "请输入配送地点",
          icon: "none"
        });
      }
      if (!formData.value.contact) {
        return common_vendor.index.showToast({
          title: "请输入联系方式",
          icon: "none"
        });
      }
      if (!formData.value.description) {
        return common_vendor.index.showToast({
          title: "请输入委托内容",
          icon: "none"
        });
      }
      if (!formData.value.fee) {
        return common_vendor.index.showToast({
          title: "请输入配送费用",
          icon: "none"
        });
      }
      common_vendor.index.showLoading({
        title: "保存中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }, 1e3);
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(orderTypes, (type, index, i0) => {
          return {
            a: common_vendor.t(type),
            b: index,
            c: formData.value.type === type ? 1 : "",
            d: common_vendor.o(($event) => formData.value.type = type, index)
          };
        }),
        b: formData.value.location,
        c: common_vendor.o(($event) => formData.value.location = $event.detail.value),
        d: formData.value.contact,
        e: common_vendor.o(($event) => formData.value.contact = $event.detail.value),
        f: formData.value.description,
        g: common_vendor.o(($event) => formData.value.description = $event.detail.value),
        h: formData.value.fee,
        i: common_vendor.o(($event) => formData.value.fee = $event.detail.value),
        j: formData.value.extraFee,
        k: common_vendor.o(($event) => formData.value.extraFee = $event.detail.value),
        l: common_vendor.o(goBack),
        m: common_vendor.o(saveOrder)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/function/OrdersPage/edit.js.map
