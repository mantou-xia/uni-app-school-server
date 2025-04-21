"use strict";
const common_vendor = require("../../common/vendor.js");
function goToPage(url, params = {}, type = "navigateTo") {
  const fullUrl = params && Object.keys(params).length ? `${url}?${Object.keys(params).map(
    (key) => (
      // 对每个参数键值对进行 URL 编码，确保特殊字符能正确传递
      `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
    )
    // 使用 & 连接多个参数
  ).join("&")}` : url;
  switch (type) {
    case "navigateTo":
      common_vendor.index.navigateTo({ url: fullUrl });
      break;
    case "redirectTo":
      common_vendor.index.redirectTo({ url: fullUrl });
      break;
    case "reLaunch":
      common_vendor.index.reLaunch({ url: fullUrl });
      break;
    case "switchTab":
      common_vendor.index.switchTab({ url: fullUrl });
      break;
    default:
      common_vendor.index.navigateTo({ url: fullUrl });
  }
}
exports.goToPage = goToPage;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/static/utils/goToPage.js.map
