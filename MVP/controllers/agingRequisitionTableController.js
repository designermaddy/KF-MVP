

app.controller('agingRequisitionTableController', ['$scope','Factory', 'sharedProperties', 'commonFunctions', '$uibModal','$location','config','$rootScope', function ($scope, Factory, sharedProperties, commonFunctions, $uibModal, $location, config, $rootScope) {
sharedProperties.setReportURL("empty")
 $scope.viewLoading = false;
 $scope.agingRequisitionCount = 0;

 agingRequisitionList();
    function agingRequisitionList() {
        var promise = Factory.getAgingRequisitionList();
        promise.then(
          function resolved(response) {
             $scope.rowCollection = response.data.requisitions.concat(config.searcherReq);
			  if($scope.rowCollection){
				 $scope.viewLoading = true;

                  if($scope.rowCollection.length > 5){
                      $scope.agingRequisitionCount = 5;
                  }
                  else {
                      $scope.agingRequisitionCount = $scope.rowCollection.length;
                  }
			  }
          },
          function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
      )
    };

$scope.itemsByPage=15;

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


    $rootScope.$watch(function() {return config.searcherReq}, function() {
        // do something here
        //config.searcherReq
       agingRequisitionList();
    }, true);
 // call the API for selectedengagement per id
	$scope.onSelectEngagementPerID = function(engagementID, engagementType){
		 var engDtlsSelected = {}

        engDtlsSelected.id = engagementID;
        engDtlsSelected.thirdParty = engagementType

		sharedProperties.setengagementPerIDSelected(engagementID)
        sharedProperties.setEngagmentSelectedObject(engDtlsSelected)

	}
   /* var p  = Factory.kornferry();
    p.then(function resolved(response){
        console.log(response.data);
    }, function rejected(response){
        console.log(response.statusText);
    })*/

	/** Refersh agingrequisition Control**/

	$scope.refreshRequisitionResults = function() {
       agingRequisitionList();
    }

}]);
