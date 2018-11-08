const db = require('../models');
const bcrypt = require('bcrypt');

const validateUser = function(req, res, next) {
    console.log('User validated!')
    next();
}

module.exports = function (app) {
    app.put('/api/users/:id', validateUser, (req, res) => {
        db.User.update(req.body, { where: { id: req.params.id } })
            .then(data => res.json(data))
            .catch(err => res.json({ error: err }));

    });
}