var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    partials: {
      header: '../views/partials/header',
      footer: '../views/partials/footer'
    },
    title: 'Home'
   });
});

module.exports = router;
