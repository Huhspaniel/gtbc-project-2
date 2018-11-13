const db = require('../models');
const bcrypt = require('bcrypt');
const RestfulAPI = require('./RestfulAPI');

const authenticate = function (req, res, next) {
    if (req.header('AdminKey') === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send('401 Unauthorized');
    }
}
const validateUser = function (req, res, next) {
    console.log('User validated!')
    next();
}
const encryptPassword = function (req, res, next) {
    if (req.body.password) {
        bcrypt.hash(req.body.username + req.body.password, 10, (err, hash) => {
            req.body.password = hash;
            next();
        });
    }
}

module.exports = function (app) {
    const user = new RestfulAPI('users', db.user, app);
    user.findAll(null, null, authenticate);
    user.findOne('username', null);
    user.create(encryptPassword);
    user.update('username', validateUser, encryptPassword);
    user.delete('username', validateUser);
}