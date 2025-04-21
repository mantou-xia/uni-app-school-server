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
          icon: "icon-xiaoyuanpaotui"
        },
        {
          name: "snackShop",
          label: "零食小店",
          icon: "icon-shangdianmendian"
        },
        {
          name: "secondHandMarket",
          label: "二手闲置",
          icon: "icon-ershoushichang-01"
        },
        {
          name: "organizationConsult",
          label: "机构咨询",
          icon: "icon-zixun"
        },
        {
          name: "otherHelp",
          label: "其他帮助",
          icon: "icon-yonghuzhongxin-bangzhuzhongxin"
        },
        {
          name: "newCar",
          label: "买新车",
          icon: "icon-maiche"
        },
        {
          name: "schoolMaterials",
          label: "学校资料",
          icon: "icon-wenjianziliao"
        },
        {
          name: "campusMap",
          label: "校园地图",
          icon: "icon-ditu"
        }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".grid-wrapper").boundingClientRect((rect) => {
        common_vendor.index.__f__("log", "at components/index/CustomGrid/CustomGrid.vue:75", "Grid wrapper width:", rect ? rect.width : "No rect");
      }).exec();
    });
  },
  methods: {
    // 手动触发宽度计算
    forceWidthCalculation() {
      this.$refs.gridSwiper.fetchContainerWidth();
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
      vueId: "ddae7040-0"
    }),
    b: common_vendor.sr("gridSwiper", "ddae7040-0"),
    c: common_vendor.p({
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
