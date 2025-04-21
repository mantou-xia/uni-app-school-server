"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  name: "CustomNotice",
  props: {
    noticeContent: {
      type: String,
      default: "暂无公告内容"
    }
  },
  methods: {
    showFullNotice() {
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
    }
  }
};
if (!Array) {
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$1,
    b: common_vendor.t($props.noticeContent),
    c: common_vendor.o((...args) => $options.showFullNotice && $options.showFullNotice(...args)),
    d: common_vendor.o($options.closePopup),
    e: common_vendor.o($options.closePopup),
    f: common_vendor.p({
      title: "公告详情",
      content: $props.noticeContent,
      ["before-close"]: true
    }),
    g: common_vendor.sr("popup", "9dc85ac0-0"),
    h: common_vendor.p({
      type: "dialog"
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/index/CustomNotice/CustomNotice.js.map
