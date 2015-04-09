var express = require('express')
var app = express()

console.log('Starting....');
 
app.get('/', function (req, res) {
  res.send('Hello World')
})
 
app.listen(1234)