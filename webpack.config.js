const easywebpack = require('easywebpack-react');
const config = {
  entry: {
    include: [/app\/web\/page\/[^\/]+\/[a-zA-Z\-]+\.jsx/],
    exclude: ['app/web/page/[^\/]+/(component|components|store|models|common|page|pagelet|image|img|style|styles|css)'],
    loader: {
      client: 'app/web/framework/entry/clientLoader.js',
      server: 'app/web/framework/entry/serverLoader.js'
    }
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
    serviceworker: false,
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
    splitChunks: {
      chunks: 'all',
      minChunks: 2,
      cacheGroups: {}
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

