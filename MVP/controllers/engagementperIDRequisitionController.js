app.controller('engagementperIDRequisitionController', ['$scope','Factory','sharedProperties','commonFunctions', '$uibModal', function ($scope, Factory, sharedProperties, commonFunctions, $uibModal) {
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
              },
              function rejected(response) {
                  alert(response.status + ': ' + response.statusText);
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


}]);

app.controller('ModalCancel', ['$uibModalInstance', 'url', '$scope', '$sce', function ($uibModalInstance, url, $scope, $sce) {
    $scope.iframeUrl = $sce.trustAsResourceUrl(url);
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
