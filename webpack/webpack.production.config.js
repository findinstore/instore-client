// Production config file for webpack
// Overwrites the development parts of the development config file

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackConfig = require('./webpack.config');

const cssLoaders = [
  'css-loader',
  'postcss-loader',
];

Object.assign(webpackConfig, {
  cacheDirectory: false,
  devtool: undefined,
  output: {
    path: '../build',
    filename: '[name].[chunkhash].min.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        query: {
          cacheDirectory: false,
          compact: false,
        },
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', cssLoaders.join('!')),
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
        loader: 'url-loader?limit=30000&name=[name]-[hash].[ext]',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
      __DEV__: !!JSON.parse(process.env.BUILD_DEV || '0'),
      __PRODUCTION__: !!JSON.parse(process.env.BUILD_PRODUCTION || '0'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['manifest'],
    }),
    new ExtractTextPlugin('./[name].[chunkhash].min.css'),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      template: './client/index/index.ejs',
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest',
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,
      compress: {
        warnings: true,
      },
      mangle: true,
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.map$/,
      minRatio: 1.5,
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
});

module.exports = webpackConfig;
