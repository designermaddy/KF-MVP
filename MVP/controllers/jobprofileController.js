app.controller('jobProfileController', ['$uibModal','$scope','Factory', 'commonFunctions', 'sharedProperties', '$location', function ($uibModal, $scope, Factory, commonFunctions, sharedProperties, $location) {

  jobProfileDocDetails();
    function jobProfileDocDetails() {
        var promise = Factory.jobProfileDocDetailsList();
        promise.then(
          function resolved(response) {

              $scope.pdfDetailsData = response.data.documentList;
             // globalDetails.userTypeID = response.data.userTypeId;
             // globalDetails.userId = response.data.userid;
             // globalDetails.userType = response.data.userType
          },
          function rejected(response) {
              commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
          }
      )
    };
     $scope.url = 'pdf/1.pdf';



    $scope.changePdf = function(a) {
        var el = $(event.target);
        var div = $(event.currentTarget);
        var input = div.find('input');
        if (input.prop('checked')) {
            input.prop('checked', false);
        }else {
            input.prop('checked', true);
        }

        var str = 'pdf/' + a + '.pdf';
        $scope.url = str;
    };

    $scope.initiateSearch = function() {
        var checked = $('input:checked');
        var data = [];
        for(var i = 0; i < checked.length - 1; i++) {
            data.push(checked[i].value);
        }
        sharedProperties.setInitiateSearchData(data);
         var redirectPath = "InitiateSearch";
         $location.path(redirectPath);
        console.log(data);
    }

}])
