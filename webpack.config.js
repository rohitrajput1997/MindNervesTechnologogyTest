/** @format */
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const webpack = require("webpack")
const path = require("path")
const copyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin,
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
      {
        test: /.\.css$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: __dirname + "/public/index.html",
      filename: "index.html",
      inject: true,
      minify: false,
    }),
    new MiniCssExtractPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 100 }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: __dirname + "/public",
          globOptions: {
            ignore: ["**/index.html"],
          },
          to: __dirname + "/build/",
        },
      ],
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: path.join(__dirname, "public"),
    port: 1000,
    hot: true,
    compress: true,
  },
}
