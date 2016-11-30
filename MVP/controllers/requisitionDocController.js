app.controller('requisitionDocController', ['$uibModal', '$scope', 'Factory', 'commonFunctions', 'sharedProperties',
                                            function ($uibModal, $scope, Factory, commonFunctions, sharedProperties) {
        var $ctrl = this;
        $ctrl.url = 'pdf/1.pdf';
        $ctrl.openPdf = function (url) {
            $ctrl.url = url;
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'modalContent.html',
                controller: 'ModalCtrl',
                controllerAs: '$ctrl',
                size: 'lg',
                resolve: {
                    url: function () {
                        return $ctrl.url;
                    }
                }
            });
        }

        pdfDetails();

        function pdfDetails() {
          /* <!-- console.log(sharedProperties.getRequisitionDetails());
            console.log(sharedProperties.getRequisitionDetails().EngagementId);
            var data = {
                'requisition': sharedProperties.getPositionId(),
                'engagementId': parseInt(sharedProperties.getRequisitionDetails().EngagementId)
            }
            var promise = Factory.requisitionDocDetailsList(data);
            promise.then(
                function resolved(response) {
                    console.log(response.data);
                    $scope.pdfDetailsData = response.data.pdfDetails;
                    // globalDetails.userTypeID = response.data.userTypeId;
                    // globalDetails.userId = response.data.userid;
                    // globalDetails.userType = response.data.userType
                },
                function rejected(response) {
                    commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
                }
            ) -->*/
        };
}]);

app.controller('ModalCtrl', ['$uibModalInstance', 'url', function ($uibModalInstance, url) {
    var $ctrl = this;
    $ctrl.url = url;
    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
