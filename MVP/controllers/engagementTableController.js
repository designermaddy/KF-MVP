

app.controller('engagementTableController', ['$scope','sharedProperties','Factory', function ($scope, sharedProperties, Factory) {
      $scope.viewLoading = false;
      $scope.rowCollection = sharedProperties.getrowCollection();      
    
    function setValues() {
      if($scope.rowCollection){
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 8; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);            
      }
    }
    
    $scope.$watch(function() {
        return sharedProperties.getrowCollection()
        }, function(newValue, oldValue) {
            $scope.rowCollection = newValue;
            setValues();            
    }); 
	// call the API for selectedengagement per id
	$scope.onSelectEngagementPerID = function(engagementID){
		sharedProperties.setengagementPerIDSelected(engagementID)
	}

    $scope.selectPage = function(){
        alert('hello')
    }
}]);
