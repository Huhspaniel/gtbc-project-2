const path = require('path');
var querystring = require('querystring');
var client_id = '7886529ac1ca47028e6bbaf1f7e3cff5'; // Your client id
var client_secret = 'df2686e6d924469cb2ce4525d25c1f79'; // Your secret
var redirect_uri = 'https://gtbc-project-2.herokuapp.com/callback'; // Your redirect uri
const jsonwebtoken = require('jsonwebtoken');
const request = require("request");
const db = require('../models');
const bcrypt = require('bcrypt');

const login = function (req, res, next) {
    console.log(req.body);
    if (req.body.password && (req.body.username || req.body.email)) {
        db.user.findOne({
            where: {
                [req.body.username ? 'username' : 'email']: req.body.username || req.body.email
            }
        }).then(user => {
            const valid = bcrypt.compareSync(user.username + req.body.password, user.password)
            if (valid) {
                req.body = user.dataValues;
                req.body.password = undefined;
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


    })

    /**
     * Generates a random string containing numbers and letters
     * @param  {number} length The length of the string
     * @return {string} The generated string
     */
    var generateRandomString = function(length) {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      return text;
    };

    var stateKey = 'spotify_auth_state';




    app.get('/SpotifyLogin', function(req, res) {

      var state = generateRandomString(16);
      res.cookie(stateKey, state);

      // your application requests authorization
      var scope = 'user-read-private user-read-email';
      res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state: state
        }));
    });

    app.get('/callback', function(req, res) {


      // your application requests refresh and access tokens
      // after checking the state parameter

      var code = req.query.code || null;
      var state = req.query.state || null;
      var storedState = req.cookies ? req.cookies[stateKey] : null;

      if (state === null || state !== storedState) {
        res.redirect('/#' +
          querystring.stringify({
            error: 'state_mismatch'
          }));
      } else {
        res.clearCookie(stateKey);
        var authOptions = {
          url: 'https://accounts.spotify.com/api/token',
          form: {
            code: code,
            redirect_uri: redirect_uri,
            grant_type: 'authorization_code'
          },
          headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
          },
          json: true
        };

        request.post(authOptions, function(error, response, body) {
          if (!error && response.statusCode === 200) {

            var access_token = body.access_token,
                refresh_token = body.refresh_token;

            var options = {
              url: 'https://api.spotify.com/v1/me',
              headers: { 'Authorization': 'Bearer ' + access_token },
              json: true
            };

            // use the access token to access the Spotify Web API
            request.get(options, function(error, response, body) {
              console.log(body);
            });

            // we can also pass the token to the browser to make requests from there
            res.redirect('/#' +
              querystring.stringify({
                access_token: access_token,
                refresh_token: refresh_token
              }));
          } else {
            res.redirect('/#' +
              querystring.stringify({
                error: 'invalid_token'
              }));
          }
        });
      }
    });

    app.get('/refresh_token', function(req, res) {

      // requesting access token from refresh token
      var refresh_token = req.query.refresh_token;
      var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
        form: {
          grant_type: 'refresh_token',
          refresh_token: refresh_token
        },
        json: true
      };

      request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          var access_token = body.access_token;
          res.send({
            'access_token': access_token
          });
        }
      });
    });
    app.post('/login', login, (req, res) => {
        const payload = {
            user: req.body.username,
            iat: Date.now(),
            exp: Date.now() + (60000 * 30)
        };
        const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET || 'asdf');
        res.json({ auth: true, token: token, user: req.body });
    });
}
