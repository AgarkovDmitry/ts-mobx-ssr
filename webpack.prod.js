var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
  bail: true,
  mode: 'production',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'src'],
  },

  entry: {
    app: './src/client.tsx'
  },

  output: {
    path: path.resolve('./build/public'),
    publicPath: '/public/',
    filename: 'js/[name].[chunkhash].js'
  },

  module: {
    rules: [
      { test: /\.(ts|tsx)?$/, use: 'awesome-typescript-loader' },
      {
        test: /\.css$/,
        include: path.resolve('./src'),
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 2, localIdentName: '[local]___[hash:base64:5]'} },
        ]
      },
      { test: /\.(woff|woff2|eot)(\?.*)?$/, use: 'file-loader?name=fonts/[hash].[ext]' },
      { test: /\.ttf(\?.*)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]' },
      { test: /\.svg(\?.*)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]' },
      { test: /\.(jpe?g|png|gif)$/i, use: 'url-loader?limit=1000&name=images/[hash].[ext]' }
    ]
  },

  optimization: {
    minimize: true,
    splitChunks: {
        cacheGroups: {
            default: false,
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "all"
            }
        }
    }
  },

  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[name].css"
    }),
    new ManifestPlugin({ fileName: '../manifest.json' }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('profuction')
    })
  ]
};

const copySync = (src, dest, overwrite) => {
  if (overwrite && fs.existsSync(dest)) {
    fs.unlinkSync(dest);
  }
  const data = fs.readFileSync(src);
  fs.writeFileSync(dest, data);
}

const createIfDoesntExist = dest => {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest);
  }
}

createIfDoesntExist('./build');
createIfDoesntExist('./build/public');
copySync('./src/favicon.ico', './build/public/favicon.ico', true);

module.exports = config;
