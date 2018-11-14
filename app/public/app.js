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
const xhr = new XMLHttpRequest();

const usernameLogin = document.querySelector('.login-box .username');
const passwordLogin = document.querySelector('.login-box .password');
const emailCreate = document.querySelector('.create-box .email');
const usernameCreate = document.querySelector('.create-box .username');
const passwordCreate = document.querySelector('.create-box .password');
let token;

const clearInputs = (e) => {
    e.preventDefault();
    Array.from(document.querySelectorAll('.login-box input, .create-box input')).forEach(el => {
        el.value = '';
    });
}

const loadPage = e => {
    if (e.target.tagName === 'BUTTON') {
        document.querySelector('main:not(.hidden)').classList.add('hidden');
        document.querySelector(`main.${e.target.classList[1]}`).classList.remove('hidden');
    }
}
Array.from(document.getElementsByClassName('nav')).forEach(el => {
    el.addEventListener('click', loadPage);
})

document.querySelector('.submit-login').addEventListener('click', e => {
    e.preventDefault();
    xhr.open('POST', '/login');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        const res = JSON.parse(xhr.response);
        if (res.auth) {
            token = res.token;
            clearInputs(e);
        }
        console.log(res);
    }
    xhr.send(JSON.stringify({
        username: usernameLogin.value,
        password: passwordLogin.value
    }));
})

document.querySelector('.submit-create').addEventListener('click', e => {
    e.preventDefault();
    xhr.open('POST', '/api/users');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = () => {
        const user = JSON.parse(xhr.response);
        if (!user.error) clearInputs(e);
        console.log(user);
    }
    xhr.send(JSON.stringify({
        username: usernameCreate.value,
        password: passwordCreate.value,
        email: emailCreate.value
    }))
});