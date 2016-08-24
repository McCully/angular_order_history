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

    client.query('SELECT COUNT(orders.id), customers.last_name, customers.first_name, customers.id ' +
                'FROM orders JOIN addresses ON addresses.id = orders.address_id ' +
                'JOIN customers ON customers.id = addresses.customer_id ' +
                'GROUP BY customers.id ' ,
      function(err , result){
        done();
        if(err){
          res.sendStatus(500);
          console.log('error2: ' , err);
        } else {
          res.send(result.rows);
          console.log('ROWS ' , result);
        }
      }
    )
  });
});



// router.get('/:id', function (req, res){
// 	var id = req.params.id;
// 	pg.connect(connectionString, function (err, client, done){
// 		if (err) {
// 			res.sendStatus(500);
// 		}
// 		client.query('SELECT * FROM orders ' +
// 									'JOIN addresses ON addresses.id = orders.address_id ' +
// 									'JOIN customers ON customers.id = addresses.customer_id ' +
// 									'JOIN line_items ON line_items.order_id = orders.id ' +
// 									'JOIN products ON products.id = line_items.product_id ' +
// 									'WHERE customers.id = $1; ',
// 		              [id],
// 		function (err, result){
// 			done();
// 			if(err) {
// 				res.sendStatus(500);
// 			}
// 		;
// 			res.send(result.rows);
// 		});
// 	});
//
// });


router.get('/:id', function (req, res) {
  pg.connect(connectionString , function(err , client, done) {
    var id = req.params.id;
    if(err) {
      res.sendStatus(500);
      console.log('error3: ' , err);
    }

    client.query('SELECT * FROM orders ' +
                'JOIN addresses ON addresses.id = orders.address_id ' +
                'JOIN customers ON customers.id = addresses.customer_id ' +
                'JOIN line_items ON line_items.order_id = orders.id ' +
                'JOIN products ON products.id = line_items.product_id '+
                'WHERE customers.id = $1',
								[id] ,
     function(err , results){
       done();
       if(err){
        res.sendStatus(500);
        console.log('error4: ' , err);
        } else {
        console.log('ROWS ' , results);
        res.send(results.rows);
      }
    });
  });
});

module.exports = router;
