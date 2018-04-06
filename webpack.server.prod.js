var path = require('path');
var fs = require('fs');
var webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

var config = {
  externals: nodeModules,
  target: 'node',
  mode: 'production',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    modules: [path.resolve(__dirname), 'node_modules', 'src'],
  },

  entry: {
    server: './src/server.tsx'
  },

  output: {
    path: path.resolve('./build'),
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2'
  },

  module: {
    rules: [
      { test: /\.(ts|tsx)?$/, use: 'awesome-typescript-loader', exclude: /node_modules/ },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 2, localIdentName: '[local]___[hash:base64:5]'} },
        ]
      },
      { test: /\.(woff|woff2|eot)(\?.*)?$/, use: 'file-loader?name=fonts/[hash].[ext]' },
      { test: /\.ttf(\?.*)?$/, use: 'url-loader?limit=10000&mimetype=application/octet-stream&name=fonts/[hash].[ext]' },
      { test: /\.svg(\?.*)?$/, use: 'url-loader?limit=10000&mimetype=image/svg+xml&name=fonts/[hash].[ext]' },
      { test: /\.(jpe?g|png|gif)$/i, use: 'url-loader?limit=1000&name=images/[hash].[ext]' }
    ]
  },

  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false
  }
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
