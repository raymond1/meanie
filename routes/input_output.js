var assert = require('assert');
var MongoClient = require('mongodb').MongoClient
var Server = require('mongodb').Server

var express = require('express');
var router = express.Router();
var database_url = 'mongodb://localhost:27017'
var database_name = 'test'

var mongodb_url = 'mongodb://localhost:27017'

router.get('/', function(req, res, next) {
  res.render('input_output', {})
})

router.get('/test', function(req, res, next) {
  MongoClient.connect(mongodb_url, function(err, client){
    assert.equal(null,err)
    console.log('successfully connected')
    client.close()
  })
  res.send('test 2');
})

router.post('/', function(req,res,next){
  MongoClient.connect(mongodb_url, function(err, client) {
    if(err) {
      return console.dir(err)
    }
    var db = client.db(database_name)
    var collection = db.collection('ratings')
  
    collection.insert({'rating': req.body.rating, 'name': req.body.name, 'desription': req.body.description})
  
    client.close()
  });
  res.render('input_output', {})
})

module.exports = router
