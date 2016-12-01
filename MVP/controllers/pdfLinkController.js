app.controller('pdfLinkController', ['$scope', 'Factory', 'sharedProperties', 'commonFunctions', '$location', function ($scope, Factory, sharedProperties, commonFunctions, $location) {
    $scope.url = 'pdf/1.pdf';
    /*var data={
         "documentId":0,
         "engagementId":engagementNumber,
         "Documents":sharedProperties.getprofileSelectedDocumentID()


     var promsie = Factory.getDocumentByRequisition(data);
     promise.then(
           function resolved(response) {
              console.log(response.data);
           },
           function rejected(response) {
               commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
           }
       )*/
    function pdfDetails() {
        var data = {
            'requisition': sharedProperties.getPositionId()
            , 'engagementId': parseInt(sharedProperties.getRequisitionDetails().EngagementId)
        }
        var promise = Factory.requisitionDocDetailsList(data);
        promise.then(function resolved(response) {
            $scope.pdfDetailsData = response.data.requisitionDocList;
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        })
    };
    pdfDetails();
    $scope.changePdf = function (a) {
        var el = $(event.target);
        var div = $(event.currentTarget);
        var input = div.find('input');
        if (input.prop('checked')) {
            input.prop('checked', false);
        }
        else {
            input.prop('checked', true);
        }
        var str = 'pdf/' + a + '.pdf';
        $scope.url = str;
    };
    $scope.initiateSearch = function () {
        var checked = $('input:checked');
        var data = [];
        for (var i = 0; i < checked.length - 1; i++) {
            data.push(checked[i].value);
        }
        sharedProperties.setInitiateSearchData(data);
        var redirectPath = "InitiateSearch";
        $location.path(redirectPath);
        console.log(data);
    }
}]);
