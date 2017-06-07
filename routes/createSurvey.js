var express = require('express');
var router = express.Router();
var db = require('../db')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('createSurvey', { 
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
router.post('/', function(req, res, next) {
    var survey = req.body;

    var newSurvey = {
        title: survey.title,
        numberOfQuestion: survey.nQuestion,
        expirationDate: survey.expirationDate,
        created_at: new Date(),
        question1: {
            title: survey.q1t,
            mc1: {
                mc: survey.q1m1,
                pt: survey.q1m1p,
            },
            mc2: {
                mc: survey.q1m2,
                pt: survey.q1m2p,
            },
            mc3: {
                mc: survey.q1m3,
                pt: survey.q1m3p,
            },
            mc4: {
                mc: survey.q1m4,
                pt: survey.q1m4p,
            },
            identifier: true
        },
        question2: {
            title: survey.q2t,
           mc1: {
                mc: survey.q2m1,
                pt: survey.q2m1p,
            },
            mc2: {
                mc: survey.q2m2,
                pt: survey.q2m2p,
            },
            mc3: {
                mc: survey.q2m3,
                pt: survey.q2m3p,
            },
            mc4: {
                mc: survey.q2m4,
                pt: survey.q2m4p,
            },
            identifier: true
        },
    }
    var surveyCollection = db.collection('survey');
    surveyCollection.save(newSurvey, (err, doc) => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/survey')
        }
    });
})

module.exports = router;
