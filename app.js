var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.send('Hello Essec!')
})

app.get('/surprise', function (req, res) {
  res.send('Hello Coders!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})