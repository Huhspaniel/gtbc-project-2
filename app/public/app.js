//this function hides the welcome page and shows the search page on button click
const hideHomePage = function(){
    $('.welcome-page').addClass('hide');
    $('.band-page').removeClass('hide');
}
$('.login-button').on('click', hideHomePage);
$('.search-artists').on('click', hideHomePage);

// This is the setup for Socket.io
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 8080;

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

//this function allows the user to go back to the home page when home is clicked on navbar

const goHome = function(){
    $('.welcome-page').addClass('hide');
    $('.band-page').removeClass('hide');
}
$('.go-home').on('click', goHome);