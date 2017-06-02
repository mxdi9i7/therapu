var express = require('express');
var router = express.Router();
var db = require('../db')
var session = require('express-session')
var passport = require('passport')
require('../passport')
require('../checkAuth')

var userCollection = db.collection('users');

/* GET home page. */
router.get('/login', function(req, res, next) {
	
   res.render('login', { 
    partials: {
      header: '../views/partials/header',
      footer: '../views/partials/footer'
    },
    title: 'Home'
   });
});
router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login'
}))
.get('/logout', (req, res, next) => {
	req.session.destroy((err) => {
		res.redirect('/login')
	})
})






router.get('/status', (req, res, next)=> {
		res.send({
			session: req.session,
			user: req.user,
			authenticate: req.isAuthenticated()
		})
	})


module.exports = router;
