"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "myAccept",
  setup(__props) {
    const tabs = ["全部", "进行中", "已完成"];
    const currentTab = common_vendor.ref(0);
    const orderList = common_vendor.ref([
      {
        type: "快递代取",
        status: "accepted",
        statusText: "进行中",
        pickupAddress: "菜鸟驿站",
        deliveryAddress: "学生宿舍8栋",
        fee: "5.00",
        time: "2024-03-10 14:30"
      },
      {
        type: "食堂打饭",
        status: "completed",
        statusText: "已完成",
        pickupAddress: "第一食堂",
        deliveryAddress: "图书馆",
        fee: "8.00",
        time: "2024-03-10 12:00"
      }
    ]);
    const switchTab = (index) => {
      currentTab.value = index;
    };
    const contactUser = (order) => {
      common_vendor.index.makePhoneCall({
        phoneNumber: "10000000000"
      });
    };
    const completeOrder = (order) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确认已完成配送？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "订单已完成",
              icon: "success"
            });
          }
        }
      });
    };
    const goToAccept = () => {
      common_vendor.index.navigateTo({
        url: "/pages/order/list"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(tabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: index,
            c: common_vendor.n(currentTab.value === index ? "active" : ""),
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        b: !orderList.value.length
      }, !orderList.value.length ? {
        c: common_assets._imports_0
      } : {
        d: common_vendor.f(orderList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.type),
            b: common_vendor.t(item.statusText),
            c: common_vendor.n(item.status),
            d: common_vendor.t(item.pickupAddress),
            e: common_vendor.t(item.deliveryAddress),
            f: common_vendor.t(item.fee),
            g: common_vendor.t(item.time),
            h: item.status === "accepted"
          }, item.status === "accepted" ? {
            i: common_vendor.o(($event) => contactUser(), index)
          } : {}, {
            j: item.status === "accepted"
          }, item.status === "accepted" ? {
            k: common_vendor.o(($event) => completeOrder(), index)
          } : {}, {
            l: index
          });
        })
      }, {
        e: common_vendor.p({
          type: "search",
          size: "20",
          color: "#fff"
        }),
        f: common_vendor.o(goToAccept)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/myAccept.js.map
