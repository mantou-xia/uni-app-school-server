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
    const isRefreshing = common_vendor.ref(false);
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
          desc: "已用于订单：DD20240228001",
          usedTime: "2024-02-28 15:30"
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
    const getTotalSaving = () => {
      return coupons.value[0].reduce((total, coupon) => total + coupon.amount, 0);
    };
    const getEmptyText = (index) => {
      const texts = [
        "暂无可用优惠券",
        "暂无已使用的优惠券",
        "暂无已过期的优惠券"
      ];
      return texts[index];
    };
    const getDateText = (item, index) => {
      if (index === 1) {
        return `使用时间：${item.usedTime}`;
      } else {
        return `有效期至：${item.expireDate}`;
      }
    };
    const switchTab = (index) => {
      currentTab.value = index;
    };
    const swiperChange = (e) => {
      currentTab.value = e.detail.current;
    };
    const useCoupon = (coupon) => {
      common_vendor.index.navigateTo({
        url: `/pages/order/create?couponAmount=${coupon.amount}&couponCondition=${coupon.condition}`
      });
    };
    const showExchange = () => {
      common_vendor.index.showModal({
        title: "兑换优惠券",
        placeholderText: "请输入兑换码",
        editable: true,
        success: (res) => {
          if (res.confirm && res.content) {
            exchangeCoupon(res.content);
          }
        }
      });
    };
    const exchangeCoupon = (code) => {
      common_vendor.index.showLoading({
        title: "兑换中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        if (code === "TEST123") {
          const newCoupon = {
            amount: 15,
            condition: 60,
            title: "兑换优惠券",
            expireDate: "2024-04-30",
            desc: "限时兑换专享"
          };
          coupons.value[0].unshift(newCoupon);
          common_vendor.index.showToast({
            title: "兑换成功",
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: "兑换码无效",
            icon: "error"
          });
        }
      }, 1500);
    };
    const onRefresh = () => {
      isRefreshing.value = true;
      setTimeout(() => {
        isRefreshing.value = false;
        common_vendor.index.showToast({
          title: "刷新成功",
          icon: "success"
        });
      }, 1e3);
    };
    const navigateToTask = () => {
      common_vendor.index.navigateTo({
        url: "/pages/task/index"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(coupons.value[0].length),
        b: common_vendor.t(getTotalSaving()),
        c: common_vendor.f(tabs, (tab, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(tab),
            b: coupons.value[index].length
          }, coupons.value[index].length ? {
            c: common_vendor.t(coupons.value[index].length)
          } : {}, {
            d: index,
            e: common_vendor.n(currentTab.value === index ? "active" : ""),
            f: common_vendor.o(($event) => switchTab(index), index)
          });
        }),
        d: common_vendor.f(tabs, (tab, index, i0) => {
          return common_vendor.e({
            a: !coupons.value[index].length
          }, !coupons.value[index].length ? common_vendor.e({
            b: common_assets._imports_0$1,
            c: common_vendor.t(getEmptyText(index)),
            d: index === 0
          }, index === 0 ? {
            e: common_vendor.o(navigateToTask, index)
          } : {}) : {
            f: common_vendor.f(coupons.value[index], (item, idx, i1) => {
              return common_vendor.e({
                a: common_vendor.t(item.amount),
                b: common_vendor.t(item.condition),
                c: common_vendor.t(item.title),
                d: common_vendor.t(getDateText(item, index)),
                e: common_vendor.t(item.desc)
              }, index === 0 ? {
                f: common_vendor.o(($event) => useCoupon(item), idx)
              } : index === 1 ? {
                g: "20d76950-0-" + i0 + "-" + i1,
                h: common_vendor.p({
                  type: "checkmarkempty",
                  size: "12",
                  color: "#999"
                })
              } : {
                i: "20d76950-1-" + i0 + "-" + i1,
                j: common_vendor.p({
                  type: "closeempty",
                  size: "12",
                  color: "#e74c3c"
                })
              }, {
                k: idx
              });
            }),
            g: index === 0,
            h: index === 1,
            i: index === 2 ? 1 : ""
          }, {
            j: common_vendor.o(onRefresh, index),
            k: index
          });
        }),
        e: isRefreshing.value,
        f: currentTab.value,
        g: common_vendor.o(swiperChange),
        h: common_vendor.p({
          type: "plus",
          size: "20",
          color: "#fff"
        }),
        i: common_vendor.o(showExchange)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/myCoupon.js.map
