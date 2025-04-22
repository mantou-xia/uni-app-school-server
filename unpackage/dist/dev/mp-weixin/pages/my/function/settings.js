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
  __name: "settings",
  setup(__props) {
    const soundEnabled = common_vendor.ref(true);
    const cacheSize = common_vendor.ref("23.5MB");
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({ url });
    };
    const toggleSound = (e) => {
      soundEnabled.value = e.detail.value;
    };
    const clearCache = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要清除缓存吗？",
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
              cacheSize.value = "0B";
            }, 1500);
          }
        }
      });
    };
    const checkUpdate = () => {
      common_vendor.index.showLoading({
        title: "检查更新"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "已是最新版本",
          icon: "none"
        });
      }, 1500);
    };
    const logout = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要退出登录吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.reLaunch({
              url: "/pages/login/login"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        b: common_vendor.o(($event) => navigateTo("/pages/my/function/settings/account")),
        c: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        d: common_vendor.o(($event) => navigateTo("/pages/my/function/settings/notification")),
        e: soundEnabled.value,
        f: common_vendor.o(toggleSound),
        g: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        h: common_vendor.o(($event) => navigateTo("/pages/my/function/settings/privacy")),
        i: common_vendor.t(cacheSize.value),
        j: common_vendor.o(clearCache),
        k: common_vendor.o(checkUpdate),
        l: common_vendor.o(logout)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/settings.js.map
