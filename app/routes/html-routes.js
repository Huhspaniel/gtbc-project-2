const path = require('path');
const jsonwebtoken = require('jsonwebtoken');
const db = require('../models');
const bcrypt = require('bcrypt');

const login = function (req, res, next) {
    if (req.body.password && (req.body.username || req.body.email)) {
        db.user.findOne({
            where: {
                [req.body.username ? 'username' : 'email']: req.body.username || req.body.email
            }
        }).then(user => {
            const valid = bcrypt.compareSync(user.username + req.body.password, user.password)
            if (valid) {
                next();
            } else {
                throw new Error('Incorrect password');
            }
        }).catch(err => {
            console.log(err);
            res.json({ auth: false, token: null, error: 'Incorrect username/password combination' });
        });
    } else {
        res.json({ auth: false, token: null, error: 'Please provide a username and password' })
    }
}

module.exports = function (app) {
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    app.post('/login', login, (req, res) => {
        const payload = {
            user: req.body.username,
            iat: Date.now(),
            exp: Date.now() + (60000 * 30)
        };
        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET || 'asdf');
        res.json({ auth: true, token: token });
    });
}