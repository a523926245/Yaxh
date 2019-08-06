const app = require("../app");
const http = require("http");
// var debug = require('debug')('nodeapp:server');

// 从环境中获取端口并在Express中存储。
const port  = process.env.PORT || 8089;
app.set('port', port);

// 创建Node服务
const server = http.createServer(app);

// 监听所提供的端口和所有网络接口。
server.listen(port);
server.on("error",onError);
server.on("listening",onListening)

// 错误事件处理
function onError(error){
    console.log(error)
    if (error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ? 'Pipe' + port : "Port" + port;

    // 处理特定的错误
    switch(error.code){
        case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
        default:
        throw error;
    }
}

// 事件监听器，用于HTTP服务器“监听”事件
function onListening(){
  var addr = server.address().address;
  var bind = addr.port;
  console.log('Listening on ' + addr + bind);
}