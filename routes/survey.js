var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = require('../db')
var userCollection = db.collection('users');

/* GET home page. */
router.get('/', function(req, res, next) {
    var surveyCollection = db.collection('survey')
    
    surveyCollection.find(function (err, survey) {
        if (err) {
            console.log(err)
        }
        console.log(survey)
        res.render('survey', { 
            partials: {
            header: '../views/partials/header',
            footer: '../views/partials/footer'
            },
            title: 'Home',
            survey: survey
        });
    })
    
})
   

module.exports = router;