"use strict";
const common_vendor = require("../../../../common/vendor.js");
const common_assets = require("../../../../common/assets.js");
const _sfc_main = {
  __name: "chat",
  setup(__props) {
    const orderNo = common_vendor.ref("");
    common_vendor.onLoad((option) => {
      if (option.orderNo) {
        orderNo.value = option.orderNo;
        loadChatHistory(option.orderNo);
      }
    });
    const scrollTop = common_vendor.ref(0);
    const messageText = common_vendor.ref("");
    const messages = common_vendor.ref([
      {
        sender: "service",
        content: "您好，我是客服小助手，很高兴为您服务！",
        time: /* @__PURE__ */ new Date()
      }
    ]);
    const currentDate = (/* @__PURE__ */ new Date()).toLocaleDateString();
    const loadChatHistory = (orderNo2) => {
      common_vendor.index.__f__("log", "at pages/my/function/myAcceptPage/chat.vue:85", "加载订单", orderNo2, "的历史消息");
      setTimeout(() => {
        messages.value.push({
          sender: "service",
          content: `已收到您关于订单 ${orderNo2} 的咨询请求，请问有什么可以帮助您的？`,
          time: /* @__PURE__ */ new Date()
        });
      }, 1e3);
    };
    const sendMessage = () => {
      if (!messageText.value.trim())
        return;
      messages.value.push({
        sender: "user",
        content: messageText.value,
        time: /* @__PURE__ */ new Date()
      });
      messageText.value = "";
      scrollToBottom();
      setTimeout(() => {
        messages.value.push({
          sender: "service",
          content: "我们已收到您的消息，正在处理中，请稍候...",
          time: /* @__PURE__ */ new Date()
        });
        scrollToBottom();
      }, 1e3);
    };
    const scrollToBottom = () => {
      common_vendor.nextTick$1(() => {
        scrollTop.value = 99999;
      });
    };
    const loadMoreMessages = () => {
      common_vendor.index.__f__("log", "at pages/my/function/myAcceptPage/chat.vue:135", "加载更多历史消息");
    };
    const onKeypress = (e) => {
      if (e.keyCode === 13 && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    };
    common_vendor.onMounted(() => {
      scrollToBottom();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(orderNo.value),
        b: common_vendor.t(common_vendor.unref(currentDate)),
        c: common_vendor.f(messages.value, (item, index, i0) => {
          return common_vendor.e({
            a: item.sender !== "user"
          }, item.sender !== "user" ? {
            b: common_assets._imports_0
          } : {}, {
            c: common_vendor.t(item.content),
            d: item.sender === "user"
          }, item.sender === "user" ? {
            e: common_assets._imports_0
          } : {}, {
            f: common_vendor.n(item.sender === "user" ? "user" : "service"),
            g: index
          });
        }),
        d: scrollTop.value,
        e: common_vendor.o(loadMoreMessages),
        f: common_vendor.o(onKeypress),
        g: messageText.value,
        h: common_vendor.o(($event) => messageText.value = $event.detail.value),
        i: common_vendor.o(sendMessage)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/pages/my/function/myAcceptPage/chat.js.map
