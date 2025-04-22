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
  __name: "apply",
  setup(__props) {
    const form = common_vendor.ref({
      name: "",
      studentId: "",
      phone: "",
      idCard: "",
      idCardFront: "",
      idCardBack: "",
      studentCard: "",
      agreement: false
    });
    const isValid = common_vendor.computed(() => {
      return form.value.name && form.value.studentId && form.value.phone && form.value.idCard && form.value.idCardFront && form.value.idCardBack && form.value.studentCard && form.value.agreement;
    });
    const uploadImage = (type) => {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          form.value[type] = res.tempFilePaths[0];
        }
      });
    };
    const showAgreement = () => {
      common_vendor.index.navigateTo({
        url: "/pages/agreement/rider"
      });
    };
    const submit = () => {
      if (!isValid.value)
        return;
      common_vendor.index.showLoading({
        title: "提交中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "申请已提交",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }, 2e3);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: form.value.name,
        b: common_vendor.o(($event) => form.value.name = $event.detail.value),
        c: form.value.studentId,
        d: common_vendor.o(($event) => form.value.studentId = $event.detail.value),
        e: form.value.phone,
        f: common_vendor.o(($event) => form.value.phone = $event.detail.value),
        g: form.value.idCard,
        h: common_vendor.o(($event) => form.value.idCard = $event.detail.value),
        i: form.value.idCardFront
      }, form.value.idCardFront ? {
        j: form.value.idCardFront
      } : {
        k: common_vendor.p({
          type: "camera",
          size: "24",
          color: "#999"
        }),
        l: common_vendor.o(($event) => uploadImage("idCardFront"))
      }, {
        m: form.value.idCardBack
      }, form.value.idCardBack ? {
        n: form.value.idCardBack
      } : {
        o: common_vendor.p({
          type: "camera",
          size: "24",
          color: "#999"
        }),
        p: common_vendor.o(($event) => uploadImage("idCardBack"))
      }, {
        q: form.value.studentCard
      }, form.value.studentCard ? {
        r: form.value.studentCard
      } : {
        s: common_vendor.p({
          type: "camera",
          size: "24",
          color: "#999"
        }),
        t: common_vendor.o(($event) => uploadImage("studentCard"))
      }, {
        v: form.value.agreement,
        w: common_vendor.o(($event) => form.value.agreement = !form.value.agreement),
        x: common_vendor.o(showAgreement),
        y: !isValid.value,
        z: !isValid.value ? 1 : "",
        A: common_vendor.o(submit)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/order/apply.js.map
