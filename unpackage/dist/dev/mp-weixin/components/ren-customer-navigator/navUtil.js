"use strict";
const common_vendor = require("../../common/vendor.js");
let watched = false;
let functions = [];
function watchUniOn(name, func) {
  functions.push(func);
  if (!watched) {
    watched = true;
    common_vendor.index.$on(name, function(index) {
      functions.forEach(function(func2) {
        if (typeof func2 === "function") {
          func2(index);
        }
      });
    });
  }
}
let reLaunchInvokeFunctions = [], reLaunchCompleteFunctions = [], reLaunchinter = false;
let switchTabInvokeFunctions = [], switchTabCompleteFunctions = [], switchTabinter = false;
function addRelanchRoute(func, func1) {
  reLaunchInvokeFunctions.push(func);
  reLaunchCompleteFunctions.push(func1);
  if (!reLaunchinter) {
    reLaunchinter = true;
    common_vendor.index.addInterceptor("reLaunch", {
      //监听关闭本页面跳转
      invoke(e) {
        reLaunchInvokeFunctions.forEach(function(func2) {
          if (typeof func2 === "function") {
            func2(e);
          }
        });
      },
      complete() {
        reLaunchCompleteFunctions.forEach(function(func2) {
          if (typeof func2 === "function") {
            func2();
          }
        });
      }
    });
  }
}
function addSwitchRoute(func, func1) {
  switchTabInvokeFunctions.push(func);
  switchTabCompleteFunctions.push(func1);
  if (!switchTabinter) {
    switchTabinter = true;
    common_vendor.index.addInterceptor("switchTab", {
      //监听关闭本页面跳转
      invoke(e) {
        switchTabInvokeFunctions.forEach(function(func2) {
          if (typeof func2 === "function") {
            func2(e);
          }
        });
      },
      complete() {
        switchTabCompleteFunctions.forEach(function(func2) {
          if (typeof func2 === "function") {
            func2();
          }
        });
      }
    });
  }
}
exports.addRelanchRoute = addRelanchRoute;
exports.addSwitchRoute = addSwitchRoute;
exports.watchUniOn = watchUniOn;
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/ren-customer-navigator/navUtil.js.map
