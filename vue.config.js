const { defineConfig } = require('@vue/cli-service')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const path = require('path')

// 路径处理方法
function resolve(dir) {
  return path.join(__dirname, dir)
}

const externals = [
  {
    vue: 'Vue'
  },
  {
    'vue-router': 'VueRouter'
  },
  {
    axios: 'axios'
  },
  {
    vuex: 'Vuex'
  }
]
const cdn = {
  css: [],
  js: [
    'https://deals.meiyunji.net/static/js/cdn/vue@2.6.14/vue.min.js',
    'https://deals.meiyunji.net/static/js/cdn/axios@0.24.0/axios.min.js',
    'https://deals.meiyunji.net/static/js/cdn/vue-router@3.5.3/vue-router.min.js',
    'https://deals.meiyunji.net/static/js/cdn/vuex@3.6.2/vuex.min.js'
  ]
}

module.exports = defineConfig({
  publicPath: '/',
  outputDir: 'dist',
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    port: 8887,
    hot: true,
    open: true,
    host: '192.168.0.237',
    compress: true, // 是否启动压缩 gzip
    proxy: {
      '/api': {
        target: 'http://192.168.0.235:8080/',
        changeOrigin: true,
        pathRewrite: {
          // api开头的请求会去到target下请求
          // "^/api": "",
        }
      }
    }
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            // green: "#fa7b0c",
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "~@/assets/style/common.less";
            @import "~@/assets/style/vant_personal.less";`
          }
        }
      }
    }
  },
  configureWebpack: {
    resolve: {
      extensions: ['.vue', '.js', '.json', 'less', 'css'],
      alias: {
        '@': resolve('src')
      },
      modules: [resolve('src'), 'node_modules']
    },
    module: {},
    plugins: []
  },
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new BundleAnalyzerPlugin())
      config.externals(externals)
      // 通过 html-webpack-plugin 将 cdn 注入到 index.html 之中
      config.plugin('html').tap((args) => {
        args[0].cdn = cdn
        return args
      })
      config.plugin('CompressionPlugin').use('compression-webpack-plugin', [
        {
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: /\.js$|\.css$|\.html$/,
          threshold: 10240, // 只处理比这个值大的资源。按字节计算
          minRatio: 0.8 // 只有压缩率比这个值小的资源才会被处理
        }
      ])
      config.optimization.splitChunks({
        cacheGroups: {
          styles: {
            name: 'styles',
            test: /\.(s?css|less|sass)$/,
            chunks: 'all',
            priority: 10
          },
          common: {
            name: 'chunk-common',
            chunks: 'all',
            minChunks: 2, // 拆分前必须共享模块的最小 chunks 数。
            maxInitialRequests: 5, // 打包后的入口文件加载时，还能同时加载js文件的数量（包括入口文件）
            minSize: 0, // 生成 chunk 的最小体积（≈ 20kb)
            priority: 1, // 优化将优先考虑具有更高 priority（优先级）的缓存组
            reuseExistingChunk: true // 如果当前 chunk 包含已从主 bundle 中拆分出的模块，则它将被重用，而不是生成新的模块
          },
          vendors: {
            name: 'chunk-vendors',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 2,
            reuseExistingChunk: true
          },
          lrucache: {
            name: 'chunk-lrucache',
            test: /[\\/]node_modules[\\/]_?lru-cache(.*)/,
            chunks: 'all',
            priority: 3,
            reuseExistingChunk: true
          }
        }
      })
    }
  }
})
