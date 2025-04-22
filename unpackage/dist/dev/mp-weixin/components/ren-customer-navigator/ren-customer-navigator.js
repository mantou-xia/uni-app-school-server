"use strict";
const common_vendor = require("../../common/vendor.js");
const components_renCustomerNavigator_navUtil = require("./navUtil.js");
const _sfc_main = {
  props: {
    showSlot: {
      type: Boolean,
      default: true
    },
    // 整个tabbar的背景颜色
    slotColor: String,
    // tabbar的高度，默认无
    contentHeight: [String, Number],
    // 是否隐藏原生tabbar
    hideTabBar: {
      type: Boolean,
      default: true
    },
    tabbarlist: {
      type: Array,
      default: () => [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "../../static/tabbar/首页-未选中.png",
          selectedIconPath: "../../static/tabbar/首页-选中.png"
        },
        {
          pagePath: "pages/circle/circle",
          text: "圈子",
          iconPath: "../../static/tabbar/社区-未激活.png",
          selectedIconPath: "../../static/tabbar/社区-激活.png"
        },
        {
          pagePath: "pages/message/message",
          text: "消息",
          iconPath: "../../static/tabbar/消息-未选中.png",
          selectedIconPath: "../../static/tabbar/消息-选中.png"
        },
        {
          pagePath: "pages/my/my",
          text: "我的",
          iconPath: "../../static/tabbar/会员-未选中.png",
          selectedIconPath: "../../static/tabbar/会员-选中.png"
        }
      ]
    }
  },
  data() {
    return {
      containerHeight: 85,
      current: "",
      created: false,
      tabIndex: -1
    };
  },
  created() {
    if (this.hideTabBar)
      common_vendor.index.hideTabBar();
    components_renCustomerNavigator_navUtil.watchUniOn("__routeChange__", (path) => {
      this.current = path;
      this.$emit("change", path);
    });
    components_renCustomerNavigator_navUtil.addRelanchRoute((e) => {
      this.preRoute(e.url);
    });
    components_renCustomerNavigator_navUtil.addSwitchRoute((e) => {
      this.preRoute(e.url);
    });
    this.tabIndex = this.changeRoute();
    this.created = true;
  },
  mounted() {
    const query = common_vendor.index.createSelectorQuery().in(this);
    query.select("#navigatorContent").boundingClientRect((data) => {
      if (data) {
        this.containerHeight = data.height;
        common_vendor.index.setStorage({
          key: "navigatorContainerHeight",
          data: data.height
        });
      }
    }).exec();
  },
  methods: {
    preRoute(path) {
      if (this.created) {
        const f = this.tabbarlist.find((item) => `/${item.pagePath}` === path);
        if (f) {
          common_vendor.index.$emit("__routeChange__", f.pagePath);
        }
      }
    },
    changeRoute() {
      if (!this.created) {
        let pages = getCurrentPages() || [];
        const f = this.tabbarlist.find((item) => item.pagePath === (pages[pages.length - 1] ? pages[pages.length - 1].route : "none"));
        if (f) {
          common_vendor.index.$emit("__routeChange__", f.pagePath);
          return f;
        }
      }
    },
    // 切换tab
    switchTab(pagePath) {
      let pages = getCurrentPages();
      if (pages[pages.length - 1].route.indexOf(pagePath) > -1)
        return;
      common_vendor.index.switchTab({
        url: "/" + pagePath
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($props.tabbarlist, (item, index, i0) => {
      return common_vendor.e({
        a: $data.current === item.pagePath
      }, $data.current === item.pagePath ? {
        b: item.selectedIconPath
      } : {
        c: item.iconPath
      }, {
        d: common_vendor.t(item.text),
        e: common_vendor.n($data.current === item.pagePath ? "active" : "default"),
        f: index,
        g: common_vendor.o(($event) => $options.switchTab(item.pagePath), index)
      });
    }),
    b: typeof $props.contentHeight === "number" ? $props.contentHeight + "rpx" : $props.contentHeight,
    c: $props.showSlot
  }, $props.showSlot ? {
    d: $props.slotColor,
    e: $data.containerHeight + "px"
  } : {}, {
    f: common_vendor.o(() => {
    })
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-06a0561c"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/ren-customer-navigator/ren-customer-navigator.js.map
