app.controller('requisitionCandidateListController', ['$scope', 'Factory', '$filter', 'filterFilter', '$routeParams', 'commonFunctions', 'sharedProperties','$timeout', function ($scope, Factory, filter, filterFilter, $routeParams, commonFunctions, sharedProperties, $timeout) {
        if ($routeParams.tab) {
            $scope.showIndex = Number($routeParams.tab);
        }
        $scope.viewLoading = false;
        agingRequisitionList();

        function agingRequisitionList() {
            var positionID = sharedProperties.getRequisitionDetails().Position
            var promise = Factory.getrequisitionCandidateList(positionID);
            promise.then(function resolved(response) {
                $scope.rowCollection = response.data.candidateList;

                $scope.candidateListDtls = response.data;
                if ($scope.rowCollection) {
                    $scope.viewLoading = true;
                    $scope.currentPage = 1;
                    $scope.totalItems = $scope.rowCollection.length;
                    $scope.entryLimit = 12; // items per page
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                }
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
        };
        $scope.itemsByPage = 3;
        // pagination controls
        // $watch search to update pagination
        $scope.$watch('search', function (newVal, oldVal) {
            if ($scope.rowCollection) {
                $scope.filtered = filterFilter($scope.rowCollection, newVal);
                $scope.totalItems = $scope.filtered.length;
                $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                $scope.currentPage = 1;
            }
        }, true);
        $scope.listVisible = true;
        $scope.gridVisible = false
        $scope.ShowHide = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.listVisible = $scope.listVisible ? false : true;
                $scope.gridVisible = $scope.gridVisible ? false : true;
                console.log($scope.listVisible)
                console.log($scope.gridVisible)
            }
            //ng-class="[getClass(icolor)
        $scope.getClass = function (strValue) {
            if (strValue <= 5) return "BGRed";
            else if (strValue < 15) return "BGOrange";
            else if (strValue >= 15) return "BGGreen";
        }
        
        // openApplicantIframe controls
        /*$scope.openApplicantIframe = function () {
            var url = commonFunctions.getIframeUrl('applicantDetails');
            $('#applicantDetails iframe').attr('src', url);
            $('#applicantResultdiv').hide();
            $('#applicantDetails').show();
        };
        $('#applicantResultBack').click(function (event) {
            event.preventDefault();
            $('#applicantDetails').hide();
            $('#applicantResultdiv').show();
        });*/
        
        // openSearchIframe controls
        $scope.openSearchIframe = function () {
            var url = commonFunctions.getIframeUrl('searchListCandidateDetails');
            $('#searchListCandidateDetails iframe').attr('src', url);
            $('#searchResultdiv').hide();
            $('#searchListCandidateDetails').show();
        };
        $('#searchResultBack').click(function (event) {
            event.preventDefault();
            $('#searchListCandidateDetails').hide();
            $('#searchResultdiv').show();
        });
    
   // openApplicantIframe controls
        $scope.openApplicantIframe = function () {
            var url = commonFunctions.getIframeUrl('applicantDetails');
            $('#applicantDetails iframe').attr('src', url);
            $('#applicantResultdiv').hide();
            $('#applicantDetails').show();
        };
        $('#applicantResultBack').click(function (event) {
            event.preventDefault();
            $('#applicantDetails').hide();
            $('#applicantResultdiv').show();
        })
        $scope.applicantResultBack = function() {
            $('#applicantDetails').hide();
            $('#applicantResultdiv').show();
        }
        
        $scope.getCandidateData = function(id) {
          sharedProperties.setViewCandidateId(id);
          $('#candidatelistid').hide();
          $('#reqCanDet').show();
        }
        $timeout(function () {
        $('#candidateSavedSearchesList').selectpicker();
        console.log($('.selectpicker'))
        }, 50, false);

        
}]);
