var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('input_output', {})
})

router.get('/test', function(req, res, next) {
  res.send('test 2');
//  res.render('input_output', {})
})

router.post('/', function(req,res,next){
  res.render('input_output', {test: 'data output'})
})

module.exports = router
