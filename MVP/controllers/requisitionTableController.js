

app.controller('requisitionTableController', ['$scope','Factory', 'sharedProperties', 'commonFunctions', '$uibModal','$location','filterFilter', function ($scope, Factory, sharedProperties, commonFunctions, $uibModal, $location,filterFilter) {

 $scope.viewLoading = false;
 agingRequisitionList();
    function agingRequisitionList() {
        var promise = Factory.getRequisitionTableList();
        promise.then(
          function resolved(response) {

             $scope.rowCollection = response.data.requisitionList
              $scope.currentPage = 1;
                    $scope.totalItems = $scope.rowCollection.length;
                    $scope.entryLimit = 10; // items per page
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
              sharedProperties.setRequisitionTable($scope.rowCollection);

              $scope.getData = function (workflowSteps, value) {
                var output = '';
                angular.forEach(workflowSteps, function (input) {
                    if (input.step == value) {
                    output = input.candidateCount;
                }
                });

                return output;
                console.log(output);
              }

			  if($scope.rowCollection){
				 $scope.viewLoading = true;
			  }

             // globalDetails.userTypeID = response.data.userTypeId;
             // globalDetails.userId = response.data.userid;
             // globalDetails.userType = response.data.userType
          },
          function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
      )
    };

    $scope.$watch(function() {
        return sharedProperties.getRequisitionTable()
        }, function(newValue, oldValue) {
            $scope.rowCollection = newValue;
            //setValues();
    });
    $scope.$watch('search', function (newVal, oldVal) {
         if($scope.rowCollection){
		$scope.filtered = filterFilter($scope.rowCollection, newVal);
		$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
         }
	}, true);
//$scope.itemsByPage=15;

  $scope.listVisible = true;
  $scope.gridVisible = false
            $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.listVisible = $scope.listVisible ? false : true;
				$scope.gridVisible = $scope.gridVisible ? false : true;
				console.log($scope.listVisible)
				console.log($scope.gridVisible)
            }

		  // iframe modals.

    $scope.openTalentLinkIframe = function() {
        var url = commonFunctions.getIframeUrl('addNewRequisitionTalentLink');
        commonFunctions.openIframe(url);
    }
    $scope.openCrmIframe = function() {
        var url = commonFunctions.getIframeUrl('addNewRequisitionCRM');
        commonFunctions.openIframe(url);
    }


    $scope.changeActivelink = function(row, htmlPath) {
        commonFunctions.changeActivelink(row, htmlPath);
    }


}]);
