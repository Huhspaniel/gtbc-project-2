const db = require('../models');
const bcrypt = require('bcrypt');

module.exports = function (app) {
    app.get('/api/users', (req, res) => {
        if (req.header('AdminKey') === process.env.API_KEY) {
            console.log('hello');
            db.User.findAll()
                .then(data => res.json(data))
                .catch(err => res.json(err));
        } else {
            res.status(401).send('401 Unauthorized');
        }
    });
    app.get('/api/users/:username', (req, res) => {
        db.User.findOne({ where: { username: req.params.username } })
            .then(data => res.json(data))
            .catch(err => res.json({ error: err }));
    })
    app.post('/api/users', (req, res) => {
        bcrypt.hash(req.body.username + req.body.password, 10, (err, hash) => {
            console.log(hash);
            req.body.password = hash;
            db.User.create(req.body)
                .then(data => res.json(data))
                .catch(err => res.json({ error: err }));
        })
    });
}