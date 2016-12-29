app.controller('engagementperIDRequisitionController', ['$scope', 'Factory', 'sharedProperties', 'commonFunctions', '$uibModal', 'commonFunctions', 'config','$timeout', function ($scope, Factory, sharedProperties, commonFunctions, $uibModal, commonFunctions, config,$timeout) {
    $scope.viewLoading = false;
    getRequisitionList();

    $timeout(function(){$('#engHeader').addClass('active');},100);
    function getRequisitionList() {
        var engagementID = sharedProperties.getengagementPerIDSelected()
        var engDtls = sharedProperties.getEngagmentSelectedObject();
        if (engagementID) {
            if (engDtls.thirdParty == "RPO") {
                var promise = Factory.getRequisionforanEngagment(engagementID)
            }
            else {
                if (config.searcherItemFromKornferry) {
                    // engagementID = "50-510087587";
                    var promise = Factory.getSearcherRequisitionsByEngagement(engagementID, config.searcherItemFromKornferry)
                }
            }
            promise.then(function resolved(response) {
                $scope.engagementResponse = response.data.engagement;
                $scope.getData = function (workflowSteps, value) {
                    var output = '';
                    angular.forEach(workflowSteps, function (input) {
                        if (input.step == value) {
                            output = input.candidateCount;
                        }
                    });
                    return output;
                    console.log(output);
                }
                if ($scope.engagementResponse) {
                    $scope.engagementClient = $scope.engagementResponse.Client;
                    $scope.engagementClientContact = $scope.engagementResponse.ClientContact;
                    $scope.engagementConsultant = $scope.engagementResponse.EngagementConsultant;
                    $scope.engagementUsers = $scope.engagementResponse.Users;
                }
                $scope.currentPage = 1;
                $scope.totalItems = $scope.engagementResponse.Requisitions.length;
                $scope.entryLimit = 10; // items per page
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);

                //Adding unique recruiter name in drop down
                $scope.recruiters=[];
                var recruiterNames = [];
                angular.forEach($scope.engagementResponse.Requisitions,function(requisition){
                    angular.forEach(requisition.Recruiter, function(recruiter){
                        var name = recruiter.firstName + " " + recruiter.lastName;
                        if(recruiterNames.indexOf(name) < 0){
                            recruiterNames.push(name);
                            $scope.recruiters.push(recruiter);
                        }
                    });
                });
                console.log(recruiterNames.length);
                console.log($scope.recruiters.length);

            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
        }
    }
    // iframe modals.
    $scope.openTalentLinkIframe = function () {
        var url = commonFunctions.getIframeUrl('addNewRequisitionTalentLink');
        commonFunctions.openIframe(url)
    }
    $scope.openCrmIframe = function () {
        var url = commonFunctions.getIframeUrl('addNewRequisitionCRM');
        commonFunctions.openIframe(url);
    }
    $scope.changeActivelink = function (row, htmlPath) {
        commonFunctions.changeActivelink(row, htmlPath);
    }
    $scope.$watch('search', function (newVal, oldVal) {
        if ($scope.rowCollection) {
            $scope.filtered = filterFilter($scope.rowCollection, newVal);
            $scope.totalItems = $scope.filtered.length;
            $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
            $scope.currentPage = 1;
        }
    }, true);
}]);
app.controller('ModalCancel', ['$uibModalInstance', 'url', '$scope', '$sce', function ($uibModalInstance, url, $scope, $sce) {
    $scope.iframeUrl = $sce.trustAsResourceUrl(url);
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    }
}])
