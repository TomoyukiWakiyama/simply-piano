// nodeのpathを使用する
const path = require("path");
/**
 * plugins
 */
// mini-css-extract-pluginを読み込む
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// html-webpack-pluginを読み込む
const HtmlWebpackPlugin = require("html-webpack-plugin");
// clean-webpack-pluginを読み込む
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  // エントリー：大本になるJSファイルを指定
  entry: "./src/javascripts/main.ts",

  // アウトプット：コンパイルしたファイルの指定
  // 絶対パスで指定する
  output: {
    filename: "javascripts/main.js",
    path: path.resolve(__dirname, "dist"),
  },

  devServer: {
    static: [
      {
        directory: path.resolve(__dirname, "dist"),
        publicPath: "/dist",
      },
      {
        directory: __dirname,
        publicPath: "/",
      },
    ],
  },

  devtool: "eval",

  // moduleオプションを追加
  module: {
    // 各loaderのオプションをrules配列に格納する
    rules: [
      {
        test: /\.(ts|tsx)/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
          },
        ],
      },
      // cssloaderの設定をオブジェクトを記載する
      {
        // test：ファイル名を検知する。正規表現で記載する
        // .cssというファイルを検知したらuseを実行する
        test: /\.(css|sass|scss)/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
          },
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /\.pug/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: {
              // コンパイルしたhtmlを読みやすくする
              pretty: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./stylesheets/main.css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/templates/index.pug",
      filename: "index.html",
    }),
    // new HtmlWebpackPlugin({
    // template: "./src/templates/access.pug",
    // filename: "access.html",
    // }),
    new CleanWebpackPlugin(),
  ],
  stats: {
    children: true,
  },
};
