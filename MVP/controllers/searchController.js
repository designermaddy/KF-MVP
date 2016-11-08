app.controller('searchController', ['$scope', 'Factory', 'commonFunctions', '$sce', 'config', 'sharedProperties', function ($scope, Factory, commonFunctions, $sce, config, sharedProperties) {

    $scope.rowCollection = [{"AryaJobID":1606,"ClientJobID":"14153","Client":"Alcoa   ","Location":"Rochester, NY","Status":"Open","Job0CreatedDate":"2015-07-20T00:00:00","JobModifiedDate":"2015-07-20T00:00:00"},
{"AryaJobID":1607,"ClientJobID":"14152","Client":"Alcoa   ","Location":"Rochester, NY","Status":"Open","Job0CreatedDate":"2015-07-20T00:00:00","JobModifiedDate":"2015-07-20T00:00:00"},
{"AryaJobID":1608,"ClientJobID":"14151","Client":"Alcoa   ","Location":"Rochester, NY","Status":"Open","Job0CreatedDate":"2015-07-20T00:00:00","JobModifiedDate":"2015-08-24T00:00:00"}]

    function setValues() {
      if($scope.rowCollection){
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 8; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
      }
    }

    setValues();

    $scope.refreshResults = function() {
        alert('hi');
    }
}]);
