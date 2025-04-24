"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "CustomPostComment",
  data() {
    return {
      comments: [
        {
          avatar: "https://picsum.photos/50/50",
          nickname: "用户1",
          content: "这是一条示例评论内容。",
          time: "2024-10-01 12:00",
          likeCount: 0,
          isLiked: false,
          role: "大一"
        },
        {
          avatar: "https://picsum.photos/50/51",
          nickname: "用户2",
          content: "另一条虚拟评论，感觉不错！",
          time: "2024-10-02 14:30",
          likeCount: 2,
          isLiked: false,
          role: "大二"
        }
        // 可以添加更多虚拟评论
      ],
      newCommentContent: ""
      // 用于新评论输入
    };
  },
  methods: {
    toggleLike(index) {
      this.comments[index].isLiked = !this.comments[index].isLiked;
      if (this.comments[index].isLiked) {
        this.comments[index].likeCount++;
      } else {
        this.comments[index].likeCount--;
      }
    },
    addComment(index) {
      common_vendor.index.showModal({
        content: "回复功能：这是一条模拟回复。实际实现可连接后端。",
        showCancel: false
      });
    },
    submitComment() {
      if (this.newCommentContent.trim() !== "") {
        this.comments.push({
          avatar: "https://picsum.photos/50/52",
          // 虚拟头像
          nickname: "匿名用户",
          content: this.newCommentContent,
          time: (/* @__PURE__ */ new Date()).toISOString().slice(0, 19).replace("T", " "),
          // 当前时间
          likeCount: 0,
          isLiked: false,
          role: "其他"
        });
        this.newCommentContent = "";
        common_vendor.index.showToast({ title: "评论提交成功", icon: "success" });
      } else {
        common_vendor.index.showToast({ title: "评论内容不能为空", icon: "error" });
      }
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
  return {
    a: common_vendor.f($data.comments, (comment, index, i0) => {
      return common_vendor.e({
        a: comment.avatar,
        b: common_vendor.t(comment.nickname),
        c: comment.role
      }, comment.role ? {
        d: common_vendor.t(comment.role),
        e: common_vendor.n($options.getRoleClass(comment.role))
      } : {}, {
        f: common_vendor.t(comment.content),
        g: common_vendor.t(comment.likeCount),
        h: common_vendor.n(comment.isLiked ? "icon-icon-copy" : "icon-icon"),
        i: common_vendor.o(($event) => $options.toggleLike(index), index),
        j: common_vendor.o(($event) => $options.addComment(index), index),
        k: common_vendor.t(comment.time),
        l: index
      });
    }),
    b: $data.newCommentContent,
    c: common_vendor.o(($event) => $data.newCommentContent = $event.detail.value),
    d: common_vendor.o((...args) => $options.submitComment && $options.submitComment(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/components/circle/post/CustomPostComment/CustomPostComment.js.map
