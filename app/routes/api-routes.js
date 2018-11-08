const db = require('../models');
const bcrypt = require('bcrypt');

module.exports = function (app) {
    app.get('/api/users', (req, res) => {
        db.User.findAll()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    });
    app.post('/api/users', (req, res) => {
        bcrypt.hash(req.body.username + req.body.password, 10, (err, hash) => {
            console.log(hash);
            req.body.password = hash;
            db.User.create(req.body)
                .then(data => res.json(data))
                .catch(err => res.json({ error: err }));
        })
    })
}