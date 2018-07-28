const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const PORT = process.env.PORT || 3000 ;
var users =[];
var connections= [];

server.listen(PORT);
console.log('Server running on port' + PORT);

app.get('/', function(req,res){
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection',function(socket){
    connections.push(socket);
    console.log('Connected: %s sockets connected currently',connections.length);


    socket.on('disconnect',function(data){
        connections.splice(connections.indexOf(socket),1)
        console.log('Disconnected: %s sockets connected currently',connections.length);
    });
    socket.on('send message', function(data){
        io.sockets.emit('new message',{msg:data});
    });

});