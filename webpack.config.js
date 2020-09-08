const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry:{
    app: "./src/index.js",
  }, 
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/react"],
            plugins: ["transform-class-properties"]
          }
        },
        
      },
      {
        test: /\.scss$/,
        use:[
          'style-loader',
           MiniCssExtractPlugin.loader,
          
             'css-loader',
            
            'postcss-loader',
            'sass-loader',
            
        ]
      },
      {
        test: /\.css$/,
        use:[
          'style-loader',
          MiniCssExtractPlugin.loader,
           'css-loader',
             'postcss-loader',
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|pdf)/,
        exclude: /(node_modules|bower_components)/,
        loader: "file-loader",
        options: {
          name: "/images/[name].[ext]"
        }
      }
    ]
  },
  resolve: { 
    modules: ['node_modules'],
    extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist",
    filename: "[name].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    port: 3000,
    publicPath: "http://localhost:3000/dist/",
    hotOnly: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ]
};