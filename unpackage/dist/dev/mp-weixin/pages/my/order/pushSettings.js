"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  __name: "pushSettings",
  setup(__props) {
    const isAvailable = common_vendor.ref(true);
    const orderRange = common_vendor.ref(3);
    const orderTypes = common_vendor.ref([
      { name: "快递代取", selected: true },
      { name: "食堂打包", selected: true },
      { name: "超市代购", selected: false },
      { name: "文印服务", selected: false }
    ]);
    const toggleAvailable = (e) => {
      isAvailable.value = e.detail.value;
    };
    const changeRange = (e) => {
      orderRange.value = e.detail.value;
    };
    const toggleType = (index) => {
      orderTypes.value[index].selected = !orderTypes.value[index].selected;
    };
    return (_ctx, _cache) => {
      return {
        a: isAvailable.value,
        b: common_vendor.o(toggleAvailable),
        c: common_vendor.t(orderRange.value),
        d: orderRange.value,
        e: common_vendor.o(changeRange),
        f: common_vendor.f(orderTypes.value, (type, index, i0) => {
          return {
            a: common_vendor.t(type.name),
            b: index,
            c: common_vendor.n(type.selected ? "selected" : ""),
            d: common_vendor.o(($event) => toggleType(index), index)
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/order/pushSettings.js.map
