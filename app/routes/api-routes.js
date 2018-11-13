const db = require('../models');
const bcrypt = require('bcrypt');

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
    bcrypt.hash(req.body.username + req.body.password, 10, (err, hash) => {
        req.body.password = hash;
        next();
    })
}

module.exports = function (app) {
    app.get('/api/users', authenticate, (req, res) => {
        db.user.findAll()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    });
    app.get('/api/users/:username', (req, res) => {
        db.user.findOne({ where: { username: req.params.username } })
            .then(data => res.json(data))
            .catch(err => res.json({ error: err }));
    })
    app.post('/api/users', encryptPassword, (req, res) => {
        db.user.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json({ error: err }));
    });
    app.put('/api/users/:id', validateUser, (req, res) => {
        db.user.update(req.body, { where: { id: req.params.id } })
            .then(data => res.json(data))
            .catch(err => res.json({ error: err }));
    });
}