var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var ManifestPlugin = require('webpack-manifest-plugin');
var CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

var config = {
  devtool: 'source-map',
  mode: 'development',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'src'],
  },

  entry: {
    app: ['./src/client.tsx']
  },

  output: {
    path: path.resolve('./build/public'),
    publicPath: '/public/',
    filename: 'js/[name].js',
    pathinfo: true
  },

  module: {
    rules: [
      { test: /\.(ts|tsx)?$/, use: 'awesome-typescript-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        include: path.resolve('./src'),
        use: [
          'style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 2, localIdentName: '[local]___[hash:base64:5]'} },
        ]
      },  
      { test: /\.(woff|woff2|eot)(\?.*)?$/, use: 'file-loader?name=fonts/[hash].[ext]' },
      { test: /\.ttf(\?.*)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]' },
      { test: /\.svg(\?.*)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]' },
      { test: /\.(jpe?g|png|gif)$/i, use: 'url-loader?limit=1000&name=images/[hash].[ext]' }
    ]
  },

  plugins: [
    new CheckerPlugin(),
    new ManifestPlugin({ fileName: '../manifest.json' }),
    new webpack.HotModuleReplacementPlugin()
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
