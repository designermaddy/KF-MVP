app.controller('pdfLinkController', ['$scope', 'Factory', 'sharedProperties', 'commonFunctions', function($scope, Factory, sharedProperties, commonFunctions) {
    $scope.url = 'pdf/1.pdf';

   /* var data={
        "documentId":0,
        "engagementId":engagementNumber,
        "Documents":sharedProperties.getprofileSelectedDocumentID()
    }

    var promsie = Factory.getDocumentByRequisition(data);
    promise.then(
          function resolved(response) {
             console.log(response.data);
          },
          function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
      )*/

    $scope.changePdf = function(a) {
        var str = 'pdf/' + a + '.pdf';
        $scope.url = str;
    };
}]);
