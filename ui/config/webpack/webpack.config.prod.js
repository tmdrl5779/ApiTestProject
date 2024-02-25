const path = require('path')
const os = require('os')
const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')

const Dotenv = require('dotenv-webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },

  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    path: path.resolve(__dirname, '../../dist'),
    publicPath: './',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, '../env/.prod.env'),
    }),
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      reportFilename: 'bundle-report.html',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: 'bundle-stats.json',
    }),
    new CleanWebpackPlugin(),
    new CompressionPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],

  optimization: {
    minimize: true,
    minimizer: [
      // 일단 CRA의 설정을 그대로 가져왔다.
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
    axios: 'axios',
  },
})
