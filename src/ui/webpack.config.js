var path = require('path');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: ['./index.js', './styles/index.scss'],
  output: { path: __dirname, filename: 'bundle.js' },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(otf|eot|ttf|woff|woff2|png|jpe?g|tiff|gif)$/,
        loader: 'url-loader?limit=100000',
      },
    ]
  },
};
