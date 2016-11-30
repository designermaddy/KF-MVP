app.controller('requisitionCandidateListDummyController', ['$scope', 'Factory', '$filter', 'filterFilter', 'commonFunctions','sharedProperties', '$timeout', function ($scope, Factory, filter, filterFilter, commonFunctions, sharedProperties, $timeout) {


        $scope.viewLoading = false;

        postRequisitionApplicationList();
        var data = {}
        //get the applicationlist for a requisition using position id
        function postRequisitionApplicationList() {
            var reqDetailsperRequisition = sharedProperties.getRequisitionDetails();
            if(reqDetailsperRequisition.ReqNumber){
                // page and status is static mentioned by Karthik position id dynamic//
               /* postData = {
                    "requestParams": {"page":"2","status":"New","orgId":"9855","positionId": reqDetailsperRequisition.ReqNumber}
                }*/
                sharedProperties.setPositionId(reqDetailsperRequisition.Position);

            var promise = Factory.postrequisitionApplicationList(reqDetailsperRequisition.ReqNumber);
            promise.then(function resolved(response) {
                $scope.rowCollection = response.data.data;
                $scope.candidateListDtls = response.data.data;
                if ($scope.rowCollection) {
                    $scope.viewLoading = true;
                    $scope.currentPage = 1;
                    $scope.totalItems = $scope.rowCollection.length;
                    $scope.entryLimit = 10; // items per page
                    $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
                }
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
            }
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
        $timeout(function () {
        $('#SelectApplicantsList').selectpicker();
        console.log($('.selectpicker'))
        }, 50, false);
}]);
