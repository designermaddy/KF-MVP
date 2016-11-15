app.controller('searchController', ['$scope', 'Factory', 'commonFunctions', '$sce', 'config', 'sharedProperties', '$location', function ($scope, Factory, commonFunctions, $sce, config, sharedProperties, $location) {

    $scope.start = 1;

    var data = {
        'orgId' : 6,
        'limit' : 10,
        'page'  : 1
    }

    function getData() {
        var promise = Factory.getSavedSearchesResponse(data);
        promise.then(
              function resolved(response) {
                  $scope.rowCollection = response.data;
                  $scope.start = data.page * data.limit - data.limit || 1;
                  $scope.end = data.page * data.limit;
              },
              function rejected(response) {
                  commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
              }
          )
    }
    getData();

    function setValues() {
      if($scope.rowCollection){
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
      }
    }

    $scope.prev = function () {
        if (data.page > 1) {
            data.page -= 1;
        }
        getData();
    }
    $scope.next = function () {
        data.page += 1;
        getData();
    }

    $scope.refreshResults = function() {
        getData();
    }

   $scope.newSearch = function() {
        $location.path('NewSearch');
    }
}]);
