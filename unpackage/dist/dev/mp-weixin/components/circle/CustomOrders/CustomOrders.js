"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  name: "CustomOrders",
  data() {
    return {
      // 分类数据
      categories: [
        { label: "全部", value: "all" },
        { label: "求助", value: "help" },
        { label: "吐槽", value: "complain" },
        { label: "推荐", value: "recommend" },
        { label: "避雷", value: "warning" },
        { label: "竞赛", value: "competition" },
        { label: "其他", value: "other" }
      ],
      // 当前选中的分类
      currentCategory: "all",
      // 帖子列表
      postList: [],
      // 加载状态
      isLoading: false,
      // 分页参数
      page: 1,
      pageSize: 10,
      avatarCache: {},
      // 头像缓存
      likeClickTimestamps: {}
      // 记录点赞点击时间戳
    };
  },
  computed: {
    // 获取当前分类的图标
    getCurrentCategoryIcon() {
      return this.getCategoryIcon(this.currentCategory);
    },
    // 获取当前分类的标签
    getCurrentCategoryLabel() {
      const currentCategory = this.categories.find(
        (category) => category.value === this.currentCategory
      );
      return currentCategory ? currentCategory.label : "全部";
    },
    // 获取分类占位符
    getCategoryPlaceholder() {
      const placeholders = {
        "all": "查看所有内容",
        "help": "需要帮助？快来发布你的求助信息",
        "complain": "吐槽一下，分享你的不开心",
        "recommend": "推荐好物、好店、好服务",
        "warning": "避开坑，分享你的踩坑经历",
        "competition": "竞赛信息汇总，机会不容错过",
        "other": "其他有趣的内容"
      };
      return placeholders[this.currentCategory] || "暂无内容";
    }
  },
  methods: {
    // 选择分类
    selectCategory(category) {
      this.currentCategory = category;
      this.fetchPosts();
      this.$emit("category-change", category);
    },
    // 获取分类图标
    getCategoryIcon(category) {
      const icons = {
        "all": "icon-all",
        "help": "icon-qiuzhu",
        "complain": "icon--complain",
        "recommend": "icon-recommend",
        "warning": "icon--warning",
        "competition": "icon-jingsaixitong",
        "other": "icon-other"
      };
      return icons[category] || "icon-all";
    },
    // 获取分类标签
    getCategoryLabel(category) {
      const categoryLabels = {
        "all": "全部",
        "help": "求助",
        "complain": "吐槽",
        "recommend": "推荐",
        "warning": "避雷",
        "competition": "竞赛",
        "other": "其他"
      };
      return categoryLabels[category] || category;
    },
    // 获取帖子列表
    async fetchPosts() {
      this.isLoading = true;
      this.postList = [];
      try {
        const response = await this.mockFetchPosts();
        this.postList = response.data;
      } catch (error) {
        common_vendor.index.showToast({
          title: "加载失败，请重试",
          icon: "none"
        });
        common_vendor.index.__f__("error", "at components/circle/CustomOrders/CustomOrders.vue:177", "获取帖子列表失败:", error);
      } finally {
        this.isLoading = false;
      }
    },
    // 生成随机头像的方法
    generateRandomAvatar(userId) {
      if (this.avatarCache[userId]) {
        return this.avatarCache[userId];
      }
      const avatarStyles = [
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}&background=%23f0f0f0`,
        `https://api.dicebear.com/7.x/bottts/svg?seed=${userId}&background=%23f0f0f0`,
        `https://api.dicebear.com/7.x/identicon/svg?seed=${userId}&background=%23f0f0f0`
      ];
      const randomAvatar = avatarStyles[Math.floor(Math.random() * avatarStyles.length)];
      this.avatarCache[userId] = randomAvatar;
      return randomAvatar;
    },
    // 修改 mockFetchPosts 方法以使用随机头像
    async mockFetchPosts() {
      const postsByCategory = {
        "all": [
          {
            id: 1,
            username: "用户1",
            content: "这是全部分类的第一条动态",
            time: "刚刚",
            likes: 10,
            comments: 2,
            category: "help",
            isLiked: false,
            avatar: this.generateRandomAvatar("user1")
          },
          {
            id: 2,
            username: "用户2",
            content: "这是全部分类的第二条动态",
            time: "1小时前",
            likes: 5,
            comments: 1,
            category: "recommend",
            isLiked: false,
            avatar: this.generateRandomAvatar("user2")
          }
        ],
        "help": [
          {
            id: 3,
            username: "求助用户",
            content: "求推荐校园兼职",
            time: "30分钟前",
            likes: 15,
            comments: 5,
            category: "help",
            isLiked: false,
            avatar: this.generateRandomAvatar("help_user")
          }
        ],
        "complain": [
          {
            id: 4,
            username: "吐槽王",
            content: "食堂今天的饭真难吃",
            time: "2小时前",
            likes: 8,
            comments: 3,
            category: "complain",
            isLiked: false,
            avatar: this.generateRandomAvatar("complain_user")
          }
        ],
        "recommend": [
          {
            id: 5,
            username: "推荐达人",
            content: "超好用的学习App推荐",
            time: "昨天",
            likes: 20,
            comments: 7,
            category: "recommend",
            isLiked: false,
            avatar: this.generateRandomAvatar("recommend_user")
          }
        ],
        "warning": [
          {
            id: 6,
            username: "避雷专家",
            content: "警惕校园二手交易骗局",
            time: "3天前",
            likes: 30,
            comments: 10,
            category: "warning",
            isLiked: false,
            avatar: this.generateRandomAvatar("warning_user")
          }
        ],
        "competition": [
          {
            id: 7,
            username: "竞赛小能手",
            content: "分享一个编程比赛",
            time: "1周前",
            likes: 12,
            comments: 4,
            category: "competition",
            isLiked: false,
            avatar: this.generateRandomAvatar("competition_user")
          }
        ],
        "other": [
          {
            id: 8,
            username: "其他用户",
            content: "随便聊聊天",
            time: "刚刚",
            likes: 3,
            comments: 1,
            category: "other",
            isLiked: false,
            avatar: this.generateRandomAvatar("other_user")
          }
        ]
      };
      return {
        data: postsByCategory[this.currentCategory] || []
      };
    },
    // 点赞方法
    toggleLike(post) {
      if (!post.isLiked) {
        post.likes += 1;
        post.isLiked = true;
      } else {
        post.likes = Math.max(0, post.likes - 1);
        post.isLiked = false;
      }
    },
    // 获取点赞图标
    getLikeIcon(post) {
      return post.isLiked ? "icon-icon-copy" : "icon-icon";
    },
    // 检查是否已点赞
    isLiked(post) {
      return !!this.likedPosts[post.id];
    },
    // 获取点赞数量
    getLikeCount(post) {
      return post.likes;
    }
  },
  // 页面加载时获取初始帖子列表
  created() {
    this.fetchPosts();
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.categories, (category, index, i0) => {
      return {
        a: common_vendor.t(category.label),
        b: index,
        c: $data.currentCategory === category.value ? 1 : "",
        d: common_vendor.o(($event) => $options.selectCategory(category.value), index)
      };
    }),
    b: common_vendor.n($options.getCurrentCategoryIcon),
    c: common_vendor.t($options.getCurrentCategoryLabel),
    d: $data.isLoading
  }, $data.isLoading ? {} : $data.postList.length > 0 ? {
    f: common_vendor.f($data.postList, (post, index, i0) => {
      return {
        a: post.avatar,
        b: common_vendor.t(post.username),
        c: common_vendor.t(post.time),
        d: common_vendor.t($options.getCategoryLabel(post.category)),
        e: common_vendor.n(`category-${post.category}`),
        f: common_vendor.t(post.content),
        g: common_vendor.n($options.getLikeIcon(post)),
        h: common_vendor.t(post.likes),
        i: common_vendor.o(($event) => $options.toggleLike(post), index),
        j: common_vendor.t(post.comments),
        k: index
      };
    })
  } : {
    g: common_vendor.t($options.getCategoryPlaceholder)
  }, {
    e: $data.postList.length > 0,
    h: common_vendor.n(`content-${$data.currentCategory}`)
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/components/circle/CustomOrders/CustomOrders.js.map
