app.controller('reportController', ['$scope','sharedProperties', function ($scope, sharedProperties) {
   $scope.deeplinkURL= sharedProperties.getReportURL();
}]);
