module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5, //设计图是375
      propList: ['*'],
      minPixelValue: 12, // px小于12的不会被转换
      unitPrecision: 2, // 保留rem小数点多少位
      selectorBlackList: ['ig'] // 忽略的选择器
    },

    autoprefixer: {
      overrideBrowserslist: [
        'Android 4.1',
        'iOS 7.1',
        'Chrome > 31',
        'ff > 31',
        'ie >= 8'
      ]
    }
  }
}
