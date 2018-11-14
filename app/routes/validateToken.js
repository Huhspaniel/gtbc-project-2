const jsonwebtoken = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const auth = req.header('Authorization');
    if (!auth) return res.json({ error: 'No token provided' });
    var token = auth.split(' ')[1];
    try {
        var decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET || 'asdf');
        if (decoded.username === req.username && Date.now() < decoded.exp) {
            return next();
        }
    } catch (err) {
        console.log(err);
    }
    res.json({ error: 'Invalid token' });
}