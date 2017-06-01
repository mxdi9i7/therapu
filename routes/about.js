var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = require('../db')
var userCollection = db.collection('users');

/* GET home page. */
router.get('/', function(req, res, next) {
   
    res.render('about', { 
        partials: {
            header: '../views/partials/header',
            footer: '../views/partials/footer'
            },
        title: 'about'
    });
})

module.exports = router;