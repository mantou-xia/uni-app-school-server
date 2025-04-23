"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  // 页面名称
  name: "CreatePostPage",
  // 页面数据
  data() {
    return {
      postData: {
        title: "",
        content: "",
        tag: "",
        images: []
      },
      availableTags: ["求助", "吐槽", "推荐", "避雷", "竞赛", "其他"]
    };
  },
  computed: {
    isSubmitEnabled() {
      return this.postData.title.trim() !== "";
    }
  },
  // 页面方法
  methods: {
    // 处理标题输入
    handleTitleInput(e) {
      this.postData.title = e.detail.value || e.target.value;
    },
    // 处理内容输入
    handleContentInput(e) {
      this.postData.content = e.detail.value || e.target.value;
    },
    // 切换标签
    toggleTag(tag) {
      this.postData.tag = this.postData.tag === tag ? "" : tag;
    },
    // 选择图片
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 9 - this.postData.images.length,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          this.postData.images = [
            ...this.postData.images,
            ...res.tempFilePaths
          ];
        }
      });
    },
    // 删除图片
    deleteImage(index) {
      this.postData.images.splice(index, 1);
    },
    // 提交帖子
    submitPost() {
      if (!this.postData.title.trim()) {
        common_vendor.index.showToast({
          title: "请输入帖子标题",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showModal({
        title: "确认发布",
        content: "是否确定发布这篇帖子？",
        success: (res) => {
          if (res.confirm) {
            this.uploadPostData();
          }
        }
      });
    },
    // 上传帖子数据
    uploadPostData() {
      common_vendor.index.showLoading({ title: "正在发布..." });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "帖子发布成功",
          icon: "success",
          duration: 2e3,
          success: () => {
            common_vendor.index.__f__("log", "at pages/post/create/create.vue:190", "尝试跳转到圈子页面");
            common_vendor.index.switchTab({ url: "/pages/circle/circle" });
          },
          fail: (err) => {
            common_vendor.index.__f__("error", "at pages/post/create/create.vue:194", "Toast 失败:", err);
          }
        });
      }, 1500);
    }
  },
  // 页面生命周期钩子
  onLoad(options) {
    common_vendor.index.__f__("log", "at pages/post/create/create.vue:204", "创建帖子页面加载", options);
  },
  onShow() {
    common_vendor.index.__f__("log", "at pages/post/create/create.vue:209", "创建帖子页面显示");
  },
  // 为了确保依赖分析，添加额外标识
  __uniPageId: "create-post-page",
  __pageModule: true
};
if (typeof common_vendor.wx$1 !== "undefined") {
  const pageConfig = {
    data: {
      postData: {
        title: "",
        content: "",
        tag: "",
        images: []
      },
      availableTags: ["求助", "吐槽", "推荐", "避雷", "竞赛", "其他"]
    },
    onLoad(options) {
      common_vendor.index.__f__("log", "at pages/post/create/create.vue:230", "页面加载", options);
    },
    onShow() {
      common_vendor.index.__f__("log", "at pages/post/create/create.vue:233", "页面显示");
    },
    handleTitleInput(e) {
      this.setData({
        "postData.title": e.detail.value
      });
    },
    handleContentInput(e) {
      this.setData({
        "postData.content": e.detail.value
      });
    },
    toggleTag(tag) {
      this.setData({
        "postData.tag": this.data.postData.tag === tag ? "" : tag
      });
    },
    chooseImage() {
      common_vendor.wx$1.chooseImage({
        count: 9 - this.data.postData.images.length,
        sizeType: ["original", "compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          this.setData({
            "postData.images": [...this.data.postData.images, ...res.tempFilePaths]
          });
        }
      });
    },
    deleteImage(index) {
      this.setData({
        "postData.images": this.data.postData.images.filter((_, i) => i !== index)
      });
    },
    submitPost() {
      const postTitle = this.data.postData.title;
      if (!postTitle || !postTitle.trim()) {
        common_vendor.wx$1.showToast({
          title: "请输入帖子标题",
          icon: "none"
        });
        return;
      }
      common_vendor.wx$1.showModal({
        title: "确认发布",
        content: "是否确定发布这篇帖子？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.wx$1.showToast({
              title: "帖子发布成功",
              icon: "success",
              duration: 2e3,
              success: () => {
                common_vendor.index.__f__("log", "at pages/post/create/create.vue:288", "尝试跳转到圈子页面");
                common_vendor.index.switchTab({ url: "/pages/circle/circle" });
              },
              fail: (err) => {
                common_vendor.index.__f__("error", "at pages/post/create/create.vue:292", "Toast 失败:", err);
              }
            });
          }
        }
      });
    }
  };
  Page(pageConfig);
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.postData.title,
    b: common_vendor.o((...args) => $options.handleTitleInput && $options.handleTitleInput(...args)),
    c: common_vendor.t($data.postData.title.length),
    d: $data.postData.content,
    e: common_vendor.o((...args) => $options.handleContentInput && $options.handleContentInput(...args)),
    f: common_vendor.t($data.postData.content.length),
    g: common_vendor.f($data.availableTags, (tag, k0, i0) => {
      return {
        a: common_vendor.t(tag),
        b: tag,
        c: $data.postData.tag === tag ? 1 : "",
        d: common_vendor.o(($event) => $options.toggleTag(tag), tag)
      };
    }),
    h: common_vendor.f($data.postData.images, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.deleteImage(index), index),
        c: index
      };
    }),
    i: $data.postData.images.length < 9
  }, $data.postData.images.length < 9 ? {
    j: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    k: common_vendor.o((...args) => $options.submitPost && $options.submitPost(...args)),
    l: !$options.isSubmitEnabled
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/post/create/create.js.map
