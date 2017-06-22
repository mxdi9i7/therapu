var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = require('../db')
var userCollection = db.collection('users');
var surveyCollection = db.collection('survey');
var surveyResultsCollection = db.collection('surveyResults');
var articleCollection = db.collection('articles');

/* GET home page. */
router.get('/', function(req, res, next) {
  articleCollection.find({}).limit(6, function(err, featuredArticles) {
    if (err) {
      console.log(err)
    }
    if (!req.user) {
      res.render('index', { 
          partials: {
            header: '../views/partials/header',
            footer: '../views/partials/footer'
          },
          featuredArticles,
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
    } 
    if (req.user) {
      console.log(req.user, 'req.user')
        userCollection.findOne({_id: mongojs.ObjectId(req.user._id)}, function(err, currentUser) {
            if (err) {
              console.log(err)
            }
            console.log(currentUser)
              res.render('index', { 
                partials: {
                  header: '../views/partials/header',
                  footer: '../views/partials/footer'
                },
                featuredArticles,
                currentUser,
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
          })
    }
    
    
  })
  
});

module.exports = router;
