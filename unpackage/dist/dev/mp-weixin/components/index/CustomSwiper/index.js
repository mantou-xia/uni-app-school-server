"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "CustomSwiper",
  props: {
    bannerList: {
      type: Array,
      default: () => [
        { id: 1, url: "https://picsum.photos/seed/1/800/400" },
        { id: 2, url: "https://picsum.photos/seed/2/800/400" },
        { id: 3, url: "https://picsum.photos/seed/3/800/400" }
      ]
    }
  },
  data() {
    return {
      currentBannerList: this.bannerList
    };
  },
  methods: {
    async fetchRandomImages() {
      try {
        this.currentBannerList = await Promise.all(
          this.currentBannerList.map(async (item, index) => ({
            ...item,
            url: `https://picsum.photos/seed/${Date.now() + index}/800/400`
          }))
        );
        this.$emit("update:bannerList", this.currentBannerList);
      } catch (error) {
        common_vendor.index.__f__("error", "at components/index/CustomSwiper/index.vue:53", "获取轮播图失败:", error);
      }
    }
  },
  mounted() {
    this.fetchRandomImages();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($props.bannerList, (item, index, i0) => {
      return {
        a: item.url,
        b: item.id
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-da2bf28e"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/index/CustomSwiper/index.js.map
