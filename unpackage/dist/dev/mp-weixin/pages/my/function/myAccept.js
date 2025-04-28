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
    const tabs = [
      { name: "全部", count: 0 },
      { name: "进行中", count: 0 },
      { name: "已完成", count: 0 }
    ];
    const currentTab = common_vendor.ref(0);
    const isRefreshing = common_vendor.ref(false);
    const orderList = common_vendor.ref([
      {
        id: 200001,
        user_id: 1001,
        rider_id: 2001,
        category: "快递代取",
        fee: "5.00",
        tip: "2.00",
        title: "取快递包裹",
        date: "2024-04-10 14:30:22",
        deadline: "2024-04-10 17:30:00",
        finish_time: null,
        time_interval: "3小时内",
        remarks: "轻拿轻放，易碎物品",
        region: "学校",
        pickupAddress: "菜鸟驿站 (3号柜台)",
        deliveryAddress: "学生宿舍8栋 B305",
        contact: "张同学 13800138000",
        status: "accepted",
        statusText: "进行中",
        items: "快递包裹 2件",
        baseFee: "5.00",
        extraFee: "2.00",
        orderNo: "KD20240410143022",
        time: "2024-04-10 14:30",
        create_time: "2024-04-10 14:30:22",
        modify_time: "2024-04-10 14:35:10"
      },
      {
        id: 200002,
        user_id: 1002,
        rider_id: 2001,
        category: "食堂打饭",
        fee: "6.00",
        tip: "2.00",
        title: "午餐打包",
        date: "2024-04-10 12:00:12",
        deadline: "2024-04-10 13:00:00",
        finish_time: "2024-04-10 12:40:18",
        time_interval: "1小时内",
        remarks: "微辣，多加米饭",
        region: "学校",
        pickupAddress: "第一食堂 2楼",
        deliveryAddress: "图书馆 3楼自习室",
        contact: "李同学 13900139000",
        status: "completed",
        statusText: "已完成",
        items: "黄焖鸡米饭 1份, 可乐 1瓶",
        baseFee: "6.00",
        extraFee: "2.00",
        orderNo: "ST20240410120012",
        time: "2024-04-10 12:00",
        create_time: "2024-04-10 12:00:12",
        modify_time: "2024-04-10 12:40:18"
      },
      {
        id: 200003,
        user_id: 1003,
        rider_id: 2001,
        category: "代跑腿",
        fee: "8.00",
        tip: "5.00",
        title: "水果购买",
        date: "2024-04-10 15:30:44",
        deadline: "2024-04-10 17:30:00",
        finish_time: null,
        time_interval: "2小时内",
        remarks: "车厘子要新鲜的，橙子选大点的",
        region: "校外",
        pickupAddress: "校外 - 水果店",
        deliveryAddress: "学生宿舍 6栋 A404",
        contact: "王同学 13700137000",
        status: "accepted",
        statusText: "进行中",
        items: "车厘子 2斤, 橙子 3个",
        baseFee: "8.00",
        extraFee: "5.00",
        orderNo: "PT20240410153044",
        time: "2024-04-10 15:30",
        create_time: "2024-04-10 15:30:44",
        modify_time: "2024-04-10 15:40:22"
      },
      {
        id: 200004,
        user_id: 1004,
        rider_id: 2001,
        category: "快递代取",
        fee: "4.00",
        tip: "1.00",
        title: "京东快递取书",
        date: "2024-04-10 16:20:33",
        deadline: "2024-04-10 18:20:00",
        finish_time: "2024-04-10 17:15:42",
        time_interval: "2小时内",
        remarks: "三本教材，不要淋湿",
        region: "学校",
        pickupAddress: "京东快递站点",
        deliveryAddress: "教学楼 A栋 201",
        contact: "赵同学 13600136000",
        status: "completed",
        statusText: "已完成",
        items: "图书 3本",
        baseFee: "4.00",
        extraFee: "1.00",
        orderNo: "KD20240410162033",
        time: "2024-04-10 16:20",
        create_time: "2024-04-10 16:20:33",
        modify_time: "2024-04-10 17:15:42"
      }
    ]);
    const filteredOrders = common_vendor.computed(() => {
      switch (currentTab.value) {
        case 1:
          return orderList.value.filter((order) => order.status === "accepted");
        case 2:
          return orderList.value.filter((order) => order.status === "completed");
        default:
          return orderList.value;
      }
    });
    const updateTabCounts = () => {
      const counts = {
        all: orderList.value.length,
        active: orderList.value.filter((order) => order.status === "accepted").length,
        completed: orderList.value.filter((order) => order.status === "completed").length
      };
      tabs[0].count = counts.all;
      tabs[1].count = counts.active;
      tabs[2].count = counts.completed;
    };
    const switchTab = (index) => {
      currentTab.value = index;
      common_vendor.index.showLoading({
        title: "加载中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
      }, 500);
    };
    const onRefresh = () => {
      isRefreshing.value = true;
      setTimeout(() => {
        updateTabCounts();
        isRefreshing.value = false;
        common_vendor.index.showToast({
          title: "刷新成功",
          icon: "success"
        });
      }, 1e3);
    };
    updateTabCounts();
    const getOrderIcon = (type) => {
      switch (type) {
        case "快递代取":
          return "paperplane";
        case "食堂打饭":
          return "shop";
        case "代跑腿":
          return "person-filled";
        default:
          return "bars";
      }
    };
    const completeOrder = (order) => {
      common_vendor.index.showModal({
        title: "完成订单",
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
    const contactService = (order) => {
      common_vendor.index.showModal({
        title: "联系客服",
        content: "是否进入在线客服聊天？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.navigateTo({
              url: `/pages/my/function/myAcceptPage/chat?orderNo=${order.orderNo}`,
              success: () => {
                common_vendor.index.__f__("log", "at pages/my/function/myAccept.vue:329", "跳转到客服聊天页面成功");
              },
              fail: (err) => {
                common_vendor.index.__f__("error", "at pages/my/function/myAccept.vue:332", "跳转到客服聊天页面失败：", err);
                common_vendor.index.showToast({
                  title: "跳转失败，请重试",
                  icon: "none"
                });
              }
            });
          }
        }
      });
    };
    const goToAccept = () => {
      common_vendor.index.getStorageSync("token");
      common_vendor.index.navigateTo({
        url: "/pages/index_campusErrand/index_campusErrand",
        //跳转购买页面
        success: () => {
          common_vendor.index.showToast({
            title: "欢迎来到接单大厅",
            icon: "none"
          });
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/my/function/myAccept.vue:387", "跳转失败：", err);
          common_vendor.index.showToast({
            title: "跳转失败，请重试",
            icon: "none"
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(tabs, (tab, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(tab.name),
            b: tab.count
          }, tab.count ? {
            c: common_vendor.t(tab.count)
          } : {}, {
            d: index,
            e: common_vendor.n(currentTab.value === index ? "active" : ""),
            f: common_vendor.o(($event) => switchTab(index), index)
          });
        }),
        b: !filteredOrders.value.length
      }, !filteredOrders.value.length ? {
        c: common_assets._imports_0
      } : {
        d: common_vendor.f(filteredOrders.value, (item, index, i0) => {
          return common_vendor.e({
            a: "120fad3e-0-" + i0,
            b: common_vendor.p({
              type: getOrderIcon(item.category),
              size: "18",
              color: "#666"
            }),
            c: common_vendor.t(item.category),
            d: common_vendor.t(item.statusText),
            e: common_vendor.n(item.status),
            f: common_vendor.t(item.pickupAddress),
            g: common_vendor.t(item.deliveryAddress),
            h: item.items
          }, item.items ? {
            i: common_vendor.t(item.items)
          } : {}, {
            j: common_vendor.t(item.contact),
            k: common_vendor.t(item.baseFee),
            l: item.extraFee > 0
          }, item.extraFee > 0 ? {
            m: common_vendor.t(item.extraFee)
          } : {}, {
            n: common_vendor.t((Number(item.baseFee) + Number(item.extraFee)).toFixed(2)),
            o: common_vendor.t(item.orderNo),
            p: common_vendor.t(item.time),
            q: item.status === "accepted"
          }, item.status === "accepted" ? {
            r: common_vendor.o(($event) => completeOrder(), index)
          } : {}, {
            s: common_vendor.o(($event) => contactService(item), index),
            t: index
          });
        })
      }, {
        e: common_vendor.o(onRefresh),
        f: isRefreshing.value,
        g: common_vendor.p({
          type: "plusempty",
          size: "20",
          color: "#fff"
        }),
        h: common_vendor.o(goToAccept)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/myAccept.js.map
