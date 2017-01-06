app.controller('candidateSourceController', ['$scope', 'Factory', 'commonFunctions', '$timeout', '$location', 'sharedProperties', '$rootScope', 'config', function ($scope, Factory, commonFunctions, $timeout, $location, sharedProperties, $rootScope, config) {
        var graphName = "CandidateSource";
        var deeplinkURL = '';
        $scope.selectedButton = 'company';
        if (angular.isDefined($rootScope.graph[graphName])) {
            var a = $rootScope.graph[graphName];
            $scope.selectedEngagment = a.Engagement;
            $scope.selectedButton = a.GraphType ? a.GraphType : 'company';
        }
        callgraphDropDownFunc();

        function callgraphDropDownFunc() {
            if (config.getAllEngagments) {
                console.log(config.getAllEngagments)
                $scope.allEngagments = config.getAllEngagments;
                if ($scope.allEngagments.length > 0) {
                    if (!$scope.selectedEngagment) {
                        $scope.selectedEngagment = config.getAllEngagments[0].Engagement;
                    }
                    candidatePipelineDonutChart($scope.selectedEngagment);
                }
            }
        }
        $scope.update = function (selectedDropdownValue) {
            candidatePipelineDonutChart($scope.selectedEngagment)
        }
        $scope.callmyClientRequisition = function (selectedButton) {
            $scope.selectedButton = selectedButton;
            if (selectedButton == "mygraph") {
                $("#clientCandidateSource").removeClass('active');
                $('#myCandidateSource').addClass('active');
            }
            else if (selectedButton == "company") {
                $("#myCandidateSource").removeClass('active');
                $('#clientCandidateSource').addClass('active');
            }
            candidatePipelineDonutChart($scope.selectedEngagment);
        }
        candidatePipelineDonutChart(graphName, $scope.selectedButton);

        function candidatePipelineDonutChart(engagment) {
            var promise = Factory.getChart(graphName, $scope.selectedButton, engagment);
            var label = [];
            var data = [];
            var datainsert = []
            $scope.candidatePipelineData = []
            promise.then(function resolved(response) {
                if (response.data.graphDetails) {
                    deeplinkURL = response.data.graphDetails.deepLinkURI;
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
                        $scope.options = {
                            legend: {
                                display: true
                            }
                        };
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
