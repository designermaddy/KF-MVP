app.controller('pdfPopupController', ['$uibModal', function ($uibModal) {
    var $ctrl = this;
    $ctrl.url = 'pdf/1.pdf';
    $ctrl.openPdf = function (num) {
        $ctrl.url = 'pdf/' + num + '.pdf';
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
}]);
app.controller('ModalCtrl', ['$uibModalInstance', 'url', function ($uibModalInstance, url) {
    var $ctrl = this;
    $ctrl.url = url;
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])