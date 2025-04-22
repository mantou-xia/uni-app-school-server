/**
 * 通用页面跳转工具函数
 * @param {string} url 目标页面路径
 * @param {object} [params={}] 传递的参数
 * @param {string} [type='navigateTo'] 跳转类型 
 */
export function goToPage(url, params = {}, type = 'navigateTo') {
  // 检查是否有传入参数，并且参数对象不为空
  const fullUrl = params && Object.keys(params).length 
    // 如果有参数，则构建带参数的 URL
    ? `${url}?${Object.keys(params).map(key => 
        // 对每个参数键值对进行 URL 编码，确保特殊字符能正确传递
        `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      // 使用 & 连接多个参数
      ).join('&')}`
    // 如果没有参数，直接使用原始 URL
    : url;

  // 根据传入的跳转类型选择不同的跳转方法
  switch(type) {
    // 默认方法：保留当前页面，跳转到新页面（可返回）
    case 'navigateTo':
      uni.navigateTo({ url: fullUrl });
      break;
    
    // 替换当前页面，不可返回上一页
    case 'redirectTo':
      uni.redirectTo({ url: fullUrl });
      break;
    
    // 关闭所有页面，打开新页面（常用于首页或登录页）
    case 'reLaunch':
      uni.reLaunch({ url: fullUrl });
      break;
    
    // 跳转到 tabBar 页面
    case 'switchTab':
      uni.switchTab({ url: fullUrl });
      break;
    
    // 如果传入未知类型，默认使用 navigateTo
    default:
      uni.navigateTo({ url: fullUrl });
  }
}

/**
 * 返回上一页的通用函数
 * @param {number} [delta=1] 返回的页面数，默认返回一页
 */
export function goBack(delta = 1) {
  // 调用 uni-app 的返回方法，可以返回多级页面
  uni.navigateBack({ delta });
}

// 导出默认对象，支持两种引入方式
export default {
  // 具名导出的函数
  goToPage,
  goBack
}
