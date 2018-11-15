const jsonwebtoken = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const auth = req.header('Authorization');
    if (!auth) return res.json({ error: 'No token provided' });
    auth = auth.split(' ');
    try {
        var decoded = jsonwebtoken.verify(auth[1], process.env.JWT_SECRET || 'asdf');
        if (auth[0] === 'Bearer' && decoded.username === req.username && Date.now() < decoded.exp) {
            return next();
        }
    } catch (err) {
        console.log(err);
    }
    res.json({ error: 'Invalid token' });
}