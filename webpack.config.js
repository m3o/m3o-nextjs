const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    'm3o-next': './src/styles/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].css' }),
    new CssMinimizerPlugin()
  ],
  optimization: {
    minimize: true
  }
}
