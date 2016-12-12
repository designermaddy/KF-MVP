app.controller('engagementController', ['$scope', 'Factory', 'sharedProperties', '$http','commonFunctions', function ($scope, Factory, sharedProperties, $http, commonFunctions) {
    $scope.search = {};
     commonFunctions.getSearcherJson();
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
	$scope.onSelectEngagementPerID = function(engagementID, engagementType){
		 var engDtlsSelected = {}

        engDtlsSelected.id = engagementID;
        engDtlsSelected.thirdParty = engagementType

		sharedProperties.setengagementPerIDSelected(engagementID)
        sharedProperties.setEngagmentSelectedObject(engDtlsSelected)

	}

}]);
