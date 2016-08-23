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

    client.query('SELECT customer_id, description , products.unit_price ,' +
     'quantity , total , order_date , street , city , state, zip , address_type FROM line_items' +
'JOIN products ON product_id = products.id' +
'JOIN orders ON order_id = orders.id' +
'JOIN addresses ON address_id = addresses.id' +
'JOIN customers ON customer_id = customers.id' + 'WHERE this.id = customer_id',
 function(err , result){
      done();
      if(err){
        res.sendStatus(500);
      }
      res.send(result.rows);
    });
  });
});

module.exports = router;
