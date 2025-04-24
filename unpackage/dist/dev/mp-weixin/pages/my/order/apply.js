"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      steps: ["基本信息", "证件上传", "校园跑守则"],
      currentStep: 0,
      form: {
        name: "",
        studentId: "",
        phone: "",
        verifyCode: "",
        idCard: "",
        idCardFront: "",
        idCardBack: "",
        studentCard: "",
        agreement: false,
        rulesAgreement: false
      },
      countdown: 0,
      showVerifyCode: false,
      messageType: "success",
      messageContent: "",
      rules: [
        {
          title: "安全第一",
          content: "严格遵守交通规则，确保自身和他人安全。配送过程中必须佩戴头盔，遵守交通信号。",
          icon: "safety"
        },
        {
          title: "准时送达",
          content: "在承诺的配送时间内完成订单。如遇特殊情况，及时与用户沟通，说明情况。",
          icon: "clock"
        },
        {
          title: "服务态度",
          content: "保持友善、礼貌的服务态度。与用户、商家沟通时使用文明用语。",
          icon: "smile"
        },
        {
          title: "卫生保障",
          content: "保持个人卫生，确保送餐箱清洁。食品配送过程中确保包装完整。",
          icon: "medal"
        },
        {
          title: "隐私保护",
          content: "严格保护用户隐私信息，不得泄露或不当使用用户信息。",
          icon: "lock"
        }
      ]
    };
  },
  computed: {
    canGoNext() {
      if (this.currentStep === 0) {
        return this.form.name && this.form.studentId && this.form.phone && this.form.verifyCode && this.form.idCard;
      } else if (this.currentStep === 1) {
        return this.form.idCardFront && this.form.idCardBack && this.form.studentCard;
      } else {
        return this.form.rulesAgreement && this.form.agreement;
      }
    }
  },
  methods: {
    handleSwiperChange(e) {
      this.currentStep = e.detail.current;
    },
    validateStudentId() {
      if (this.form.studentId && !/^\d{8,12}$/.test(this.form.studentId)) {
        this.showMessage("请输入正确的学号", "error");
      }
    },
    validatePhone() {
      if (this.form.phone && !/^1[3-9]\d{9}$/.test(this.form.phone)) {
        this.showMessage("请输入正确的手机号", "error");
      } else if (this.form.phone) {
        this.showVerifyCode = true;
      }
    },
    validateIdCard() {
      if (this.form.idCard && !/^\d{17}[\dX]$/.test(this.form.idCard)) {
        this.showMessage("请输入正确的身份证号", "error");
      }
    },
    sendVerifyCode() {
      if (!this.form.phone || !/^1[3-9]\d{9}$/.test(this.form.phone)) {
        this.showMessage("请先输入正确的手机号", "error");
        return;
      }
      this.countdown = 60;
      const timer = setInterval(() => {
        this.countdown--;
        if (this.countdown === 0) {
          clearInterval(timer);
        }
      }, 1e3);
      this.showMessage("验证码已发送", "success");
    },
    uploadImage(type) {
      common_vendor.index.chooseImage({
        count: 1,
        success: (res) => {
          this.form[type] = res.tempFilePaths[0];
          this.showMessage("上传成功", "success");
        }
      });
    },
    previewImage(type) {
      common_vendor.index.previewImage({
        urls: [this.form[type]]
      });
    },
    prevStep() {
      if (this.currentStep > 0) {
        this.currentStep--;
      }
    },
    nextStep() {
      if (!this.canGoNext)
        return;
      if (this.currentStep < 2) {
        this.currentStep++;
      } else {
        this.submit();
      }
    },
    showAgreement() {
      common_vendor.index.navigateTo({
        url: "/pages/my/order/orderpage/agreement"
      });
    },
    showMessage(content, type = "success") {
      this.messageType = type;
      this.messageContent = content;
      this.$refs.messagePopup.open();
    },
    submit() {
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
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_popup_message2 = common_vendor.resolveComponent("uni-popup-message");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_icons2 + _easycom_uni_popup_message2 + _easycom_uni_popup2)();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_popup_message = () => "../../../uni_modules/uni-popup/components/uni-popup-message/uni-popup-message.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_popup_message + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.steps, (step, index, i0) => {
      return common_vendor.e({
        a: $data.currentStep > index
      }, $data.currentStep > index ? {
        b: "1a679abc-0-" + i0,
        c: common_vendor.p({
          type: "checkmarkempty",
          size: "14",
          color: "#fff"
        })
      } : {
        d: common_vendor.t(index + 1)
      }, {
        e: common_vendor.t(step),
        f: index < $data.steps.length - 1
      }, index < $data.steps.length - 1 ? {} : {}, {
        g: index,
        h: $data.currentStep >= index ? 1 : "",
        i: $data.currentStep > index ? 1 : ""
      });
    }),
    b: common_vendor.p({
      type: "person",
      size: "20",
      color: "#3498db"
    }),
    c: $data.form.name,
    d: common_vendor.o(($event) => $data.form.name = $event.detail.value),
    e: common_vendor.o((...args) => $options.validateStudentId && $options.validateStudentId(...args)),
    f: $data.form.studentId,
    g: common_vendor.o(($event) => $data.form.studentId = $event.detail.value),
    h: common_vendor.o((...args) => $options.validatePhone && $options.validatePhone(...args)),
    i: $data.form.phone,
    j: common_vendor.o(($event) => $data.form.phone = $event.detail.value),
    k: !$data.countdown
  }, !$data.countdown ? {
    l: common_vendor.o((...args) => $options.sendVerifyCode && $options.sendVerifyCode(...args))
  } : {
    m: common_vendor.t($data.countdown)
  }, {
    n: $data.showVerifyCode
  }, $data.showVerifyCode ? {
    o: $data.form.verifyCode,
    p: common_vendor.o(($event) => $data.form.verifyCode = $event.detail.value)
  } : {}, {
    q: common_vendor.o((...args) => $options.validateIdCard && $options.validateIdCard(...args)),
    r: $data.form.idCard,
    s: common_vendor.o(($event) => $data.form.idCard = $event.detail.value),
    t: common_vendor.p({
      type: "camera",
      size: "20",
      color: "#3498db"
    }),
    v: $data.form.idCardFront
  }, $data.form.idCardFront ? {
    w: $data.form.idCardFront,
    x: common_vendor.o(($event) => $options.previewImage("idCardFront"))
  } : {
    y: common_vendor.p({
      type: "camera",
      size: "24",
      color: "#999"
    }),
    z: common_vendor.o(($event) => $options.uploadImage("idCardFront"))
  }, {
    A: $data.form.idCardFront
  }, $data.form.idCardFront ? {
    B: common_vendor.o(($event) => $options.uploadImage("idCardFront"))
  } : {}, {
    C: $data.form.idCardBack
  }, $data.form.idCardBack ? {
    D: $data.form.idCardBack,
    E: common_vendor.o(($event) => $options.previewImage("idCardBack"))
  } : {
    F: common_vendor.p({
      type: "camera",
      size: "24",
      color: "#999"
    }),
    G: common_vendor.o(($event) => $options.uploadImage("idCardBack"))
  }, {
    H: $data.form.idCardBack
  }, $data.form.idCardBack ? {
    I: common_vendor.o(($event) => $options.uploadImage("idCardBack"))
  } : {}, {
    J: $data.form.studentCard
  }, $data.form.studentCard ? {
    K: $data.form.studentCard,
    L: common_vendor.o(($event) => $options.previewImage("studentCard"))
  } : {
    M: common_vendor.p({
      type: "camera",
      size: "24",
      color: "#999"
    }),
    N: common_vendor.o(($event) => $options.uploadImage("studentCard"))
  }, {
    O: $data.form.studentCard
  }, $data.form.studentCard ? {
    P: common_vendor.o(($event) => $options.uploadImage("studentCard"))
  } : {}, {
    Q: common_vendor.p({
      type: "info",
      size: "20",
      color: "#3498db"
    }),
    R: common_vendor.f($data.rules, (rule, index, i0) => {
      return {
        a: "1a679abc-7-" + i0,
        b: common_vendor.p({
          type: rule.icon,
          size: "24",
          color: "#3498db"
        }),
        c: common_vendor.t(rule.title),
        d: common_vendor.t(rule.content),
        e: index
      };
    }),
    S: $data.form.rulesAgreement,
    T: common_vendor.o(($event) => $data.form.rulesAgreement = !$data.form.rulesAgreement),
    U: $data.currentStep,
    V: common_vendor.o((...args) => $options.handleSwiperChange && $options.handleSwiperChange(...args)),
    W: $data.currentStep === 2
  }, $data.currentStep === 2 ? {
    X: $data.form.agreement,
    Y: common_vendor.o(($event) => $data.form.agreement = !$data.form.agreement),
    Z: common_vendor.o((...args) => $options.showAgreement && $options.showAgreement(...args))
  } : {}, {
    aa: $data.currentStep > 0
  }, $data.currentStep > 0 ? {
    ab: common_vendor.o((...args) => $options.prevStep && $options.prevStep(...args))
  } : {}, {
    ac: common_vendor.t($data.currentStep === 2 ? "提交申请" : "下一步"),
    ad: !$options.canGoNext ? 1 : "",
    ae: !$options.canGoNext,
    af: common_vendor.o((...args) => $options.nextStep && $options.nextStep(...args)),
    ag: common_vendor.p({
      type: $data.messageType,
      message: $data.messageContent,
      duration: 2e3
    }),
    ah: common_vendor.sr("messagePopup", "1a679abc-8"),
    ai: common_vendor.p({
      type: "message"
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/order/apply.js.map
