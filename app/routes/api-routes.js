const db = require('../models');

module.exports = function(app) {
    app.get('/api/tests', (req, res) => {
        db.Test.findAll()
            .then(data => res.json(data))
            .catch(err => res.json(err));
    });
    app.post('/api/tests', (req, res) => {
        db.Test.create(req.body)
            .then(data => res.json(data))
            .catch(err => res.json({ error: err }))
    })
}