var myApp = angular.module('myApp' , []);

myApp.controller('IndexController' , ['$scope' , '$http' , function($scope , $http){
  console.log("Controller up!");

  $scope.appendOrders = function(){

  }

  $http({
  method: 'GET',
  url: '/orders'
}).then(function (response){
  console.log("response : " , response);
  $scope.orders = response.data;
});

  $http({
    method: 'GET',
    url: '/customers'
  }).then(function (response){
    console.log("response : " , response);
    $scope.customers = response.data;
  });
}]);
