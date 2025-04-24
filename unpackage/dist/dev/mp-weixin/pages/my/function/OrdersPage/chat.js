"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    const sendMessage = () => {
      common_vendor.index.showToast({
        title: "消息发送功能待实现",
        icon: "none"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_0,
        c: common_assets._imports_0,
        d: common_assets._imports_0,
        e: common_vendor.o(sendMessage)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/function/OrdersPage/chat.js.map
