var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { 
    partials: {
      header: '../views/partials/header',
      footer: '../views/partials/footer'
    },
    title: 'Home',
    auth: function() {
      if (req.user) {
        if (req.user.admin) {
          return 2
        }
        return 1
      }
    }, 
    
   });
});

module.exports = router;
