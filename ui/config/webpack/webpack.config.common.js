const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const childProcess = require('child_process')

module.exports = {
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(js|mjs|jsx|ts|tsx)$/,
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, '../babel/babel.config.js'),
        },
      },
      {
        test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          publicPath: './dist/',
          name: '[name].[ext]?[hash]',
          limit: 5000,
        },
      },
    ],
  },

  infrastructureLogging: { level: 'error' },

  stats: 'minimal',

  cache: {
    type: 'filesystem',

    buildDependencies: {
      config: [__filename],
    },
  },

  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, '../../src'),
    },
  },

  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin(),
    // new webpack.BannerPlugin({
    //   banner: `
    //     Build Date :: ${new Date().toLocaleString()}
    //     Commit Version :: ${childProcess.execSync("git rev-parse --short HEAD")}
    //     Auth.name :: ${childProcess.execSync("git config user.name")}
    //     Auth.email :: ${childProcess.execSync("git config user.email")}
    //   `,
    // }),
  ],

  devtool: 'inline-source-map',
}
