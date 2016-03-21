var express = require('express');
var path = require('path');
var router = express.Router();
var employees = require('./employees.js');

router.use('/employees', employees);

router.get('/*', function(req,res){
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, '../public/' + file));
});

module.exports = router;
