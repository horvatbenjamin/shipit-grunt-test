var express = require('express')
var app = express()

console.log('Starting....');
 
app.get('/', function (req, res) {
  res.send('Sziasztok');
  console.log('request...');
})
 
app.listen(1234)