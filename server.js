const express = require('express');
const db = require('./app/models');
const path = require('path');
const PORT = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development';
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './app/public')));

require(path.join(__dirname, 'app/routes/html-routes.js'))(app);
require(path.join(__dirname, 'app/routes/api-routes.js'))(app);

const http = require('http').Server(app);
const io = require('socket.io')(http);

io.sockets.on('connection', function (socket) {
    socket.emit('connection');
    socket.on('joinroom', function(data) {
        console.log(data.room);
        if (data.user) io.sockets.in(data.room).emit('message', `<span style="color:green">@${data.user} joined</span>`);
        socket.join(data.room, () => {
            console.log(Object.keys(socket.rooms));
        });
        socket.emit('message', `<div style="color:red; text-align:center; width:100%;">------------New Room------------</div>`);
    })
    socket.on('leaveroom', function (data) {
        socket.leave(data.room);
        if (data.user) io.sockets.in(data.room).emit('message', `<span style="color:purple">@${data.user} left</span>`);
    })
    socket.on('message', function (res) {
        res = JSON.parse(res);
        console.log(res);
        io.sockets.in(res.room).emit('message', res.msg);
    });
});

db.sequelize.sync({ force: env === 'development' }).then(function () {
    http.listen(PORT, function () {
        if (env === 'development') {
            console.log(`App listening on http://localhost:${PORT}`);
        } else {
            console.log(`App listening on port ${PORT}`);
        }
    });
});
