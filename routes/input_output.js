var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.send('test');
//  res.render('input_output', {})
})

router.get('/test', function(req, res, next) {
  res.send('test 2');
//  res.render('input_output', {})
})

module.exports = router
