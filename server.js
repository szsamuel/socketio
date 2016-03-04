
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

   socket.on('Paciente_Guardado', function(msg){
    io.emit('se actualizo pacientes', msg);
  });

   socket.on('updateconsultas', function(msg){
   	console.log(JSON.stringify(msg)+' re emitiendo');
    socket.broadcast.emit('updatecons', msg);
  });

  io.emit('Hi','44444');
  io.emit('layout','Hola Gumaro');

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});