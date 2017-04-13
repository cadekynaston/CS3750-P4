var express = require('express');
var router = express.Router();
// has function to make sure you can only get to page if logged in
var utils = require('./utils');  
// NOTE THE utils.requireLogin   
// this function from the utils class makes sure they are logged 
// in before being able to go to chat but its not working right

/* GET stock page. */
router.get('/view', utils.requireLogin, function(req, res, next) {
  res.render('view', {
    userName: req.user.username,
    csrfToken: req.csrfToken()
  });
});

router.get('/list', utils.requireLogin, function(req, res, next) {
  res.render('list', {
    userName: req.user.username,
    csrfToken: req.csrfToken()
  });
});

router.get('/add', utils.requireLogin, function(req, res, next) {
  res.render('add', {
    userName: req.user.username,
    portfolio: req.user.portfolio,
    csrfToken: req.csrfToken()
  });
});

router.get('/manage', utils.requireLogin, function(req, res, next) {
  res.render('manage', {
    userName: req.user.username,
    csrfToken: req.csrfToken()
  });
});

module.exports = router;