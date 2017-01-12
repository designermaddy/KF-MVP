app.controller('requisitionStatusController', ['$scope', 'Factory', 'commonFunctions', '$timeout', '$location', 'sharedProperties', '$rootScope', 'config', function ($scope, Factory, commonFunctions, $timeout, $location, sharedProperties, $rootScope, config) {
        var graphName = "RequisitionStatus";
        var deeplinkURL = '';
        $scope.selectedButton = 'company';
        $scope.selectedEngagment = null;
        if (angular.isDefined($rootScope.graph[graphName])) {
            var a = $rootScope.graph[graphName];
            $scope.selectedEngagment = a.Engagement;
            $scope.selectedButton = a.GraphType ? a.GraphType : 'company';
        }

        function callgraphDropDownFunc() {
            if (config.getAllEngagments) {
                $scope.allEngagments = config.getAllEngagments;
                if ($scope.allEngagments.length > 0) {
                    if (!$scope.selectedEngagment) {
                        $scope.selectedEngagment = config.getAllEngagments[0].Engagement;
                    }
                    candidatePipelineDonutChart($scope.selectedEngagment);
                }
            }
        }
        callgraphDropDownFunc();
        $scope.update = function (selectedDropdownValue) {
            /*  console.log(selectedDropdownValue.Engagement)
               $scope.selectedEngagment = selectedDropdownValue.Engagement*/
            candidatePipelineDonutChart($scope.selectedEngagment)
        }
        $scope.callmyClientRequisition = function (selectedButton) {
                $scope.selectedButton = selectedButton;
                if (selectedButton == "mygraph") {
                    $("#clientReqsSource").removeClass('active');
                    $('#myReqsSource').addClass('active');
                }
                else if (selectedButton == "company") {
                    $("#myReqsSource").removeClass('active');
                    $('#clientReqsSource').addClass('active');
                }
                candidatePipelineDonutChart($scope.selectedEngagment);
            }
            //candidatePipelineDonutChart(graphName, $scope.selectedButton);
        function candidatePipelineDonutChart(engagment) {
             var companyId = commonFunctions.getCompanyId($scope.allEngagments, engagment);
            var promise = Factory.getChart(graphName, $scope.selectedButton, engagment, companyId);
            var label = [];
            var data = [];
            var datainsert = []
            $scope.candidatePipelineData = []
            promise.then(function resolved(response) {
                if (response.data.graphDetails) {
                    deeplinkURL = response.data.graphDetails.deepLinkURI;
                    datas = [];
                    // = response.data.candidateList;
                    $scope.candidatePipelineData = [];
                    for (var k in Object.keys(response.data.graphDetails.data)) {
                        label.push((Object.keys(response.data.graphDetails.data)[k]))
                        data.push(response.data.graphDetails.data[Object.keys(response.data.graphDetails.data)[k]])
                            //datainsert.push[data[k]]
                        $scope.candidatePipelineData.push({
                            "label": label
                            , "data": data
                        });
                    }
                }
                else {
                    data = [0, 0, 0]
                    $scope.candidatePipelineData.push({
                        "label": label
                        , "data": data
                    });
                }
            }, function rejected(response) {
                commonFunctions.error('Failed to load : ' + response.status + ': ' + response.statusText);
            })
        };
        $scope.onClick = function (points, evt) {
            console.log('hello' + deeplinkURL); // 0 -> Series A, 1 -> Series B
            sharedProperties.setReportURL(deeplinkURL)
            $("li[class='active']").removeClass('active');
            $('#ReportHeader').addClass('active');
            $location.path('/Reports');
        };
        $rootScope.$watch(function () {
            return config.getAllEngagments
        }, function () {
            // do something here
            //config.searcherReq
            callgraphDropDownFunc();
        }, true);
        $timeout(function () {
            $('#candidatePipelineList').selectpicker();
        }, 50, false);
        }

    ]);
