var myApp = angular.module('myApp' , []);

myApp.controller('IndexController' , ['$scope' , '$http' , function($scope , $http){
  console.log("Controller up!");



  $http({
    method: 'GET',
    url: '/customers'
  }).then(function (response){
    console.log("response : " , response);
    $scope.customers = response.data;
  });

  $scope.appendOrders = function(id){

    $http({
    method: 'GET',
    url: '/customers/' + id
    }).then(function (response){
      console.log("response : " , response.data);
      $scope.orders = response.data;

    });
  }


}]);
