var express = require('express');
var app =  express();
var bodyParser = require('body-parser');
var path = require('path');
var customers = require('./routes/customers');
// var orders = require('./routes/orders');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/public', express.static(path.join(__dirname, './public')));

app.use('/customers' , customers);
// app.use('/orders' , orders );

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, './public/views/index.html'));
});

app.set('port', 3000);

app.listen(process.env.PORT || app.get('port'), function () {
  console.log('Listening at port ', app.get('port'));
});
