const createError = require('http-errors');
const express = require("express");
const path = require('path');
const fs = require("fs");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const url = require("url")
const bodyParser = require('body-parser')  

// 允许跨域
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE,OPTIONS');
    next();
  });

// 插件初始化
/**
 * 日志插件
 * morgan(format, options) 返回express的中间件
 * 参数说明：
 * format：可选，morgan与定义了几种日志格式，每种格式都有对应的名称，比如combined、short等，默认是default
 * options：可选，配置项，包含stream（常用）、skip、immediate
 * stream：日志的输出流配置，默认是process.stdout
 * skip：是否跳过日志记录
 */
let accessLogStream = fs.createWriteStream(path.join(__dirname, '/log/access.log'), {flags: 'a'});
app.use(logger("combined",{
    immediate:true,
    // 跳过为options的请求
    skip:(req,res) =>{
        return req.method === "OPTIONS"
    },
}));

/**
 * bodyParser中间件,方便获取请求中的参数
 * POST:req.body
 * GET:req.query
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());

/**
 * 路由（接口地址）开始 存放在./routes目录下
 */
let routes = require("./routes/router")
let index = require('./routes/index');//home page接口
let about = require('./routes/about');//home page接口

app.use(routes);
app.use(index); //在app中注册routes该接口 
app.use(about); //在app中注册routes该接口 


// 错误处理程序
app.use((err,req,res,next) =>{
    console.log(err)
    res.locals.message = err.message;
    res.locals.error = err ? err : {};
    res.status(err.status || 500);
    res.send(err)
})

// 导出app
module.exports = app;