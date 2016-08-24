module.exports = function(lineitems) {
  var currentOrderId = null;
  var currentOrder = {};
  var orders= [];

  lineitems.forEach(function (element){
    if(!currentOrderId){
      currentOrder = new Order(element.order_id, element.street , element.city , element.state , element.zip)
      currentOrderId = element.order_id;
      order.push(currentOrder);
    }

  });
  return orders;
};

function Order(id , street , city , state , zip) {
  this.id = id;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zip = zip;
}
