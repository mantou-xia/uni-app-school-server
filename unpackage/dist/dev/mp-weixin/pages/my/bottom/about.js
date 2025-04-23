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
  __name: "about",
  setup(__props) {
    const systemInfo = common_vendor.ref({
      platform: "",
      system: ""
    });
    common_vendor.onMounted(() => {
      const info = common_vendor.index.getSystemInfoSync();
      systemInfo.value = {
        platform: info.platform,
        system: info.system
      };
    });
    const navigateTo = (url) => {
      common_vendor.index.navigateTo({ url });
    };
    const copyAppId = () => {
      common_vendor.index.setClipboardData({
        data: "wx123456789",
        success: () => {
          common_vendor.index.showToast({
            title: "AppID已复制",
            icon: "success"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(copyAppId),
        c: common_vendor.t(systemInfo.value.platform),
        d: common_vendor.t(systemInfo.value.system),
        e: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        f: common_vendor.o(($event) => navigateTo("/pages/about/privacy")),
        g: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        h: common_vendor.o(($event) => navigateTo("/pages/about/agreement")),
        i: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        j: common_vendor.o(($event) => navigateTo("/pages/about/disclaimer"))
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/bottom/about.js.map
