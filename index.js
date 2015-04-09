var express = require('express')
var app = express()

console.log('Starting....');
 
app.get('/', function (req, res) {
  res.send('Hello World 12345');
  console.log('request...');
})
 
app.listen(1234)