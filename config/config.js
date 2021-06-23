// https://umijs.org/config/
import path from 'path'
import slash from 'slash2'
import { defineConfig } from 'umi'
import theme from '../src/theme'
import webpackPlugin from './plugin.config'
import pageRoutes from './router.config'

const extraBabelPlugins = [
  [
    'import',
    {
      libraryName: 'react-use',
      libraryDirectory: 'lib',
      camel2DashComponentName: false
    }
  ]
]

export default defineConfig({
  extraBabelPlugins,
  hash: true,
  history: {
    type: 'hash'
  },
  targets: {
    chrome: 79,
    firefox: false,
    safari: false,
    edge: false,
    ios: false
  },
  antd: {
    dark: false // 开启暗色主题
    // compact: true // 开启紧凑主题（有bug）
  },
  dva: {
    skipModelValidate: true,
    immer: true,
    hmr: true
    // 在这里 dynamicImport 必须设置为undefined否则在ie下会报错
    // https://github.com/umijs/umi/issues/2391
    // dynamicImport: undefined
  },
  title: 'superAdmin',
  locale: {
    default: 'zh-CN'
    // baseNavigator: true
  },
  // 路由配置
  routes: pageRoutes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme,
  ignoreMomentLocale: true,
  nodeModulesTransform: { type: 'none', exclude: [] },
  mfsu: {},
  webpack5: {},
  esbuild: {},
  dynamicImport: {
    loading: '@/components/PageLoading/index'
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    moment: 'moment',
    lodash: '_',
    antd: 'antd'
  },
  scripts:
    process.env.NODE_ENV === 'development'
      ? [
        'https://cdn.jsdelivr.net/npm/react@16.8.6/umd/react.development.js',
        'https://cdn.jsdelivr.net/npm/react-dom@16.8.6/umd/react-dom.development.js',
        'https://cdn.jsdelivr.net/npm/moment@2.25.3/moment.js',
        'https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.js',
        'https://cdn.jsdelivr.net/npm/antd@4.6.3/dist/antd.js'
      ]
      : [
        'https://cdn.jsdelivr.net/npm/react@16.8.6/umd/react.production.min.js',
        'https://cdn.jsdelivr.net/npm/react-dom@16.8.6/umd/react-dom.production.min.js',
        'https://cdn.jsdelivr.net/npm/moment@2.25.3/moment.min.js',
        'https://cdn.jsdelivr.net/npm/lodash@4.17.11/lodash.min.js',
        'https://cdn.jsdelivr.net/npm/antd@4.6.3/dist/antd.min.js'
      ],
  lessLoader: {
    javascriptEnabled: true
  },
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
    services: path.resolve(__dirname, '..', 'src/services'),
    models: path.resolve(__dirname, '..', 'src/models'),
    utils: path.resolve(__dirname, '..', 'src/utils'),
    config: path.resolve(__dirname, '..', 'src/config'),
    pages: path.resolve(__dirname, '..', 'src/pages'),
    components: path.resolve(__dirname, '..', 'src/components'),
    assets: path.resolve(__dirname, '..', 'src/assets'),
    APP_ROOT: path.resolve(__dirname, '..')
  },
  cssLoader: {
    // modules: true,
    modules: {
      getLocalIdent: (context, localIdentName, localName) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName
        }
        const match = context.resourcePath.match(/src(.*)/)
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '')
          const arr = slash(antdProPath)
            .split('/')
            .map(a => a.replace(/([A-Z])/g, '-$1'))
            .map(a => a.toLowerCase())
          return `admin-demo${arr.join('-')}-${localName}`.replace(/--/g, '-')
        }
        return localName
      }
    }
  },
  manifest: {
    basePath: '/'
  },
  chainWebpack: webpackPlugin
})
