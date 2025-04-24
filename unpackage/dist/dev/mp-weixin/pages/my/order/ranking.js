"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      currentTab: 0,
      showAnimation: false,
      tabs: [
        { name: "日榜", desc: "今日数据" },
        { name: "周榜", desc: "本周数据" },
        { name: "月榜", desc: "本月数据" }
      ],
      rankList: [
        { id: 1, name: "李四", count: 108, earnings: 1280, avatar: "/static/logo.png", rating: 98 },
        { id: 2, name: "张三", count: 92, earnings: 1080, avatar: "/static/logo.png", rating: 96 },
        { id: 3, name: "王五", count: 87, earnings: 960, avatar: "/static/logo.png", rating: 95 },
        { id: 4, name: "赵六", count: 82, earnings: 920, avatar: "/static/logo.png", rating: 94 },
        { id: 5, name: "钱七", count: 76, earnings: 850, avatar: "/static/logo.png", rating: 93 },
        { id: 6, name: "孙八", count: 71, earnings: 780, avatar: "/static/logo.png", rating: 92 },
        { id: 7, name: "周九", count: 68, earnings: 720, avatar: "/static/logo.png", rating: 91 },
        { id: 8, name: "吴十", count: 65, earnings: 680, avatar: "/static/logo.png", rating: 90 }
      ],
      myInfo: {
        id: 5,
        name: "我的昵称",
        rank: 16,
        count: 45,
        earnings: 520,
        avatar: "/static/logo.png",
        rating: 95
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.showAnimation = true;
    }, 300);
  },
  methods: {
    switchTab(index) {
      if (this.currentTab === index)
        return;
      this.currentTab = index;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 500);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l;
  return {
    a: common_vendor.f($data.tabs, (tab, index, i0) => {
      return {
        a: common_vendor.t(tab.name),
        b: common_vendor.t(tab.desc),
        c: index,
        d: $data.currentTab === index ? 1 : "",
        e: common_vendor.o(($event) => $options.switchTab(index), index)
      };
    }),
    b: ((_a = $data.rankList[1]) == null ? void 0 : _a.avatar) || "/static/logo.png",
    c: common_vendor.t(((_b = $data.rankList[1]) == null ? void 0 : _b.name) || "虚位以待"),
    d: common_vendor.t(((_c = $data.rankList[1]) == null ? void 0 : _c.count) || 0),
    e: common_vendor.t(((_d = $data.rankList[1]) == null ? void 0 : _d.earnings) || 0),
    f: $data.showAnimation ? 1 : "",
    g: ((_e = $data.rankList[0]) == null ? void 0 : _e.avatar) || "/static/logo.png",
    h: common_vendor.t(((_f = $data.rankList[0]) == null ? void 0 : _f.name) || "虚位以待"),
    i: common_vendor.t(((_g = $data.rankList[0]) == null ? void 0 : _g.count) || 0),
    j: common_vendor.t(((_h = $data.rankList[0]) == null ? void 0 : _h.earnings) || 0),
    k: $data.showAnimation ? 1 : "",
    l: ((_i = $data.rankList[2]) == null ? void 0 : _i.avatar) || "/static/logo.png",
    m: common_vendor.t(((_j = $data.rankList[2]) == null ? void 0 : _j.name) || "虚位以待"),
    n: common_vendor.t(((_k = $data.rankList[2]) == null ? void 0 : _k.count) || 0),
    o: common_vendor.t(((_l = $data.rankList[2]) == null ? void 0 : _l.earnings) || 0),
    p: $data.showAnimation ? 1 : "",
    q: common_vendor.f($data.rankList.slice(3), (item, index, i0) => {
      return {
        a: common_vendor.t(index + 4),
        b: item.avatar,
        c: common_vendor.t(item.name),
        d: common_vendor.t(item.count),
        e: common_vendor.t(item.earnings),
        f: index,
        g: item.id === $data.myInfo.id ? 1 : ""
      };
    }),
    r: $data.myInfo.avatar,
    s: common_vendor.t($data.myInfo.name),
    t: common_vendor.t($data.myInfo.rank),
    v: common_vendor.t($data.myInfo.count),
    w: common_vendor.t($data.myInfo.earnings),
    x: common_vendor.t($data.myInfo.rating)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/order/ranking.js.map
