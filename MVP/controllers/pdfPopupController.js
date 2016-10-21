app.controller('pdfPopupController', ['$uibModal','$scope','Factory', function ($uibModal, $scope, Factory) {
    
   
    
    $scope.selectName = 'All';
    
    $scope.update = function(form) {
        $scope.selectName = form;      
    }
        
    $scope.openPdf = function (url) {
        var url = 'https://api.recruiterdesktop.kf4d-dev.com/RD-WebApp/Profile/getDocumentById/' + url;
        var modalInstance = $uibModal.open({
            animation: true
            , templateUrl: 'modalContent.html'
            , controller: 'ModalCtrl'
            , controllerAs: '$ctrl'
            , size: 'lg'
            , resolve: {
                url: function () {
                    return url;
                }
            }
        });
    }

    function pdfDetails() {
        var promise = Factory.pdfDetailsList();
        promise.then(
          function resolved(response) {
              $scope.pdfDetailsData = response.data.documentList;
              sortSelect();
          },
          function rejected(response) {
              //alert(response.status + ': ' + response.statusText);
          }
        )
    };
    pdfDetails();
 
    function sortSelect() {
        var data = $scope.pdfDetailsData;
        var selectFunctionArray = ['All'];
        if (data) {
            angular.forEach( data , function(item){
                var uniqueValue = item.Function;
                if (selectFunctionArray.indexOf(uniqueValue) == -1) {
                    selectFunctionArray.push(uniqueValue)
                }
            })
            //console.log(selectFunctionArray);    
            $scope.options = selectFunctionArray;
             $scope.form = $scope.options[0];
        }        
    }
    
}]);

app.controller('ModalCtrl', ['$uibModalInstance', 'url', function ($uibModalInstance, url) {
    var $ctrl = this;
    $ctrl.url = url;
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])