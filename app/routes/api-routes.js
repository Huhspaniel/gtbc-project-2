const db = require('../models');

module.exports = function(app) {
    app.get('/api/users', (req, res) => {
        db.User.findAll()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    });
    app.post('/api/users', (req, res) => {
        db.User.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json({ error: err }))
    })
}