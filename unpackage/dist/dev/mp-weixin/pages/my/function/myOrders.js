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
  __name: "myOrders",
  setup(__props) {
    const tabs = [
      { name: "全部", count: 0 },
      { name: "待接单", count: 0 },
      { name: "进行中", count: 0 },
      { name: "已完成", count: 0 },
      { name: "已取消", count: 0 }
    ];
    const currentTab = common_vendor.ref(0);
    const isRefreshing = common_vendor.ref(false);
    const orderList = common_vendor.ref([
      {
        id: 300001,
        user_id: 3001,
        rider_id: null,
        category: "快递代取",
        fee: "5.00",
        tip: "2.00",
        title: "取顺丰快递",
        date: "2024-04-20 14:30:22",
        deadline: "2024-04-20 17:30:00",
        finish_time: null,
        time_interval: "3小时内",
        remarks: "取件码1234，轻拿轻放",
        region: "学校",
        pickupAddress: "菜鸟驿站 (3号柜台)",
        deliveryAddress: "学生宿舍8栋 B305",
        contact: "138****1234",
        status: "pending",
        statusText: "待接单",
        items: "快递包裹 2件",
        baseFee: "5.00",
        extraFee: "2.00",
        orderNo: "KD20240420143022",
        time: "2024-04-20 14:30",
        create_time: "2024-04-20 14:30:22",
        modify_time: "2024-04-20 14:30:22"
      },
      {
        id: 300002,
        user_id: 3001,
        rider_id: 2002,
        category: "食堂打饭",
        fee: "6.00",
        tip: "2.00",
        title: "午餐打包",
        date: "2024-04-20 12:00:12",
        deadline: "2024-04-20 13:00:00",
        finish_time: null,
        time_interval: "1小时内",
        remarks: "微辣，多点米饭",
        region: "学校",
        pickupAddress: "第一食堂 2楼",
        deliveryAddress: "图书馆 3楼自习室",
        contact: "139****5678",
        status: "processing",
        statusText: "进行中",
        items: "黄焖鸡米饭 1份, 可乐 1瓶",
        baseFee: "6.00",
        extraFee: "2.00",
        orderNo: "ST20240420120012",
        time: "2024-04-20 12:00",
        create_time: "2024-04-20 12:00:12",
        modify_time: "2024-04-20 12:05:18"
      },
      {
        id: 300003,
        user_id: 3001,
        rider_id: 2003,
        category: "代跑腿",
        fee: "8.00",
        tip: "5.00",
        title: "水果购买",
        date: "2024-04-19 15:30:44",
        deadline: "2024-04-19 17:30:00",
        finish_time: "2024-04-19 16:45:32",
        time_interval: "2小时内",
        remarks: "挑选新鲜的水果",
        region: "校外",
        pickupAddress: "校外 - 水果店",
        deliveryAddress: "学生宿舍 6栋 A404",
        contact: "186****9012",
        status: "completed",
        statusText: "已完成",
        items: "车厘子 2斤, 橙子 3个",
        baseFee: "8.00",
        extraFee: "5.00",
        orderNo: "PT20240419153044",
        time: "2024-04-19 15:30",
        create_time: "2024-04-19 15:30:44",
        modify_time: "2024-04-19 16:45:32"
      },
      {
        id: 300004,
        user_id: 3001,
        rider_id: null,
        category: "快递代取",
        fee: "4.00",
        tip: "1.00",
        title: "京东快递取书",
        date: "2024-04-19 16:20:33",
        deadline: "2024-04-19 18:20:00",
        finish_time: null,
        time_interval: "2小时内",
        remarks: "小心轻放，易碎物品",
        region: "学校",
        pickupAddress: "京东快递站点",
        deliveryAddress: "教学楼 A栋 201",
        contact: "139****3456",
        status: "cancelled",
        statusText: "已取消",
        items: "图书 3本",
        baseFee: "4.00",
        extraFee: "1.00",
        orderNo: "KD20240419162033",
        time: "2024-04-19 16:20",
        create_time: "2024-04-19 16:20:33",
        modify_time: "2024-04-19 16:25:44"
      },
      {
        id: 300005,
        user_id: 3001,
        rider_id: null,
        category: "食堂打饭",
        fee: "7.00",
        tip: "3.00",
        title: "晚餐打包",
        date: "2024-04-20 17:10:55",
        deadline: "2024-04-20 18:10:00",
        finish_time: null,
        time_interval: "1小时内",
        remarks: "不要放辣椒，带餐具",
        region: "学校",
        pickupAddress: "第二食堂 1楼",
        deliveryAddress: "实验楼 C栋 505",
        contact: "158****7890",
        status: "pending",
        statusText: "待接单",
        items: "麻辣香锅 1份, 米饭 1份, 雪碧 1瓶",
        baseFee: "7.00",
        extraFee: "3.00",
        orderNo: "ST20240420171055",
        time: "2024-04-20 17:10",
        create_time: "2024-04-20 17:10:55",
        modify_time: "2024-04-20 17:10:55"
      }
    ]);
    const filteredOrders = common_vendor.computed(() => {
      switch (currentTab.value) {
        case 1:
          return orderList.value.filter((order) => order.status === "pending");
        case 2:
          return orderList.value.filter((order) => order.status === "processing");
        case 3:
          return orderList.value.filter((order) => order.status === "completed");
        case 4:
          return orderList.value.filter((order) => order.status === "cancelled");
        default:
          return orderList.value;
      }
    });
    const updateTabCounts = () => {
      const counts = {
        all: orderList.value.length,
        pending: orderList.value.filter((order) => order.status === "pending").length,
        processing: orderList.value.filter((order) => order.status === "processing").length,
        completed: orderList.value.filter((order) => order.status === "completed").length,
        cancelled: orderList.value.filter((order) => order.status === "cancelled").length
      };
      tabs[0].count = counts.all;
      tabs[1].count = counts.pending;
      tabs[2].count = counts.processing;
      tabs[3].count = counts.completed;
      tabs[4].count = counts.cancelled;
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
        case "校园跑腿":
          return "person-filled";
        default:
          return "bars";
      }
    };
    const cancelOrder = (order) => {
      common_vendor.index.showModal({
        title: "取消订单",
        content: "确认取消该订单吗？",
        success: (res) => {
          if (res.confirm) {
            order.status = "cancelled";
            order.statusText = "已取消";
            updateTabCounts();
            common_vendor.index.showToast({
              title: "订单已取消",
              icon: "success"
            });
          }
        }
      });
    };
    const contactRider = (order) => {
      common_vendor.index.showActionSheet({
        itemList: ["拨打电话", "发送消息"],
        success: (res) => {
          if (res.tapIndex === 0) {
            common_vendor.index.makePhoneCall({
              phoneNumber: "10000000000"
            });
          } else {
            common_vendor.index.navigateTo({
              url: `/pages/my/function/OrdersPage/chat?orderNo=${order.orderNo}`
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
              url: `/pages/my/function/OrdersPage/chat?orderNo=${order.orderNo}`,
              success: () => {
                common_vendor.index.__f__("log", "at pages/my/function/myOrders.vue:386", "跳转到客服聊天页面成功");
              },
              fail: (err) => {
                common_vendor.index.__f__("error", "at pages/my/function/myOrders.vue:389", "跳转到客服聊天页面失败：", err);
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
    const goToPublish = () => {
      common_vendor.index.getStorageSync("token");
      common_vendor.index.navigateTo({
        url: "/pages/my/function/OrdersPage/publish",
        success: () => {
          common_vendor.index.__f__("log", "at pages/my/function/myOrders.vue:421", "跳转到发布订单页面成功");
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/my/function/myOrders.vue:424", "跳转到发布订单页面失败：", err);
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
            a: "ed59b6ca-0-" + i0,
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
            j: common_vendor.t(item.baseFee),
            k: item.extraFee > 0
          }, item.extraFee > 0 ? {
            l: common_vendor.t(item.extraFee)
          } : {}, {
            m: common_vendor.t((Number(item.baseFee) + Number(item.extraFee)).toFixed(2)),
            n: common_vendor.t(item.orderNo),
            o: common_vendor.t(item.time),
            p: item.status === "pending"
          }, item.status === "pending" ? {
            q: common_vendor.o(($event) => cancelOrder(item), index)
          } : {}, {
            r: item.status === "processing"
          }, item.status === "processing" ? {
            s: common_vendor.o(($event) => contactRider(item), index)
          } : {}, {
            t: common_vendor.o(($event) => contactService(item), index),
            v: index
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
        h: common_vendor.o(goToPublish)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/myOrders.js.map
