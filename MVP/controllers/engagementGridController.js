

app.controller('engagementGridController', ['$scope', 'Factory', 'filterFilter', 'commonFunctions', 'sharedProperties', '$uibModal','$timeout', function ($scope, Factory, filterFilter, commonFunctions,sharedProperties, $uibModal, $timeout) {

            if(sharedProperties.getRequisitionDetails()){
                $scope.item  = sharedProperties.getRequisitionDetails();
                console.log($scope.item)
                sharedProperties.setNewSearchData([$scope.item.ReqNumber, $scope.item.JobTitle]);
            }

	// create empty search model (object) to trigger $watch on update
	$scope.search = {};
    $scope.currentStatus = $scope.item.status;
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

    $scope.openPencilIframe = function() {
        var url = commonFunctions.getIframeUrl('applicantDetails');

    }

    $scope.updateStatus = function(){
        console.log("Status Changed to : " + $scope.item.status);
        var requestObj = {"positionResponse" : $scope.item} ;
        Factory.updateStatus(requestObj).then(function mySucces(response) {
            console.log("Successfully status changed.");
        }, function myError(response) {
            console.log("New Status : "  + $scope.item.status);
            console.log("Current Status : "  + $scope.currentStatus);
            $scope.item.status = $scope.currentStatus;
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        });

    }
     /*$timeout(function () {
        $('#requisitionStatus').selectpicker();
        }, 50, false);*/
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
