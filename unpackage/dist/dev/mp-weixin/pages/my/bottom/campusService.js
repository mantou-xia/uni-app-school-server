"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "campusService",
  setup(__props) {
    const feedbackContent = common_vendor.ref("");
    const commonProblems = common_vendor.ref([
      {
        question: "如何申请成为骑手？",
        answer: '点击"我的"-"申请骑手"，按要求填写信息并提交审核即可。'
      },
      {
        question: "订单配送费用如何计算？",
        answer: "基础配送费3元（1公里内），超出部分每公里增加1元。"
      },
      {
        question: "如何取消订单？",
        answer: "在订单未被接单前可以直接取消，接单后需要联系骑手协商取消。"
      },
      {
        question: "遇到配送延迟怎么办？",
        answer: "可以直接联系骑手了解情况，如有异常可联系客服处理。"
      }
    ]);
    const makePhoneCall = () => {
      common_vendor.index.makePhoneCall({
        phoneNumber: "4001234567"
      });
    };
    const copyWechat = () => {
      common_vendor.index.setClipboardData({
        data: "service_001",
        success: () => {
          common_vendor.index.showToast({
            title: "微信号已复制",
            icon: "success"
          });
        }
      });
    };
    const showAnswer = (item) => {
      common_vendor.index.showModal({
        title: item.question,
        content: item.answer,
        showCancel: false
      });
    };
    const submitFeedback = () => {
      if (!feedbackContent.value.trim()) {
        common_vendor.index.showToast({
          title: "请输入反馈内容",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "提交中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "反馈已提交",
          icon: "success"
        });
        feedbackContent.value = "";
      }, 1500);
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.p({
          type: "phone",
          size: "20",
          color: "#3498db"
        }),
        c: common_vendor.o(makePhoneCall),
        d: common_vendor.p({
          type: "weixin",
          size: "20",
          color: "#3498db"
        }),
        e: common_vendor.o(copyWechat),
        f: common_vendor.f(commonProblems.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.question),
            b: "0f894ca2-2-" + i0,
            c: index,
            d: common_vendor.o(($event) => showAnswer(item), index)
          };
        }),
        g: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        h: feedbackContent.value,
        i: common_vendor.o(($event) => feedbackContent.value = $event.detail.value),
        j: common_vendor.t(feedbackContent.value.length),
        k: common_vendor.o(submitFeedback)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/bottom/campusService.js.map
