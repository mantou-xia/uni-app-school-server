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
  __name: "verify",
  setup(__props) {
    const formData = common_vendor.ref({
      realName: "",
      idCard: "",
      studentCardImage: "",
      idCardHoldImage: ""
    });
    const isFormValid = common_vendor.computed(() => {
      return formData.value.realName && formData.value.idCard && formData.value.studentCardImage && formData.value.idCardHoldImage && formData.value.idCard.length === 18;
    });
    const chooseImage = (type) => {
      common_vendor.index.chooseImage({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          const tempFilePath = res.tempFilePaths[0];
          if (type === "studentCard") {
            formData.value.studentCardImage = tempFilePath;
          } else {
            formData.value.idCardHoldImage = tempFilePath;
          }
        }
      });
    };
    const deleteImage = (type) => {
      if (type === "studentCard") {
        formData.value.studentCardImage = "";
      } else {
        formData.value.idCardHoldImage = "";
      }
    };
    const submitVerify = () => {
      if (!isFormValid.value) {
        common_vendor.index.showToast({
          title: "请完善所有信息",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "提交中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.setStorageSync("userVerifyStatus", {
          isVerified: true,
          verifyTime: (/* @__PURE__ */ new Date()).getTime()
        });
        common_vendor.index.showToast({
          title: "认证成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }, 2e3);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: formData.value.realName,
        b: common_vendor.o(($event) => formData.value.realName = $event.detail.value),
        c: formData.value.idCard,
        d: common_vendor.o(($event) => formData.value.idCard = $event.detail.value),
        e: !formData.value.studentCardImage
      }, !formData.value.studentCardImage ? {
        f: common_vendor.p({
          type: "camera",
          size: "24",
          color: "#999"
        }),
        g: common_vendor.o(($event) => chooseImage("studentCard"))
      } : {
        h: formData.value.studentCardImage,
        i: common_vendor.p({
          type: "trash",
          size: "20",
          color: "#fff"
        }),
        j: common_vendor.o(($event) => deleteImage("studentCard"))
      }, {
        k: !formData.value.idCardHoldImage
      }, !formData.value.idCardHoldImage ? {
        l: common_vendor.p({
          type: "camera",
          size: "24",
          color: "#999"
        }),
        m: common_vendor.o(($event) => chooseImage("idCardHold"))
      } : {
        n: formData.value.idCardHoldImage,
        o: common_vendor.p({
          type: "trash",
          size: "20",
          color: "#fff"
        }),
        p: common_vendor.o(($event) => deleteImage("idCardHold"))
      }, {
        q: common_vendor.o(submitVerify),
        r: !isFormValid.value
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/function/settingsPage/verify.js.map
