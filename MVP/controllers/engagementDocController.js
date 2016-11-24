app.controller('engagementDocController', ['$uibModal','$scope','Factory', 'sharedProperties', 'config', 'commonFunctions','$sce', function ($uibModal, $scope, Factory, sharedProperties, config, commonFunctions,$sce) {
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
    
    $scope.openPdf = function (url, filename) {
         var url = config.projectUrl + '/Profile/getDocumentById/' + url;
          var promise = Factory.getPDF(url);
        promise.then(
          function resolved(response) {
               var file = new Blob([response.data], { type: 'application/pdf' });
             var fileURL = URL.createObjectURL(file);
             $scope.pdfContent = $sce.trustAsResourceUrl(fileURL);
             $scope.fileName =  filename

               var modalInstance = $uibModal.open({
            animation: true
            , templateUrl: 'Docmodal.html'
            , controller: 'DocModalCtrl'            
            , size: 'lg'
            , resolve: {
                url: function () {
                    return  $scope.pdfContent;
                },
                 filename: function () {
                    return   $scope.fileName;
                }
            }
        });
          },
              function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
      )
    }
    
    
}]);

app.controller('DocModalCtrl', ['$uibModalInstance', 'url','filename', '$scope', function ($uibModalInstance, url,filename, $scope) {
    $scope.url = url;
     $scope.fileName = filename;
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
