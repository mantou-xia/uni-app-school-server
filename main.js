// 导入应用程序的根组件
import App from './App'

// 导入自定义导航组件
import renCustomerNavigator from '@/components/ren-customer-navigator/ren-customer-navigator.vue'

// 导入自定义占位组件
import CustomPlaceholder from '@/components/common/CustomPlaceholder/CustomPlaceholder.vue'

// 导入自定义搜索组件
import CustomSearch from '@/components/common/CustomSearch/CustomSearch.vue'

// 条件编译：非Vue3环境（兼容Vue2）
// #ifndef VUE3
// 导入Vue 2
import Vue from 'vue'

// 导入uni-app的Promise适配器
import './uni.promisify.adaptor'

// 全局挂载uni对象
import uni from 'uni-app'
Vue.prototype.uni = uni

// 关闭Vue的生产模式提示
Vue.config.productionTip = false

// 设置应用类型为小程序
App.mpType = 'app'

// 创建Vue 2实例
const app = new Vue({
  // 展开App配置
  ...App
})

// 全局注册自定义导航组件
app.component('ren-customer-navigator', renCustomerNavigator)

// 全局注册自定义占位组件
app.component('custom-placeholder', CustomPlaceholder)

// 全局注册自定义搜索组件
app.component('custom-search', CustomSearch)

// 挂载应用
app.$mount()
// #endif

// 条件编译：Vue3环境
// #ifdef VUE3
// 导入Vue 3的服务端渲染应用创建方法
import { createSSRApp } from 'vue'

// 导出创建应用的函数（uni-app的Vue3入口）
export function createApp() {
  // 创建Vue 3服务端渲染应用实例
  const app = createSSRApp(App)
  
  // 全局注册自定义占位组件
  app.component('custom-placeholder', CustomPlaceholder)
  // 全局注册自定义导航组件
  app.component('ren-customer-navigator', renCustomerNavigator)
  // 全局注册自定义搜索组件
  app.component('custom-search', CustomSearch)
  
  // 返回应用实例
  return {
    app
  }
}
// #endif
