app.controller('requisitionDocController', ['$uibModal','$scope','Factory', function ($uibModal, $scope, Factory) {
    var $ctrl = this;
    $ctrl.url = 'pdf/1.pdf';
    $ctrl.openPdf = function (url) {
        $ctrl.url = url;
        var modalInstance = $uibModal.open({
            animation: true
            , templateUrl: 'modalContent.html'
            , controller: 'ModalCtrl'
            , controllerAs: '$ctrl'
            , size: 'lg'
            , resolve: {
                url: function () {
                    return $ctrl.url;
                }
            }
        });
    }

    pdfDetails();
    function pdfDetails() {
        var promise = Factory.requisitionDocDetailsList();
        promise.then(
          function resolved(response) {

              $scope.pdfDetailsData = response.data.pdfDetails;
             // globalDetails.userTypeID = response.data.userTypeId;
             // globalDetails.userId = response.data.userid;
             // globalDetails.userType = response.data.userType
          },
          function rejected(response) {
              alert(response.status + ': ' + response.statusText);
          }
      )
    };
}]);

app.controller('ModalCtrl', ['$uibModalInstance', 'url', function ($uibModalInstance, url) {
    var $ctrl = this;
    $ctrl.url = url;
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])