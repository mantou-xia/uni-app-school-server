"use strict";
const common_vendor = require("../../../../common/vendor.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "notification",
  setup(__props) {
    const notificationEnabled = common_vendor.ref(true);
    const orderNotice = common_vendor.ref(true);
    const systemNotice = common_vendor.ref(true);
    const activityNotice = common_vendor.ref(true);
    const soundEnabled = common_vendor.ref(true);
    const vibrationEnabled = common_vendor.ref(true);
    const showToast = (title, type = "none") => {
      common_vendor.index.showToast({
        title,
        icon: type,
        duration: 2e3
      });
    };
    const toggleNotification = (e) => {
      notificationEnabled.value = e.detail.value;
      showToast(notificationEnabled.value ? "已开启通知" : "已关闭通知");
    };
    const toggleOrderNotice = (e) => {
      orderNotice.value = e.detail.value;
      showToast(orderNotice.value ? "已开启订单通知" : "已关闭订单通知");
    };
    const toggleSystemNotice = (e) => {
      systemNotice.value = e.detail.value;
      showToast(systemNotice.value ? "已开启系统通知" : "已关闭系统通知");
    };
    const toggleActivityNotice = (e) => {
      activityNotice.value = e.detail.value;
      showToast(activityNotice.value ? "已开启活动通知" : "已关闭活动通知");
    };
    const toggleSound = (e) => {
      soundEnabled.value = e.detail.value;
      showToast(soundEnabled.value ? "已开启声音提醒" : "已关闭声音提醒");
      if (soundEnabled.value) {
        common_vendor.index.vibrateShort({
          success: function() {
            common_vendor.index.__f__("log", "at pages/my/function/settingsPage/notification.vue:127", "声音测试成功");
          }
        });
      }
    };
    const toggleVibration = (e) => {
      vibrationEnabled.value = e.detail.value;
      showToast(vibrationEnabled.value ? "已开启震动提醒" : "已关闭震动提醒");
      if (vibrationEnabled.value) {
        common_vendor.index.vibrateShort({
          success: function() {
            common_vendor.index.__f__("log", "at pages/my/function/settingsPage/notification.vue:140", "震动测试成功");
          }
        });
      }
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "notification",
          size: "20",
          color: "#e67e22"
        }),
        b: notificationEnabled.value,
        c: common_vendor.o(toggleNotification),
        d: common_vendor.p({
          type: "list",
          size: "20",
          color: "#3498db"
        }),
        e: orderNotice.value,
        f: common_vendor.o(toggleOrderNotice),
        g: systemNotice.value,
        h: common_vendor.o(toggleSystemNotice),
        i: activityNotice.value,
        j: common_vendor.o(toggleActivityNotice),
        k: notificationEnabled.value,
        l: common_vendor.p({
          type: "sound",
          size: "20",
          color: "#2ecc71"
        }),
        m: soundEnabled.value,
        n: common_vendor.o(toggleSound),
        o: vibrationEnabled.value,
        p: common_vendor.o(toggleVibration),
        q: notificationEnabled.value,
        r: common_vendor.p({
          type: "info",
          size: "14",
          color: "#e67e22"
        }),
        s: !notificationEnabled.value
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/function/settingsPage/notification.js.map
