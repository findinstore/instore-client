// Development config file for webpack

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const precss = require('precss');
const postcssImport = require('postcss-import');
const HappyPack = require('happypack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const path = require('path');

const cssLoaders = [
  'css-loader',
  'postcss-loader',
];

const vendorModules = [
  'react',
  'react-dom',
  'react-addons-css-transition-group',
  'redux',
  'react-router',
  'react-router-redux',
  'redux-logger',
  'redux-thunk',
  'reselect',
  'classlist-polyfill',
  'classnames',
  'babel-polyfill',
  'moment',
];

const webpackConfig = {
  devtool: 'eval',
  entry: {
    app: './client/js/app/root.js',
    vendor: vendorModules,
  },
  resolve: {
    root: ['./node_modules'],
    alias: {
      js: path.resolve(__dirname, '../client/js'),
    },
    extensions: ['', '.js', '.css'],
  },
  output: {
    path: '../build',
    filename: '[name].min.js',
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loaders: ['happypack/loader?id=js'],
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', cssLoaders.join('!')),
        include: [path.resolve(__dirname, '../client/css')],
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
      __DEV__: !!JSON.parse(process.env.BUILD_DEV || '0'),
      __PRODUCTION__: !!JSON.parse(process.env.BUILD_PRODUCTION || '0'),
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
      minChunks: Infinity,
    }),
    new ExtractTextPlugin('./[name].min.css'),
    new HappyPack({
      id: 'js',
      loaders: ['babel?cacheDirectory=true&compact=false'],
    }),
    new WebpackMd5Hash(),
    new HtmlWebpackPlugin({
      template: './client/index/index.ejs',
    }),
    new InlineManifestWebpackPlugin({
      name: 'webpackManifest',
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
  postcss: (webpack) => {
    return [
      postcssImport({
        addDependencyTo: webpack,
      }),
      precss,
      autoprefixer({
        browsers: ['> 1%', 'ie 10'],
      }),
    ];
  },
};

module.exports = webpackConfig;

