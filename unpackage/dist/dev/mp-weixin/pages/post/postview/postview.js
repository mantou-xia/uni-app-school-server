"use strict";
const common_vendor = require("../../../common/vendor.js");
const CustomAdd = () => "../../../components/circle/CustomAdd/CustomAdd.js";
const CustomPostContent = () => "../../../components/circle/post/CustomPostContent/CustomPostContent.js";
const _sfc_main = {
  components: {
    CustomAdd,
    CustomPostContent
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
  }
};
if (!Array) {
  const _component_CustomPostContent = common_vendor.resolveComponent("CustomPostContent");
  const _component_CustomAdd = common_vendor.resolveComponent("CustomAdd");
  (_component_CustomPostContent + _component_CustomAdd)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.id
  }, $data.id ? {
    b: common_vendor.p({
      ["post-id"]: $data.id
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/post/postview/postview.js.map
