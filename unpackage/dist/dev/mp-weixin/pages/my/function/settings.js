"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      soundEnabled: true,
      cacheSize: "23.5MB",
      isVerified: false
    };
  },
  methods: {
    navigateTo(url) {
      common_vendor.index.navigateTo({ url });
    },
    toggleSound(e) {
      this.soundEnabled = e.detail.value;
      common_vendor.index.showToast({
        title: this.soundEnabled ? "声音已开启" : "声音已关闭",
        icon: "none"
      });
    },
    clearCache() {
      common_vendor.index.showModal({
        title: "清除缓存",
        content: "确定要清除缓存数据吗？清除后将无法恢复",
        confirmColor: "#3498db",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "清理中"
            });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "清理完成",
                icon: "success"
              });
              this.cacheSize = "0B";
            }, 1500);
          }
        }
      });
    },
    checkUpdate() {
      common_vendor.index.showLoading({
        title: "检查更新中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showModal({
          title: "版本信息",
          content: "当前已是最新版本 1.0.0",
          showCancel: false,
          confirmText: "确定",
          confirmColor: "#3498db"
        });
      }, 1500);
    },
    logout() {
      common_vendor.index.showModal({
        title: "退出登录",
        content: "确定要退出当前账号吗？",
        confirmColor: "#e74c3c",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "退出中"
            });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              common_vendor.index.reLaunch({
                url: "/pages/index/index"
              });
            }, 1e3);
          }
        }
      });
    },
    checkVerifyStatus() {
      const verifyStatus = common_vendor.index.getStorageSync("userVerifyStatus");
      this.isVerified = (verifyStatus == null ? void 0 : verifyStatus.isVerified) || false;
    }
  },
  onShow() {
    this.checkVerifyStatus();
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
  return {
    a: common_vendor.p({
      type: "notification",
      size: "20",
      color: "#e67e22"
    }),
    b: common_vendor.p({
      type: "right",
      size: "16",
      color: "#999"
    }),
    c: common_vendor.o(($event) => $options.navigateTo("/pages/my/function/settingsPage/notification")),
    d: common_vendor.p({
      type: "sound",
      size: "20",
      color: "#9b59b6"
    }),
    e: $data.soundEnabled,
    f: common_vendor.o((...args) => $options.toggleSound && $options.toggleSound(...args)),
    g: common_vendor.p({
      type: "person",
      size: "20",
      color: "#3498db"
    }),
    h: common_vendor.t($data.isVerified ? "已认证" : "未认证"),
    i: $data.isVerified ? 1 : "",
    j: common_vendor.p({
      type: "right",
      size: "16",
      color: "#999"
    }),
    k: common_vendor.o(($event) => $options.navigateTo("/pages/my/function/settingsPage/verify")),
    l: common_vendor.p({
      type: "locked",
      size: "20",
      color: "#2ecc71"
    }),
    m: common_vendor.p({
      type: "right",
      size: "16",
      color: "#999"
    }),
    n: common_vendor.o(($event) => $options.navigateTo("/pages/my/function/settingsPage/privacy")),
    o: common_vendor.p({
      type: "trash",
      size: "20",
      color: "#e74c3c"
    }),
    p: common_vendor.t($data.cacheSize),
    q: common_vendor.o((...args) => $options.clearCache && $options.clearCache(...args)),
    r: common_vendor.p({
      type: "refresh",
      size: "20",
      color: "#1abc9c"
    }),
    s: common_vendor.o((...args) => $options.checkUpdate && $options.checkUpdate(...args)),
    t: common_vendor.o((...args) => $options.logout && $options.logout(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/settings.js.map
