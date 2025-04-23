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
  "./pages/post/create/create.js";
  "./pages/my/order/rateDetails.js";
  "./pages/my/order/apply.js";
  "./pages/my/order/pushSettings.js";
  "./pages/my/order/ranking.js";
  "./pages/my/function/myOrders.js";
  "./pages/my/function/myPublish.js";
  "./pages/my/function/myAccept.js";
  "./pages/my/function/myWallet.js";
  "./pages/my/function/myCoupon.js";
  "./pages/my/function/settings.js";
  "./pages/my/bottom/campusService.js";
  "./pages/my/bottom/about.js";
<<<<<<< HEAD
  "./pages/my/bottom/aboutpage/privacy.js";
  "./pages/my/bottom/aboutpage/agreement.js";
  "./pages/my/bottom/aboutpage/disclaimer.js";
  "./pages/my/order/orderpage/agreement.js";
  "./pages/my/function/settingsPage/notification.js";
  "./pages/my/function/settingsPage/privacy.js";
  "./pages/my/function/myWalletPage/recharge.js";
  "./pages/my/function/myWalletPage/withdraw.js";
  "./pages/my/function/myWalletPage/transactions.js";
  "./pages/my/function/myWalletPage/bills.js";
=======
  "./pages/post/postview/postview.js";
>>>>>>> bcc05805f0771eeb1aa40c9390dae63e73dc6f94
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
const CustomSearch = () => "./components/common/CustomSearch/CustomSearch.js";
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.component("custom-placeholder", CustomPlaceholder);
  app.component("ren-customer-navigator", renCustomerNavigator);
  app.component("custom-search", CustomSearch);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
