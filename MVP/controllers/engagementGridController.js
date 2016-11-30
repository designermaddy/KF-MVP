

app.controller('engagementGridController', ['$scope', 'Factory', 'filterFilter', 'commonFunctions', 'sharedProperties', '$uibModal', function ($scope, Factory, filterFilter, commonFunctions,sharedProperties, $uibModal) {

            if(sharedProperties.getRequisitionDetails()){
                $scope.item  = sharedProperties.getRequisitionDetails();
                sharedProperties.setNewSearchData([$scope.item.ReqNumber, $scope.item.JobTitle]);
            }

	// create empty search model (object) to trigger $watch on update
	$scope.search = {};

	$scope.resetFilters = function () {
		// needs to be a function or it won't trigger a $watch
		$scope.search = {};
	};



    // iframe modals.

    $scope.openTalentLinkIframe = function() {
        var url = commonFunctions.getIframeUrl('addNewRequisitionTalentLink');
        var modalInstance = $uibModal.open({
              animation: true
            , templateUrl: 'modalContent.html'
            , controller: 'ModalCancel'
            , controllerAs: '$ctrl'
            , size: 'lg'
            , resolve: {
                url: function () {
                    return url;
                }
            }
        });
    }
    $scope.openCrmIframe = function() {
        var url = commonFunctions.getIframeUrl('addNewRequisitionCRM');
        var modalInstance = $uibModal.open({
            animation: true
            , templateUrl: 'modalContent.html'
            , controller: 'ModalCancel'
            , controllerAs: '$ctrl'
            , size: 'lg'
            , resolve: {
                url: function () {
                    return url;
                }
            }
        });
    }

    $scope.openAdd = function() {
        var modalInstance = $uibModal.open({
              animation: true
            , templateUrl: 'AddMe.html'
            , controller: 'AddMeCtrl'
            , size: 'lg'
        });
    }
}]);

app.controller('ModalCancel', ['$uibModalInstance', 'url', '$scope', '$sce', function ($uibModalInstance, url, $scope, $sce) {
    $scope.iframeUrl = $sce.trustAsResourceUrl(url);
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])

app.controller('AddMeCtrl', ['$uibModalInstance', '$scope', function($uibModalInstance, $scope) {
     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
