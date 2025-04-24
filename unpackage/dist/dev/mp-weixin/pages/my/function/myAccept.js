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
        type: "快递代取",
        status: "accepted",
        statusText: "进行中",
        pickupAddress: "菜鸟驿站 (3号柜台)",
        deliveryAddress: "学生宿舍8栋 B305",
        items: "快递包裹 2件",
        baseFee: "5.00",
        extraFee: "2.00",
        orderNo: "KD20240310143022",
        time: "2024-03-10 14:30",
        contactInfo: "张同学 13800138000"
      },
      {
        type: "食堂打饭",
        status: "completed",
        statusText: "已完成",
        pickupAddress: "第一食堂 2楼",
        deliveryAddress: "图书馆 3楼自习室",
        items: "黄焖鸡米饭 1份, 可乐 1瓶",
        baseFee: "6.00",
        extraFee: "2.00",
        orderNo: "ST20240310120012",
        time: "2024-03-10 12:00",
        contactInfo: "李同学 13900139000"
      },
      {
        type: "代跑腿",
        status: "accepted",
        statusText: "进行中",
        pickupAddress: "校外 - 水果店",
        deliveryAddress: "学生宿舍 6栋 A404",
        items: "车厘子 2斤, 橙子 3个",
        baseFee: "8.00",
        extraFee: "5.00",
        orderNo: "PT20240310153044",
        time: "2024-03-10 15:30",
        contactInfo: "王同学 13700137000"
      },
      {
        type: "快递代取",
        status: "completed",
        statusText: "已完成",
        pickupAddress: "京东快递站点",
        deliveryAddress: "教学楼 A栋 201",
        items: "图书 3本",
        baseFee: "4.00",
        extraFee: "1.00",
        orderNo: "KD20240310162033",
        time: "2024-03-10 16:20",
        contactInfo: "赵同学 13600136000"
      },
      {
        type: "食堂打饭",
        status: "accepted",
        statusText: "进行中",
        pickupAddress: "第二食堂 1楼",
        deliveryAddress: "实验楼 C栋 505",
        items: "麻辣香锅 1份, 米饭 1份, 雪碧 1瓶",
        baseFee: "7.00",
        extraFee: "3.00",
        orderNo: "ST20240310171055",
        time: "2024-03-10 17:10",
        contactInfo: "陈同学 13500135000"
      },
      {
        type: "代跑腿",
        status: "completed",
        statusText: "已完成",
        pickupAddress: "校外 - 打印店",
        deliveryAddress: "学生宿舍 3栋 C202",
        items: "论文打印 30页, 装订 1份",
        baseFee: "6.00",
        extraFee: "0.00",
        orderNo: "PT20240310144023",
        time: "2024-03-10 14:40",
        contactInfo: "孙同学 13400134000"
      },
      {
        type: "快递代取",
        status: "accepted",
        statusText: "进行中",
        pickupAddress: "顺丰快递点",
        deliveryAddress: "学生宿舍 12栋 A506",
        items: "大件包裹 1个 (5kg)",
        baseFee: "8.00",
        extraFee: "4.00",
        orderNo: "KD20240310182011",
        time: "2024-03-10 18:20",
        contactInfo: "周同学 13300133000"
      },
      {
        type: "食堂打饭",
        status: "completed",
        statusText: "已完成",
        pickupAddress: "第三食堂 3楼",
        deliveryAddress: "体育馆",
        items: "水煮鱼 1份, 米饭 2份, 果汁 1杯",
        baseFee: "8.00",
        extraFee: "2.00",
        orderNo: "ST20240310134077",
        time: "2024-03-10 13:40",
        contactInfo: "吴同学 13200132000"
      },
      {
        type: "代跑腿",
        status: "accepted",
        statusText: "进行中",
        pickupAddress: "校外 - 奶茶店",
        deliveryAddress: "学生活动中心",
        items: "奶茶 3杯 (不同口味)",
        baseFee: "5.00",
        extraFee: "3.00",
        orderNo: "PT20240310155099",
        time: "2024-03-10 15:50",
        contactInfo: "郑同学 13100131000"
      },
      {
        type: "代跑腿",
        status: "completed",
        statusText: "已完成",
        pickupAddress: "校外 - 药店",
        deliveryAddress: "学生宿舍 5栋 B103",
        items: "感冒药 1盒, 退烧贴 2贴",
        baseFee: "7.00",
        extraFee: "5.00",
        orderNo: "PT20240310163088",
        time: "2024-03-10 16:30",
        contactInfo: "黄同学 13000130000"
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
    const goToAccept = () => {
      common_vendor.index.getStorageSync("token");
      common_vendor.index.switchTab({
        url: "/pages/index/index",
        //跳转购买页面
        success: () => {
          common_vendor.index.showToast({
            title: "欢迎来到接单大厅",
            icon: "none"
          });
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/my/function/myAccept.vue:379", "跳转失败：", err);
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
            a: "fbc8318c-0-" + i0,
            b: common_vendor.p({
              type: getOrderIcon(item.type),
              size: "18",
              color: "#666"
            }),
            c: common_vendor.t(item.type),
            d: common_vendor.t(item.statusText),
            e: common_vendor.n(item.status),
            f: common_vendor.t(item.pickupAddress),
            g: common_vendor.t(item.deliveryAddress),
            h: item.items
          }, item.items ? {
            i: common_vendor.t(item.items)
          } : {}, {
            j: common_vendor.t(item.contactInfo),
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
            s: index
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
