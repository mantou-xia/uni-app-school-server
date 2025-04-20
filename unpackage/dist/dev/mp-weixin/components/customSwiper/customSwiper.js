"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "customSwiper",
  props: {
    bannerList: { default: () => [
      { id: 1, url: "" },
      { id: 2, url: "" },
      { id: 3, url: "" }
    ] }
  },
  emits: ["update:bannerList"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const fetchRandomImages = async () => {
      try {
        return await Promise.all(
          props.bannerList.map(async (item, index) => ({
            ...item,
            url: `https://picsum.photos/seed/${Date.now() + index}/800/400`
          }))
        );
      } catch (error) {
        common_vendor.index.__f__("error", "at components/customSwiper/customSwiper.vue:52", "获取轮播图失败:", error);
        return props.bannerList.map((item, index) => ({
          ...item,
          url: `https://picsum.photos/seed/fallback${index}/800/400`
        }));
      }
    };
    const emit = __emit;
    common_vendor.onMounted(async () => {
      const randomImages = await fetchRandomImages();
      emit("update:bannerList", randomImages);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(_ctx.bannerList, (item, index, i0) => {
          return {
            a: item.url,
            b: item.id
          };
        })
      };
    };
  }
});
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bc6be8ff"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/customSwiper/customSwiper.js.map
