"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      countdown: "",
      orderInfo: {
        orderNo: "",
        payTime: "",
        acceptTime: "",
        type: "",
        status: "",
        expressType: "",
        expressCount: 0,
        remark: "",
        expectedDelivery: "",
        pickupAddress: "",
        deliveryAddress: "",
        fee: "",
        tip: "",
        items: "",
        time: ""
      }
    };
  },
  computed: {
    getStatusText() {
      const statusMap = {
        "pending": "待帮助",
        "processing": "正在帮助",
        "completed": "已帮助",
        "rewarding": "正在悬赏"
      };
      return statusMap[this.orderInfo.status] || "未知状态";
    }
  },
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("acceptOrderData", (data) => {
      common_vendor.index.__f__("log", "at pages/order/orderDetail/orderDetail.vue:127", "接收到的订单数据：", data);
      if (data && data.order) {
        this.orderInfo = { ...data.order };
        if (this.orderInfo.status === "processing" && this.orderInfo.acceptTime) {
          this.startCountdown();
        }
      } else {
        common_vendor.index.showToast({
          title: "订单数据加载失败",
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 2e3);
      }
    });
  },
  methods: {
    startCountdown() {
      if (!this.orderInfo.acceptTime)
        return;
      const now = /* @__PURE__ */ new Date();
      const acceptTime = new Date(this.orderInfo.acceptTime);
      const deliveryTime = new Date(acceptTime.getTime() + 30 * 60 * 1e3);
      const diff = deliveryTime.getTime() - now.getTime();
      if (diff > 0) {
        const minutes = Math.floor(diff / (1e3 * 60));
        const seconds = Math.floor(diff % (1e3 * 60) / 1e3);
        this.countdown = `${minutes}分${seconds}秒`;
        setTimeout(this.startCountdown, 1e3);
      } else {
        this.countdown = "配送时间已到";
      }
    },
    handleChat() {
      common_vendor.index.showToast({
        title: "打开私信对话",
        icon: "none"
      });
    },
    handleCall() {
      common_vendor.index.makePhoneCall({
        phoneNumber: "10086",
        // 这里应该是实际的电话号码
        fail: () => {
          common_vendor.index.showToast({
            title: "拨打电话失败",
            icon: "none"
          });
        }
      });
    },
    goToHistory() {
      if (getCurrentPages().length > 1) {
        common_vendor.index.navigateBack({
          delta: 1
        });
      } else {
        common_vendor.index.switchTab({
          url: "/pages/order/order",
          success: () => {
            common_vendor.index.$emit("refreshOrderList");
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/order/orderDetail/orderDetail.vue:207", "跳转失败:", err);
            common_vendor.index.showToast({
              title: "跳转失败,请重试",
              icon: "none"
            });
          }
        });
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "info",
      size: "16"
    }),
    b: $data.orderInfo.status === "processing"
  }, $data.orderInfo.status === "processing" ? {
    c: common_vendor.t($data.countdown)
  } : {}, {
    d: common_assets._imports_0,
    e: common_vendor.t($data.orderInfo.type),
    f: common_vendor.t($options.getStatusText),
    g: common_vendor.n($data.orderInfo.status),
    h: $data.orderInfo.type === "快递代取"
  }, $data.orderInfo.type === "快递代取" ? common_vendor.e({
    i: $data.orderInfo.expressType
  }, $data.orderInfo.expressType ? {
    j: common_vendor.t($data.orderInfo.expressType)
  } : {}, {
    k: $data.orderInfo.expressCount
  }, $data.orderInfo.expressCount ? {
    l: common_vendor.t($data.orderInfo.expressCount)
  } : {}, {
    m: $data.orderInfo.remark
  }, $data.orderInfo.remark ? {
    n: common_vendor.t($data.orderInfo.remark)
  } : {}, {
    o: $data.orderInfo.expectedDelivery
  }, $data.orderInfo.expectedDelivery ? {
    p: common_vendor.t($data.orderInfo.expectedDelivery)
  } : {}) : common_vendor.e({
    q: $data.orderInfo.items
  }, $data.orderInfo.items ? {
    r: common_vendor.t($data.orderInfo.items)
  } : {}, {
    s: $data.orderInfo.remark
  }, $data.orderInfo.remark ? {
    t: common_vendor.t($data.orderInfo.remark)
  } : {}), {
    v: common_vendor.t($data.orderInfo.pickupAddress),
    w: common_vendor.t($data.orderInfo.deliveryAddress),
    x: common_vendor.t($data.orderInfo.fee),
    y: $data.orderInfo.tip && $data.orderInfo.tip !== "0.00"
  }, $data.orderInfo.tip && $data.orderInfo.tip !== "0.00" ? {
    z: common_vendor.t($data.orderInfo.tip)
  } : {}, {
    A: $data.orderInfo.status === "processing" || $data.orderInfo.status === "completed"
  }, $data.orderInfo.status === "processing" || $data.orderInfo.status === "completed" ? {
    B: common_assets._imports_0,
    C: common_vendor.p({
      type: "chat",
      size: "20"
    }),
    D: common_vendor.o((...args) => $options.handleChat && $options.handleChat(...args)),
    E: common_vendor.p({
      type: "phone",
      size: "20"
    }),
    F: common_vendor.o((...args) => $options.handleCall && $options.handleCall(...args))
  } : {}, {
    G: common_vendor.t($data.orderInfo.orderNo),
    H: common_vendor.t($data.orderInfo.time),
    I: $data.orderInfo.payTime
  }, $data.orderInfo.payTime ? {
    J: common_vendor.t($data.orderInfo.payTime)
  } : {}, {
    K: $data.orderInfo.acceptTime
  }, $data.orderInfo.acceptTime ? {
    L: common_vendor.t($data.orderInfo.acceptTime)
  } : {}, {
    M: common_vendor.o((...args) => $options.goToHistory && $options.goToHistory(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/orderDetail/orderDetail.js.map
