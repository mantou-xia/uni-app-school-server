"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      countdown: "1天20时56分14秒",
      orderInfo: {
        orderNo: "100250425143509600672",
        payTime: "2025-04-25 14:35:24",
        acceptTime: "2025-04-25 14:39:25",
        type: "快递代取",
        status: "pending",
        // 可能的状态: pending(待接单), processing(配送中), completed(已完成), rewarding(悬赏中)
        expressType: "中件",
        expressCount: 1,
        remark: "一件衣服",
        expectedDelivery: "尽快送达",
        pickupAddress: "快递点-科技园快递点（南信一号楼数学楼东侧店）",
        deliveryAddress: "男生宿舍-学生公寓2栋-2单元2-304d",
        fee: "3.00"
      }
    };
  },
  computed: {
    getStatusText() {
      const statusMap = {
        "pending": "待帮助",
        "processing": "正在帮助",
        "completed": "已帮助",
        "rewarding": "悬赏中"
      };
      return statusMap[this.orderInfo.status] || "未知状态";
    }
  },
  onLoad(options) {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("acceptOrderData", ({ order }) => {
      this.orderInfo = order;
      this.startCountdown();
    });
  },
  methods: {
    startCountdown() {
      const now = /* @__PURE__ */ new Date();
      const acceptTime = new Date(this.orderInfo.acceptTime);
      const diff = acceptTime.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1e3 * 60 * 60 * 24));
        const hours = Math.floor(diff % (1e3 * 60 * 60 * 24) / (1e3 * 60 * 60));
        const minutes = Math.floor(diff % (1e3 * 60 * 60) / (1e3 * 60));
        const seconds = Math.floor(diff % (1e3 * 60) / 1e3);
        this.countdown = `${days}天${hours}时${minutes}分${seconds}秒`;
        setTimeout(this.startCountdown, 1e3);
      } else {
        this.countdown = "已过期";
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
            common_vendor.index.__f__("error", "at pages/order/orderDetail/orderDetail.vue:173", "跳转失败:", err);
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
    h: common_vendor.t($data.orderInfo.expressType),
    i: common_vendor.t($data.orderInfo.expressCount),
    j: common_vendor.t($data.orderInfo.remark),
    k: common_vendor.t($data.orderInfo.expectedDelivery),
    l: common_assets._imports_0,
    m: common_vendor.p({
      type: "chat",
      size: "20"
    }),
    n: common_vendor.o((...args) => $options.handleChat && $options.handleChat(...args)),
    o: common_vendor.p({
      type: "phone",
      size: "20"
    }),
    p: common_vendor.o((...args) => $options.handleCall && $options.handleCall(...args)),
    q: common_vendor.t($data.orderInfo.orderNo),
    r: common_vendor.t($data.orderInfo.payTime),
    s: common_vendor.t($data.orderInfo.acceptTime),
    t: common_vendor.o((...args) => $options.goToHistory && $options.goToHistory(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/order/orderDetail/orderDetail.js.map
