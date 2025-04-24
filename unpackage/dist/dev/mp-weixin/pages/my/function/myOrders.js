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
    const currentTab = common_vendor.ref(0);
    const isRefreshing = common_vendor.ref(false);
    const publishList = common_vendor.ref([
      {
        id: "FB20240310001",
        type: "快递代取",
        status: "待接单",
        location: "第一教学楼",
        contact: "138****1234",
        description: "快递在菜鸟驿站，取件码12345",
        fee: "5.00",
        extraFee: "0.00",
        time: "2024-03-10 14:30"
      },
      {
        id: "FB20240310002",
        type: "食堂打包",
        status: "进行中",
        location: "学生宿舍8栋",
        contact: "159****5678",
        description: "一食堂二楼麻辣烫，中辣，加葱花",
        fee: "8.00",
        extraFee: "2.00",
        time: "2024-03-10 12:00"
      },
      {
        id: "FB20240309001",
        type: "校园跑腿",
        status: "已完成",
        location: "图书馆",
        contact: "186****9012",
        description: "去打印店打印论文30页并装订",
        fee: "10.00",
        extraFee: "0.00",
        time: "2024-03-09 16:30"
      },
      {
        id: "FB20240309002",
        type: "快递代取",
        status: "已取消",
        location: "研究生宿舍楼",
        contact: "139****3456",
        description: "顺丰快递，大件需要搬运",
        fee: "6.00",
        extraFee: "3.00",
        time: "2024-03-09 09:15"
      },
      {
        id: "FB20240308001",
        type: "食堂打包",
        status: "待接单",
        location: "行政楼",
        contact: "158****7890",
        description: "二食堂一楼水煮鱼套餐，不要辣",
        fee: "7.50",
        extraFee: "0.00",
        time: "2024-03-08 18:00"
      },
      {
        id: "FB20240308002",
        type: "校园跑腿",
        status: "已完成",
        location: "体育馆",
        contact: "187****1234",
        description: "从超市购买水和零食送到体育馆",
        fee: "12.00",
        extraFee: "5.00",
        time: "2024-03-08 15:20"
      },
      {
        id: "FB20240307001",
        type: "快递代取",
        status: "已取消",
        location: "实验楼",
        contact: "135****5678",
        description: "京东快递，小件，易碎物品",
        fee: "4.50",
        extraFee: "0.00",
        time: "2024-03-07 11:40"
      },
      {
        id: "FB20240307002",
        type: "食堂打包",
        status: "已完成",
        location: "学生活动中心",
        contact: "156****9012",
        description: "三食堂二楼黄焖鸡米饭加一瓶可乐",
        fee: "9.00",
        extraFee: "1.50",
        time: "2024-03-07 10:30"
      }
    ]);
    const filteredPublishList = common_vendor.computed(() => {
      const allItems = publishList.value;
      switch (currentTab.value) {
        case 0:
          return allItems;
        case 1:
          return allItems.filter((item) => item.status === "待接单");
        case 2:
          return allItems.filter((item) => item.status === "进行中");
        case 3:
          return allItems.filter((item) => item.status === "已完成");
        case 4:
          return allItems.filter((item) => item.status === "已取消");
        default:
          return allItems;
      }
    });
    const tabs = common_vendor.computed(() => {
      const allItems = publishList.value;
      return [
        {
          name: "全部",
          count: allItems.length
        },
        {
          name: "待接单",
          count: allItems.filter((item) => item.status === "待接单").length
        },
        {
          name: "进行中",
          count: allItems.filter((item) => item.status === "进行中").length
        },
        {
          name: "已完成",
          count: allItems.filter((item) => item.status === "已完成").length
        },
        {
          name: "已取消",
          count: allItems.filter((item) => item.status === "已取消").length
        }
      ];
    });
    const getStatusClass = (status) => {
      const statusMap = {
        "待接单": "waiting",
        "进行中": "processing",
        "已完成": "completed",
        "已取消": "cancelled"
      };
      return statusMap[status] || "";
    };
    const switchTab = (index) => {
      currentTab.value = index;
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
    const cancelPublish = (id) => {
      common_vendor.index.showModal({
        title: "取消发布",
        content: "确定要取消该发布吗？取消后不可恢复",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showLoading({
              title: "处理中"
            });
            setTimeout(() => {
              const item = publishList.value.find((i) => i.id === id);
              if (item) {
                item.status = "已取消";
              }
              common_vendor.index.hideLoading();
              common_vendor.index.showToast({
                title: "已取消",
                icon: "success"
              });
            }, 1e3);
          }
        }
      });
    };
    const contactRider = (id) => {
      common_vendor.index.showActionSheet({
        itemList: ["拨打电话", "发送消息"],
        success: (res) => {
          if (res.tapIndex === 0) {
            common_vendor.index.makePhoneCall({
              phoneNumber: "10000000000"
            });
          } else {
            common_vendor.index.navigateTo({
              url: "/pages/my/function/OrdersPage/chat"
            });
          }
        }
      });
    };
    const editPublish = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/my/function/OrdersPage/edit?id=${id}`
      });
    };
    const republish = (id) => {
      common_vendor.index.showLoading({
        title: "处理中"
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "发布成功",
          icon: "success"
        });
      }, 1e3);
    };
    const goToPublish = () => {
      common_vendor.index.navigateTo({
        url: "/pages/my/function/OrdersPage/publish"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(tabs.value, (tab, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(tab.name),
            b: tab.count > 0
          }, tab.count > 0 ? {
            c: common_vendor.t(tab.count)
          } : {}, {
            d: index,
            e: common_vendor.n(currentTab.value === index ? "active" : ""),
            f: common_vendor.o(($event) => switchTab(index), index)
          });
        }),
        b: filteredPublishList.value.length === 0
      }, filteredPublishList.value.length === 0 ? {
        c: common_assets._imports_0
      } : {}, {
        d: common_vendor.f(filteredPublishList.value, (item, idx, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.type),
            b: common_vendor.t(item.status),
            c: common_vendor.n(getStatusClass(item.status)),
            d: common_vendor.t(item.location),
            e: common_vendor.t(item.contact),
            f: common_vendor.t(item.description),
            g: common_vendor.t(item.fee),
            h: item.extraFee > 0
          }, item.extraFee > 0 ? {
            i: common_vendor.t(item.extraFee)
          } : {}, {
            j: common_vendor.t(item.time),
            k: item.status === "待接单"
          }, item.status === "待接单" ? {
            l: common_vendor.o(($event) => cancelPublish(item.id), item.id)
          } : {}, {
            m: item.status === "进行中"
          }, item.status === "进行中" ? {
            n: common_vendor.o(($event) => contactRider(item.id), item.id)
          } : {}, {
            o: item.status === "待接单"
          }, item.status === "待接单" ? {
            p: common_vendor.o(($event) => editPublish(item.id), item.id)
          } : {}, {
            q: item.status === "待接单"
          }, item.status === "待接单" ? {
            r: common_vendor.o(($event) => republish(item.id), item.id)
          } : {}, {
            s: item.id
          });
        }),
        e: isRefreshing.value,
        f: common_vendor.o(onRefresh),
        g: common_vendor.p({
          type: "plusempty",
          size: "24",
          color: "#fff"
        }),
        h: common_vendor.o(goToPublish)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/function/myOrders.js.map
