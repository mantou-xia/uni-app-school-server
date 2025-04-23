"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  __name: "ranking",
  setup(__props) {
    const rankList = common_vendor.ref([
      { name: "赵六", count: 82 },
      { name: "钱七", count: 76 },
      { name: "孙八", count: 71 },
      { name: "周九", count: 68 },
      { name: "吴十", count: 65 }
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_assets._imports_0,
        c: common_assets._imports_0,
        d: common_vendor.f(rankList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(index + 4),
            b: common_vendor.t(item.name),
            c: common_vendor.t(item.count),
            d: index
          };
        }),
        e: common_assets._imports_0
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/order/ranking.js.map
