// Production config file for webpack
// Overwrites the development parts of the development config file

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var webpackConfig = require('./webpack.config');
var autoprefixer = require('autoprefixer');
var postcssCachify = require('postcss-cachify');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var CopyWebpackPlugin = require('copy-webpack-plugin');


var cssLoaders = [
  'css-loader',
  'postcss-loader'
];

function isExternal(module) {
  var userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return userRequest.indexOf('/node_modules/') >= 0
}

Object.assign(webpackConfig, {
  cacheDirectory: false,
  devtool: undefined,
  output: {
    path: '../build',
    filename: '[name].[chunkhash].min.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        query: {
          cacheDirectory: false,
          compact: false
        },
        exclude: [/node_modules/]
      },
      { 
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", cssLoaders.join('!'))
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
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      __DEV__: !!JSON.parse(process.env.BUILD_DEV || '0'),
      __PRODUCTION__: !!JSON.parse(process.env.BUILD_PRODUCTION || '0')
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['manifest']
    }),
    new ExtractTextPlugin('./[name].[chunkhash].min.css'),
    new WebpackMd5Hash(),
     new HtmlWebpackPlugin({
            template: './client/index/index.ejs'
        }),
      new InlineManifestWebpackPlugin({
         name: 'webpackManifest'
     }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: true
      },
      mangle: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new CompressionPlugin({
      // asset: "[name].gz",
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.map$/,
      minRatio: 1.5
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
  ]
});

module.exports = webpackConfig;
