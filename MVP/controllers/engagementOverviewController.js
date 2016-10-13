app.controller('engagementOverviewController', ['$scope','Factory',  function ($scope, Factory) {
 $scope.chart =    {
     name: 'Chart 1',
     type: 'Doughnut',
     labels: ['EVSC', 'ISB'],
     data: [13, 44]
   };
   $scope.options = {legend: {display: true}};
  }]);
