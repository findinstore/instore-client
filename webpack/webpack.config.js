// Development config file for webpack

var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
/* var postcssCachify = require('postcss-cachify');*/
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var precss = require('precss');
var postcssImport = require('postcss-import');
/* var stylelint = require('stylelint');*/
/* var postcssReporter = require('postcss-reporter');*/
var happyPack = require('happypack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');

var path = require('path');

var cssLoaders = [
  'css-loader',
  'postcss-loader'
];

function isExternal(module) {
  var userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  console.log('what is userRequest', userRequest);

  return false

  // return userRequest.indexOf('/node_modules/') >= 0 ||
  //        userRequest.indexOf('/src/js/lib/') >= 0;
}

// TODO: make linting faster
var stylelintConfig = {
  rules: {
    // 'block-opening-brace-space-before': 'always',
    // Temporarily removing from developing
    // 'comment-empty-line-before': ['always', {
    //   ignore: ['stylelint-commands']
    // }],
    // 'declaration-colon-space-after': 'always',
    // 'declaration-colon-space-before': 'never',
    // 'max-nesting-depth': 3,
    // 'no-invalid-double-slash-comments': true,
    // 'rule-non-nested-empty-line-before': ['always', {
    //   ignore: ['after-comment']
    // }],
    // 'selector-no-id': true
  },
  ignoreFiles: './src/css/lib/*.css'
};

var vendorModules = [
  'react',
  'react-dom',
  'react-addons-css-transition-group',
  'react-truncate',
  'redux',
  'react-router',
  'react-router-redux',
  'redux-logger',
  'redux-thunk',
  'reselect',
  'classlist-polyfill',
  'classnames',
  'babel-polyfill',
  'react-document-title',
  'whatwg-fetch',
  'webworkify-webpack',
  'moment'
];

var webpackConfig = {
  devtool: 'eval',
  entry: {
    app: './client/js/app/root.js',
    vendor: vendorModules
  },
  resolve: {
    root: ['./node_modules'],
    alias:{
      js: path.resolve( __dirname,'../client/js' )
    },
    extensions: ['', '.js', '.css']
  },
  output: {
     path: '../build',
    filename: '[name].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['happypack/loader?id=js'],
        exclude: [/node_modules/]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", cssLoaders.join('!')),
        include: [path.resolve(__dirname, '../client/css')]
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: !!JSON.parse(process.env.BUILD_DEV || '0'),
      __PRODUCTION__: !!JSON.parse(process.env.BUILD_PRODUCTION || '0')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity
    }),
    new ExtractTextPlugin('./[name].min.css'),
    new happyPack({
      id: 'js',
      loaders: ['babel?cacheDirectory=true&compact=false']
    }),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      template: './client/index/index.ejs'
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest'
    }),
    new CopyWebpackPlugin([
      {
        from: './client/fonts',
        to: './fonts',
      },
      {
        from: './client/images',
        to: './images',
      },
    ]),
  ],
  postcss: function(webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack,
        /* plugins: [stylelint(stylelintConfig)]*/
      }),
      precss,
      autoprefixer({
        browsers: ['> 1%', 'ie 10']
      }),
      //postcssCachify({
      //  baseUrl: "/res"
      //}),
      //postcssReporter({
      //  clearMessages: true,
      //  throwErrors: true
      //})
    ];
  }
};

module.exports = webpackConfig;

