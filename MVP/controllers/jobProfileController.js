app.controller('jobProfileController', ['$uibModal','$scope','Factory', 'commonFunctions', 'sharedProperties', '$location','$sce','config', function ($uibModal, $scope, Factory, commonFunctions, sharedProperties, $location,$sce, config) {

  jobProfileDocDetails();
    function jobProfileDocDetails() {
           if(sharedProperties.getRequisitionDetails()){
                $scope.item  = sharedProperties.getRequisitionDetails();
            }
        var promise = Factory.jobProfileDocDetailsList($scope.item.Engagement);
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




    $scope.changePdf = function(a) {
        var el = $(event.target);
        var div = $(event.currentTarget);
        var input = div.find('input');
        if (input.prop('checked')) {
            input.prop('checked', false);
        }else {
            input.prop('checked', true);
            callPdf(a);
        }
    };

    var callPdf = function(a){
        var url = config.projectUrl + '/Profile/getDocumentById/' + a;
          var promise = Factory.getPDF(url);
        promise.then(
          function resolved(response) {
               var file = new Blob([response.data], { type: 'application/pdf' });
             var fileURL = URL.createObjectURL(file);
              $scope.pdfContent= $sce.trustAsResourceUrl(fileURL);
              $scope.url =  $scope.pdfContent

          })
    }



    $scope.$watch(function() {
        return $scope.url
        }, function(newValue, oldValue) {
            $scope.url = newValue;
            //setValues();
    });

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
