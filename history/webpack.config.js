// webpack 是node写出来的 node的写法 
let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devServer: { // 开发服务器的配置
    port: 3000,
    progress: true,
    contentBase: './build',
    compress: true
  },
  mode: 'production', // 模式 默认两种 production deveplopment
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'build'), //路径必须是一个绝对路径
  },
  plugins: [ // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
      },
      hash: true
    })
  ],
  module: { // 模块
    rules: [ // 规则 css-loader 解析 @import这种语法的
      // style-loader 他是把css 插入到head的标签中
      // loader的特点 希望单一
      // loader的用法 字符串只用一个loader
      // loader还可以写成对象方式，可以写参数
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: function insertAtTop(element){
                var parent = document.querySelector('head');
                var lastInsertedElement =
                 window._lastElementInsertedByStyleLoader;
                
                if(!lastInsertedElement){
                  parent.insertBefore(element, parent.firstChild);
                }else if(lastInsertedElement.nextSibling){
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                }else{
                  parent.appendChild(element);
                }

                window._lastElementInsertedByStyleLoader = element;
              }
            }
          },
          'css-loader'
        ]
      },
      {
        // 可以处理less文件 sass stylus node-sass sass-loader
        // stylus stylus-loader
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              insert: function insertAtTop(element){
                var parent = document.querySelector('head');
                var lastInsertedElement =
                 window._lastElementInsertedByStyleLoader;
                
                if(!lastInsertedElement){
                  parent.insertBefore(element, parent.firstChild);
                }else if(lastInsertedElement.nextSibling){
                  parent.insertBefore(element, lastInsertedElement.nextSibling);
                }else{
                  parent.appendChild(element);
                }

                window._lastElementInsertedByStyleLoader = element;
              }
            }
          },
          'css-loader', // @import 解析路径
          'less-loader' // 把less -> css 
        ]
      }
    ]
  }
}