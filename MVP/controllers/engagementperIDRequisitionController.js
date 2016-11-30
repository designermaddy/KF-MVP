app.controller('engagementperIDRequisitionController', ['$scope','Factory','sharedProperties','commonFunctions', '$uibModal','commonFunctions', function ($scope, Factory, sharedProperties, commonFunctions, $uibModal,commonFunctions) {
$scope.viewLoading = false;
getRequisitionList();
    function getRequisitionList() {
                                var engagementID = sharedProperties.getengagementPerIDSelected()
                                if(engagementID){
            var promise = Factory.getRequisionforanEngagment(engagementID)
             promise.then(
                function resolved(response) {
                  $scope.engagementResponse = response.data.engagement;
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
                  if($scope.engagementResponse){
                     $scope.engagementClient = $scope.engagementResponse.Client;
                     $scope.engagementClientContact = $scope.engagementResponse.ClientContact;
                     $scope.engagementConsultant = $scope.engagementResponse.EngagementConsultant;
                     $scope.engagementUsers = $scope.engagementResponse.Users;
                  }
                    $scope.currentPage = 1;
                    $scope.totalItems = $scope.engagementResponse.Requisitions.length;
                    $scope.entryLimit = 10; // items per page
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
              },
              function rejected(response) {
                  commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
              })
           }
    }

     // iframe modals.

    $scope.openTalentLinkIframe = function() {
        var url = commonFunctions.getIframeUrl('addNewRequisitionTalentLink');
          commonFunctions.openIframe(url)
    }
    $scope.openCrmIframe = function() {
        var url = commonFunctions.getIframeUrl('addNewRequisitionCRM');
      commonFunctions.openIframe(url);
    }
	 $scope.changeActivelink = function(row, htmlPath) {
        commonFunctions.changeActivelink(row, htmlPath);
    }
      $scope.$watch('search', function (newVal, oldVal) {
         if($scope.rowCollection){
		$scope.filtered = filterFilter($scope.rowCollection, newVal);
		$scope.totalItems = $scope.filtered.length;
		$scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
		$scope.currentPage = 1;
         }
	}, true);


}]);

app.controller('ModalCancel', ['$uibModalInstance', 'url', '$scope', '$sce', function ($uibModalInstance, url, $scope, $sce) {
    $scope.iframeUrl = $sce.trustAsResourceUrl(url);
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
