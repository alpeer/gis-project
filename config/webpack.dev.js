const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");

const resolve = (...args) => path.resolve(__dirname, ...args);

const mapStyle = process.env.MAP_STYLE === "true";

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",

  devServer: {
    host: "localhost",
    port: 3001,
    historyApiFallback: true,
    open: true,
    hot: true,
  },
  watchOptions: {
    aggregateTimeout: 200,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: mapStyle ? "css-loader?sourceMap" : "css-loader" },
        ],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
  plugins: [],
});
