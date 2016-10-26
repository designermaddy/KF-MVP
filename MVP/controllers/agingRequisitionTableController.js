

app.controller('agingRequisitionTableController', ['$scope','Factory', 'sharedProperties', 'commonFunctions', '$uibModal','$location', function ($scope, Factory, sharedProperties, commonFunctions, $uibModal, $location) {

 $scope.viewLoading = false;
 agingRequisitionList();
    function agingRequisitionList() {
        var promise = Factory.getAgingRequisitionList();
        promise.then(
          function resolved(response) {

             $scope.rowCollection = response.data.requisitionList            
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
              alert(response.status + ': ' + response.statusText);
          }
      )
    };

    $scope.$watch(function() {
        return sharedProperties.getRequisitionTable()
        }, function(newValue, oldValue) {
            $scope.rowCollection = newValue;
            //setValues();
    });
    
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
 
    $scope.sendRequisition = function() {
     
    }
    
    $scope.changeActivelink = function(row, htmlPath) {
        commonFunctions.changeActivelink(row, htmlPath);
    }

         
}]);
