var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/therapu', ['users']);
var userCollection = db.collection('users');

/* GET home page. */
router.get('/login', function(req, res, next) {
   userCollection.find(function(err, users) {
       res.json(users);
   })
   
});

module.exports = router;
