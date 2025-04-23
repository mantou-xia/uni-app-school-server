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
      common_vendor.index.showToast({
        title: soundEnabled.value ? "声音已开启" : "声音已关闭",
        icon: "none"
      });
    };
    const clearCache = () => {
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
              cacheSize.value = "0B";
            }, 1500);
          }
        }
      });
    };
    const checkUpdate = () => {
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
    };
    const logout = () => {
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
    };
    return (_ctx, _cache) => {
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
        c: common_vendor.o(($event) => navigateTo("/pages/my/function/settingsPage/notification")),
        d: common_vendor.p({
          type: "sound",
          size: "20",
          color: "#9b59b6"
        }),
        e: soundEnabled.value,
        f: common_vendor.o(toggleSound),
        g: common_vendor.p({
          type: "locked",
          size: "20",
          color: "#2ecc71"
        }),
        h: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        i: common_vendor.o(($event) => navigateTo("/pages/my/function/settingsPage/privacy")),
        j: common_vendor.p({
          type: "trash",
          size: "20",
          color: "#e74c3c"
        }),
        k: common_vendor.t(cacheSize.value),
        l: common_vendor.o(clearCache),
        m: common_vendor.p({
          type: "refresh",
          size: "20",
          color: "#1abc9c"
        }),
        n: common_vendor.o(checkUpdate),
        o: common_vendor.o(logout)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/settings.js.map
