app.controller('engagementDocController', ['$uibModal','$scope','Factory', 'sharedProperties', 'config', 'commonFunctions', function ($uibModal, $scope, Factory, sharedProperties, config, commonFunctions) {
        //getEngagementId 
        var id = sharedProperties.getengagementPerIDSelected();
        
        //post data to backend with engagementId        
        var data = {            
            "engagementId": id
        };
    
        var promise = Factory.postDocumentByEngagement(data);
        promise.then(
          function resolved(response) {
              $scope.pdfDetailsData = response.data.documentList;              
              setValues();              
          },
          function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
        )
        
     function setValues() {
      if($scope.pdfDetailsData){
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.pdfDetailsData.length;
            $scope.entryLimit = 8; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);            
      }
    }
    
    $scope.openPdf = function (url) {
        var url = config.projectUrl + '/Profile/getDocumentById/' + url;
        var modalInstance = $uibModal.open({
            animation: true
            , templateUrl: 'Docmodal.html'
            , controller: 'DocModalCtrl'            
            , size: 'lg'
            , resolve: {
                url: function () {
                    return url;
                }
            }
        });
    }
    
    
}]);

app.controller('DocModalCtrl', ['$uibModalInstance', 'url', '$scope', function ($uibModalInstance, url, $scope) {
    $scope.url = url;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
