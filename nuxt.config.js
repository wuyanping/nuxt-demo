require('dotenv').config()

const env = process.env
const isProd = env.MODE == 'prod'

// 不能以斜杠结尾
let apiServer = process.env.API_SERVER
// 必须以斜杠结尾
let publicPath = process.env.PUBLIC_PATH || 'http://cdn.deepexi.com/'

const config = {
  projectNo: env.PROJECT_NO || '',
  aliIconFont: '',

  /*
    在 yarn mock 模式下，都会变成 http://mock.api.server/api 
    在 yarn dev 模式下，都会变成 http://real.api.server/api 
    注意，每次修改代理设置，都需要重新启动应用才能生效
  */
  env: {
    mock: {
      '/security': 'http://yapi.demo.qunar.com/mock/9638',
      '/api': 'http://yapi.deepexi.io:5002/mock/95/mock'
    },
    dev: {
      '/security': 'http://your.dev.server',
    }
  }
}

let axios = {
  proxy: true
}

// 如果指定apiServer, 则使用绝对路径请求api
if (apiServer) {
  axios = {
    proxy: false,
    baseURL: apiServer
  }
}

module.exports = {
  mode: 'spa',

  // 使用环境变量
  env: {
    PROJECT_NO: config.projectNo,
    NO_LOGIN: process.env.NO_LOGIN
  },
  proxy: config.env[env.MODE],
  router: {
    middleware: ['meta'],
    mode: 'hash'
  },
  /*
   ** Build configuration
   Nuxt.js 允许你根据服务端需求，自定义 webpack 的构建配置
   */
  build: {
    // Nuxt.js允许您将dist文件上传到CDN来获得最快渲染性能，只需将publicPath设置为CDN即可 
    publicPath,

    // 使用Vue 服务器端渲染指南启用常见CSS提 
    extractCSS: true,

    // 为 JS 和 Vue 文件设定自定义的 babel 配置。
    babel: {
      plugins: [
        [
          'component',
          {
            libraryName: 'element-ui',
            styleLibraryName: 'theme-chalk'
          }
        ]
      ]
    },
    /*
     ** Run ESLint on save
     为客户端和服务端的构建配置进行手工的扩展处理
     */
    extend(config, {isDev}) {
      if (isDev && process.client) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
   ** Headers of the page
  配置应用的 meta 信息 
   */
  head: {
    title: 'Optimus',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {'http-equiv': 'x-ua-compatible', content: 'IE=edge, chrome=1'},
      {
        hid: 'description',
        name: 'description',
        content: '开发平台'
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href:
          'https://deepexi.oss-cn-shenzhen.aliyuncs.com/deepexi-services/favicon32x32.png'
      },
      {
        // rel: 'stylesheet',
        // type: 'text/css',
        // href: config.aliIconFont
      }
    ]
  },
  /*
   ** Customize the progress bar color
   在页面切换的时候，Nuxt.js 使用内置的加载组件显示加载进度条。你可以定制它的样式，禁用或者创建自己的加载组件。
   this.$nuxt.$loading.start()启动加载条
   this.$nuxt.$loading.finish()加载条结束
   */
  loading: {
    color: '#1890ff'
  },

  // 配置全局的 CSS 文件、模块、库。 (每个页面都会被引入)
  css: [
    {
      src: '~assets/global.styl',
      lang: 'stylus'
    }
  ],
  // 设置 Nuxt.js 应用的源码目录 ~||@
  srcDir: 'src/',

  // 为 Nuxt.js 配置使用 Vue.js 插件
  plugins: [
    {
      src: '~/plugins/axios'
    },
    {
      src: '~/plugins/element'
    }
  ],

 // modules是Nuxt.js扩展，可以扩展它的核心功能并添加无限的集成 // 
  modules: ['@nuxtjs/axios'],
  axios
}
