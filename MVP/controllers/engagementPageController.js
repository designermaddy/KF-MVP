app.controller('engagementPageController', ['$scope','Factory', '$http', function ($scope, Factory, $http) {

    var promise = Factory.getEngagementDetailsTableList();
    $scope.ind = '';
    $scope.cli = '';
    $scope.name = '';
    $scope.rowCollection = [];

    promise.then(function(response){
        $scope.rowCollection = result = response.data.engagementList;
        setValues();
        dropdown(result);
    });

    function dropdown(result) {
        $scope.engagement = result.map(function(item){
            return item.EngagementNumber + '  ' + item.Engagement;
        });
        $scope.client = result.map(function(item){
            return item.Client.ClientName;
        });
        $scope.industry = result.map(function(item){
            return item.Client.Industry;
        });
        $scope.recruiter = result.map(function(item) {
            return item.Recruiter;
        })
    }

    function setValues() {
      if($scope.rowCollection){
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 12; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
      }
    }


	// call the API for selectedengagement per id
	$scope.onSelectEngagementPerID = function(engagementID){
        sharedProperties.setengagementPerIDSelected(engagementID);
	}

}]);
