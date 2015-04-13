var express = require('express')
var app = express()

console.log('Starting....');
 
app.get('/deploy-hello', function (req, res) {
  res.send('Sziasztok a passanger-bol');
  console.log('request...');
})
 
app.listen(1223)