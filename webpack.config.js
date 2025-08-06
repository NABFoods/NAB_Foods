const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/client/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    assetModuleFilename: '[name][ext]',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups', // ✅ allow popup closing
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
    },
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    liveReload: true,
    //watchContentBase: true,
    port: 8081,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|jsx|js)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: [, 'style-loader', 'css-loader', 'sass-loader'],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif|webp|avif)$/i,
        type: 'asset/resource',
      },
      // {
      //   test: /\.(js|jsx|ts|tsx)$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: ['@babel/preset-env'],
      //     },
      //   },
      // },
      ,
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false,
      allowEmptyValues: true,
      systemvars: false,
      silent: false,
      defaults: false,
    }),
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
  ],
};
