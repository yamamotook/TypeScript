const path = require('path');
const HtmlWebpackPlugin  =  require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry : "./src/index.ts", //入口文件
    output : {
        path : path.resolve('./dist'), //输入文件path，需要是绝对路劲
        filename : './script/bundle.js'
    },
    plugins :[
        new HtmlWebpackPlugin({
            template : "./public/index.html"
        }), 
        new CleanWebpackPlugin(),
    ],
    module :{
        rules : [
            {
                test : /.ts$/,
                loader : "ts-loader"
            }
        ]
    },
    resolve : {
        //依赖分析时分析 .ts文件和.js文件
        extensions : [".ts",".js"]
    }

}