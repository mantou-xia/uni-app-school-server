"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "CustomPostContent",
  props: {
    postData: {
      type: Object,
      default: () => ({})
      // 默认空对象
    }
  },
  data() {
    return {
      simulatedPostData: {
        title: "示例帖子标题",
        content: "这是一条模拟帖子内容，用于测试组件显示。",
        tag: "求助",
        images: ["https://picsum.photos/200/300", "https://picsum.photos/200/300"],
        avatar: "https://picsum.photos/50/50",
        nickname: "模拟用户",
        time: "2023-10-01 12:00"
      },
      isLiked: false,
      // 点赞状态
      likeCount: 1
      // 初始点赞数
    };
  },
  computed: {
    effectivePostData() {
      return Object.keys(this.postData).length > 0 ? this.postData : this.simulatedPostData;
    }
  },
  mounted() {
    if (this.effectivePostData && this.effectivePostData.content) {
      common_vendor.index.__f__("log", "at components/circle/post/CustomPostContent/CustomPostContent.vue:74", "组件已挂载，数据加载:", this.effectivePostData);
    }
  },
  methods: {
    handleLike() {
      if (this.isLiked) {
        this.isLiked = false;
        this.likeCount--;
      } else {
        this.isLiked = true;
        this.likeCount++;
      }
    },
    handleShare() {
      common_vendor.index.__f__("log", "at components/circle/post/CustomPostContent/CustomPostContent.vue:88", "转发功能触发");
    },
    getTagClass(tag) {
      const map = {
        "求助": "help",
        "吐槽": "complain",
        "推荐": "recommend",
        "避雷": "warning",
        "竞赛": "competition",
        "其他": "other"
      };
      return "category-" + (map[tag] || "other");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.effectivePostData
  }, $options.effectivePostData ? common_vendor.e({
    b: $options.effectivePostData.avatar,
    c: common_vendor.t($options.effectivePostData.nickname),
    d: common_vendor.t($options.effectivePostData.title || "无标题"),
    e: common_vendor.t($options.effectivePostData.content),
    f: $options.effectivePostData.images && $options.effectivePostData.images.length > 0
  }, $options.effectivePostData.images && $options.effectivePostData.images.length > 0 ? {
    g: common_vendor.f($options.effectivePostData.images, (image, index, i0) => {
      return {
        a: index,
        b: image
      };
    })
  } : {}, {
    h: common_vendor.t($options.effectivePostData.tag || "无类型"),
    i: common_vendor.n($options.getTagClass($options.effectivePostData.tag)),
    j: common_vendor.t($options.effectivePostData.time),
    k: common_vendor.n($data.isLiked ? "icon-icon-copy" : "icon-icon"),
    l: common_vendor.t($data.likeCount),
    m: common_vendor.o((...args) => $options.handleLike && $options.handleLike(...args)),
    n: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args))
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/components/circle/post/CustomPostContent/CustomPostContent.js.map
