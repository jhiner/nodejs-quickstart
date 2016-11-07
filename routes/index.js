var express = require('express');
var passport = require('passport');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
// var requireRole = require('../requireRole');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'NodeJS Quickstart Demo' });
});

router.get('/login',
  function(req, res){
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

router.get('/callback',
  passport.authenticate('auth0', {
    failureRedirect: '/error',
  }),
  function(req, res) {
    res.redirect(req.session.returnTo || '/user');
  });


router.get('/unauthorized', function(req, res) {
  res.render('unauthorized');
});


module.exports = router;
