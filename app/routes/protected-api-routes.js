const db = require('../models');
const bcrypt = require('bcrypt');

const authenticate = function (req, res, next) {
    if (req.header('AdminKey') === process.env.API_KEY) {
        next();
    } else {
        res.status(401).send('401 Unauthorized');
    }
}

module.exports = function (app) {
    app.get('/api/users', authenticate, (req, res) => {
        db.User.findAll()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    });
}