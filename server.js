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
const http = require('http').Server(app);
const io = require('socket.io')(http);

io.on('connection', function (socket) {
    socket.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, './app/public')));

require(path.join(__dirname, 'app/routes/html-routes.js'))(app);
require(path.join(__dirname, 'app/routes/api-routes.js'))(app);

db.sequelize.sync({ force: env === 'development' }).then(function () {
    http.listen(PORT, function () {
        if (env === 'development') {
            console.log(`App listening on http://localhost:${PORT}`);
        } else {
            console.log(`App listening on port ${PORT}`);
        }
    });
});
