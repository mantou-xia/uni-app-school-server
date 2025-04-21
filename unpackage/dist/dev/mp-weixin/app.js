"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/circle/circle.js";
  "./pages/order/order.js";
  "./pages/my/my.js";
  "./pages/message/message.js";
  "./pages/index_campusErrand/index_campusErrand.js";
  "./pages/index_snackShop/index_snackShop.js";
  "./pages/index_secondHandMarket/index_secondHandMarket.js";
  "./pages/index_organizationConsult/index_organizationConsult.js";
  "./pages/index_otherHelp/index_otherHelp.js";
  "./pages/index_newCar/index_newCar.js";
  "./pages/index_schoolMaterials/index_schoolMaterials.js";
  "./pages/index_campusMap/index_campusMap.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:5", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:8", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:11", "App Hide");
  }
};
const renCustomerNavigator = () => "./components/ren-customer-navigator/ren-customer-navigator.js";
const CustomPlaceholder = () => "./components/common/CustomPlaceholder/CustomPlaceholder.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.component("custom-placeholder", CustomPlaceholder);
  app.component("ren-customer-navigator", renCustomerNavigator);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
