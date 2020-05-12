const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const outputDirectory = 'dist';

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, outputDirectory),
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      include: [
          path.resolve(__dirname, "client")
      ],
      exclude: [
          path.resolve(__dirname, "server")
      ]
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      loader: 'url-loader?limit=100000'
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    writeToDisk: true,
    port: 3000,
    open: true
  },
  node: {
    fs: 'empty'
  },
  optimization: {
    minimize: false
  },
  plugins: [
    new CleanWebpackPlugin([outputDirectory]),
  ]
};
