var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = 'postgres://localhost:5432/mccully';

router.get('/', function (req, res) {
  pg.connect(connectionString , function(err , client, done) {
    if(err) {
      res.sendStatus(500);
      console.log('error1: ' , err);
    }

    client.query('SELECT * FROM orders' +
                  'JOIN addresses ON addresses.id = orders.address_id' +
                  'JOIN customers ON customers.id = addresses.customer_id' +
                  'JOIN line_items ON line_items.order_id = orders.id' +
                  'JOIN products ON products.id = line_items.product_id'+
                  'WHERE customers.id = $1',
     function(err , result){
       done();
       if(err){
        res.sendStatus(500);
        console.log('error2: ' , err);
        } else {
        console.log('ROWS ' , result);
        res.send(result.rows);
      }
    });
  });
});

module.exports = router;
