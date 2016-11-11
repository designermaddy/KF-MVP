app.controller('searchController', ['$scope', 'Factory', 'commonFunctions', '$sce', 'config', 'sharedProperties', function ($scope, Factory, commonFunctions, $sce, config, sharedProperties) {

    var promise = Factory.getSavedSearchesResponse();
    promise.then(
          function resolved(response) {
              $scope.rowCollection = response.data;
              setValues();
          },
          function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
      )

    function setValues() {
      if($scope.rowCollection){
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 8; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
      }
    }

    $scope.refreshResults = function() {
        alert('hi');
    }
}]);
