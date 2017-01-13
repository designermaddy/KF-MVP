app.controller('candidateSourceController', ['$scope', 'Factory', 'commonFunctions', '$timeout', '$location', 'sharedProperties', '$rootScope', 'config', function ($scope, Factory, commonFunctions, $timeout, $location, sharedProperties, $rootScope, config) {
        var graphName = "CandidateSource";
        var deeplinkURL = '';
        var graphVar = {};
        $scope.selectedButton = 'company';
        $scope.selectedEngagment = null;
        $scope.callmyClientRequisition = function (selectedButton, test) {
            if (selectedButton) {
                $scope.selectedButton = selectedButton;
                if (selectedButton == "mygraph") {
                    $("#clientReqs").removeClass('active');
                    $('#clientCandidateSource').addClass('active');
                }
                else if (selectedButton == "company") {
                    $("#clientCandidateSource").removeClass('active');
                    $('#clientReqs').addClass('active');
                }
                if (!test) {
                    candidatePipelineDonutChart($scope.selectedEngagment);
                }
            }
        }
        if (angular.isDefined($rootScope.graph[graphName])) {
            var a = $rootScope.graph[graphName];
            var d = '';
            if (a.firstTime == true) {
                if (a.loadedFromBackend == true) {
                    d = a.data;
                }
                else {
                    //use default values.
                }
                $rootScope.graph[graphName].firstTime = false;
            }
            else {
                d = a.mdata;
            }
            if (angular.isObject(d)) {
                $scope.selectedEngagment = d.Engagement;
                $scope.selectedButton = d.GraphType ? d.GraphType : 'company';
                $scope.callmyClientRequisition($scope.selectedButton, true)
            }
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
            candidatePipelineDonutChart($scope.selectedEngagment)
        }

        function candidatePipelineDonutChart(engagement) {
            var companyId = commonFunctions.getCompanyId($scope.allEngagments, engagement);
            var v = {
                'GraphType': $scope.selectedButton
                , 'Engagement': engagement
                , 'companyId': companyId
            }
            if (angular.equals(graphVar, v)) {
                //do nothing
            }
            else {
                graphVar = Object.assign({}, v);
                $rootScope.graph[graphName].mdata = Object.assign({}, v);
                var promise = Factory.getChart(graphName, $scope.selectedButton, engagement, companyId);
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
            }
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
