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
  __name: "myPublish",
  setup(__props) {
    const tabs = ["全部", "待接单", "进行中", "已完成"];
    const currentTab = common_vendor.ref(0);
    const orderList = common_vendor.ref([
      {
        type: "快递代取",
        status: "pending",
        statusText: "待接单",
        address: "第一教学楼",
        fee: "5.00",
        time: "2024-03-10 14:30"
      },
      {
        type: "食堂打饭",
        status: "accepted",
        statusText: "进行中",
        address: "学生宿舍8栋",
        fee: "8.00",
        time: "2024-03-10 12:00"
      }
    ]);
    const switchTab = (index) => {
      currentTab.value = index;
    };
    const cancelOrder = (order) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要取消该订单吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "取消成功",
              icon: "success"
            });
          }
        }
      });
    };
    const contactRider = (order) => {
      common_vendor.index.makePhoneCall({
        phoneNumber: "10000000000"
      });
    };
    const goToPublish = () => {
      common_vendor.index.navigateTo({
        url: "/pages/order/create"
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
            d: common_vendor.t(item.address),
            e: common_vendor.t(item.fee),
            f: common_vendor.t(item.time),
            g: item.status === "pending"
          }, item.status === "pending" ? {
            h: common_vendor.o(($event) => cancelOrder(), index)
          } : {}, {
            i: item.status === "accepted"
          }, item.status === "accepted" ? {
            j: common_vendor.o(($event) => contactRider(), index)
          } : {}, {
            k: index
          });
        })
      }, {
        e: common_vendor.p({
          type: "plus",
          size: "20",
          color: "#fff"
        }),
        f: common_vendor.o(goToPublish)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/myPublish.js.map
