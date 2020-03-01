const miniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: ['@babel/polyfill', "./src/index.js"],
    cart: ['@babel/polyfill', "./src/cart.js"]
  },
  output: {
    path: __dirname + "/web/webassets/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.scss$/,
        exclude: /mode_modules/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: './web/css/',
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  },
	plugins: [
    new miniCssExtractPlugin("[name].css")
  ]
}