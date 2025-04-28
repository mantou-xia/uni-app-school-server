"use strict";
const common_vendor = require("../../../common/vendor.js");
const CustomAdd = () => "../../../components/circle/CustomAdd/CustomAdd.js";
const CustomPostContent = () => "../../../components/circle/post/CustomPostContent/CustomPostContent.js";
const CustomPostComment = () => "../../../components/circle/post/CustomPostComment/CustomPostComment.js";
const _sfc_main = {
  components: {
    CustomAdd,
    CustomPostContent,
    CustomPostComment
  },
  data() {
    return {
      id: 1
      // 默认值
    };
  },
  onLoad(options) {
    if (options.id) {
      this.id = options.id;
    }
  },
  methods: {
    onShareTriggered(data) {
      common_vendor.index.__f__("log", "at pages/post/postview/postview.vue:31", "wx 对象可用吗？", typeof common_vendor.wx$1);
      if (data) {
        common_vendor.index.__f__("log", "at pages/post/postview/postview.vue:33", "开始分享");
        if (typeof common_vendor.wx$1 !== "undefined" && common_vendor.wx$1.showShareMenu) {
          common_vendor.index.__f__("log", "at pages/post/postview/postview.vue:35", "showShareMenu 可用吗？", common_vendor.wx$1.showShareMenu);
          common_vendor.wx$1.showShareMenu({
            withShareTicket: true,
            menus: ["shareAppMessage", "shareTimeline"]
          });
        } else {
          common_vendor.index.__f__("error", "at pages/post/postview/postview.vue:41", "wx 未定义，无法分享");
          common_vendor.index.showToast({ title: "微信环境不可用", icon: "error" });
        }
      } else {
        common_vendor.index.__f__("error", "at pages/post/postview/postview.vue:45", "No data provided for sharing");
        common_vendor.index.showToast({ title: "分享数据缺失", icon: "error" });
      }
    },
    onShareAppMessage() {
      const postData = this.$refs.customPostContent ? this.$refs.customPostContent.effectivePostData : {};
      return {
        title: postData.title || "分享帖子",
        path: `/pages/post/postview/postview?id=${this.id}`,
        // Ensure id is defined
        imageUrl: postData.images && postData.images.length > 0 ? postData.images[0] : "",
        success: (res) => {
          common_vendor.index.__f__("log", "at pages/post/postview/postview.vue:56", "分享成功", res);
          common_vendor.index.showToast({ title: "分享成功", icon: "success" });
          if (this.$refs.customPostContent) {
            this.$refs.customPostContent.shareCount++;
          }
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/post/postview/postview.vue:63", "分享失败", err);
          common_vendor.index.showToast({ title: "分享失败", icon: "error" });
        }
      };
    }
  }
};
if (!Array) {
  const _component_CustomPostContent = common_vendor.resolveComponent("CustomPostContent");
  const _component_CustomPostComment = common_vendor.resolveComponent("CustomPostComment");
  const _component_CustomAdd = common_vendor.resolveComponent("CustomAdd");
  (_component_CustomPostContent + _component_CustomPostComment + _component_CustomAdd)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.id
  }, $data.id ? {
    b: common_vendor.sr("customPostContent", "0b26ef54-0"),
    c: common_vendor.o($options.onShareTriggered),
    d: common_vendor.p({
      ["post-id"]: $data.id
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
_sfc_main.__runtimeHooks = 2;
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/post/postview/postview.js.map
