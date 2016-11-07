var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var router = express.Router();
var request = require('request');


/* GET user profile. */
router.get('/', ensureLoggedIn, function(req, res, next) {
  res.render('user', {
    user: req.user
  });
});

router.get('/echo', ensureLoggedIn, function(req, res, next) {
  
  // invoke diag endpoint with authn header
    var options = {
      url: 'http://localhost:3000/diag',
      headers: {
        'Authorization': 'Bearer ' + req.user.extraParams.access_token
      }
    };

    request(options, function(error, response, body) {
        var info = JSON.parse(body);
        res.json({jwt: info.jwt});
    });

});

module.exports = router;
