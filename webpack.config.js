module.exports = {
    entry: './src/app.js',
    output: {
      path: __dirname,
      filename: 'bundle.js',
      publicPath:'/'
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader', 
          query: { presets: [ 'es2015', 'react' ] }
        }
       ]
      },
      devServer: {
        historyApiFallback: true,
    },
  };
