"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      searchText: "",
      selectedCategory: "全部",
      categories: ["全部", "数码", "图书", "服装", "家电", "运动", "日用", "其他"],
      isLoading: false,
      noMoreItems: false,
      currentPage: 1,
      items: [
        {
          id: 1,
          title: "iPad 2020 128G",
          description: "95新，无划痕，配件齐全，仅当地交易",
          price: "2199",
          category: "数码",
          status: "available",
          publishTime: "1小时前",
          likes: 12,
          seller: {
            id: 101,
            name: "林小明"
          }
        },
        {
          id: 2,
          title: "高等数学第七版",
          description: "同济大学高数教材，笔记很全，有习题解析",
          price: "35",
          category: "图书",
          status: "available",
          publishTime: "3小时前",
          likes: 5,
          seller: {
            id: 102,
            name: "张文学"
          }
        },
        {
          id: 3,
          title: "Nike 运动套装",
          description: "L码，穿过几次，无破损，9成新",
          price: "169",
          category: "服装",
          status: "available",
          publishTime: "昨天",
          likes: 8,
          seller: {
            id: 103,
            name: "李运动"
          }
        },
        {
          id: 4,
          title: "小米台灯",
          description: "大学生护眼灯，可调亮度，USB供电",
          price: "89",
          category: "日用",
          status: "sold",
          publishTime: "3天前",
          likes: 20,
          seller: {
            id: 104,
            name: "陈小米"
          }
        },
        {
          id: 5,
          title: "无线蓝牙耳机",
          description: "苹果华为小米通用，电池续航好",
          price: "129",
          category: "数码",
          status: "available",
          publishTime: "4天前",
          likes: 15,
          seller: {
            id: 105,
            name: "王数码"
          }
        },
        {
          id: 6,
          title: "迷你小冰箱",
          description: "宿舍用小冰箱，低噪音，节能",
          price: "399",
          category: "家电",
          status: "available",
          publishTime: "5天前",
          likes: 25,
          seller: {
            id: 106,
            name: "赵电器"
          }
        }
      ]
    };
  },
  computed: {
    filteredItems() {
      let result = this.items;
      if (this.selectedCategory !== "全部") {
        result = result.filter((item) => item.category === this.selectedCategory);
      }
      if (this.searchText.trim() !== "") {
        const searchLower = this.searchText.toLowerCase().trim();
        result = result.filter(
          (item) => item.title.toLowerCase().includes(searchLower) || item.description.toLowerCase().includes(searchLower)
        );
      }
      return result;
    }
  },
  methods: {
    searchItems() {
      common_vendor.index.__f__("log", "at pages/index_secondHandMarket/index_secondHandMarket.vue:197", "搜索:", this.searchText);
    },
    toggleFilterPanel() {
      common_vendor.index.showToast({
        title: "筛选功能开发中",
        icon: "none"
      });
    },
    selectCategory(category) {
      this.selectedCategory = category;
    },
    loadMoreItems() {
      if (this.isLoading || this.noMoreItems)
        return;
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
        if (this.currentPage >= 2) {
          this.noMoreItems = true;
        } else {
          this.currentPage++;
        }
      }, 1e3);
    },
    viewItemDetail(id) {
      common_vendor.index.showToast({
        title: "商品详情页开发中",
        icon: "none"
      });
    },
    publishItem() {
      common_vendor.index.showToast({
        title: "发布功能开发中",
        icon: "none"
      });
    },
    getItemImage(category) {
      switch (category) {
        case "数码":
          return "/static/placeholder_digital.png";
        case "图书":
          return "/static/placeholder_book.png";
        case "服装":
          return "/static/placeholder_clothes.png";
        case "家电":
          return "/static/placeholder_appliance.png";
        case "运动":
          return "/static/placeholder_sports.png";
        case "日用":
          return "/static/placeholder_daily.png";
        default:
          return "/static/placeholder_common.png";
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      type: "search",
      size: "18",
      color: "#666"
    }),
    b: common_vendor.o((...args) => $options.searchItems && $options.searchItems(...args)),
    c: $data.searchText,
    d: common_vendor.o(($event) => $data.searchText = $event.detail.value),
    e: common_vendor.p({
      type: "bars",
      size: "22",
      color: "#4b7bec"
    }),
    f: common_vendor.o((...args) => $options.toggleFilterPanel && $options.toggleFilterPanel(...args)),
    g: common_vendor.f($data.categories, (category, index, i0) => {
      return {
        a: common_vendor.t(category),
        b: index,
        c: $data.selectedCategory === category ? 1 : "",
        d: common_vendor.o(($event) => $options.selectCategory(category), index)
      };
    }),
    h: common_vendor.f($options.filteredItems, (item, index, i0) => {
      return common_vendor.e({
        a: $options.getItemImage(item.category),
        b: item.status === "sold"
      }, item.status === "sold" ? {} : {}, {
        c: common_vendor.t(item.title),
        d: common_vendor.t(item.price),
        e: common_vendor.t(item.publishTime),
        f: common_vendor.t(item.description),
        g: common_vendor.t(item.seller.name),
        h: "4b2d3829-2-" + i0,
        i: common_vendor.t(item.likes),
        j: index,
        k: common_vendor.o(($event) => $options.viewItemDetail(item.id), index)
      });
    }),
    i: common_vendor.p({
      type: "heart",
      size: "14",
      color: "#999"
    }),
    j: $data.isLoading
  }, $data.isLoading ? {} : {}, {
    k: $data.noMoreItems
  }, $data.noMoreItems ? {} : {}, {
    l: common_vendor.p({
      type: "plus",
      size: "24",
      color: "#fff"
    }),
    m: common_vendor.o((...args) => $options.publishItem && $options.publishItem(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index_secondHandMarket/index_secondHandMarket.js.map
