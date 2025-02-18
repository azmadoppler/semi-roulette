const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',  // Switch to 'production' for production builds
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',  // Optional: if you want to use newer JS features
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
