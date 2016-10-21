

app.controller('engagementTableController', ['$scope','sharedProperties', function ($scope, sharedProperties) {
      $scope.viewLoading = false;
      $scope.rowCollection = sharedProperties.getrowCollection();      
    
    function setValues() {
      if($scope.rowCollection){
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 12; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);            
      }
    }
    
    $scope.$watch(function() {
        return sharedProperties.getrowCollection()
        }, function(newValue, oldValue) {
            $scope.rowCollection = newValue;
            setValues();            
    }); 
}]);