var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://localhost:27017/therapu', ['users']);
var userCollection = db.collection('users');

/* GET home page. */
router.get('/', function(req, res, next) {
   
   
});

module.exports = router;
