const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.config.common.js')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const useMsw = process.env['USE_MSW'] === 'true' ? true : false

module.exports = merge(common, {
  mode: 'development',

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
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
          'style-loader',
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

  devServer: {
    historyApiFallback: true,
    port: 30009,
    hot: true,
    // noInfo: true,
  },

  plugins: [
    new Dotenv({
      path: path.resolve(__dirname, useMsw ? '../env/.dev.msw.env' : '../env/.dev.env'),
    }),
    new ReactRefreshWebpackPlugin(),
  ],
})
