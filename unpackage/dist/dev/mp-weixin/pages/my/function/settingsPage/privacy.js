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
  __name: "privacy",
  setup(__props) {
    const privacyEnabled = common_vendor.ref(true);
    const locationEnabled = common_vendor.ref(true);
    const analyticsEnabled = common_vendor.ref(true);
    const personalizationEnabled = common_vendor.ref(true);
    const showToast = (title, type = "none") => {
      common_vendor.index.showToast({
        title,
        icon: type,
        duration: 2e3
      });
    };
    const showModal = (title, content, confirmColor = "#3498db", success) => {
      common_vendor.index.showModal({
        title,
        content,
        confirmColor,
        success
      });
    };
    const togglePrivacy = (e) => {
      privacyEnabled.value = e.detail.value;
      showToast(privacyEnabled.value ? "已开启个人信息保护" : "已关闭个人信息保护");
    };
    const toggleLocation = (e) => {
      locationEnabled.value = e.detail.value;
      if (locationEnabled.value) {
        common_vendor.index.authorize({
          scope: "scope.userLocation",
          success: () => {
            showToast("位置权限已开启", "success");
          },
          fail: () => {
            locationEnabled.value = false;
            showModal(
              "开启位置权限",
              "需要在系统设置中开启位置权限，是否前往设置？",
              "#3498db",
              (res) => {
                if (res.confirm) {
                  common_vendor.index.openSetting();
                }
              }
            );
          }
        });
      } else {
        showToast("已关闭位置权限");
      }
    };
    const toggleAnalytics = (e) => {
      analyticsEnabled.value = e.detail.value;
      showToast(analyticsEnabled.value ? "已开启使用统计" : "已关闭使用统计");
    };
    const togglePersonalization = (e) => {
      personalizationEnabled.value = e.detail.value;
      showToast(personalizationEnabled.value ? "已开启个性化推荐" : "已关闭个性化推荐");
    };
    const handleExportData = () => {
      showModal(
        "导出个人数据",
        "我们将为您生成个人数据副本，文件生成后将发送到您的邮箱，是否继续？",
        "#3498db",
        (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "正在准备数据"
            });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              showToast("数据导出申请已提交，请注意查收邮件", "success");
            }, 2e3);
          }
        }
      );
    };
    const handleDeleteData = () => {
      showModal(
        "删除账号",
        "此操作将永久删除您的账号及所有相关数据，且无法恢复。删除前请确保已备份重要信息。",
        "#e74c3c",
        (res) => {
          if (res.confirm) {
            showModal(
              "二次确认",
              "请再次确认是否删除账号？删除后将无法找回任何数据。",
              "#e74c3c",
              (res2) => {
                if (res2.confirm) {
                  common_vendor.index.showLoading({
                    title: "正在处理"
                  });
                  setTimeout(() => {
                    common_vendor.index.hideLoading();
                    showToast("账号已删除", "success");
                    setTimeout(() => {
                      common_vendor.index.reLaunch({
                        url: "/pages/index/index"
                      });
                    }, 1500);
                  }, 2e3);
                }
              }
            );
          }
        }
      );
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "locked",
          size: "20",
          color: "#2ecc71"
        }),
        b: privacyEnabled.value,
        c: common_vendor.o(togglePrivacy),
        d: common_vendor.p({
          type: "eye",
          size: "20",
          color: "#3498db"
        }),
        e: locationEnabled.value,
        f: common_vendor.o(toggleLocation),
        g: analyticsEnabled.value,
        h: common_vendor.o(toggleAnalytics),
        i: personalizationEnabled.value,
        j: common_vendor.o(togglePersonalization),
        k: common_vendor.p({
          type: "gear",
          size: "20",
          color: "#9b59b6"
        }),
        l: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        m: common_vendor.o(handleExportData),
        n: common_vendor.p({
          type: "right",
          size: "16",
          color: "#999"
        }),
        o: common_vendor.o(handleDeleteData),
        p: common_vendor.p({
          type: "help",
          size: "14",
          color: "#3498db"
        }),
        q: common_vendor.o((...args) => _ctx.viewPrivacyPolicy && _ctx.viewPrivacyPolicy(...args))
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/function/settingsPage/privacy.js.map
