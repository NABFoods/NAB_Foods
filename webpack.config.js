const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: path.resolve(__dirname, 'src/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true,
    assetModuleFilename: '[name][ext]',
  },
  devtool: 'source-map',
  devServer: {
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
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
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
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
  ],
};

// const webpack = require('webpack');
// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// // const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// module.exports = {
//   mode: 'development',
//   entry: {
//     bundle: path.resolve(__dirname, './src/client/index.tsx'),
//   },

//   output: {
//     path: path.resolve(__dirname, 'dist'),
//     publicPath: '/',
//     filename: '[name][contenthash].js',
//     clean: true,
//   },

//   devtool: 'eval-source-map',
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               '@babel/preset-env', // Transpile modern JavaScript
//               ['@babel/preset-react', { runtime: 'automatic' }], // Transpile React JSX
//               '@babel/preset-typescript',
//             ],
//           },
//         },
//       },
//       {
//         test: /.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: ['@babel/preset-env', '@babel/preset-react'],
//           },
//         },
//       },
//     ],
//   },

//   resolve: {
//     extensions: ['.js', '.jsx', '.ts', '.tsx'], // Added this to ensure proper resolution of file types
//   },

//   devServer: {
//     host: 'localhost',
//     open: true,
//     compress: true,
//     // enable HMR on the devServer
//     hot: true,
//     // fallback to root for other urls
//     historyApiFallback: true,

//     static: {
//       // match the output path
//       directory: path.resolve(__dirname, 'dist'),
//       // match the output 'publicPath'
//       publicPath: '/',
//     },

//     headers: { 'Access-Control-Allow-Origin': '*' },
//     /**
//      * proxy is required in order to make api calls to
//      * express server while using hot-reload webpack server
//      * routes api fetch requests from localhost:8080/api/* (webpack dev server)
//      * to localhost:3000/api/* (where our Express server is running)
//      */
//     proxy: [
//       {
//         context: ['/api'],
//         target: 'http://localhost:3000/',
//         changeOrigin: true,
//         secure: false,
//       },
//     ],
//   },
//   plugins: [
//     new HtmlWebpackPlugin({
//       title: 'Development',
//       template: './index.html',
//     }),
//     // new CopyWebpackPlugin({
//     //   patterns: [
//     //     { from: './src/client/style.css', to: 'style.css' }, // This copies your CSS file to 'dist'
//     //   ],
//     // }),
//     // new BundleAnalyzerPlugin(),
//     new webpack.EnvironmentPlugin({ ...process.env }),
//     // new webpack.EnvironmentPlugin( ['API_HOST', 'DB_URL', 'WEB_HOST', 'PORT'] )
//   ],
// };
