const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: ['babel-polyfill', "./src/index.tsx"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index_bundle.js",
    publicPath: '/'
  },
  devServer: {
    inline: false,
    port: 8080,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        // config for es6 jsx
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
        loader: 'file-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:7].[ext]'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
