const path = require('path');
const jsonwebtoken = require('jsonwebtoken');
const db = require('../models');
const bcrypt = require('bcrypt');

const login = function (req, res, next) {
    if (req.body.password && (req.body.username || req.body.email)) {
        var incorrect = { error: 'Incorrect username/password combination' };
        db.user.findOne({
            where: {
                [req.body.username ? 'username' : 'email']: req.body.username || req.body.email
            }
        }).then(user => {
            console.log(user.password);
            bcrypt.compare(user.username + req.body.password, user.password).then(same => {
                if (same) {
                    console.log('Success!');
                    next();
                } else {
                    res.json(incorrect);
                }
            }).catch(err => {
                console.log(err);
                res.json(incorrect);
            })
        }).catch(err => {
            console.log(err);
            res.json(incorrect);
        });
    } else {
        res.json({ error: 'Please provide a username and password' })
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
            exp: Date.now() + 60000
        };
        const signature = jsonwebtoken.sign(payload, process.env.JWT_SECRET || 'asdf');
        res.json({ signature: signature });
    });
}