app.controller('requisitionController', ['$scope', 'Factory', 'sharedProperties', '$http', 'commonFunctions', 'config', function ($scope, Factory, sharedProperties, $http, commonFunctions, config) {
    $scope.search = {};
commonFunctions.getSearcherJson();
    function getData() {
        var promise = Factory.getRequisitionTableList();
        promise.then(function resolved(response) {
            $scope.rowCollection = response.data.requisitions.concat(config.searcherReq);
            setValues();
        }, function rejected(response) {
            commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
        });
    }
    getData();

    function setValues() {
        if ($scope.rowCollection) {
            $scope.viewLoading = true;
            $scope.currentPage = 1;
            $scope.totalItems = $scope.rowCollection.length;
            $scope.entryLimit = 10; // items per page
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        }
    }
    // call the API for selectedengagement per id
    $scope.onSelectEngagementPerID = function (engagementID, engagementType) {
        var engDtlsSelected = {};
        engDtlsSelected.id = engagementID;
        engDtlsSelected.thirdParty = engagementType;
        sharedProperties.setengagementPerIDSelected(engagementID);
        sharedProperties.setEngagmentSelectedObject(engDtlsSelected);
    }
    $scope.openTalentLinkIframe = function () {
        var url = commonFunctions.getIframeUrl('addNewRequisitionTalentLink');
        commonFunctions.openIframe(url);
    }
    $scope.openCrmIframe = function () {
        var url = commonFunctions.getIframeUrl('addNewRequisitionCRM');
        commonFunctions.openIframe(url);
    }
     $scope.changeActivelink = function(row, htmlPath) {
        commonFunctions.changeActivelink(row, htmlPath);
    }

}]);
