"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "CustomHotList",
  data() {
    return {
      // 热榜数据（模拟数据）
      hotList: [
        { id: 1, title: "校园最佳拍照地点大揭秘！", likeCount: 1256 },
        { id: 2, title: "食堂新菜品，你最爱哪一款？", likeCount: 987 },
        { id: 3, title: "学生会招新，快来一起创造精彩！", likeCount: 765 },
        { id: 4, title: "图书馆自习攻略，拿走不谢", likeCount: 654 },
        { id: 5, title: "校园兼职信息汇总", likeCount: 543 },
        { id: 6, title: "社团活动预告", likeCount: 432 },
        { id: 7, title: "学习方法分享", likeCount: 321 },
        { id: 8, title: "校园安全提示", likeCount: 210 },
        { id: 9, title: "心理健康小贴士", likeCount: 156 },
        { id: 10, title: "运动健康指南", likeCount: 98 }
      ],
      // 是否展开
      isExpanded: false
    };
  },
  computed: {
    // 根据展开状态显示的列表
    displayedHotList() {
      return this.isExpanded ? this.hotList : this.hotList.slice(0, 3);
    }
  },
  methods: {
    // 切换展开/收起
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    // 显示详情模态框
    showItemDetail(item, index) {
      common_vendor.index.showModal({
        title: `NO.${index + 1} ${item.title}`,
        content: "暂无详细内容",
        showCancel: true,
        cancelText: "关闭",
        confirmText: "查看详情",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at components/circle/CustomHotList/CustomHotList.vue:88", "跳转页面");
          }
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($options.displayedHotList, (item, index, i0) => {
      return {
        a: common_vendor.t(index + 1),
        b: common_vendor.t(item.title),
        c: common_vendor.t(item.likeCount),
        d: item.id,
        e: index < 3 ? 1 : "",
        f: common_vendor.o(($event) => $options.showItemDetail(item, index), item.id)
      };
    }),
    b: $data.hotList.length > 3
  }, $data.hotList.length > 3 ? {
    c: common_vendor.t($data.isExpanded ? "收起" : "查看更多"),
    d: common_vendor.n($data.isExpanded ? "icon-up" : "icon-down"),
    e: common_vendor.o((...args) => $options.toggleExpand && $options.toggleExpand(...args))
  } : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/circle/CustomHotList/CustomHotList.js.map
