app.controller('engagementController', ['$scope', 'Factory', 'sharedProperties', '$http', function ($scope, Factory, sharedProperties, $http) {
    $scope.search = {};
    function getData() {
        var promise = Factory.getEngagementDetailsTableList();
        promise.then(function (response) {
            $scope.rowCollection = response.data.engagementList;
            setValues();
        });
    }
    getData();

    function setValues() {
        if ($scope.rowCollection) {
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 8; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        }
    }

    // call the API for selectedengagement per id
	$scope.onSelectEngagementPerID = function(engagementID){
		sharedProperties.setengagementPerIDSelected(engagementID)
	}
}]);
