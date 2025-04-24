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
        time: "2023-10-01 12:00",
        role: "大一"
        // 添加角色字段作为示例
      },
      isLiked: false,
      // 点赞状态
      likeCount: 1,
      // 初始点赞数
      shareCount: 0
      // 初始分享数
    };
  },
  computed: {
    effectivePostData() {
      return Object.keys(this.postData).length > 0 ? this.postData : this.simulatedPostData;
    }
  },
  mounted() {
    if (this.effectivePostData && this.effectivePostData.content) {
      common_vendor.index.__f__("log", "at components/circle/post/CustomPostContent/CustomPostContent.vue:78", "组件已挂载，数据加载:", this.effectivePostData);
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
      this.$emit("onShare", this.effectivePostData);
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
    },
    getRoleClass(role) {
      const roleMap = {
        "大一": "freshman",
        "大二": "sophomore",
        "大三": "junior",
        "大四": "senior",
        "研究生": "graduate",
        "博士生": "doctoral"
      };
      return "role-" + (roleMap[role] || "other");
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $options.effectivePostData
  }, $options.effectivePostData ? common_vendor.e({
    b: $options.effectivePostData.avatar,
    c: common_vendor.t($options.effectivePostData.nickname),
    d: $options.effectivePostData.role
  }, $options.effectivePostData.role ? {
    e: common_vendor.t($options.effectivePostData.role),
    f: common_vendor.n($options.getRoleClass($options.effectivePostData.role))
  } : {}, {
    g: common_vendor.t($options.effectivePostData.title || "无标题"),
    h: common_vendor.t($options.effectivePostData.content),
    i: $options.effectivePostData.images && $options.effectivePostData.images.length > 0
  }, $options.effectivePostData.images && $options.effectivePostData.images.length > 0 ? {
    j: common_vendor.f($options.effectivePostData.images, (image, index, i0) => {
      return {
        a: index,
        b: image
      };
    })
  } : {}, {
    k: common_vendor.t($options.effectivePostData.tag || "无类型"),
    l: common_vendor.n($options.getTagClass($options.effectivePostData.tag)),
    m: common_vendor.t($options.effectivePostData.time),
    n: common_vendor.n($data.isLiked ? "icon-icon-copy" : "icon-icon"),
    o: common_vendor.t($data.likeCount),
    p: common_vendor.o((...args) => $options.handleLike && $options.handleLike(...args)),
    q: common_vendor.t($data.shareCount),
    r: common_vendor.o((...args) => $options.handleShare && $options.handleShare(...args))
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/components/circle/post/CustomPostContent/CustomPostContent.js.map
