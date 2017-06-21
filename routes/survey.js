var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = require('../db')
var userCollection = db.collection('users');
var surveyCollection = db.collection('survey');
var surveyResultsCollection = db.collection('surveyResults');

/* GET home page. */
router.get('/', function(req, res, next) {
    surveyCollection.find(function (err, survey) {
        if (err) {
            console.log(err)
        }
        res.render('survey', { 
            partials: {
            header: '../views/partials/header',
            footer: '../views/partials/footer'
            },
            title: 'Home',
            survey: survey,
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
router.delete('/', (req, res, next) => {
    var id  = req.body.id;
    console.log(id)
    surveyCollection.remove({_id: mongojs.ObjectId(id)}, (err, doc) => {
        console.log('deleted', doc)
        res.redirect('/survey')
    })
})
router.get('/:id', function(req, res, next) {
    var { id } = req.params;
    surveyCollection.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) {
        res.render('surveyDetail', { 
            partials: {
            header: '../views/partials/header',
            footer: '../views/partials/footer'
            },
            title: 'Home',
            surveyData: JSON.stringify(doc),
            survey: doc,
            auth: function() {
                if (req.user) {
                    if (req.user.admin) {
                    return 2
                    }
                    return 1
                }
            }
        });
    })
})
router.post('/surveyDetail', (req, res, next)=> {
    const survey = req.body;
    var survey_id = survey.id;
    var scoreArray = delete survey['id'];
    var totalPoint = 0;
    var i;

    console.log(scoreArray)

    for (i = 0; i < Object.keys(survey).length; i ++) {
        var points = Object.keys(survey).map(function(key) {
            return survey[key]
        })
        
        totalPoint = totalPoint + Number(points[i])
    }
    var newSurveyResult = {
        name: 'Peter',
        email: 'peter.zheng88228@gmail.com',
        survey_id: survey_id,
        created_at: new Date(),
        ip: req.ip,
        results: {
            q1: survey.q1,
            q2: survey.q2,
        },
        score: totalPoint
    }
    surveyResultsCollection.save(newSurveyResult, function(err, doc) {
        req.session.identity = newSurveyResult._id;
        res.redirect('/survey/result/' + doc.survey_id);
    })
})

router.get('/result/:id', (req, res, next) => {

    const { id } = req.params;
    surveyResultsCollection.findOne({survey_id: id, _id: mongojs.ObjectId(req.session.identity)}, function(err, doc) {
        if (err) {
            console.log(err)
        }
        if (doc) {
            console.log(doc)
            console.log(doc.score)
            res.render('surveyResult', { 
                partials: {
                header: '../views/partials/header',
                footer: '../views/partials/footer'
                },
                title: 'Home',
                surveyData: doc,
                auth: function() {
                if (req.user) {
                    if (req.user.admin) {
                    return 2
                    }
                    return 1
                }
            }
            });
        }
       
    })
})
   

module.exports = router;