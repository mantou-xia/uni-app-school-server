"use strict";
const common_vendor = require("../../../common/vendor.js");
const hrGridSwiper = () => "../../../uni_modules/hr-grid-swiper/components/hr-grid-swiper/hr-grid-swiper.js";
const _sfc_main = {
  name: "CustomGrid",
  components: {
    hrGridSwiper
  },
  data() {
    return {
      gridData: [
        {
          name: "campusErrand",
          label: "校园跑腿",
          icon: "icon-xiaoyuanpaotui",
          path: "/pages/index_campusErrand/index_campusErrand"
        },
        {
          name: "snackShop",
          label: "零食小店",
          icon: "icon-shangdianmendian",
          path: "/pages/index_snackShop/index_snackShop"
        },
        {
          name: "secondHandMarket",
          label: "二手闲置",
          icon: "icon-ershoushichang-01",
          path: "/pages/index_secondHandMarket/index_secondHandMarket"
        },
        {
          name: "organizationConsult",
          label: "机构咨询",
          icon: "icon-zixun",
          path: "/pages/index_organizationConsult/index_organizationConsult"
        },
        {
          name: "otherHelp",
          label: "其他帮助",
          icon: "icon-yonghuzhongxin-bangzhuzhongxin",
          path: "/pages/index_otherHelp/index_otherHelp"
        },
        {
          name: "newCar",
          label: "买新车",
          icon: "icon-diandongche",
          path: "/pages/index_newCar/index_newCar"
        },
        {
          name: "schoolMaterials",
          label: "学校资料",
          icon: "icon-wenjianziliao",
          path: "/pages/index_schoolMaterials/index_schoolMaterials"
        },
        {
          name: "campusMap",
          label: "校园地图",
          icon: "icon-ditu",
          path: "/pages/index_campusMap/index_campusMap"
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".grid-wrapper").boundingClientRect((rect) => {
        common_vendor.index.__f__("log", "at components/index/CustomGrid/CustomGrid.vue:95", "Grid wrapper width:", rect ? rect.width : "No rect");
      }).exec();
    });
  },
  methods: {
    // 处理网格项点击事件
    handleGridItemClick(event) {
      common_vendor.index.__f__("log", "at components/index/CustomGrid/CustomGrid.vue:103", "Complete event:", event);
      let item, index;
      if (event && typeof event === "object") {
        if (typeof event.item === "number" && typeof event.index === "object") {
          index = event.item;
          item = event.index;
        } else if ("index" in event && "item" in event) {
          index = event.index;
          item = event.item;
        } else if (event.name) {
          item = event;
          index = this.gridData.findIndex((gridItem) => gridItem.name === event.name);
        }
      }
      common_vendor.index.__f__("log", "at components/index/CustomGrid/CustomGrid.vue:127", "Extracted index:", index);
      common_vendor.index.__f__("log", "at components/index/CustomGrid/CustomGrid.vue:128", "Extracted item:", item);
      if (!item) {
        common_vendor.index.showToast({
          title: "点击项目无效",
          icon: "none"
        });
        return;
      }
      if (!item.path) {
        common_vendor.index.showToast({
          title: `${item.label || "该功能"} 暂未开放`,
          icon: "none"
        });
        return;
      }
      common_vendor.index.navigateTo({ url: item.path });
    }
  }
};
if (!Array) {
  const _easycom_hr_grid_swiper2 = common_vendor.resolveComponent("hr-grid-swiper");
  _easycom_hr_grid_swiper2();
}
const _easycom_hr_grid_swiper = () => "../../../uni_modules/hr-grid-swiper/components/hr-grid-swiper/hr-grid-swiper.js";
if (!Math) {
  _easycom_hr_grid_swiper();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.w(({
      item,
      gridWidth,
      gridHeight
    }, s0, i0) => {
      return {
        a: common_vendor.n(item.icon),
        b: common_vendor.t(item.label),
        c: gridWidth + "px",
        d: gridHeight + "px",
        e: i0,
        f: s0
      };
    }, {
      name: "d",
      path: "a",
      vueId: "44a0b038-0"
    }),
    b: common_vendor.sr("gridSwiper", "44a0b038-0"),
    c: common_vendor.o($options.handleGridItemClick),
    d: common_vendor.p({
      ["grid-data"]: $data.gridData,
      columns: 4,
      rows: 2,
      gap: 10,
      aspectRatio: 1
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/index/CustomGrid/CustomGrid.js.map
