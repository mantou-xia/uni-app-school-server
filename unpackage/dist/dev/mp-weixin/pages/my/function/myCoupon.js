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
  __name: "myCoupon",
  setup(__props) {
    const tabs = ["可使用", "已使用", "已过期"];
    const currentTab = common_vendor.ref(0);
    const coupons = common_vendor.ref([
      // 可使用
      [
        {
          amount: 5,
          condition: 20,
          title: "新人专享券",
          expireDate: "2024-03-31",
          desc: "仅限跑腿订单使用"
        },
        {
          amount: 10,
          condition: 50,
          title: "满减优惠券",
          expireDate: "2024-03-15",
          desc: "限时优惠，全场通用"
        }
      ],
      // 已使用
      [
        {
          amount: 3,
          condition: 15,
          title: "跑腿专享券",
          expireDate: "2024-02-28",
          desc: "已用于订单：DD20240228001"
        }
      ],
      // 已过期
      [
        {
          amount: 8,
          condition: 40,
          title: "新年优惠券",
          expireDate: "2024-02-15",
          desc: "春节活动专享"
        }
      ]
    ]);
    const switchTab = (index) => {
      currentTab.value = index;
    };
    const swiperChange = (e) => {
      currentTab.value = e.detail.current;
    };
    const useCoupon = (coupon) => {
      common_vendor.index.navigateTo({
        url: "/pages/order/create"
      });
    };
    const showExchange = () => {
      common_vendor.index.showModal({
        title: "兑换优惠券",
        placeholderText: "请输入兑换码",
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            common_vendor.index.showLoading({
              title: "兑换中"
            });
            setTimeout(() => {
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "兑换成功",
                icon: "success"
              });
            }, 1500);
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(tabs, (tab, index, i0) => {
          return {
            a: common_vendor.t(tab),
            b: index,
            c: common_vendor.n(currentTab.value === index ? "active" : ""),
            d: common_vendor.o(($event) => switchTab(index), index)
          };
        }),
        b: common_vendor.f(tabs, (tab, index, i0) => {
          return common_vendor.e({
            a: !coupons.value[index].length
          }, !coupons.value[index].length ? {
            b: common_assets._imports_0
          } : {
            c: common_vendor.f(coupons.value[index], (item, idx, i1) => {
              return common_vendor.e({
                a: common_vendor.t(item.amount),
                b: common_vendor.t(item.condition),
                c: common_vendor.t(item.title),
                d: common_vendor.t(item.expireDate),
                e: common_vendor.t(item.desc)
              }, index === 0 ? {
                f: common_vendor.o(($event) => useCoupon(), idx)
              } : index === 1 ? {} : {}, {
                g: idx
              });
            }),
            d: index === 0,
            e: index === 1
          }, {
            f: index
          });
        }),
        c: currentTab.value,
        d: common_vendor.o(swiperChange),
        e: common_vendor.p({
          type: "plus",
          size: "20",
          color: "#fff"
        }),
        f: common_vendor.o(showExchange)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/myCoupon.js.map
