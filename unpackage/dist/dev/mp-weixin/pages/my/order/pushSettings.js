"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      isAvailable: true,
      orderRange: 3,
      isCustomTime: false,
      todayOrders: 12,
      totalEarnings: "58.50",
      onlineHours: 4.5,
      orderTypes: [
        {
          name: "快递代取",
          desc: "校内各快递点取件",
          selected: true,
          icon: "gift",
          tag: "热门"
        },
        {
          name: "食堂打包",
          desc: "校内食堂餐品打包",
          selected: true,
          icon: "shop"
        },
        {
          name: "超市代购",
          desc: "校内超市商品代购",
          selected: false,
          icon: "cart"
        },
        {
          name: "文印服务",
          desc: "文档打印装订等",
          selected: false,
          icon: "paperplane",
          tag: "新增"
        }
      ],
      timeSlots: [
        { time: "早市 6:00-10:00", active: true },
        { time: "午市 10:00-14:00", active: true },
        { time: "下午 14:00-17:00", active: true },
        { time: "晚市 17:00-22:00", active: true }
      ],
      noticeTips: [
        "关闭接单状态后将不再收到新订单推送",
        "接单范围建议设置在2-3公里以获得更好的接单体验",
        "可以选择多个订单类型，增加接单机会",
        "建议根据自己的时间合理设置接单时段"
      ]
    };
  },
  computed: {
    selectedTypeCount() {
      return this.orderTypes.filter((type) => type.selected).length;
    }
  },
  methods: {
    toggleAvailable(e) {
      this.isAvailable = e.detail.value;
      common_vendor.index.showToast({
        title: this.isAvailable ? "已开启接单" : "已暂停接单",
        icon: "none"
      });
    },
    changeRange(e) {
      this.orderRange = e.detail.value;
    },
    toggleType(index) {
      this.orderTypes[index].selected = !this.orderTypes[index].selected;
    },
    toggleTimeSlot(index) {
      this.timeSlots[index].active = !this.timeSlots[index].active;
      this.isCustomTime = !this.timeSlots.every((slot) => slot.active);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.isAvailable ? "正在接单中" : "已暂停接单"),
    b: common_vendor.t($data.isAvailable ? "您可以正常接收订单" : "暂时无法接收新订单"),
    c: $data.isAvailable,
    d: common_vendor.o((...args) => $options.toggleAvailable && $options.toggleAvailable(...args)),
    e: common_vendor.t($data.todayOrders),
    f: common_vendor.t($data.totalEarnings),
    g: common_vendor.t($data.onlineHours),
    h: $data.isAvailable ? 1 : "",
    i: common_vendor.t($data.orderRange),
    j: $data.orderRange,
    k: common_vendor.o((...args) => $options.changeRange && $options.changeRange(...args)),
    l: common_vendor.t($options.selectedTypeCount),
    m: common_vendor.t($data.orderTypes.length),
    n: common_vendor.f($data.orderTypes, (type, index, i0) => {
      return common_vendor.e({
        a: "4edf2eb7-0-" + i0,
        b: common_vendor.p({
          type: type.icon,
          size: "30",
          color: type.selected ? "#3cc51f" : "#666"
        }),
        c: common_vendor.n(type.selected ? "selected" : ""),
        d: common_vendor.t(type.name),
        e: common_vendor.t(type.desc),
        f: type.tag
      }, type.tag ? {
        g: common_vendor.t(type.tag)
      } : {}, {
        h: index,
        i: common_vendor.n(type.selected ? "selected" : ""),
        j: common_vendor.o(($event) => $options.toggleType(index), index)
      });
    }),
    o: common_vendor.t($data.isCustomTime ? "自定义" : "全天"),
    p: common_vendor.f($data.timeSlots, (slot, index, i0) => {
      return {
        a: common_vendor.t(slot.time),
        b: index,
        c: common_vendor.n(slot.active ? "active" : ""),
        d: common_vendor.o(($event) => $options.toggleTimeSlot(index), index)
      };
    }),
    q: common_vendor.f($data.noticeTips, (tip, index, i0) => {
      return {
        a: common_vendor.t(tip),
        b: index
      };
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/my/order/pushSettings.js.map
