var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = 'postgres://localhost:5432/mccully';

router.get('/', function (req, res) {
  pg.connect(connectionString , function(err , client, done) {
    if(err) {
      res.sendStatus(500);
    }

    client.query('SELECT first_name ,last_name FROM customers' , function(err , result){
      done();
      if(err){
        res.sendStatus(500);
      }
      res.send(result.rows);
    });
  });
});

module.exports = router;
