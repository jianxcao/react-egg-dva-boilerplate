const easywebpack = require('easywebpack-react');
const path = require('path');
const resolve = (filepath) => path.resolve(__dirname, filepath);
const IS_PRO = process.env.NODE_ENV === 'production';
const developmentFilename = '[name].js';
const productionFilename = '[name].[chunkhash].js';
const defaultFilename = IS_PRO ? productionFilename : developmentFilename;
const developmentChunkFilename = '[name].js';
const productionChunkFilename = '[name].[chunkhash].js';
const chunkFilename = IS_PRO ? productionChunkFilename : developmentChunkFilename;

const config = {
  entry: {
    include: [/app\/web\/page\/[^\/]+\/[a-zA-Z\-]+\.jsx/],
    exclude: ['app/web/page/[^\/]+/(component|components|store|models|common|page|pagelet|image|img|style|styles|css)'],
    loader: {
      client: 'app/web/framework/entry/clientLoader.js?globalModels=app/web/models&basePageModelPath=app/web/page&polyfill=true',
      server: 'app/web/framework/entry/serverLoader.js?globalModels=app/web/models&basePageModelPath=app/web/page&polyfill=true'
    }
  },
  output: {
    filename: defaultFilename,
    chunkFilename: chunkFilename
  },
  alias: {
    common: 'app/web/common',
    framework: 'app/web/framework',
    globalModels: 'app/web/models'
  },
  loaders: {
    less: true // 开启less， 默认禁用
  },
  plugins: {
    serviceworker: false
    // 动态加载服务所需，赞不使用
    // loadablePlugin: {
    //   name: '@loadable/webpack-plugin',
    //   args: {}
    // }
  },
  node: {
    console: true
  },
  optimization: {
    runtimeChunk: { name: 'common/runtime'},
    splitChunks: {
      filename: `common/${chunkFilename}`,
      cacheGroups: {
        default: false,
        polyfill: {
          name: 'polyfill',
          minChunks: 1,
          test(module) {
            return module.resource && (module.resource.indexOf('node_modules/core-js') > -1 || module.resource.indexOf('node_modules/babel-runtime') > -1);
          },
          priority: 1
        },
        styles: {
          chunks: 'initial'
        },
        vendors: {
          chunks: 'initial'
        }
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: 'cheap-module-source-map'
};

module.exports = config;

// const res = easywebpack.getWebWebpackConfig(config);
// console.log(res);

