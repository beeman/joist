const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({ template: './src/index.html' }),
  new CopyPlugin([
    { from: './src/manifest.json', to: './manifest.json' },
    { from: './src/assets', to: './assets' }
  ]),
  new webpack.NormalModuleReplacementPlugin(new RegExp('lit-html/lib/shady-render'), 'lit-html')
];

const performance = {};

if (process.env.NODE_ENV === 'production') {
  plugins.push(new GenerateSW());
  plugins.push(new CompressionPlugin());
  performance.hints = 'error';
  performance.maxEntrypointSize = 27000;
}

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    main: './src/main.ts'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    historyApiFallback: {
      index: 'src/index.html'
    }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: { output: { comments: false } }
      })
    ]
  },
  performance,
  plugins
};
