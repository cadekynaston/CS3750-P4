var express = require('express');
var router = express.Router();
// //guessing where to require highcharts
// var Highcharts = require('highcharts');

// // Load module after Highcharts is loaded
// require('highcharts/modules/exporting')(Highcharts);

///////////////////////////////////////////////////////////////////

/* GET home page. */
router.get('/', function(req, res, next) {
  var noUser = {
    username: 'No User'
  };

  if(req.user == null){
    req.user = noUser;
  }
  res.render('index', { 
    userName: req.user.username
  });
});

module.exports = router;
