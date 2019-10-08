const express = require('express')
const app = express()
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

io.on('connection', function(socket){
    console.log('a user connected');
})

http.listen(3001, function () {
  console.log('Socket listening on port 3001!')
})
