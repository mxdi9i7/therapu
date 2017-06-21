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
    articleCollection.find(function (err, articles) {
        if (err) {
            console.log(err)
        }
        res.render('articles', { 
            partials: {
            header: '../views/partials/header',
            footer: '../views/partials/footer'
            },
            title: 'Home',
            articles: articles,
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
    
})
/* GET home page. */
router.get('/create', function(req, res, next) {
    
        res.render('createArticle', { 
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
    })
    
})
/* GET home page. */
router.post('/create', function(req, res, next) {
        var article = req.body
        var newArticle = {
            author: article.author,
            article: article.article,
            title: article.title,
            created_at: new Date(),
        }
        articleCollection.save(newArticle, (err, doc) => {
            console.log(doc)
            if (err) {
                console.log(err)
            }
            res.redirect('/article')
        })
})
router.post('/', function(req, res, next) {
        var id = req.body.id
        articleCollection.remove({_id: mongojs.ObjectId(id)}, (err, doc) => {
            console.log(doc)
            if (err) {
                console.log(err)
            }
            res.redirect('/article')
        })
})

module.exports = router;