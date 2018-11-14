const db = require('../models');
const RestfulAPI = require('./RestfulAPI');
const validateToken = require('./validateToken');

const authenticate = function (req, res, next) {
    if (req.header('x-access') === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send('401 Unauthorized');
    }
}

module.exports = function (app) {
    const user = new RestfulAPI('users', db.user, app);
    user.findAll(null, null, authenticate);
    user.findOne('username', null);
    user.create();
    user.update('username', validateToken, (req, res, next) => {
        req.body.username = req.body.username || req.params.username;
        next();
    });
    user.delete('username', validateToken);
}