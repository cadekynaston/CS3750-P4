var express = require('express');
var router = express.Router();
// has function to make sure you can only get to page if logged in

var utils = require('./utils');
var schema = require('../models/schema');
// NOTE THE utils.requireLogin
// this function from the utils class makes sure they are logged
// in before being able to go to chat but its not working right
router.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});
/* GET stock page. */
router.get('/view', utils.requireLogin, function(req, res, next) {
  res.render('view', {
    userName: req.user.username,
    portfolio: req.user.portfolio,
    csrfToken: req.csrfToken()
  });
});

router.get('/list', utils.requireLogin, function(req, res, next) {

  res.render('list', {
    userName: req.user.username,
    portfolio: req.user.portfolio,
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
    portfolio: req.user.portfolio,
    csrfToken: req.csrfToken()
  });
});

router.post('/add', function(req, res){
  var obj = {};
  console.log('body: ' + JSON.stringify(req.body.symbol));
  if(req.user.portfolio.length==0)
    req.user.portfolio.push({stockCode:JSON.stringify(req.body.symbol).substring(1,JSON.stringify(req.body.symbol).length-1),stockTitle:JSON.stringify(req.body.title).substring(1,JSON.stringify(req.body.title).length-1),amount: 100})
  else
    req.user.portfolio.push({stockCode:JSON.stringify(req.body.symbol).substring(1,JSON.stringify(req.body.symbol).length-1),stockTitle:JSON.stringify(req.body.title).substring(1,JSON.stringify(req.body.title).length-1),amount: 0})

  console.log('user', req.user.username, 'portfolio', req.user.portfolio);

  schema.User.findOneAndUpdate({ username: req.user.username },
    { portfolio: req.user.portfolio}, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
  });

  console.log('this');

});

router.post('/remove', function(req, res){
  var obj = {};
  console.log('body: ' + JSON.stringify(req.body.symbol));
  let symbol = JSON.stringify(req.body.symbol).substring(1,JSON.stringify(req.body.symbol).length-1);

  let test =  req.user.portfolio.filter(function(e) { return e.stockCode != symbol; });
  console.log(test);

  schema.User.findOneAndUpdate({ username: req.user.username },
    { portfolio: test}, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send("succesfully saved");
  });


})
module.exports = router;
